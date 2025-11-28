import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Welcome'
>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Bee Illustration Placeholder */}
        <View style={styles.beeContainer}>
          <View style={styles.beePlaceholder}>
            <Text style={styles.beeEmoji}>🐝</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>BoxBee</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Time-box your day,{'\n'}accomplish more
        </Text>
      </View>

      {/* Bottom Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.primaryButtonText}>Get Started →</Text>
        </TouchableOpacity>

        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>Already a bee?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
  },
  beeContainer: {
    marginBottom: spacing[6],
  },
  beePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: colors.honeyCream,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  beeEmoji: {
    fontSize: 60,
  },
  title: {
    ...typography.display,
    color: colors.beeBlack,
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.h2,
    color: colors.gray700,
    textAlign: 'center',
    fontWeight: '400',
  },
  actions: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  primaryButton: {
    backgroundColor: colors.honey,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  primaryButtonText: {
    ...typography.bodyBold,
    color: colors.white,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[1],
  },
  loginPromptText: {
    ...typography.body,
    color: colors.gray600,
  },
  loginLink: {
    ...typography.bodyBold,
    color: colors.honeyDeep,
  },
});

export default WelcomeScreen;
