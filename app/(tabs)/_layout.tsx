import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';


import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  function TabIcon({ focused, children }: { focused: boolean; children: React.ReactNode }) {
    return (
      <View
        style={{
          width: 78,
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',

          //only having top rounded corners
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          overflow: 'visible', // important
  
          backgroundColor: focused ? '#4CB2D5' : 'transparent',
  
          shadowColor: focused ? '#4CB2D5' : 'transparent',
          shadowOpacity: focused ? 0.8 : 0,
          shadowRadius: focused ? 10 : 0,
          shadowOffset: { width: 0, height: 0 },
        }}
      >
        {children}
      </View>
    );
  }
  
  

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#020817',
          height: 70,              // a bit taller
          paddingBottom: 10,
          paddingTop: 10,
          paddingLeft: 5,
          paddingRight: 5,
          borderTopWidth: 0,
        },
      tabBarItemStyle: {
        borderRadius: 16,
        overflow: 'visible',     // important
      },
      tabBarActiveTintColor: '#ffffff',
      headerShown: false,
      tabBarButton: HapticTab,
      }}
      >

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
       <Tabs.Screen
        name="community/index"
        options={{
          title: "community",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused}>
              <Ionicons name="people-outline" color={color} size={size} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="features/index"
        options={{
          title: "features",
          tabBarIcon: ({focused, color, size }) => (
            <TabIcon focused={focused}>
            <Ionicons name="book-outline" color={color} size={size} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="map/index"
        options={{
          title: "map",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused}>
              <Ionicons name="compass" color={color} size={size} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="alerts/index"
        options={{
          title: "alert",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused}>
              <Ionicons name="notifications-outline" color={color} size={size} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="add_friends/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="features/checkin"
        options={{
          href: null,
        }}
      />
       <Tabs.Screen
        name="user/index"
        options={{
          title: "user",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused}>
              <Ionicons name="person" color={color} size={size} />
            </TabIcon>
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
