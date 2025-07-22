import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, FlatList } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

type TabType = 'Feed' | 'Discuss' | 'Polls' | 'Messages';

// Mock data for different sections
const feedPosts = [
  {
    id: '1',
    user: 'Ahmad_99',
    avatar: 'person-circle',
    timeAgo: '2h ago',
    content: 'Alhamdulillah! Day 21 of reading this book 📖 The Soul section is really opening my heart. May Allah guide us all 🤲',
    likes: 34,
    comments: 8,
    hashtags: ['#Day21', '#BookProgress', '#Alhamdulillah'],
    type: 'milestone'
  },
  {
    id: '2',
    user: 'Fatima.Learns',
    avatar: 'person-circle',
    timeAgo: '4h ago', 
    content: 'Beautiful sunrise during Fajr today 🌅 Starting my morning dhikr routine. "SubhanAllahi wa bihamdihi" 100x ✨',
    likes: 67,
    comments: 12,
    hashtags: ['#FajrVibes', '#MorningDhikr'],
    type: 'moment',
    hasImage: true
  },
  {
    id: '3',
    user: 'Yusuf_Habits',
    avatar: 'person-circle',
    timeAgo: '6h ago',
    content: 'Week 3 of my new morning routine: Fajr ✅ Quran reading ✅ 20min exercise ✅ Healthy breakfast ✅ The Mind-Body-Soul connection is real! 💪',
    likes: 89,
    comments: 23,
    hashtags: ['#MorningRoutine', '#HealthyHabits'],
    type: 'progress'
  },
  {
    id: '4',
    user: 'Maryam.Reflects',
    avatar: 'person-circle',
    timeAgo: '8h ago',
    content: '"The best of people are those who benefit others." This hadith from today\'s reading hit differently. Time to be more helpful to my community 💚',
    likes: 45,
    comments: 15,
    hashtags: ['#Reflection', '#Hadith'],
    type: 'reflection'
  },
  {
    id: '5',
    user: 'Omar.Journey',
    avatar: 'person-circle',
    timeAgo: '12h ago',
    content: 'Completed the entire Mind section! 🧠✨ The chapter on controlling anger changed my life. JazakAllahu khairan to everyone who recommended this book 📚',
    likes: 156,
    comments: 34,
    hashtags: ['#BookComplete', '#PersonalGrowth'],
    type: 'achievement'
  }
];

const discussionTopics = [
  {
    id: '1',
    title: 'How to maintain focus during long prayers?',
    category: 'Islamic Practice & Spirituality',
    author: 'NewMuslim_Sister',
    timeAgo: '3h ago',
    replies: 47,
    lastReply: '15min ago',
    pinned: false,
    solved: true,
    preview: 'I recently converted to Islam and I\'m struggling to maintain concentration during Maghrib and Isha prayers...'
  },
  {
    id: '2', 
    title: 'Chapter 4 Discussion: "Disciplining the Nafs" - Your thoughts?',
    category: 'Book Study & Reflection',
    author: 'BookClub_Admin',
    timeAgo: '1 day ago',
    replies: 89,
    lastReply: '2h ago',
    pinned: true,
    solved: false,
    preview: 'Let\'s discuss the key concepts from Chapter 4. What strategies resonated with you for controlling desires?'
  },
  {
    id: '3',
    title: 'Waking up for Fajr: Practical tips that actually work',
    category: 'Habit Building & Discipline',
    author: 'EarlyBird_Muslim',
    timeAgo: '2 days ago',
    replies: 134,
    lastReply: '1h ago',
    pinned: false,
    solved: false,
    preview: 'After years of struggle, I finally found methods that work. Sharing what helped me and looking for more ideas...'
  },
  {
    id: '4',
    title: 'Halal nutrition while building muscle - meal ideas?',
    category: 'Healthy Living (Halal Lifestyle)',
    author: 'FitMuslimBro',
    timeAgo: '3 days ago',
    replies: 67,
    lastReply: '4h ago',
    pinned: false,
    solved: false,
    preview: 'Trying to bulk up while staying halal. What are your go-to protein sources and meal prep ideas?'
  },
  {
    id: '5',
    title: 'Managing work stress through Islamic practices',
    category: 'Community Support',
    author: 'StressedEngineer',
    timeAgo: '4 days ago',
    replies: 78,
    lastReply: '6h ago',
    pinned: false,
    solved: false,
    preview: 'Work deadlines are overwhelming me. How do you brothers and sisters find peace through dua and dhikr?'
  },
  {
    id: '6',
    title: 'Understanding the concept of "Ihsan" - scholarly discussion',
    category: 'Ask a Scholar',
    author: 'Scholar_Ahmad',
    timeAgo: '1 week ago',
    replies: 156,
    lastReply: '1 day ago',
    pinned: false,
    solved: true,
    isScholarly: true,
    preview: 'Deep dive into the concept of Ihsan and how it applies to our daily worship and character development...'
  }
];

