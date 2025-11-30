import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import boxService from '../../services/box.service';

interface Props {
  navigation: StackNavigationProp<any>;
}

const SUGGESTED_DURATIONS = [15, 25, 30, 45, 60];

const FirstBoxTutorial: React.FC<Props> = ({ navigation }) => {
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1); // 1: task name, 2: duration, 3: confirmation
  const [taskName, setTaskName] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isCreatingBox, setIsCreatingBox] = useState(false);

  const handleNext = async () => {
    if (step === 1) {
      if (!taskName.trim()) {
        Alert.alert('Enter a task', 'What would you like to work on?');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDuration) {
        Alert.alert('Select duration', 'How long would you like to focus?');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Create the box before completing onboarding
      try {
        setIsCreatingBox(true);
        await boxService.createBox({
          taskName: taskName.trim(),
          duration: selectedDuration!,
          scheduledFor: new Date().toISOString(),
        });

        // Mark onboarding as complete
        await completeOnboarding();
        // Navigation to Main will happen automatically via AppNavigator
      } catch (error: any) {
        console.error('Failed to create first box:', error);
        Alert.alert(
          'Oops!',
          'Could not create your first box. Please try again.',
          [{ text: 'OK' }]
        );
      } finally {
        setIsCreatingBox(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
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
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(step / 3) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>Step {step} of 3</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {step === 1 && (
              <>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>📦</Text>
                </View>
                <Text style={styles.title}>Create your first box</Text>
                <Text style={styles.subtitle}>
                  A "box" is a focused work session. What would you like to work
                  on?
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Write blog post"
                  placeholderTextColor={colors.gray500}
                  value={taskName}
                  onChangeText={setTaskName}
                  autoFocus
                  returnKeyType="next"
                  onSubmitEditing={handleNext}
                />
              </>
            )}

            {step === 2 && (
              <>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>⏱️</Text>
                </View>
                <Text style={styles.title}>How long?</Text>
                <Text style={styles.subtitle}>
                  Pick a duration. You can always adjust it later.
                </Text>
                <View style={styles.durationGrid}>
                  {SUGGESTED_DURATIONS.map((duration) => (
                    <TouchableOpacity
                      key={duration}
                      style={[
                        styles.durationButton,
                        selectedDuration === duration &&
                          styles.durationButtonActive,
                      ]}
                      onPress={() => setSelectedDuration(duration)}
                    >
                      <Text
                        style={[
                          styles.durationText,
                          selectedDuration === duration &&
                            styles.durationTextActive,
                        ]}
                      >
                        {duration}
                      </Text>
                      <Text
                        style={[
                          styles.durationLabel,
                          selectedDuration === duration &&
                            styles.durationLabelActive,
                        ]}
                      >
                        min
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {step === 3 && (
              <>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>✅</Text>
                </View>
                <Text style={styles.title}>You're all set!</Text>
                <Text style={styles.subtitle}>
                  Your first box is ready. Tap "Start Focus" to begin your{' '}
                  {selectedDuration}-minute session.
                </Text>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryTask}>{taskName}</Text>
                  <Text style={styles.summaryDuration}>
                    {selectedDuration} minutes
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.footer}>
            {step > 1 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.nextButton, step > 1 && styles.nextButtonExpanded]}
              onPress={handleNext}
              disabled={isCreatingBox}
            >
              {isCreatingBox ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.nextButtonText}>
                  {step === 3 ? 'Start Focus →' : 'Next →'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
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
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  progressContainer: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[6],
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.gray200,
    borderRadius: 2,
    marginBottom: spacing[2],
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.honey,
    borderRadius: 2,
  },
  progressText: {
    ...typography.caption,
    color: colors.gray600,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.honeyCream,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  icon: {
    fontSize: 50,
  },
  title: {
    ...typography.h1,
    color: colors.beeBlack,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.body,
    color: colors.gray700,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing[6],
  },
  input: {
    width: '100%',
    backgroundColor: colors.gray100,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    ...typography.body,
    color: colors.beeBlack,
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[3],
    width: '100%',
  },
  durationButton: {
    width: 90,
    height: 90,
    backgroundColor: colors.gray100,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationButtonActive: {
    backgroundColor: colors.honeyCream,
    borderColor: colors.honey,
  },
  durationText: {
    ...typography.h2,
    color: colors.gray900,
  },
  durationTextActive: {
    color: colors.honeyDeep,
  },
  durationLabel: {
    ...typography.caption,
    color: colors.gray600,
    marginTop: spacing[1],
  },
  durationLabelActive: {
    color: colors.honeyDeep,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: colors.honeyCream,
    borderWidth: 2,
    borderColor: colors.honey,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    alignItems: 'center',
  },
  summaryTask: {
    ...typography.h3,
    color: colors.beeBlack,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  summaryDuration: {
    ...typography.bodyBold,
    color: colors.honeyDeep,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
    gap: spacing[3],
  },
  backButton: {
    flex: 1,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    ...typography.bodyBold,
    color: colors.gray700,
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.honey,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonExpanded: {
    flex: 2,
  },
  nextButtonText: {
    ...typography.bodyBold,
    color: colors.white,
  },
});

export default FirstBoxTutorial;
