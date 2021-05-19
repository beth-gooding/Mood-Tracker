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

type MoodPickerProps = {
  onAddMood: (newMood: MoodOption) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ onAddMood }) => {
  const [selectedOption, setSelectedOption] = React.useState<MoodOption>();
  const [hasAdded, setHasAdded] = React.useState(false);

  const handleAddMood = React.useCallback(() => {
    if (selectedOption) {
      onAddMood(selectedOption);
      setHasAdded(true);
      setSelectedOption(undefined);
    }
  }, [selectedOption, onAddMood]);

  if (hasAdded) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Thank you!</Text>
        <View style={styles.emojiList} />
        <TouchableOpacity
          style={styles.chooseBtn}
          onPress={() => setHasAdded(false)}>
          <Text style={styles.btnText}>Add another</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>How are you right now?</Text>
      <View style={styles.emojiList}>
        {moodOptions.map(option => (
          <View key={option.description}>
            <TouchableOpacity
              style={[
                styles.moodItem,
                selectedOption?.emoji === option.emoji ? styles.selected : null,
              ]}
              onPress={() => setSelectedOption(option)}>
              <Text style={styles.emojiText}>{option.emoji}</Text>
            </TouchableOpacity>
            <Text style={styles.descriptionText}>
              {selectedOption?.emoji === option.emoji
                ? option.description
                : null}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.chooseBtn} onPress={handleAddMood}>
        <Text style={styles.btnText}>Choose</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 20,
    marginBottom: 10,
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
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#454C73',
  },
  container: {
    borderColor: '#8D94BA',
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#D5EAEC',
    paddingVertical: 10,
  },
  chooseBtn: {
    backgroundColor: '#8D94BA',
    alignItems: 'center',
    borderRadius: 50,
    width: 150,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
