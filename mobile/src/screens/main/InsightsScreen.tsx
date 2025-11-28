import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors, typography, spacing } from '../../constants/theme';

const InsightsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>💡 Insights</Text>
        <Text style={styles.description}>
          AI-powered insights coming in Sprint 5-6.
          {'\n\n'}
          Features:
          {'\n'}• Pattern recognition
          {'\n'}• Best focus times
          {'\n'}• Time estimation accuracy
          {'\n'}• Weekly Hive Report
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
    marginBottom: spacing[4],
  },
  description: {
    ...typography.body,
    color: colors.gray600,
    lineHeight: 24,
  },
});

export default InsightsScreen;
