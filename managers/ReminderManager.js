import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const ReminderManager = {
  async scheduleReminder(habit) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('You need to enable notifications');
      return;
    }

    const [hour, minute] = habit.reminderTime.split(':').map(Number);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Remember to ${habit.name}!`,
        body: `You have a goal to ${habit.goal} ${habit.name} today.`,
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
  },

  async cancelReminder(habit) {
    await Notifications.cancelScheduledNotificationAsync(habit.id);
  },
};

export default ReminderManager;
