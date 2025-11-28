import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

interface Props {
  navigation: StackNavigationProp<any>;
}

const PermissionsScreen: React.FC<Props> = ({ navigation }) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleEnableNotifications = async () => {
    setIsRequesting(true);
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus === 'granted') {
        // Navigate to first box tutorial
        navigation.navigate('FirstBoxTutorial');
      } else {
        Alert.alert(
          'Notifications Disabled',
          'You can enable notifications later in Settings.',
          [
            {
              text: 'Continue',
              onPress: () => navigation.navigate('FirstBoxTutorial'),
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleMaybeLater = () => {
    navigation.navigate('FirstBoxTutorial');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔔</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Stay in the flow</Text>

        {/* Description */}
        <Text style={styles.description}>
          Enable notifications to get helpful reminders and stay focused on your work.
        </Text>

        {/* Benefits List */}
        <View style={styles.benefitsList}>
          <BenefitItem
            emoji="⏰"
            text="5-minute warning before your box ends"
          />
          <BenefitItem
            emoji="✅"
            text="Gentle nudge when it's time to reflect"
          />
          <BenefitItem
            emoji="🎯"
            text="Daily reminder to plan your boxes"
          />
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleEnableNotifications}
          disabled={isRequesting}
        >
          <Text style={styles.primaryButtonText}>
            {isRequesting ? 'Requesting...' : 'Enable Notifications'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleMaybeLater}
          disabled={isRequesting}
        >
          <Text style={styles.secondaryButtonText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

interface BenefitItemProps {
  emoji: string;
  text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ emoji, text }) => (
  <View style={styles.benefitItem}>
    <Text style={styles.benefitEmoji}>{emoji}</Text>
    <Text style={styles.benefitText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[16],
    alignItems: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    backgroundColor: colors.honeyCream,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  icon: {
    fontSize: 60,
  },
  title: {
    ...typography.h1,
    color: colors.beeBlack,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  description: {
    ...typography.body,
    color: colors.gray700,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing[8],
  },
  benefitsList: {
    width: '100%',
    gap: spacing[4],
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    padding: spacing[4],
    borderRadius: borderRadius.md,
  },
  benefitEmoji: {
    fontSize: 24,
    marginRight: spacing[3],
  },
  benefitText: {
    ...typography.body,
    color: colors.gray900,
    flex: 1,
  },
  footer: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
    gap: spacing[3],
  },
  primaryButton: {
    backgroundColor: colors.honey,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.bodyBold,
    color: colors.white,
  },
  secondaryButton: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.body,
    color: colors.gray600,
  },
});

export default PermissionsScreen;
