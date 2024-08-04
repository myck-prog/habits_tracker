import * as Notifications from 'expo-notifications';

const ReminderManager = {
  async scheduleReminder(habit) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Remember to ${habit.name}!`,
        body: `You have a goal to ${habit.goal} ${habit.name} today.`,
      },
      trigger: {
        hour: habit.reminderTime.split(':')[0],
        minute: habit.reminderTime.split(':')[1],
        repeats: true,
      },
    });
  },

  async cancelReminder(habit) {
    await Notifications.cancelScheduledNotificationAsync(habit.id);
  },
};

export default ReminderManager;