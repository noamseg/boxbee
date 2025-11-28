import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import insightsService from '../../services/insights.service';
import { WeeklyStats } from '../../types/insights.types';

const InsightsScreen: React.FC = () => {
  const [stats, setStats] = useState<WeeklyStats | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async (showLoader = true) => {
    if (showLoader) setIsLoading(true);

    try {
      const [weeklyStats, aiInsights] = await Promise.all([
        insightsService.getWeeklyStats(),
        insightsService.getAIInsights(),
      ]);

      setStats(weeklyStats);
      setInsights(aiInsights);
    } catch (error: any) {
      console.error('Error loading insights:', error);
      Alert.alert('Error', 'Failed to load insights');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData(false);
  };

  const getQualityColor = (quality: number): string => {
    if (quality >= 80) return colors.honey;
    if (quality >= 50) return colors.honeyLight;
    return colors.gray500;
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.honey} />
          <Text style={styles.loadingText}>Analyzing your data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!stats) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📊</Text>
          <Text style={styles.emptyTitle}>No data yet</Text>
          <Text style={styles.emptyText}>
            Complete a few boxes to see your insights!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.honey}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Week</Text>
          <Text style={styles.subtitle}>
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })} - Last 7 days
          </Text>
        </View>

        {/* Streak Badge */}
        {stats.streakDays > 0 && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>
              {stats.streakDays} day{stats.streakDays !== 1 ? 's' : ''} streak!
            </Text>
          </View>
        )}

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{stats.completedBoxes}</Text>
            <Text style={styles.metricLabel}>Boxes Completed</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{formatTime(stats.totalFocusTime)}</Text>
            <Text style={styles.metricLabel}>Focus Time</Text>
          </View>
          <View style={styles.metricCard}>
            <Text
              style={[
                styles.metricValue,
                { color: getQualityColor(stats.averageFocusQuality) },
              ]}
            >
              {stats.averageFocusQuality}%
            </Text>
            <Text style={styles.metricLabel}>Avg Quality</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{stats.completionRate}%</Text>
            <Text style={styles.metricLabel}>Completion Rate</Text>
          </View>
        </View>

        {/* Patterns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Your Patterns</Text>
          <View style={styles.patternCard}>
            <View style={styles.patternRow}>
              <Text style={styles.patternLabel}>Most productive day</Text>
              <Text style={styles.patternValue}>{stats.mostProductiveDay}</Text>
            </View>
            <View style={styles.patternRow}>
              <Text style={styles.patternLabel}>Best time to focus</Text>
              <Text style={styles.patternValue}>
                {stats.mostProductiveTime.charAt(0).toUpperCase() +
                  stats.mostProductiveTime.slice(1)}
              </Text>
            </View>
            {stats.topCategory && (
              <View style={styles.patternRow}>
                <Text style={styles.patternLabel}>Top category</Text>
                <Text style={styles.patternValue}>{stats.topCategory}</Text>
              </View>
            )}
          </View>
        </View>

        {/* AI Insights */}
        {insights.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ AI Insights</Text>
            {insights.map((insight, index) => (
              <View key={index} style={styles.insightCard}>
                <View style={styles.insightBullet} />
                <Text style={styles.insightText}>{insight}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.gray600,
    marginTop: spacing[4],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.beeBlack,
    marginBottom: spacing[2],
  },
  emptyText: {
    ...typography.body,
    color: colors.gray600,
    textAlign: 'center',
  },
  scrollContent: {
    padding: spacing[4],
  },
  header: {
    marginBottom: spacing[4],
  },
  title: {
    ...typography.h1,
    color: colors.beeBlack,
    marginBottom: spacing[1],
  },
  subtitle: {
    ...typography.body,
    color: colors.gray600,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.honeyCream,
    borderWidth: 2,
    borderColor: colors.honey,
    borderRadius: borderRadius.lg,
    padding: spacing[3],
    marginBottom: spacing[4],
  },
  streakEmoji: {
    fontSize: 24,
    marginRight: spacing[2],
  },
  streakText: {
    ...typography.bodyBold,
    color: colors.honeyDeep,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    alignItems: 'center',
  },
  metricValue: {
    ...typography.h2,
    color: colors.beeBlack,
    marginBottom: spacing[1],
  },
  metricLabel: {
    ...typography.small,
    color: colors.gray600,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.beeBlack,
    marginBottom: spacing[3],
  },
  patternCard: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
  },
  patternRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  patternLabel: {
    ...typography.body,
    color: colors.gray700,
  },
  patternValue: {
    ...typography.bodyBold,
    color: colors.beeBlack,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: colors.honeyCream,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.honey,
    marginTop: spacing[2],
    marginRight: spacing[3],
  },
  insightText: {
    ...typography.body,
    color: colors.gray900,
    flex: 1,
    lineHeight: 22,
  },
});

export default InsightsScreen;
