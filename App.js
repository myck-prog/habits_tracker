import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import HabitItem from './components/HabitItem';
import StorageManager from './managers/StorageManager';
import ReminderManager from './managers/ReminderManager';
import Habit from './models/Habit';
import * as Permissions from 'expo-permissions';

const App = () => {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        alert('You need to enable notifications');
      }
      const existingHabits = await StorageManager.loadHabits();
      setHabits(existingHabits);
    })();
  }, []);

  const addHabit = async () => {
    const habit = new Habit(newHabitName, 1, newReminderTime);
    const updatedHabits = [...habits, habit];
    setHabits(updatedHabits);
    await StorageManager.createHabit(habit);
    await ReminderManager.scheduleReminder(habit);
    setNewHabitName('');
    setNewReminderTime('');
    console.log(`New habit created: ${habit.name} (ID: ${habit.id})`);  // Debug log
  };

  const handleUpdate = async (habitId) => {
    try {
      const updatedHabit = await StorageManager.loadHabit(habitId);
      updatedHabit.streak += 1;
      updatedHabit.completed = true;
      await StorageManager.saveHabit(updatedHabit);
      const habits = await StorageManager.loadHabits();
      setHabits(habits);
      console.log(`Habit completed: ${updatedHabit.name} (ID: ${habitId})`);  // Debug log
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  return (
    <View style={{ padding: 100 }}>
      <TextInput
        placeholder="New Habit"
        value={newHabitName}
        onChangeText={setNewHabitName}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <TextInput
        placeholder="Reminder Time (HH:mm)"
        value={newReminderTime}
        onChangeText={setNewReminderTime}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Add Habit" onPress={addHabit} />
      <Button title="Clear Habits" onPress={async () => {
        await StorageManager.saveHabits([]);
        setHabits([]);
      }} />
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem habit={item} onUpdate={handleUpdate} />
        )}
      />
    </View>
  );
};

export default App;
