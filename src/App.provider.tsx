import React, { createContext, useContext } from 'react';
import { MoodOption, MoodOptionWithTimeStamp } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
  moodList: MoodOptionWithTimeStamp[];
  handleAddMood: (mood: MoodOption) => void;
};

const defaultValue = {
  moodList: [],
  handleAddMood: () => {},
};

const AppContext = createContext<AppContextType>(defaultValue);

const storageKey = 'mood-tracker-data';

type AppData = {
  moods: MoodOptionWithTimeStamp[];
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

const setAppData = async (newData: AppData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimeStamp[]>([]);
  const handleAddMood = React.useCallback((newMood: MoodOption) => {
    setMoodList(current => {
      const updatedMoods = [
        ...current,
        { moodOption: newMood, timestamp: Date.now() },
      ];
      setAppData({ moods: updatedMoods });
      return updatedMoods;
    });
  }, []);
  React.useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleAddMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
