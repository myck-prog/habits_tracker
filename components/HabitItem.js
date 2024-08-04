// HabitItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StorageManager from '../managers/StorageManager';

const HabitItem = ({ habit }) => {
  const handleComplete = async () => {
    await StorageManager.completeHabit(habit.id);
  };

  return (
    <TouchableOpacity onPress={handleComplete}>
      <View>
        <Text>{habit.name}</Text>
        <Text>Streak: {habit.streak}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HabitItem;