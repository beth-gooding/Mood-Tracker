import React from 'react';
import { FlatList } from 'react-native';
import { useAppContext } from '~src/App.provider';
import { MoodItemRow } from '~src/components/MoodItemRow';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import { format } from 'date-fns';
import { MoodOptionWithTimeStamp } from '~src/types';
import { Drawer } from '~src/components/Drawer';

export const HistoryTab: React.FC = () => {
  const { moodList } = useAppContext();
  const days = React.useMemo(() => {
    const ordered = orderBy(moodList, 'timestamp', 'desc');

    const grouped = groupBy(ordered, item =>
      format(new Date(item.timestamp), 'dd MMM, yyyy'),
    );

    return Object.entries(grouped).map(([day, moodsInDay]) => ({
      day,
      moodsInDay,
    }));
  }, [moodList]);
  return (
    <FlatList
      keyExtractor={item => item.day}
      data={days}
      renderItem={({ item }) => (
        <Drawer title={item.day}>
          {item.moodsInDay.map((mood: MoodOptionWithTimeStamp) => (
            <MoodItemRow mood={mood} key={mood.timestamp} />
          ))}
        </Drawer>
      )}
    />
  );
};
