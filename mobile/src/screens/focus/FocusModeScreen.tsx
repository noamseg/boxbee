import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  AppState,
  AppStateStatus,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { Box } from '../../types/box.types';
import boxService from '../../services/box.service';

interface Props {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{ params: { box: Box } }, 'params'>;
}

type TimerState = 'idle' | 'running' | 'paused' | 'completed';

const FocusModeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { box } = route.params;
  const [timeRemaining, setTimeRemaining] = useState(box.duration * 60); // Convert to seconds
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [hasWarned, setHasWarned] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Handle app state changes (background/foreground)
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // 5-minute warning
    if (timeRemaining === 300 && timerState === 'running' && !hasWarned) {
      setHasWarned(true);
      // TODO: Show notification or alert
      Alert.alert('5 minutes left', 'Your box is almost complete!');
    }

    // Timer completed
    if (timeRemaining <= 0 && timerState === 'running') {
      handleTimerComplete();
    }
  }, [timeRemaining, timerState]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    // Pause timer when app goes to background
    if (
      appState.current.match(/active/) &&
      nextAppState.match(/inactive|background/)
    ) {
      if (timerState === 'running') {
        pauseTimer();
      }
    }
    appState.current = nextAppState;
  };

  const startTimer = () => {
    setTimerState('running');
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setTimerState('paused');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resumeTimer = () => {
    startTimer();
  };

  const handleTimerComplete = () => {
    setTimerState('completed');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Navigate to completion reflection
    navigation.navigate('CompletionReflection', { box });
  };

  const handleEndEarly = () => {
    Alert.alert(
      'End session early?',
      'Are you sure you want to end this focus session?',
      [
        {
          text: 'Keep Going',
          style: 'cancel',
        },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: () => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            const actualDuration = Math.round((box.duration * 60 - timeRemaining) / 60);
            navigation.navigate('CompletionReflection', {
              box,
              actualDuration,
            });
          },
        },
      ]
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    const totalSeconds = box.duration * 60;
    return ((totalSeconds - timeRemaining) / totalSeconds) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleEndEarly} style={styles.endButton}>
            <Text style={styles.endButtonText}>End Session</Text>
          </TouchableOpacity>
        </View>

        {/* Task Name */}
        <View style={styles.taskContainer}>
          <Text style={styles.taskName}>{box.taskName}</Text>
        </View>

        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            {/* Progress Ring */}
            <View style={styles.progressRing}>
              <View
                style={[
                  styles.progressFill,
                  {
                    transform: [
                      { rotate: `${(getProgressPercentage() * 360) / 100}deg` },
                    ],
                  },
                ]}
              />
            </View>

            {/* Time Display */}
            <View style={styles.timeDisplay}>
              <Text style={styles.timeText}>{formatTime(timeRemaining)}</Text>
              <Text style={styles.durationText}>
                of {box.duration} min
              </Text>
            </View>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {timerState === 'idle' && (
            <TouchableOpacity style={styles.startButton} onPress={startTimer}>
              <Text style={styles.startButtonText}>Start Focus</Text>
            </TouchableOpacity>
          )}

          {timerState === 'running' && (
            <TouchableOpacity style={styles.pauseButton} onPress={pauseTimer}>
              <Text style={styles.pauseButtonText}>⏸</Text>
            </TouchableOpacity>
          )}

          {timerState === 'paused' && (
            <TouchableOpacity style={styles.resumeButton} onPress={resumeTimer}>
              <Text style={styles.resumeButtonText}>▶</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Motivational Message */}
        <View style={styles.messageContainer}>
          {timerState === 'idle' && (
            <Text style={styles.message}>
              Take a deep breath. When you're ready, start your focus session.
            </Text>
          )}
          {timerState === 'running' && (
            <Text style={styles.message}>
              You're doing great. Stay focused on your task.
            </Text>
          )}
          {timerState === 'paused' && (
            <Text style={styles.message}>
              Take a moment to breathe. Resume when ready.
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.honeyCream,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[4],
  },
  header: {
    paddingTop: spacing[2],
    alignItems: 'flex-end',
  },
  endButton: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },
  endButtonText: {
    ...typography.body,
    color: colors.gray600,
  },
  taskContainer: {
    paddingTop: spacing[8],
    paddingBottom: spacing[6],
    alignItems: 'center',
  },
  taskName: {
    ...typography.h2,
    color: colors.beeBlack,
    textAlign: 'center',
    paddingHorizontal: spacing[6],
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressRing: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: colors.honey,
    transformOrigin: 'right center',
  },
  timeDisplay: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 72,
    lineHeight: 80,
    fontWeight: '400',
    fontFamily: 'monospace', // Will use JetBrains Mono when custom fonts are loaded
    color: colors.beeBlack,
    marginBottom: spacing[2],
  },
  durationText: {
    ...typography.body,
    color: colors.gray600,
  },
  controls: {
    paddingVertical: spacing[8],
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: colors.honey,
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[12],
    borderRadius: borderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    ...typography.h3,
    color: colors.white,
  },
  pauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.honey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButtonText: {
    fontSize: 32,
    color: colors.honey,
  },
  resumeButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.honey,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  resumeButtonText: {
    fontSize: 32,
    color: colors.white,
    marginLeft: spacing[1], // Offset play icon
  },
  messageContainer: {
    paddingBottom: spacing[8],
    alignItems: 'center',
  },
  message: {
    ...typography.body,
    color: colors.gray700,
    textAlign: 'center',
    paddingHorizontal: spacing[8],
    lineHeight: 24,
  },
});

export default FocusModeScreen;