const communityPolls = [
  {
    id: '1',
    question: 'Which habit has been most helpful?',
    author: 'UserA3',
    timeAgo: '2 days ago',
    totalVotes: 145,
    options: [
      { text: 'Morning Prayer (70%)', percentage: 70 },
      { text: 'Exercise (20%)', percentage: 20 },
      { text: 'Journaling (10%)', percentage: 10 },
    ],
  },
  {
    id: '2',
    question: 'How often do you read the book?',
    author: 'Admin',
    timeAgo: '1 week ago', 
    totalVotes: 267,
    options: [
      { text: 'Daily (50%)', percentage: 50 },
      { text: 'Few times a week (40%)', percentage: 40 },
      { text: 'Weekends only (10%)', percentage: 10 },
      { text: 'Rarely (0%)', percentage: 0 },
    ],
  },
];

const messagesList = [
  {
    id: '1',
    user: 'User',
    time: '10:30 AM',
    lastMessage: 'Thank you for your support...',
    unread: true,
  },
  {
    id: '2',
    user: 'User',
    time: 'Yesterday',
    lastMessage: 'Looking forward to the discussion.',
    unread: false,
  },
  {
    id: '3',
    user: 'User', 
    time: '3/6/24',
    lastMessage: 'Great insights on mindfulness.',
    unread: false,
  },
  {
    id: '4',
    user: 'User',
    time: '3/1/24',
    lastMessage: 'Hope to join the next session.',
    unread: false,
  },
];

// Helper functions for post types
const getPostTypeColor = (type: string, colors: any) => {
  switch (type) {
    case 'milestone': return colors.success;
    case 'moment': return colors.primary;
    case 'progress': return colors.secondary;
    case 'reflection': return colors.primary + 'AA';
    case 'achievement': return colors.success;
    default: return colors.primary;
  }
};

const getPostTypeLabel = (type: string) => {
  switch (type) {
    case 'milestone': return '🎯 Milestone';
    case 'moment': return '✨ Moment';
    case 'progress': return '💪 Progress';
    case 'reflection': return '💭 Reflection';
    case 'achievement': return '🏆 Achievement';
    default: return '📝 Update';
  }
};

