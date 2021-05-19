import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MoodOptionWithTimeStamp } from '~src/types';
import format from 'date-fns/format';

type MoodItemRowProps = {
  mood: MoodOptionWithTimeStamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ mood }) => {
  return (
    <View style={styles.moodItem}>
      <View style={styles.iconAndDescription}>
        <Text style={styles.moodValue}>{mood.moodOption.emoji}</Text>
        <Text style={styles.moodDescription}>
          {mood.moodOption.description}
        </Text>
      </View>
      <Text style={styles.dateText} key={mood.timestamp}>
        {format(new Date(mood.timestamp), "d. MMM, yyyy 'at' h:mmaaa")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodValue: {
    fontSize: 40,
    marginRight: 10,
    textAlign: 'center',
  },
  moodDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#454C73',
  },
  dateText: {
    color: '#8D94BA',
    textAlign: 'center',
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
