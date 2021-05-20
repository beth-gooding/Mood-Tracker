import React from 'react';
import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { MoodOptionWithTimeStamp } from '~src/types';
import format from 'date-fns/format';
import {
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  TouchableOpacity,
  State as GestureState,
} from 'react-native-gesture-handler';
import { useAppContext } from '~src/App.provider';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type MoodItemRowProps = {
  mood: MoodOptionWithTimeStamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ mood }) => {
  const { handleRemoveMood } = useAppContext();
  const offset = useSharedValue(0);
  const maxPan = 80;
  const [isToDelete, setIsToDelete] = React.useState(false);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  const handleDelete = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    handleRemoveMood(mood);
  }, [mood, handleRemoveMood]);
  const onGestureEvent = React.useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      const xVal = Math.floor(event.nativeEvent.translationX);
      offset.value = xVal;
      if (Math.abs(xVal) <= maxPan) {
        setIsToDelete(false);
      } else {
        setIsToDelete(true);
      }
    },
    [offset],
  );
  const onHandlerStateChange = React.useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.state === GestureState.END) {
        if (isToDelete) {
          offset.value = withTiming(Math.sign(offset.value) * 2000);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setTimeout(() => {
            handleRemoveMood(mood);
          }, 250);
        } else {
          offset.value = withTiming(0);
        }
      }
    },
    [offset, isToDelete, handleRemoveMood, mood],
  );
  return (
    <PanGestureHandler
      minDeltaX={1}
      minDeltaY={100}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      <Animated.View style={[styles.moodItem, animatedStyles]}>
        <View style={styles.iconAndDescription}>
          <Text style={styles.moodValue}>{mood.moodOption.emoji}</Text>
          <Text style={styles.moodDescription}>
            {mood.moodOption.description}
          </Text>
        </View>
        <Text style={styles.dateText} key={mood.timestamp}>
          {format(new Date(mood.timestamp), "d. MMM, yyyy 'at' h:mmaaa")}
        </Text>
        <TouchableOpacity
          onPress={() => {
            handleDelete();
          }}>
          <Text style={styles.deleteText}>delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
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
    fontFamily: 'Kalam-Bold',
    color: '#454C73',
  },
  dateText: {
    color: '#8D94BA',
    textAlign: 'center',
    fontFamily: 'Kalam-Regular',
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 18,
    fontFamily: 'Kalam-Bold',
    color: '#1D84B5',
  },
});
