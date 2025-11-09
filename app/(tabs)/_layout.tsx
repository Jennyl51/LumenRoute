import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
       <Tabs.Screen
        name="community/index"
        options={{
          title: "Community",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="features/index"
        options={{
          title: "features",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="map/index"
        options={{
          title: "map",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts/index"
        options={{
          title: "alert",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
        }}
      />
       <Tabs.Screen
        name="user/index"
        options={{
          title: "user",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
