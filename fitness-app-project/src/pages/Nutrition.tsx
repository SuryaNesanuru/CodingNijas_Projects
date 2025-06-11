import React, { useState } from 'react';
import { Plus, Search, Calendar, Droplets, Target } from 'lucide-react';
import ProgressRing from '../components/ProgressRing';
import { nutritionEntries } from '../data/mockData';
import { NutritionEntry } from '../types';

const Nutrition: React.FC = () => {
  const [entries, setEntries] = useState<NutritionEntry[]>(nutritionEntries);
  const [waterIntake, setWaterIntake] = useState(6);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    meal: 'Breakfast',
    food: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const waterTarget = 8;
  const calorieTarget = 2000;
  
  // Calculate totals
  const totals = entries.reduce((acc, entry) => ({
    calories: acc.calories + entry.calories,
    protein: acc.protein + entry.protein,
    carbs: acc.carbs + entry.carbs,
    fat: acc.fat + entry.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: NutritionEntry = {
      id: Date.now().toString(),
      meal: newEntry.meal,
      food: newEntry.food,
      calories: parseInt(newEntry.calories),
      protein: parseInt(newEntry.protein),
      carbs: parseInt(newEntry.carbs),
      fat: parseInt(newEntry.fat),
      timestamp: new Date().toISOString()
    };
    
    setEntries([...entries, entry]);
    setNewEntry({
      meal: 'Breakfast',
      food: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
    setShowAddForm(false);
  };

  const handleWaterIncrement = () => {
    if (waterIntake < waterTarget) {
      setWaterIntake(prev => prev + 1);
    }
  };

  const handleWaterDecrement = () => {
    if (waterIntake > 0) {
      setWaterIntake(prev => prev - 1);
    }
  };

  const macroTargets = {
    protein: 150, // grams
    carbs: 200,   // grams
    fat: 65       // grams
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Nutrition Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your daily nutrition and stay on target
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>Add Entry</span>
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Calories */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Calories</h3>
              <Target className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totals.calories.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  / {calorieTarget.toLocaleString()} goal
                </p>
              </div>
              <ProgressRing
                progress={(totals.calories / calorieTarget) * 100}
                size={60}
                strokeWidth={6}
                color="#F97316"
              >
                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                  {Math.round((totals.calories / calorieTarget) * 100)}%
                </span>
              </ProgressRing>
            </div>
          </div>

          {/* Protein */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Protein</h3>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totals.protein}g
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  / {macroTargets.protein}g goal
                </p>
              </div>
              <ProgressRing
                progress={(totals.protein / macroTargets.protein) * 100}
                size={60}
                strokeWidth={6}
                color="#3B82F6"
              >
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {Math.round((totals.protein / macroTargets.protein) * 100)}%
                </span>
              </ProgressRing>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Carbs</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totals.carbs}g
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  / {macroTargets.carbs}g goal
                </p>
              </div>
              <ProgressRing
                progress={(totals.carbs / macroTargets.carbs) * 100}
                size={60}
                strokeWidth={6}
                color="#10B981"
              >
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  {Math.round((totals.carbs / macroTargets.carbs) * 100)}%
                </span>
              </ProgressRing>
            </div>
          </div>

          {/* Fat */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Fat</h3>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totals.fat}g
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  / {macroTargets.fat}g goal
                </p>
              </div>
              <ProgressRing
                progress={(totals.fat / macroTargets.fat) * 100}
                size={60}
                strokeWidth={6}
                color="#8B5CF6"
              >
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                  {Math.round((totals.fat / macroTargets.fat) * 100)}%
                </span>
              </ProgressRing>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Nutrition Entries */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Meals</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
                            {entry.meal}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {entry.food}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                          <span>{entry.calories} cal</span>
                          <span>{entry.protein}g protein</span>
                          <span>{entry.carbs}g carbs</span>
                          <span>{entry.fat}g fat</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Water Intake & Quick Actions */}
          <div className="space-y-6">
            {/* Water Intake */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Water Intake</h3>
                <Droplets className="h-5 w-5 text-cyan-500" />
              </div>
              
              <div className="text-center mb-6">
                <ProgressRing
                  progress={(waterIntake / waterTarget) * 100}
                  size={120}
                  strokeWidth={8}
                  color="#06B6D4"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {waterIntake}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      / {waterTarget} glasses
                    </div>
                  </div>
                </ProgressRing>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleWaterDecrement}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {waterIntake} glasses
                </span>
                <button
                  onClick={handleWaterIncrement}
                  className="w-10 h-10 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Meals logged</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{entries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Calorie goal</span>
                  <span className={`font-semibold ${totals.calories >= calorieTarget ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                    {Math.round((totals.calories / calorieTarget) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Water goal</span>
                  <span className={`font-semibold ${waterIntake >= waterTarget ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                    {Math.round((waterIntake / waterTarget) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Entry Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add Nutrition Entry</h3>
              <form onSubmit={handleAddEntry} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Meal
                  </label>
                  <select
                    value={newEntry.meal}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, meal: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Food Item
                  </label>
                  <input
                    type="text"
                    required
                    value={newEntry.food}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, food: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Grilled chicken breast"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Calories
                    </label>
                    <input
                      type="number"
                      required
                      value={newEntry.calories}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, calories: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      required
                      value={newEntry.protein}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, protein: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Carbs (g)
                    </label>
                    <input
                      type="number"
                      required
                      value={newEntry.carbs}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, carbs: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fat (g)
                    </label>
                    <input
                      type="number"
                      required
                      value={newEntry.fat}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, fat: e.target.value }))}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Add Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nutrition;