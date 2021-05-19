import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsParamList } from '~src/types';
import { HomeTab } from './HomeTab.screen';
import { HistoryTab } from './HistoryTab.screen';
import { AnalyticsTab } from './AnalyticsTab.screen';

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <BottomTabs.Screen name="HistoryTab" component={HistoryTab} />
      <BottomTabs.Screen name="AnalyticsTab" component={AnalyticsTab} />
    </BottomTabs.Navigator>
  );
};
