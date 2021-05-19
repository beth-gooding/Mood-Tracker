import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodPicker } from '~src/components/MoodPicker';
import { MoodOptionWithTimeStamp, MoodOption } from '~src/types';
import { MoodItemRow } from '~src/components/MoodItemRow';

export const HomeTab = () => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimeStamp[]>([]);

  const handleAddMood = React.useCallback((newMood: MoodOption) => {
    setMoodList(current => {
      return [...current, { moodOption: newMood, timestamp: Date.now() }];
    });
  }, []);
  return (
    <View style={styles.container}>
      <MoodPicker onAddMood={handleAddMood} />
      {moodList.map(mood => (
        <MoodItemRow mood={mood} key={mood.timestamp} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
