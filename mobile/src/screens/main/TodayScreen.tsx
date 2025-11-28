import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors, typography, spacing } from '../../constants/theme';

const TodayScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🐝 Today View</Text>
        <Text style={styles.subtitle}>
          Welcome back, {user?.name || user?.email}!
        </Text>
        <Text style={styles.description}>
          This is your command center for focused work.
          {'\n\n'}
          Coming soon:
          {'\n'}• Active box display
          {'\n'}• Scheduled boxes
          {'\n'}• Weekly progress
          {'\n'}• Create new box button
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: spacing[4],
  },
  title: {
    ...typography.h1,
    color: colors.beeBlack,
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.body,
    color: colors.gray700,
    marginBottom: spacing[4],
  },
  description: {
    ...typography.body,
    color: colors.gray600,
    lineHeight: 24,
  },
});

export default TodayScreen;
