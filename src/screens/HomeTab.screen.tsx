import React from 'react';
import { StyleSheet, Image, ImageBackground } from 'react-native';
import { MoodPicker } from '~src/components/MoodPicker';
import { useAppContext } from '~src/App.provider';

const imageSrc = require('~src/assets/images/ying-yang.png');
const networkImageUrl =
  'https://images.unsplash.com/photo-1494459940152-1e911caa8cc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80';

export const HomeTab = () => {
  const { handleAddMood } = useAppContext();
  return (
    <ImageBackground
      source={{ uri: networkImageUrl }}
      style={styles.container}
      accessibilityLabel="Sunset at a beach">
      <Image
        source={imageSrc}
        style={styles.image}
        accessibilityLabel="ying-yang icon"
      />
      <MoodPicker onAddMood={handleAddMood} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});
