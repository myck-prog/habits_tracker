
// Habit.js
export default class Habit {
    constructor(name, goal, reminderTime) {
      this.name = name;
      this.goal = goal;
      this.reminderTime = reminderTime; // New field for reminder time
      this.streak = 0;
    }
  }