import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Flame, 
  Droplets, 
  Clock, 
  Target, 
  TrendingUp,
  Award,
  Activity
} from 'lucide-react';
import ProgressRing from '../components/ProgressRing';
import { dailyStats, motivationalQuotes } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const stats = [
    {
      id: 'calories',
      label: 'Calories Burned',
      value: dailyStats.caloriesBurned,
      target: 500,
      icon: Flame,
      color: '#F97316',
      unit: 'cal'
    },
    {
      id: 'workouts',
      label: 'Workouts',
      value: dailyStats.workoutsCompleted,
      target: 3,
      icon: Activity,
      color: '#3B82F6',
      unit: ''
    },
    {
      id: 'water',
      label: 'Water Intake',
      value: dailyStats.waterIntake,
      target: 8,
      icon: Droplets,
      color: '#06B6D4',
      unit: 'glasses'
    },
    {
      id: 'active',
      label: 'Active Minutes',
      value: dailyStats.activeMinutes,
      target: 120,
      icon: Clock,
      color: '#10B981',
      unit: 'min'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your fitness overview for today
          </p>
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6" />
            <span className="font-semibold">Daily Motivation</span>
          </div>
          <p className="text-lg font-medium italic">"{currentQuote}"</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const progress = Math.min((stat.value / stat.target) * 100, 100);
            const Icon = stat.icon;
            
            return (
              <div
                key={stat.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${stat.color}20` }}>
                    <Icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(progress)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </p>
                  </div>
                  
                  <ProgressRing
                    progress={progress}
                    size={60}
                    strokeWidth={6}
                    color={stat.color}
                  >
                    <span className="text-xs font-semibold" style={{ color: stat.color }}>
                      {Math.round(progress)}%
                    </span>
                  </ProgressRing>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Target: {stat.target} {stat.unit}
                  </span>
                  <span className={`font-medium ${progress >= 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
                    {progress >= 100 ? 'Complete!' : `${stat.target - stat.value} ${stat.unit} to go`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity & Achievements */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Progress</h2>
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            
            <div className="space-y-4">
              {[
                { day: 'Monday', progress: 90, workouts: 2 },
                { day: 'Tuesday', progress: 75, workouts: 1 },
                { day: 'Wednesday', progress: 100, workouts: 3 },
                { day: 'Thursday', progress: 60, workouts: 1 },
                { day: 'Friday', progress: 85, workouts: 2 },
                { day: 'Saturday', progress: 95, workouts: 2 },
                { day: 'Sunday', progress: 80, workouts: 1 }
              ].map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-20">
                      {day.day}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${day.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                    {day.workouts} workout{day.workouts !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Achievements</h2>
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: '7-Day Streak',
                  description: 'Completed workouts for 7 consecutive days',
                  icon: '🔥',
                  date: '2 hours ago',
                  color: 'from-red-500 to-orange-500'
                },
                {
                  title: 'Cardio Master',
                  description: 'Burned 1000+ calories this week',
                  icon: '💪',
                  date: '1 day ago',
                  color: 'from-blue-500 to-purple-500'
                },
                {
                  title: 'Hydration Hero',
                  description: 'Met water intake goal for 5 days',
                  icon: '💧',
                  date: '3 days ago',
                  color: 'from-cyan-500 to-blue-500'
                }
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center text-white text-lg`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {achievement.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Start Workout', color: 'from-blue-500 to-blue-600', icon: Activity },
              { title: 'Log Water', color: 'from-cyan-500 to-cyan-600', icon: Droplets },
              { title: 'Track Meal', color: 'from-green-500 to-green-600', icon: Calendar },
              { title: 'View Progress', color: 'from-purple-500 to-purple-600', icon: TrendingUp }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{action.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;