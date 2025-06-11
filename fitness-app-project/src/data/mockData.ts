import { User, WorkoutPlan, Achievement, DailyStats, NutritionEntry } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  fitnessLevel: 'Intermediate',
  joinDate: '2024-01-15',
  achievements: [
    {
      id: '1',
      title: 'First Workout',
      description: 'Completed your first workout session',
      icon: 'trophy',
      unlockedAt: '2024-01-16',
      category: 'workout'
    },
    {
      id: '2',
      title: '30-Day Streak',
      description: 'Worked out for 30 consecutive days',
      icon: 'flame',
      unlockedAt: '2024-02-15',
      category: 'milestone'
    },
    {
      id: '3',
      title: 'Nutrition Master',
      description: 'Tracked nutrition for 7 days straight',
      icon: 'apple',
      unlockedAt: '2024-01-22',
      category: 'nutrition'
    }
  ]
};

export const workoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    title: 'HIIT Cardio Blast',
    category: 'Cardio',
    duration: 30,
    difficulty: 'Intermediate',
    calories: 350,
    description: 'High-intensity interval training to boost your metabolism',
    image: 'https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: [
      { id: '1', name: 'Burpees', sets: 3, reps: 15, description: 'Full body explosive movement' },
      { id: '2', name: 'Mountain Climbers', sets: 3, reps: 20, description: 'Core and cardio combination' },
      { id: '3', name: 'Jump Squats', sets: 3, reps: 15, description: 'Lower body power exercise' }
    ]
  },
  {
    id: '2',
    title: 'Strength Builder',
    category: 'Strength',
    duration: 45,
    difficulty: 'Beginner',
    calories: 280,
    description: 'Build muscle and strength with compound movements',
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: [
      { id: '1', name: 'Push-ups', sets: 3, reps: 12, description: 'Upper body strength exercise' },
      { id: '2', name: 'Squats', sets: 3, reps: 15, description: 'Lower body compound movement' },
      { id: '3', name: 'Planks', sets: 3, duration: 30, reps: 1, description: 'Core stability exercise' }
    ]
  },
  {
    id: '3',
    title: 'Zen Flow Yoga',
    category: 'Yoga',
    duration: 60,
    difficulty: 'Beginner',
    calories: 200,
    description: 'Relaxing yoga flow for flexibility and mindfulness',
    image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: [
      { id: '1', name: 'Sun Salutation', sets: 5, reps: 1, description: 'Traditional yoga sequence' },
      { id: '2', name: 'Warrior Pose', sets: 3, duration: 30, reps: 1, description: 'Standing balance pose' },
      { id: '3', name: 'Child\'s Pose', sets: 1, duration: 120, reps: 1, description: 'Relaxation pose' }
    ]
  },
  {
    id: '4',
    title: 'Core Crusher',
    category: 'Core',
    duration: 25,
    difficulty: 'Advanced',
    calories: 180,
    description: 'Intense core workout for a strong midsection',
    image: 'https://images.pexels.com/photos/4164595/pexels-photo-4164595.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: [
      { id: '1', name: 'Russian Twists', sets: 3, reps: 20, description: 'Oblique strengthening exercise' },
      { id: '2', name: 'Bicycle Crunches', sets: 3, reps: 20, description: 'Dynamic ab exercise' },
      { id: '3', name: 'Dead Bug', sets: 3, reps: 10, description: 'Core stability exercise' }
    ]
  }
];

export const dailyStats: DailyStats = {
  date: new Date().toISOString().split('T')[0],
  caloriesBurned: 420,
  workoutsCompleted: 2,
  waterIntake: 6,
  activeMinutes: 85,
  steps: 8432
};

export const nutritionEntries: NutritionEntry[] = [
  {
    id: '1',
    meal: 'Breakfast',
    food: 'Oatmeal with berries',
    calories: 320,
    protein: 12,
    carbs: 55,
    fat: 6,
    timestamp: '2024-01-20T08:00:00Z'
  },
  {
    id: '2',
    meal: 'Lunch',
    food: 'Grilled chicken salad',
    calories: 450,
    protein: 35,
    carbs: 25,
    fat: 18,
    timestamp: '2024-01-20T12:30:00Z'
  },
  {
    id: '3',
    meal: 'Dinner',
    food: 'Salmon with quinoa',
    calories: 520,
    protein: 42,
    carbs: 35,
    fat: 22,
    timestamp: '2024-01-20T18:00:00Z'
  }
];

export const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can do it. It's your mind you need to convince.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The groundwork for all happiness is good health.",
  "Take care of your body. It's the only place you have to live.",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't."
];