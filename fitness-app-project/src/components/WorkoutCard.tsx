import React from 'react';
import { Clock, Flame, TrendingUp } from 'lucide-react';
import { WorkoutPlan } from '../types';

interface WorkoutCardProps {
  workout: WorkoutPlan;
  onStart: (workoutId: string) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onStart }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={workout.image}
          alt={workout.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
            {workout.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{workout.title}</h3>
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{workout.category}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{workout.description}</p>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{workout.duration}min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Flame className="h-4 w-4" />
            <span>{workout.calories} cal</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>{workout.exercises.length} exercises</span>
          </div>
        </div>
        
        <button
          onClick={() => onStart(workout.id)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Start Workout
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;