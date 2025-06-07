import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopBar from '@/components/TopBar/TopBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <TopBar />
      <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].icon,
        tabBarActiveBackgroundColor: Colors['light'].backgroundSecondary,
        tabBarInactiveBackgroundColor: Colors['light'].background,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color }) =>  <Icon name="weight-lifter" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <Icon name="chart-line" size={24} color={color} />,
        }}
      />
    </Tabs>
    </View>
  );
}
