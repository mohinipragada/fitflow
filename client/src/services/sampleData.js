// sampleData.js - TEMPORARY pretend data so we can build the screens first.
// In Steps 7-12 each page switches to real data from the backend API,
// and this file gets deleted.

import { getWeekdayIndex } from '../utils/format';

export const sampleUser = {
  name: 'Aadhya',
  email: 'aadhya@example.com',
  height: 175, // always stored in cm
  weight: 70, // always stored in kg
  age: 29,
  dailyStepGoal: 10000,
  units: 'metric', // 'metric' or 'imperial'
  notifications: true,
  darkMode: true,
  profileImage: '',
};

// Today's activity (Home page)
export const sampleActivity = {
  steps: 7842,
  calories: 486,
  activeMinutes: 42,
};

// Workouts and their exercises (Workout page).
// duration is in minutes; a workout's duration is the sum of its exercises.
export const sampleWorkouts = [
  {
    id: 'full-body-burn',
    name: 'Full Body Burn',
    category: 'Strength',
    duration: 32,
    exercises: [
      { name: 'Jumping Jacks', type: 'Warm-up', duration: 3, reps: '' },
      { name: 'Push-ups', type: 'Strength', duration: 4, reps: '3 sets × 12 reps' },
      { name: 'Bodyweight Squats', type: 'Strength', duration: 5, reps: '3 sets × 15 reps' },
      { name: 'Plank Hold', type: 'Core', duration: 2, reps: '3 × 40 sec' },
      { name: 'Reverse Lunges', type: 'Strength', duration: 6, reps: '3 sets × 10 each leg' },
      { name: 'Mountain Climbers', type: 'Cardio', duration: 4, reps: '4 × 30 sec' },
      { name: 'Cool-down Stretch', type: 'Full body', duration: 8, reps: '' },
    ],
  },
  {
    id: 'cardio-blast',
    name: 'Cardio Blast',
    category: 'Cardio',
    duration: 26,
    exercises: [
      { name: 'Jog in Place', type: 'Warm-up', duration: 5, reps: '' },
      { name: 'High Knees', type: 'Cardio', duration: 4, reps: '4 × 30 sec' },
      { name: 'Burpees', type: 'Cardio', duration: 5, reps: '3 sets × 10 reps' },
      { name: 'Skaters', type: 'Cardio', duration: 4, reps: '3 sets × 20 reps' },
      { name: 'Jump Rope', type: 'Cardio', duration: 5, reps: '' },
      { name: 'Walk & Breathe', type: 'Cool-down', duration: 3, reps: '' },
    ],
  },
  {
    id: 'core-crusher',
    name: 'Core Crusher',
    category: 'Strength',
    duration: 19,
    exercises: [
      { name: 'Dead Bug', type: 'Core', duration: 4, reps: '3 sets × 12 reps' },
      { name: 'Bicycle Crunches', type: 'Core', duration: 4, reps: '3 sets × 20 reps' },
      { name: 'Side Plank', type: 'Core', duration: 4, reps: '2 × 30 sec each side' },
      { name: 'Leg Raises', type: 'Core', duration: 4, reps: '3 sets × 12 reps' },
      { name: 'Plank Hold', type: 'Core', duration: 3, reps: '3 × 45 sec' },
    ],
  },
  {
    id: 'hiit-sprint',
    name: 'HIIT Sprint',
    category: 'Cardio',
    duration: 18,
    exercises: [
      { name: 'Easy Jog', type: 'Warm-up', duration: 3, reps: '' },
      { name: 'Sprint Intervals', type: 'Cardio', duration: 8, reps: '8 × 20 sec' },
      { name: 'Jump Squats', type: 'Cardio', duration: 4, reps: '3 sets × 12 reps' },
      { name: 'Cool-down Walk', type: 'Cool-down', duration: 3, reps: '' },
    ],
  },
  {
    id: 'morning-mobility',
    name: 'Morning Mobility',
    category: 'Mobility',
    duration: 17,
    exercises: [
      { name: 'Neck & Shoulder Rolls', type: 'Mobility', duration: 3, reps: '' },
      { name: 'Cat-Cow', type: 'Mobility', duration: 3, reps: '10 slow reps' },
      { name: 'Hip Openers', type: 'Mobility', duration: 4, reps: '5 each side' },
      { name: "World's Greatest Stretch", type: 'Mobility', duration: 4, reps: '5 each side' },
      { name: "Child's Pose", type: 'Stretch', duration: 3, reps: '1 min hold' },
    ],
  },
];

// This week's numbers, Monday to Sunday (Progress page).
// Days after today are set to 0 because they haven't happened yet.
const todayIndex = getWeekdayIndex();
const onlyPastDays = (values) => values.map((value, index) => (index <= todayIndex ? value : 0));

export const sampleWeek = {
  steps: onlyPastDays([8200, 10400, 6100, 9300, 11200, 12900, 7842]),
  calories: onlyPastDays([520, 610, 380, 540, 660, 720, 486]),
  minutes: onlyPastDays([45, 52, 28, 40, 55, 60, 42]),
  // Last week's totals, used for the "+12% vs last week" badge
  lastWeek: { steps: 58870, calories: 3540, minutes: 290 },
};
