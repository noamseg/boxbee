import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingSlider from '../screens/onboarding/OnboardingSlider';
import PermissionsScreen from '../screens/onboarding/PermissionsScreen';
import FirstBoxTutorial from '../screens/onboarding/FirstBoxTutorial';

export type OnboardingStackParamList = {
  OnboardingSlider: undefined;
  Permissions: undefined;
  FirstBoxTutorial: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="OnboardingSlider" component={OnboardingSlider} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
      <Stack.Screen name="FirstBoxTutorial" component={FirstBoxTutorial} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
