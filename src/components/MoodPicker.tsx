import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MoodOption } from '~src/types';

const moodOptions = [
  { emoji: '🥳', description: 'amazing' },
  { emoji: '😄', description: 'great' },
  { emoji: '🙂', description: 'alright' },
  { emoji: '😢', description: 'sad' },
  { emoji: '😭', description: 'miserable' },
];

export const MoodPicker = () => {
  const [selectedOption, setSelectedOption] = React.useState<MoodOption>();
  console.warn(selectedOption);
  return (
    <View style={styles.emojiList}>
      {moodOptions.map(option => (
        <View>
          <TouchableOpacity
            style={[
              styles.moodItem,
              selectedOption?.emoji === option.emoji ? styles.selected : null,
            ]}
            onPress={() => setSelectedOption(option)}>
            <Text style={styles.emojiText}>{option.emoji}</Text>
          </TouchableOpacity>
          <Text style={styles.descriptionText}>
            {selectedOption?.emoji === option.emoji ? option.description : null}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  emojiText: {
    fontSize: 24,
  },
  emojiList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  moodItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderRadius: 50,
    borderColor: '#8D94BA',
    backgroundColor: '#A0CFD3',
    borderWidth: 2,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#454C73',
  },
});
