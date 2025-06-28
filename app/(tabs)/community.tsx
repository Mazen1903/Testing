import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

const posts = [
  {
    id: '1',
    user: 'Mazen',
    avatar: 'person-circle-outline' as const,
    timeAgo: '2h ago',
    content: 'The Mind section is amazing! Learning so much about self-discipline and productive habits 🧠',
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    user: 'Omar',
    avatar: 'person-circle-outline' as const,
    timeAgo: '4h ago',
    content: "Started the Health section - the chapter on physical fitness and daily routines is exactly what I needed! 💪",
    likes: 18,
    comments: 5,
  },
  {
    id: '3',
    user: 'Albara',
    avatar: 'person-circle-outline' as const,
    timeAgo: '6h ago',
    content: "The Soul section is life-changing. Finding purpose through faith and strengthening connection with Allah 🤲",
    likes: 32,
    comments: 12,
  },
];

export default function CommunityScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [activeTab, setActiveTab] = useState('Recent');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Community Stats */}
        <Animated.View entering={FadeInDown.delay(100)} style={[
          styles.statsContainer, 
          { backgroundColor: colors.card },
          !isDark && {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
          }
        ]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>2.4k</Text>
            <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Members</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>847</Text>
            <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Posts</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>156</Text>
            <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Active Now</Text>
          </View>
        </Animated.View>

        {/* Create Post Button */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.createPostContainer}>
          <TouchableOpacity style={[styles.createPostButton, { backgroundColor: colors.primary }]}>
            <Ionicons name="create-outline" size={24} color="#FFFFFF" />
            <Text style={styles.createPostText}>Share your thoughts</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Feed Tabs */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.tabsContainer}>
          {['Recent', 'Popular', 'Following'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab, 
                { backgroundColor: colors.card },
                activeTab === tab && [styles.activeTab, { backgroundColor: colors.primary }]
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text 
                style={[
                  styles.tabText, 
                  { color: colors.secondaryText },
                  activeTab === tab && styles.activeTabText
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Posts Feed */}
        <View style={styles.feed}>
          {posts.map((post, index) => (
            <Animated.View
              key={post.id}
              entering={FadeInDown.delay(400 + index * 100)}
              style={[
                styles.postCard, 
                { backgroundColor: colors.card },
                !isDark && {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }
              ]}
            >
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <Ionicons name={post.avatar} size={40} color={colors.text} />
                  <View style={styles.userMeta}>
                    <Text style={[styles.userName, { color: colors.text }]}>{post.user}</Text>
                    <Text style={[styles.timeAgo, { color: colors.secondaryText }]}>{post.timeAgo}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={24} color={colors.secondaryText} />
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.postContent, { color: colors.text }]}>{post.content}</Text>
              
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={24} color={colors.text} />
                  <Text style={[styles.actionText, { color: colors.text }]}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={24} color={colors.text} />
                  <Text style={[styles.actionText, { color: colors.text }]}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={[
        styles.fab, 
        { backgroundColor: colors.primary },
        !isDark && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }
      ]}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 20,
    borderRadius: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  createPostContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  createPostText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
  },
  tabText: {
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  feed: {
    padding: 20,
    gap: 16,
  },
  postCard: {
    padding: 16,
    borderRadius: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userMeta: {
    gap: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 