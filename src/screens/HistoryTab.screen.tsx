import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '~src/App.provider';
import { MoodItemRow } from '~src/components/MoodItemRow';

export const HistoryTab: React.FC = () => {
  const { moodList } = useAppContext();
  return (
    <ScrollView style={styles.container}>
      {moodList.map(mood => (
        <MoodItemRow mood={mood} key={mood.timestamp} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
