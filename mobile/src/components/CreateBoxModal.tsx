import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/theme';
import boxService from '../services/box.service';
import aiService from '../services/ai.service';

interface Props {
  visible: boolean;
  onClose: () => void;
  onBoxCreated?: () => void;
}

const SUGGESTED_DURATIONS = [15, 25, 30, 45, 60];

const CreateBoxModal: React.FC<Props> = ({ visible, onClose, onBoxCreated }) => {
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{
    duration: number;
    confidence: string;
    reasoning: string;
  } | null>(null);

  const handleClose = () => {
    setTaskName('');
    setDuration(null);
    setAiSuggestion(null);
    onClose();
  };

  const handleGetAISuggestion = async () => {
    if (!taskName.trim()) {
      Alert.alert('Enter a task', 'Please enter a task name first');
      return;
    }

    setIsEstimating(true);
    try {
      const estimation = await aiService.estimateDuration(taskName.trim());
      setAiSuggestion({
        duration: estimation.estimatedDuration,
        confidence: estimation.confidence,
        reasoning: estimation.reasoning,
      });
      setDuration(estimation.estimatedDuration);
    } catch (error: any) {
      console.error('Error getting AI suggestion:', error);
      // Silently fail - AI is optional
      Alert.alert(
        'AI unavailable',
        'Could not get AI suggestion. Please select duration manually.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsEstimating(false);
    }
  };

  const handleCreate = async () => {
    if (!taskName.trim()) {
      Alert.alert('Missing field', 'Please enter a task name');
      return;
    }

    if (!duration) {
      Alert.alert('Missing field', 'Please select a duration');
      return;
    }

    setIsLoading(true);

    try {
      await boxService.createBox({
        taskName: taskName.trim(),
        duration,
        aiSuggested: false,
        aiEstimated: aiSuggestion !== null,
      });

      handleClose();
      onBoxCreated?.();
    } catch (error: any) {
      console.error('Error creating box:', error);
      Alert.alert(
        'Error',
        error.response?.data?.error?.message || 'Failed to create box'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View style={styles.modalContent}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create a Box</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Task Name Input */}
            <View style={styles.section}>
              <Text style={styles.label}>What are you working on?</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Write blog post"
                placeholderTextColor={colors.gray500}
                value={taskName}
                onChangeText={setTaskName}
                autoFocus
                maxLength={200}
              />
            </View>

            {/* Duration Selection */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.label}>How long? (minutes)</Text>
                <TouchableOpacity
                  style={styles.aiButton}
                  onPress={handleGetAISuggestion}
                  disabled={isEstimating || !taskName.trim()}
                >
                  {isEstimating ? (
                    <ActivityIndicator size="small" color={colors.honey} />
                  ) : (
                    <Text style={styles.aiButtonText}>✨ AI Suggest</Text>
                  )}
                </TouchableOpacity>
              </View>

              {aiSuggestion && (
                <View style={styles.aiSuggestionCard}>
                  <Text style={styles.aiSuggestionTitle}>
                    AI suggests {aiSuggestion.duration} min
                  </Text>
                  <Text style={styles.aiSuggestionReason}>
                    {aiSuggestion.reasoning}
                  </Text>
                </View>
              )}

              <View style={styles.durationGrid}>
                {SUGGESTED_DURATIONS.map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.durationButton,
                      duration === d && styles.durationButtonActive,
                    ]}
                    onPress={() => setDuration(d)}
                  >
                    <Text
                      style={[
                        styles.durationText,
                        duration === d && styles.durationTextActive,
                      ]}
                    >
                      {d}
                    </Text>
                    <Text
                      style={[
                        styles.durationLabel,
                        duration === d && styles.durationLabelActive,
                      ]}
                    >
                      min
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.createButton,
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={handleCreate}
                disabled={isLoading}
              >
                <Text style={styles.createButtonText}>
                  {isLoading ? 'Creating...' : 'Create Box'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContent: {
    padding: spacing[6],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  title: {
    ...typography.h2,
    color: colors.beeBlack,
  },
  closeButton: {
    padding: spacing[2],
  },
  closeButtonText: {
    ...typography.h3,
    color: colors.gray600,
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  label: {
    ...typography.bodyBold,
    color: colors.beeBlack,
  },
  aiButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    backgroundColor: colors.honeyCream,
    borderWidth: 1,
    borderColor: colors.honey,
  },
  aiButtonText: {
    ...typography.small,
    color: colors.honeyDeep,
    fontWeight: '600',
  },
  aiSuggestionCard: {
    backgroundColor: colors.honeyCream,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginBottom: spacing[3],
    borderWidth: 1,
    borderColor: colors.honey,
  },
  aiSuggestionTitle: {
    ...typography.bodyBold,
    color: colors.honeyDeep,
    marginBottom: spacing[1],
  },
  aiSuggestionReason: {
    ...typography.small,
    color: colors.gray700,
    fontStyle: 'italic',
  },
  input: {
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
    gap: spacing[3],
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
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing[3],
    marginTop: spacing[4],
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing[4],
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.gray300,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...typography.bodyBold,
    color: colors.gray700,
  },
  createButton: {
    flex: 2,
    backgroundColor: colors.honey,
    paddingVertical: spacing[4],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    ...typography.bodyBold,
    color: colors.white,
  },
});

export default CreateBoxModal;
