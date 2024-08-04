import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import HabitItem from './components/HabitItem';
import HabitSettings from './components/HabitSettings';
import StorageManager from './managers/StorageManager';
import ReminderManager from './managers/ReminderManager';

const App = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    StorageManager.loadHabits().then(setHabits);
  }, []);

  const addHabit = () => {
    const habit = { name: newHabit, goal: 1, streak: 0, reminderTime: '' };
    setHabits([...habits, habit]);
    setNewHabit('');
  };

  return (
    <View style={{ padding: 100 }}>
      <TextInput
        placeholder="New Habit"
        value={newHabit}
        onChangeText={setNewHabit}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Add Habit" onPress={addHabit} />
      <FlatList
        data={habits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <HabitItem habit={item} />
        )}
      />
    </View>
  );
};

export default App;