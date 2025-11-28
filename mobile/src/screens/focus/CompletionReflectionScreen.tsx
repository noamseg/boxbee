import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { Box } from '../../types/box.types';
import boxService from '../../services/box.service';

interface Props {
  navigation: StackNavigationProp<any>;
  route: RouteProp<
    { params: { box: Box; actualDuration?: number } },
    'params'
  >;
}

type FocusQuality = 'great' | 'okay' | 'rough';
type CompletionStatus = 'completed' | 'partial' | 'skipped';

const FOCUS_QUALITY_OPTIONS: {
  value: FocusQuality;
  label: string;
  emoji: string;
  description: string;
}[] = [
  {
    value: 'great',
    label: 'Great',
    emoji: '🎯',
    description: 'Stayed focused the whole time',
  },
  {
    value: 'okay',
    label: 'Okay',
    emoji: '👍',
    description: 'A few distractions, but got work done',
  },
  {
    value: 'rough',
    label: 'Rough',
    emoji: '😓',
    description: 'Struggled to stay focused',
  },
];

const COMPLETION_STATUS_OPTIONS: {
  value: CompletionStatus;
  label: string;
  emoji: string;
}[] = [
  { value: 'completed', label: 'Completed', emoji: '✅' },
  { value: 'partial', label: 'Made Progress', emoji: '🔄' },
  { value: 'skipped', label: 'Skipped', emoji: '⏭️' },
];

const CompletionReflectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { box, actualDuration } = route.params;
  const [focusQuality, setFocusQuality] = useState<FocusQuality | null>(null);
  const [completionStatus, setCompletionStatus] =
    useState<CompletionStatus | null>(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (!focusQuality) {
      Alert.alert('Missing field', 'Please rate your focus quality');
      return;
    }

    if (!completionStatus) {
      Alert.alert('Missing field', 'Please select your completion status');
      return;
    }

    setIsLoading(true);

    try {
      await boxService.completeBox(box.id, {
        focusQuality,
        completionStatus,
        notes: notes.trim() || undefined,
        actualDuration,
      });

      // Navigate back to Today screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error: any) {
      console.error('Error completing box:', error);
      Alert.alert(
        'Error',
        error.response?.data?.error?.message || 'Failed to complete box'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>How did it go?</Text>
            <Text style={styles.subtitle}>
              Take a moment to reflect on your session
            </Text>
          </View>

          {/* Task Name */}
          <View style={styles.taskCard}>
            <Text style={styles.taskLabel}>Task</Text>
            <Text style={styles.taskName}>{box.taskName}</Text>
          </View>

          {/* Focus Quality */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Focus Quality</Text>
            <View style={styles.optionsContainer}>
              {FOCUS_QUALITY_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionCard,
                    focusQuality === option.value && styles.optionCardActive,
                  ]}
                  onPress={() => setFocusQuality(option.value)}
                >
                  <Text style={styles.optionEmoji}>{option.emoji}</Text>
                  <Text
                    style={[
                      styles.optionLabel,
                      focusQuality === option.value && styles.optionLabelActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Completion Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Task Status</Text>
            <View style={styles.statusContainer}>
              {COMPLETION_STATUS_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.statusButton,
                    completionStatus === option.value &&
                      styles.statusButtonActive,
                  ]}
                  onPress={() => setCompletionStatus(option.value)}
                >
                  <Text style={styles.statusEmoji}>{option.emoji}</Text>
                  <Text
                    style={[
                      styles.statusLabel,
                      completionStatus === option.value &&
                        styles.statusLabelActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Optional Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Any thoughts or learnings?"
              placeholderTextColor={colors.gray500}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              maxLength={500}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{notes.length}/500</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.buttonDisabled]}
            onPress={handleComplete}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Saving...' : 'Complete & Save'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing[6],
  },
  header: {
    marginBottom: spacing[6],
  },
  title: {
    ...typography.h1,
    color: colors.beeBlack,
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.body,
    color: colors.gray600,
  },
  taskCard: {
    backgroundColor: colors.honeyCream,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[6],
  },
  taskLabel: {
    ...typography.small,
    color: colors.gray700,
    marginBottom: spacing[1],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  taskName: {
    ...typography.h3,
    color: colors.beeBlack,
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...typography.bodyBold,
    color: colors.beeBlack,
    marginBottom: spacing[3],
  },
  optionsContainer: {
    gap: spacing[3],
  },
  optionCard: {
    backgroundColor: colors.gray100,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    alignItems: 'center',
  },
  optionCardActive: {
    backgroundColor: colors.honeyCream,
    borderColor: colors.honey,
  },
  optionEmoji: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  optionLabel: {
    ...typography.bodyBold,
    color: colors.beeBlack,
    marginBottom: spacing[1],
  },
  optionLabelActive: {
    color: colors.honeyDeep,
  },
  optionDescription: {
    ...typography.small,
    color: colors.gray600,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  statusButton: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: colors.honeyCream,
    borderColor: colors.honey,
  },
  statusEmoji: {
    fontSize: 24,
    marginBottom: spacing[2],
  },
  statusLabel: {
    ...typography.body,
    color: colors.beeBlack,
    textAlign: 'center',
  },
  statusLabelActive: {
    ...typography.bodyBold,
    color: colors.honeyDeep,
  },
  notesInput: {
    backgroundColor: colors.gray100,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    ...typography.body,
    color: colors.beeBlack,
    minHeight: 100,
  },
  charCount: {
    ...typography.small,
    color: colors.gray500,
    textAlign: 'right',
    marginTop: spacing[1],
  },
  submitButton: {
    backgroundColor: colors.honey,
    paddingVertical: spacing[4],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginTop: spacing[4],
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    ...typography.bodyBold,
    color: colors.white,
  },
});

export default CompletionReflectionScreen;
