import AsyncStorage from '@react-native-async-storage/async-storage';

const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

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

  async loadHabit(habitId) {
    const habits = await this.loadHabits();
    return habits.find((habit) => habit.id === habitId);
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
    newHabit.id = generateUniqueId();
    habits.push(newHabit);
    await this.saveHabits(habits);
    console.log(`Habit created with ID: ${newHabit.id}`);  // Debug log
  },

  async saveHabit(habit) {
    const habits = await this.loadHabits();
    const habitIndex = habits.findIndex((h) => h.id === habit.id);
    if (habitIndex !== -1) {
      habits[habitIndex] = habit;
    } else {
      habits.push(habit);
    }
    await this.saveHabits(habits);
  },

  async completeHabit(habitId) {
    const habits = await this.loadHabits();
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);
    if (habitIndex !== -1) {
      habits[habitIndex].streak++;
      await this.saveHabits(habits);
      console.log(`Habit completed with ID: ${habitId}`);  // Debug log
    }
  },
};

export default StorageManager;
