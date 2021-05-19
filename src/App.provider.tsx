import React, { createContext, useContext } from 'react';
import { MoodOption, MoodOptionWithTimeStamp } from './types';

type AppContextType = {
  moodList: MoodOptionWithTimeStamp[];
  handleAddMood: (mood: MoodOption) => void;
};

const defaultValue = {
  moodList: [],
  handleAddMood: () => {},
};

const AppContext = createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimeStamp[]>([]);
  const handleAddMood = React.useCallback((newMood: MoodOption) => {
    setMoodList(current => {
      return [...current, { moodOption: newMood, timestamp: Date.now() }];
    });
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleAddMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
