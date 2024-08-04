import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HabitItem = ({ habit, onUpdate }) => {
  const handlePress = async () => {
    await onUpdate(habit.id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        <Text>{habit.name} (ID: {habit.id})</Text>
        <Text>Streak: {habit.streak}</Text>
        <Text>Completed: {habit.completed ? 'Yes' : 'No'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HabitItem;
