import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import RootStackNavigator from './RootStackNavigator';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const auth = useAuth();

  // Explicitly convert to booleans to avoid JSI type errors
  const isLoading = Boolean(auth.isLoading);
  const isAuthenticated = Boolean(auth.isAuthenticated);
  const hasCompletedOnboarding = Boolean(auth.hasCompletedOnboarding);

  if (isLoading === true) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.honey} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated === false ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : hasCompletedOnboarding === false ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <Stack.Screen name="Main" component={RootStackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default AppNavigator;
