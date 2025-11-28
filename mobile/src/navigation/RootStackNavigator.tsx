import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import FocusModeScreen from '../screens/focus/FocusModeScreen';
import CompletionReflectionScreen from '../screens/focus/CompletionReflectionScreen';
import { Box } from '../types/box.types';

export type RootStackParamList = {
  MainTabs: undefined;
  FocusMode: { box: Box };
  CompletionReflection: { box: Box; actualDuration?: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="MainTabs" component={MainNavigator} />
      <Stack.Screen
        name="FocusMode"
        component={FocusModeScreen}
        options={{
          gestureEnabled: false, // Prevent swipe to dismiss during focus
        }}
      />
      <Stack.Screen
        name="CompletionReflection"
        component={CompletionReflectionScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