export default function CommunityScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [activeTab, setActiveTab] = useState<TabType>('Feed');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [searchMessages, setSearchMessages] = useState('');

  const renderFeedScreen = () => (
    <ScrollView 
      style={styles.tabContent} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }} // Add bottom padding for floating tab bar
    >
      {/* Share Something Button */}
      <TouchableOpacity
        style={[styles.shareButton, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => setShowNewPostModal(true)}
      >
        <Text style={[styles.shareButtonText, { color: colors.secondaryText }]}>What's happening in your journey? 🌟</Text>
        <TouchableOpacity style={[styles.shareButtonIcon, { backgroundColor: colors.primary }]}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Feed Posts */}
      {feedPosts.map((post, index) => (
        <Animated.View
          key={post.id}
          entering={FadeInDown.delay(index * 100)}
          style={[styles.postCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={styles.postHeader}>
            <View style={styles.userInfo}>
              <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="person" size={20} color={colors.primary} />
              </View>
              <View style={styles.userDetails}>
                <Text style={[styles.username, { color: colors.text }]}>{post.user}</Text>
                <Text style={[styles.timeAgo, { color: colors.secondaryText }]}>{post.timeAgo}</Text>
              </View>
            </View>
          </View>
          
          <Text style={[styles.postContent, { color: colors.text }]}>{post.content}</Text>
          
          {post.hasImage && (
            <View style={[styles.postImage, { backgroundColor: colors.border }]}>
              <Ionicons name="image" size={40} color={colors.secondaryText} />
              <Text style={[styles.imageText, { color: colors.secondaryText }]}>Beautiful sunrise 🌅</Text>
            </View>
          )}
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={20} color={colors.text} />
              <Text style={[styles.actionText, { color: colors.text }]}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
              <Text style={[styles.actionText, { color: colors.text }]}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );

  const renderDiscussScreen = () => (
    <ScrollView 
      style={styles.tabContent} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }} // Add bottom padding for floating tab bar
    >
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Discussion Topics</Text>
        <TouchableOpacity style={[styles.newButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.newButtonText}>New Topic</Text>
        </TouchableOpacity>
      </View>

      {discussionTopics.map((topic, index) => (
        <Animated.View
          key={topic.id}
          entering={FadeInDown.delay(index * 50)}
          style={[styles.discussionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={styles.discussionHeader}>
            {topic.pinned && <Ionicons name="pin" size={16} color={colors.primary} />}
            {topic.solved && <Ionicons name="checkmark-circle" size={16} color={colors.success} />}
            {topic.isScholarly && <Ionicons name="school" size={16} color={colors.secondary} />}
          </View>
          
          <Text style={[styles.discussionTitle, { color: colors.text }]}>{topic.title}</Text>
          
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '15' }]}>
            <Text style={[styles.categoryBadgeText, { color: colors.primary }]}>{topic.category}</Text>
          </View>
          
          <Text style={[styles.discussionPreview, { color: colors.secondaryText }]}>
            {topic.preview}
          </Text>
          
          <View style={styles.discussionFooter}>
            <Text style={[styles.discussionMeta, { color: colors.secondaryText }]}>
              By {topic.author} • {topic.timeAgo}
            </Text>
            <Text style={[styles.discussionStats, { color: colors.primary }]}>
              {topic.replies} replies • Last: {topic.lastReply}
            </Text>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );

  const renderPollsScreen = () => (
    <ScrollView 
      style={styles.tabContent} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }} // Add bottom padding for floating tab bar
    >
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Community Polls</Text>
        <TouchableOpacity style={[styles.newButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.newButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      {communityPolls.map((poll, index) => (
        <Animated.View
          key={poll.id}
          entering={FadeInDown.delay(index * 100)}
          style={[styles.pollCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Text style={[styles.pollQuestion, { color: colors.text }]}>{poll.question}</Text>
          <Text style={[styles.pollAuthor, { color: colors.secondaryText }]}>
            By {poll.author} • {poll.timeAgo} • {poll.totalVotes} votes
          </Text>
          
          <View style={styles.pollOptions}>
            {poll.options.map((option, optIndex) => (
              <TouchableOpacity key={optIndex} style={styles.pollOption}>
                <View style={[styles.pollOptionBar, { backgroundColor: colors.border }]}>
                  <View 
                    style={[
                      styles.pollOptionFill, 
                      { 
                        backgroundColor: colors.primary + '40',
                        width: `${option.percentage}%` 
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.pollOptionText, { color: colors.text }]}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );

  const renderMessagesScreen = () => (
    <View style={styles.tabContent}>
      {/* Search Bar */}
      <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search" size={20} color={colors.secondaryText} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search messages..."
          placeholderTextColor={colors.secondaryText}
          value={searchMessages}
          onChangeText={setSearchMessages}
        />
        {searchMessages.length > 0 && (
          <TouchableOpacity onPress={() => setSearchMessages('')}>
            <Ionicons name="close-circle" size={20} color={colors.secondaryText} />
          </TouchableOpacity>
        )}
      </View>

      {/* Messages List */}
      <FlatList
        data={messagesList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }} // Add bottom padding for floating tab bar
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 50)}>
            <TouchableOpacity
              style={[styles.messageItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setShowChatScreen(true)}
            >
              <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="person" size={20} color={colors.primary} />
              </View>
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={[styles.messageUser, { color: colors.text }]}>{item.user}</Text>
                  <Text style={[styles.messageTime, { color: colors.secondaryText }]}>{item.time}</Text>
                </View>
                <Text style={[styles.lastMessage, { color: colors.secondaryText }]} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              </View>
              {item.unread && <View style={[styles.unreadIndicator, { backgroundColor: colors.primary }]} />}
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Feed':
        return renderFeedScreen();
      case 'Discuss':
        return renderDiscussScreen();
      case 'Polls':
        return renderPollsScreen();
      case 'Messages':
        return renderMessagesScreen();
      default:
        return renderFeedScreen();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Community</Text>
      </View>

      {/* Tab Navigation */}
      <View style={[styles.tabBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        {(['Feed', 'Discuss', 'Polls', 'Messages'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && [styles.activeTabButton, { borderBottomColor: colors.primary }]
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabButtonText,
                { color: colors.secondaryText },
                activeTab === tab && [styles.activeTabButtonText, { color: colors.primary }]
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {renderTabContent()}

      {/* New Post Modal */}
      <Modal
        visible={showNewPostModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={() => setShowNewPostModal(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Create New Post</Text>
            <TouchableOpacity style={[styles.postButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <View style={styles.userRow}>
              <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="person" size={16} color={colors.primary} />
              </View>
              <Text style={[styles.username, { color: colors.text }]}>User</Text>
            </View>
            
            <TextInput
              style={[styles.postInput, { color: colors.text }]}
              placeholder="What's on your mind?"
              placeholderTextColor={colors.secondaryText}
              multiline
              value={newPostContent}
              onChangeText={setNewPostContent}
            />
            
            <Text style={[styles.addToPostLabel, { color: colors.text }]}>Add to your post:</Text>
            <View style={styles.mediaOptions}>
              {[
                { icon: 'image-outline', label: 'Photo' },
                { icon: 'stats-chart-outline', label: 'Poll' },
                { icon: 'create-outline', label: 'Text' },
                { icon: 'location-outline', label: 'Location' },
              ].map((option, index) => (
                <TouchableOpacity key={index} style={[styles.mediaOption, { backgroundColor: colors.card }]}>
                  <Ionicons name={option.icon as any} size={20} color={colors.primary} />
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.postSettings}>
              <TouchableOpacity style={[styles.settingButton, { backgroundColor: colors.card }]}>
                <Text style={[styles.settingText, { color: colors.text }]}>Privacy: Public</Text>
                <Ionicons name="chevron-down" size={16} color={colors.text} />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingButton, { backgroundColor: colors.card }]}>
                <Text style={[styles.settingText, { color: colors.text }]}>Topic: General</Text>
                <Ionicons name="chevron-down" size={16} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Chat Screen Modal */}
      <Modal
        visible={showChatScreen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={() => setShowChatScreen(false)}>
              <Ionicons name="chevron-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.chatHeaderInfo}>
              <Text style={[styles.chatUserName, { color: colors.text }]}>Omar</Text>
              <Text style={[styles.chatStatus, { color: colors.success }]}>Online</Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>
          
          <ScrollView style={styles.chatMessages}>
            {[
              { id: 1, time: '10:25 AM', message: 'Hello there!', sent: false },
              { id: 2, time: '10:26 AM', message: 'Hi! How are you?', sent: true },
              { id: 3, time: '10:30 AM', message: 'I wanted to discuss the latest chapter...', sent: false },
              { id: 4, time: '10:32 AM', message: 'Sure, which part specifically?', sent: true },
            ].map((msg) => (
              <View key={msg.id} style={[styles.messageRow, msg.sent && styles.sentMessageRow]}>
                <View style={[
                  styles.messageBubble,
                  { backgroundColor: msg.sent ? colors.primary : colors.card },
                  msg.sent && styles.sentMessageBubble
                ]}>
                  <Text style={[
                    styles.messageText,
                    { color: msg.sent ? '#FFFFFF' : colors.text }
                  ]}>
                    {msg.message}
                  </Text>
                </View>
                <Text style={[styles.messageTimeStamp, { color: colors.secondaryText }]}>
                  {msg.time}
                </Text>
              </View>
            ))}
          </ScrollView>
          
          <View style={[styles.chatInputContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
            <TextInput
              style={[styles.chatInput, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Type a message..."
              placeholderTextColor={colors.secondaryText}
            />
            <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.primary }]}>
              <Ionicons name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomWidth: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabButtonText: {
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  shareButtonText: {
    fontSize: 16,
  },
  shareButtonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 12,
    marginTop: 2,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  postTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  postTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  postImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  imageText: {
    fontSize: 12,
    marginTop: 8,
  },
  hashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 16,
  },
  hashtag: {
    fontSize: 12,
    fontWeight: '600',
  },
  postActions: {
    flexDirection: 'row',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  newButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  newButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  pollCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  pollQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  pollAuthor: {
    fontSize: 12,
    marginBottom: 16,
  },
  pollOptions: {
    gap: 8,
  },
  pollOption: {
    position: 'relative',
  },
  pollOptionBar: {
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  pollOptionFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 16,
  },
  pollOptionText: {
    fontSize: 14,
    position: 'absolute',
    left: 12,
    top: 8,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageUser: {
    fontSize: 16,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 12,
  },
  lastMessage: {
    fontSize: 14,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  postButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  postInput: {
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  addToPostLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  mediaOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  mediaOption: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postSettings: {
    gap: 12,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  settingText: {
    fontSize: 14,
  },
  chatHeaderInfo: {
    alignItems: 'center',
  },
  chatUserName: {
    fontSize: 16,
    fontWeight: '600',
  },
  chatStatus: {
    fontSize: 12,
  },
  headerSpacer: {
    width: 24,
  },
  chatMessages: {
    flex: 1,
    padding: 16,
  },
  messageRow: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  sentMessageRow: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 4,
  },
  sentMessageBubble: {
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
  },
  messageTimeStamp: {
    fontSize: 10,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  chatInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discussionCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  discussionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  discussionPreview: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  discussionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discussionMeta: {
    fontSize: 12,
  },
  discussionStats: {
    fontSize: 12,
  },
  hashtagChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 8,
    marginBottom: 8,
  },
}); 