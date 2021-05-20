import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsParamList } from '~src/types';
import { HomeTab } from './HomeTab.screen';
import { HistoryTab } from './HistoryTab.screen';
import { AnalyticsTab } from './AnalyticsTab.screen';
import { HomeIcon } from '~src/components/Home.icon';
import { ListIcon } from '~src/components/List.Icon';
import { AnalyticsIcon } from '~src/components/Analytics.icon';

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarActiveTintColor: '#1D84B5',
          tabBarInactiveTintColor: '#8E9AAF',
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => {
            if (route.name === 'HomeTab') {
              return <HomeIcon size={size} color={color} />;
            }
            if (route.name === 'HistoryTab') {
              return <ListIcon size={size} color={color} />;
            }
            if (route.name === 'AnalyticsTab') {
              return <AnalyticsIcon size={size} color={color} />;
            }

            return null;
          },
        };
      }}>
      <BottomTabs.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="HistoryTab"
        component={HistoryTab}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="AnalyticsTab"
        component={AnalyticsTab}
        options={{ title: 'Analytics' }}
      />
    </BottomTabs.Navigator>
  );
};
