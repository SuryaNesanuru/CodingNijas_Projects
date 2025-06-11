export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  joinDate: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'workout' | 'nutrition' | 'milestone';
}

export interface WorkoutPlan {
  id: string;
  title: string;
  category: string;
  duration: number;
  difficulty: string;
  calories: number;
  description: string;
  image: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  description: string;
}

export interface NutritionEntry {
  id: string;
  meal: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
}

export interface DailyStats {
  date: string;
  caloriesBurned: number;
  workoutsCompleted: number;
  waterIntake: number;
  activeMinutes: number;
  steps: number;
}