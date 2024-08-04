import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageManager = {
  async loadHabits() {
    try {
      const habits = await AsyncStorage.getItem('habits');
      return habits ? JSON.parse(habits) : [];
    } catch (error) {
      console.error('Error loading habits:', error);
      throw error;
    }
  },

  async saveHabits(habits) {
    try {
      await AsyncStorage.setItem('habits', JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habits:', error);
      throw error;
    }
  },

  async createHabit(newHabit) {
    const habits = await this.loadHabits();
    habits.push(newHabit);
    await this.saveHabits(habits);
  },
  async completeHabit(habitId) {
    const habits = await this.loadHabits();
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);
    if (habitIndex !== -1) {
      habits[habitIndex].streak++;
      await this.saveHabits(habits);
    }
  },
};

export default StorageManager;