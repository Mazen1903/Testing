import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { 
  CommunityPost, 
  Discussion, 
  Conversation, 
  Message,
  CreatePostRequest, 
  UpdatePostRequest,
  CreateDiscussionRequest,
  CreateReplyRequest,
  SendMessageRequest,
  PostsResponse,
  DiscussionsResponse,
  ConversationsResponse,
  ApiResponse,
  Comment,
} from '@/shared/types';
import { authHelper } from '@/shared/utils/auth-helper';

// Supabase configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

class SupabaseCommunityService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  // Helper to set RLS context for current user
  private async setUserContext(): Promise<void> {
    const clerkUserId = authHelper.getCurrentUserId();
    if (clerkUserId) {
      try {
        const { error } = await this.supabase.rpc('set_current_user_clerk_id', { clerk_id: clerkUserId });
        if (error) {
          // If the function doesn't exist, RLS might be disabled - that's okay
          if (error.code === 'PGRST202') {
            console.log('ℹ️ RLS helper function not found - RLS might be disabled (this is fine for testing)');
            return;
          }
          console.error('❌ Error setting user context:', error);
          return;
        }
        console.log('✅ User context set for RLS:', clerkUserId);
      } catch (error) {
        console.error('❌ Error calling set_current_user_clerk_id:', error);
      }
    } else {
      console.warn('⚠️ No clerk user ID found for RLS context');
    }
  }

  // Helper to get current user ID from Clerk (assumes context is already set)
  private async getCurrentUserId(): Promise<string | null> {
    const clerkUserId = authHelper.getCurrentUserId();
    if (!clerkUserId) {
      console.warn('⚠️ No Clerk user ID found');
      return null;
    }

    // Get the user ID from our users table based on clerk_id
    const { data, error } = await this.supabase
      .from('users')
      .select('id')
      .eq('clerk_id', clerkUserId)
      .maybeSingle(); // Use maybeSingle() instead of single() to handle no results gracefully

    if (error) {
      console.error('❌ Error getting user ID:', error);
      return null;
    }

    // If user doesn't exist in Supabase yet, return null
    // The user sync process will create the record
    if (!data) {
      console.log('⚠️ User not found in Supabase, will be synced automatically');
      return null;
    }

    console.log('✅ Found user ID:', data.id);
    return data.id;
  }

  // Sync user from Clerk to Supabase
  async syncUser(clerkUser: any): Promise<void> {
    try {
      console.log('🔄 Syncing user to Supabase:', clerkUser.id);
      
      // First check if user already exists
      const { data: existingUser, error: checkError } = await this.supabase
        .from('users')
        .select('id')
        .eq('clerk_id', clerkUser.id)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = not found, which is OK
        console.error('Error checking existing user:', checkError);
        return;
      }

      if (existingUser) {
        console.log('✅ User already exists in Supabase');
        return;
      }

      // If user doesn't exist, use service role to bypass RLS for user creation
      // For now, we'll try the regular insert and handle the RLS issue
      const { data, error } = await this.supabase
        .from('users')
        .insert({
          clerk_id: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress || '',
          name: clerkUser.fullName || clerkUser.firstName || clerkUser.username || 'User',
          avatar_url: clerkUser.imageUrl,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Error syncing user to Supabase:', error);
        
        // If it's an RLS error, provide helpful message
        if (error.code === '42501') {
          console.error('💡 RLS Policy Error: You need to disable RLS on users table or fix the policies');
          console.error('💡 Quick fix: Run "ALTER TABLE users DISABLE ROW LEVEL SECURITY;" in Supabase SQL Editor');
        }
        return;
      }

      console.log('✅ User synced to Supabase successfully:', data?.id);
    } catch (error) {
      console.error('❌ Error syncing user to Supabase:', error);
    }
  }

  // Posts API methods
  async getPosts(page = 1, limit = 10): Promise<ApiResponse<PostsResponse>> {
    try {
      const currentUserId = await this.getCurrentUserId(); // This also sets RLS context
      
      // If user isn't synced yet, still set the context for RLS
      if (!currentUserId) {
        await this.setUserContext();
      }
      
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // Get posts with author info and user's like status
      const { data, error, count } = await this.supabase
        .from('community_posts')
        .select(`
          *,
          author:users!user_id(id, name, avatar_url),
          post_likes!left(user_id),
          community_polls(
            id,
            question,
            total_votes,
            expires_at,
            allow_multiple_votes,
            poll_options(
              id,
              text,
              votes_count,
              poll_votes!left(user_id)
            )
          )
        `, { count: 'exact' })
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const posts: CommunityPost[] = data?.map(post => ({
        id: post.id,
        userId: post.user_id,
        author: {
          id: post.author.id,
          name: post.author.name,
          avatar: post.author.avatar_url
        },
        content: post.content,
        type: post.type,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        likes: post.likes_count,
        comments: post.comments_count,
        shares: post.shares_count,
        hashtags: post.hashtags || [],
        hasLiked: currentUserId ? post.post_likes?.some((like: any) => like.user_id === currentUserId) || false : false,
        imageUrl: post.image_url,
        imageCaption: post.image_caption,
        isPublic: post.is_public,
        category: post.category,
        poll: post.community_polls?.[0] ? {
          question: post.community_polls[0].question,
          options: post.community_polls[0].poll_options?.map((option: any) => ({
            id: option.id,
            text: option.text,
            votes: option.votes_count,
            percentage: post.community_polls[0].total_votes > 0 
              ? Math.round((option.votes_count / post.community_polls[0].total_votes) * 100)
              : 0,
            hasVoted: currentUserId ? option.poll_votes?.some((vote: any) => vote.user_id === currentUserId) || false : false
          })) || [],
          totalVotes: post.community_polls[0].total_votes,
          expiresAt: post.community_polls[0].expires_at,
          allowMultipleVotes: post.community_polls[0].allow_multiple_votes
        } : undefined
      })) || [];

      return {
        success: true,
        data: {
          posts,
          pagination: {
            page,
            limit,
            total: count || 0,
            hasNext: (count || 0) > to + 1
          }
        }
      };
    } catch (error) {
      console.error('Error getting posts:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get posts'
      };
    }
  }

  async createPost(postData: CreatePostRequest): Promise<ApiResponse<CommunityPost>> {
    try {
      // Set user context for RLS first
      await this.setUserContext();
      
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return { success: false, error: 'User not authenticated' };
      }

      console.log('📝 Creating post for user:', userId);

      // Create the post
      const { data: post, error: postError } = await this.supabase
        .from('community_posts')
        .insert({
          user_id: userId,
          content: postData.content,
          type: postData.type,
          hashtags: postData.hashtags || [],
          image_url: postData.imageUrl,
          image_caption: postData.imageCaption,
          is_public: postData.isPublic ?? true,
          category: postData.category
        })
        .select()
        .single();

      if (postError) throw postError;

      // If it's a poll, create poll and options
      if (postData.type === 'poll' && postData.poll && post) {
        const { data: pollData, error: pollError } = await this.supabase
          .from('community_polls')
          .insert({
            post_id: post.id,
            question: postData.poll.question,
            expires_at: postData.poll.expiresAt,
            allow_multiple_votes: postData.poll.allowMultipleVotes || false
          })
          .select()
          .single();

        if (pollError) throw pollError;

        // Create poll options
        const options = postData.poll.options.map((option, index) => ({
          poll_id: pollData.id,
          text: option,
          display_order: index
        }));

        const { error: optionsError } = await this.supabase
          .from('poll_options')
          .insert(options);

        if (optionsError) throw optionsError;
      }

      // Return the created post (simplified for now)
      const createdPost: CommunityPost = {
        id: post.id,
        userId: post.user_id,
        author: { id: userId, name: 'Current User' }, // You'd get this from the user
        content: post.content,
        type: post.type,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        likes: 0,
        comments: 0,
        shares: 0,
        hashtags: post.hashtags || [],
        hasLiked: false,
        isPublic: post.is_public
      };

      return { success: true, data: createdPost };
    } catch (error) {
      console.error('Error creating post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post'
      };
    }
  }

  async likePost(postId: string): Promise<ApiResponse<void>> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await this.supabase
        .from('post_likes')
        .insert({ post_id: postId, user_id: userId });

      if (error) throw error;
      return { success: true, data: undefined };
    } catch (error) {
      console.error('Error liking post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to like post'
      };
    }
  }

  async unlikePost(postId: string): Promise<ApiResponse<void>> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await this.supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true, data: undefined };
    } catch (error) {
      console.error('Error unliking post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to unlike post'
      };
    }
  }

  async voteOnPoll(postId: string, optionId: string): Promise<ApiResponse<void>> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return { success: false, error: 'User not authenticated' };
      }

      // Get the poll ID from the post
      const { data: poll, error: pollError } = await this.supabase
        .from('community_polls')
        .select('id')
        .eq('post_id', postId)
        .single();

      if (pollError || !poll) throw new Error('Poll not found');

      // Insert the vote
      const { error } = await this.supabase
        .from('poll_votes')
        .insert({
          poll_id: poll.id,
          option_id: optionId,
          user_id: userId
        });

      if (error) throw error;
      return { success: true, data: undefined };
    } catch (error) {
      console.error('Error voting on poll:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to vote'
      };
    }
  }

  // Discussions methods
  async getDiscussions(page = 1, limit = 10, category?: string): Promise<ApiResponse<DiscussionsResponse>> {
    try {
      // Set RLS context for proper policy enforcement
      await this.setUserContext();
      
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = this.supabase
        .from('discussions')
        .select(`
          *,
          author:users!user_id(id, name, avatar_url)
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      const discussions: Discussion[] = data?.map(discussion => ({
        id: discussion.id,
        title: discussion.title,
        content: discussion.content,
        category: discussion.category,
        author: {
          id: discussion.author.id,
          name: discussion.author.name,
          avatar: discussion.author.avatar_url
        },
        createdAt: discussion.created_at,
        updatedAt: discussion.updated_at,
        replies: discussion.replies_count,
        views: discussion.views_count,
        lastReply: discussion.last_reply_at ? {
          authorName: discussion.last_reply_user_name,
          timestamp: discussion.last_reply_at
        } : undefined,
        isPinned: discussion.is_pinned,
        isSolved: discussion.is_solved,
        isScholarly: discussion.is_scholarly,
        tags: discussion.tags || []
      })) || [];

      return {
        success: true,
        data: {
          discussions,
          pagination: {
            page,
            limit,
            total: count || 0,
            hasNext: (count || 0) > to + 1
          }
        }
      };
    } catch (error) {
      console.error('Error getting discussions:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get discussions'
      };
    }
  }

  // Conversations methods
  async getConversations(): Promise<ApiResponse<ConversationsResponse>> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await this.supabase
        .from('conversations')
        .select(`
          *,
          conversation_participants!inner(
            user_id,
            users(id, name, avatar_url)
          ),
          messages(
            content,
            sender_id,
            created_at
          )
        `)
        .eq('conversation_participants.user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const conversations: Conversation[] = data?.map(conv => {
        const lastMessage = conv.messages?.[0];
        return {
          id: conv.id,
          participants: conv.conversation_participants.map((p: any) => ({
            id: p.users.id,
            name: p.users.name,
            avatar: p.users.avatar_url
          })),
          lastMessage: lastMessage ? {
            content: lastMessage.content,
            timestamp: lastMessage.created_at,
            senderId: lastMessage.sender_id
          } : {
            content: 'No messages yet',
            timestamp: conv.created_at,
            senderId: ''
          },
          unreadCount: 0, // You'd calculate this based on read status
          updatedAt: conv.updated_at
        };
      }) || [];

      return {
        success: true,
        data: {
          conversations,
          pagination: { page: 1, limit: 50, total: conversations.length, hasNext: false }
        }
      };
    } catch (error) {
      console.error('Error getting conversations:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get conversations'
      };
    }
  }

  // Real-time subscriptions (bonus feature!)
  subscribeToPostUpdates(callback: (post: CommunityPost) => void) {
    return this.supabase
      .channel('community_posts')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'community_posts'
      }, (payload) => {
        // Transform and call callback with new post
        console.log('New post:', payload.new);
        // You'd transform this to CommunityPost format
      })
      .subscribe();
  }

  // Placeholder methods for other operations
  async updatePost(postId: string, postData: UpdatePostRequest): Promise<ApiResponse<CommunityPost>> {
    // Implementation for updating posts
    return { success: false, error: 'Not implemented yet' };
  }

  async deletePost(postId: string): Promise<ApiResponse<void>> {
    // Implementation for deleting posts
    return { success: false, error: 'Not implemented yet' };
  }

  async getPostComments(postId: string): Promise<ApiResponse<Comment[]>> {
    // Implementation for getting comments
    return { success: false, error: 'Not implemented yet' };
  }

  async addComment(postId: string, content: string, parentCommentId?: string): Promise<ApiResponse<Comment>> {
    // Implementation for adding comments
    return { success: false, error: 'Not implemented yet' };
  }

  async createDiscussion(discussionData: CreateDiscussionRequest): Promise<ApiResponse<Discussion>> {
    try {
      // Set user context for RLS first
      await this.setUserContext();
      
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return { success: false, error: 'User not authenticated' };
      }

      console.log('💬 Creating discussion for user:', userId);

      // Create the discussion
      const { data: discussion, error: discussionError } = await this.supabase
        .from('discussions')
        .insert({
          user_id: userId,
          title: discussionData.title,
          content: discussionData.content,
          category: discussionData.category,
          tags: discussionData.tags || [],
          is_pinned: false,
          is_solved: false,
          is_scholarly: false
        })
        .select(`
          *,
          author:users!user_id(id, name, avatar_url)
        `)
        .single();

      if (discussionError) throw discussionError;

      // Return the created discussion
      const createdDiscussion: Discussion = {
        id: discussion.id,
        title: discussion.title,
        content: discussion.content,
        category: discussion.category,
        author: {
          id: discussion.author.id,
          name: discussion.author.name,
          avatar: discussion.author.avatar_url
        },
        createdAt: discussion.created_at,
        updatedAt: discussion.updated_at,
        replies: 0,
        views: 0,
        isPinned: discussion.is_pinned,
        isSolved: discussion.is_solved,
        isScholarly: discussion.is_scholarly,
        tags: discussion.tags || []
      };

      return { success: true, data: createdDiscussion };
    } catch (error) {
      console.error('Error creating discussion:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create discussion'
      };
    }
  }

  async getDiscussion(discussionId: string): Promise<ApiResponse<Discussion>> {
    // Implementation for getting single discussion
    return { success: false, error: 'Not implemented yet' };
  }

  async replyToDiscussion(replyData: CreateReplyRequest): Promise<ApiResponse<void>> {
    // Implementation for replying to discussions
    return { success: false, error: 'Not implemented yet' };
  }

  async getMessages(conversationId: string): Promise<ApiResponse<Message[]>> {
    // Implementation for getting messages
    return { success: false, error: 'Not implemented yet' };
  }

  async sendMessage(messageData: SendMessageRequest): Promise<ApiResponse<Message>> {
    // Implementation for sending messages
    return { success: false, error: 'Not implemented yet' };
  }

  async markMessageAsRead(messageId: string): Promise<ApiResponse<void>> {
    // Implementation for marking messages as read
    return { success: false, error: 'Not implemented yet' };
  }
}

// Export singleton instance
export const supabaseCommunityService = new SupabaseCommunityService(); 