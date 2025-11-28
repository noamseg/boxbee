import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

const SettingsScreen: React.FC = () => {
  const { user, logout } = useAuth();

  // Notification settings
  const [notifyFiveMin, setNotifyFiveMin] = useState(true);
  const [notifyCompletion, setNotifyCompletion] = useState(true);
  const [notifyCoaching, setNotifyCoaching] = useState(false);
  const [notifyWeekly, setNotifyWeekly] = useState(true);

  // AI settings
  const [aiLearning, setAiLearning] = useState(true);
  const [aiAutoAdjust, setAiAutoAdjust] = useState(false);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => await logout(),
      },
    ]);
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your boxes and insights. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement data clearing
            Alert.alert('Not Implemented', 'This feature is coming soon!');
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About BoxBee',
      'BoxBee is an AI-native time-boxing productivity app.\n\nVersion 1.0.0\nBuilt with React Native & OpenAI\n\n© 2024 BoxBee',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.[0]?.toUpperCase() || user?.email[0]?.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'BoxBee User'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {user?.emailVerified ? (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ Verified</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => Alert.alert('Verification', 'Email verification coming soon!')}
            >
              <Text style={styles.verifyButtonText}>Verify Email</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>5-minute warning</Text>
              <Text style={styles.settingDescription}>
                Get notified 5 minutes before box ends
              </Text>
            </View>
            <Switch
              value={notifyFiveMin}
              onValueChange={setNotifyFiveMin}
              trackColor={{ false: colors.gray300, true: colors.honeyCream }}
              thumbColor={notifyFiveMin ? colors.honey : colors.gray500}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Completion alerts</Text>
              <Text style={styles.settingDescription}>
                Notify when it's time to reflect
              </Text>
            </View>
            <Switch
              value={notifyCompletion}
              onValueChange={setNotifyCompletion}
              trackColor={{ false: colors.gray300, true: colors.honeyCream }}
              thumbColor={notifyCompletion ? colors.honey : colors.gray500}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>AI coaching tips</Text>
              <Text style={styles.settingDescription}>
                Periodic productivity insights
              </Text>
            </View>
            <Switch
              value={notifyCoaching}
              onValueChange={setNotifyCoaching}
              trackColor={{ false: colors.gray300, true: colors.honeyCream }}
              thumbColor={notifyCoaching ? colors.honey : colors.gray500}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Weekly report</Text>
              <Text style={styles.settingDescription}>
                Monday at 9:00 AM
              </Text>
            </View>
            <Switch
              value={notifyWeekly}
              onValueChange={setNotifyWeekly}
              trackColor={{ false: colors.gray300, true: colors.honeyCream }}
              thumbColor={notifyWeekly ? colors.honey : colors.gray500}
            />
          </View>
        </View>

        {/* AI Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ AI Assistant</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>AI learning</Text>
              <Text style={styles.settingDescription}>
                Improve suggestions based on your habits
              </Text>
            </View>
            <Switch
              value={aiLearning}
              onValueChange={setAiLearning}
              trackColor={{ false: colors.gray300, true: colors.honeyCream }}
              thumbColor={aiLearning ? colors.honey : colors.gray500}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto-adjust times</Text>
              <Text style={styles.settingDescription}>
                Let AI update durations based on history
              </Text>
            </View>
            <Switch
              value={aiAutoAdjust}
              onValueChange={setAiAutoAdjust}
              trackColor={{ false: colors.gray300, true: colors.honeyCream }}
              thumbColor={aiAutoAdjust ? colors.honey : colors.gray500}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Coach personality</Text>
            <Text style={styles.settingValue}>Friendly</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Coaching frequency</Text>
            <Text style={styles.settingValue}>Often</Text>
          </TouchableOpacity>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ App</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Theme</Text>
            <Text style={styles.settingValue}>Light</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleAbout}
          >
            <Text style={styles.settingLabel}>About BoxBee</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Help & Support</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Account</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleClearData}
          >
            <Text style={[styles.settingLabel, { color: colors.warningOrange }]}>
              Clear all data
            </Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleLogout}
          >
            <Text style={[styles.settingLabel, { color: colors.errorRed }]}>
              Sign out
            </Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <Text style={styles.version}>
          BoxBee v1.0.0 • Made with 🐝 and AI
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    padding: spacing[4],
    paddingBottom: spacing[12],
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: spacing[6],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    marginBottom: spacing[6],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.honeyCream,
    borderWidth: 3,
    borderColor: colors.honey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  avatarText: {
    ...typography.h1,
    color: colors.honeyDeep,
  },
  userName: {
    ...typography.h2,
    color: colors.beeBlack,
    marginBottom: spacing[1],
  },
  userEmail: {
    ...typography.body,
    color: colors.gray600,
    marginBottom: spacing[2],
  },
  verifiedBadge: {
    backgroundColor: colors.successGreen,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
  },
  verifiedText: {
    ...typography.small,
    color: colors.white,
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: colors.honeyCream,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.honey,
  },
  verifyButtonText: {
    ...typography.body,
    color: colors.honeyDeep,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing[8],
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.beeBlack,
    marginBottom: spacing[4],
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing[3],
  },
  settingLabel: {
    ...typography.body,
    color: colors.beeBlack,
    marginBottom: spacing[1],
  },
  settingDescription: {
    ...typography.small,
    color: colors.gray600,
    lineHeight: 18,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  settingValue: {
    ...typography.body,
    color: colors.gray600,
  },
  settingArrow: {
    ...typography.body,
    color: colors.gray600,
  },
  version: {
    ...typography.small,
    color: colors.gray500,
    textAlign: 'center',
    marginTop: spacing[6],
  },
});

export default SettingsScreen;
