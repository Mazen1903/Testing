export interface CommunityPost {
  id: string;
  userId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  type: 'text' | 'image' | 'poll' | 'milestone' | 'moment' | 'progress' | 'reflection' | 'achievement';
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  shares: number;
  hashtags?: string[];
  hasLiked?: boolean;
  
  // For image posts
  imageUrl?: string;
  imageCaption?: string;
  
  // For poll posts
  poll?: {
    question: string;
    options: PollOption[];
    totalVotes: number;
    expiresAt?: string;
    allowMultipleVotes?: boolean;
  };
  
  // Privacy and settings
  isPublic: boolean;
  category?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
  hasVoted?: boolean;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  category: 'Islamic Practice & Spirituality' | 'Book Study & Reflection' | 'Habit Building & Discipline' | 'Healthy Living (Halal Lifestyle)' | 'Community Support' | 'Ask a Scholar';
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  replies: number;
  views: number;
  lastReply?: {
    authorName: string;
    timestamp: string;
  };
  isPinned: boolean;
  isSolved: boolean;
  isScholarly?: boolean;
  tags?: string[];
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  isAcceptedAnswer?: boolean;
  parentReplyId?: string; // For nested replies
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  messageType: 'text' | 'image' | 'file';
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
  updatedAt: string;
}

export interface CreatePostRequest {
  content: string;
  type: CommunityPost['type'];
  hashtags?: string[];
  imageUrl?: string;
  imageCaption?: string;
  poll?: {
    question: string;
    options: string[];
    expiresAt?: string;
    allowMultipleVotes?: boolean;
  };
  isPublic?: boolean;
  category?: string;
}

export interface UpdatePostRequest {
  content?: string;
  hashtags?: string[];
  isPublic?: boolean;
  category?: string;
}

export interface CreateDiscussionRequest {
  title: string;
  content: string;
  category: Discussion['category'];
  tags?: string[];
}

export interface CreateReplyRequest {
  discussionId: string;
  content: string;
  parentReplyId?: string;
}

export interface SendMessageRequest {
  receiverId: string;
  content: string;
  messageType?: Message['messageType'];
}

export interface PostInteraction {
  postId: string;
  userId: string;
  type: 'like' | 'comment' | 'share' | 'vote';
  createdAt: string;
  // For votes
  pollOptionId?: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  parentCommentId?: string; // For nested comments
}

// Response types for API
export interface PostsResponse {
  posts: CommunityPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}

export interface DiscussionsResponse {
  discussions: Discussion[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}

export interface ConversationsResponse {
  conversations: Conversation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
} 