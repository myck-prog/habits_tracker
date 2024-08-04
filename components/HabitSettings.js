// HabitSettings.js
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ReminderManager from '../managers/ReminderManager';

const HabitSettings = ({ habit, updateHabit }) => {
  const [reminderTime, setReminderTime] = useState(habit.reminderTime);

  return (
    <View>
      <Text>Reminder Time:</Text>
      <TextInput
        value={reminderTime}
        onChangeText={(text) => {
          setReminderTime(text);
          updateHabit({ ...habit, reminderTime: text });
          ReminderManager.scheduleReminder({ ...habit, reminderTime: text });
        }}
        placeholder="HH:mm"
      />
    </View>
  );
};

export default HabitSettings;