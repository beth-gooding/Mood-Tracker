import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MoodPicker } from '~src/components/MoodPicker';
import { MoodOptionWithTimeStamp, MoodOption } from '~src/types';

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
        <Text key={mood.timestamp}>
          {mood.moodOption.emoji} {new Date(mood.timestamp).toString()}
        </Text>
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
