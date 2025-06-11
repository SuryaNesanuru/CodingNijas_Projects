import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Trophy, 
  Calendar, 
  Target, 
  Camera,
  Edit,
  Star,
  Flame,
  Award
} from 'lucide-react';
import { mockUser } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const Profile: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    fitnessLevel: user.fitnessLevel
  });
  const { isDark, toggleTheme } = useTheme();

  const handleSave = () => {
    setUser(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      fitnessLevel: editForm.fitnessLevel as 'Beginner' | 'Intermediate' | 'Advanced'
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      fitnessLevel: user.fitnessLevel
    });
    setIsEditing(false);
  };

  const getAchievementIcon = (category: string) => {
    switch (category) {
      case 'workout':
        return Trophy;
      case 'nutrition':
        return Target;
      case 'milestone':
        return Flame;
      default:
        return Award;
    }
  };

  const getAchievementColor = (category: string) => {
    switch (category) {
      case 'workout':
        return 'from-blue-500 to-blue-600';
      case 'nutrition':
        return 'from-green-500 to-green-600';
      case 'milestone':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-purple-500 to-purple-600';
    }
  };

  const stats = [
    { label: 'Workouts Completed', value: '47', icon: Trophy, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Calories Burned', value: '12,450', icon: Flame, color: 'text-orange-600 dark:text-orange-400' },
    { label: 'Days Active', value: '23', icon: Calendar, color: 'text-green-600 dark:text-green-400' },
    { label: 'Achievements', value: user.achievements.length.toString(), icon: Award, color: 'text-purple-600 dark:text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-green-600"></div>
          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="pt-20 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="block text-gray-600 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                    <select
                      value={editForm.fitnessLevel}
                      onChange={(e) => setEditForm(prev => ({ ...prev, fitnessLevel: e.target.value }))}
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {user.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{user.email}</p>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                        {user.fitnessLevel}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Member since {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <span>Save</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h2>
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            
            <div className="space-y-4">
              {user.achievements.map((achievement) => {
                const Icon = getAchievementIcon(achievement.category);
                const colorClass = getAchievementColor(achievement.category);
                
                return (
                  <div
                    key={achievement.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClass} flex items-center justify-center text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
              <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Toggle between light and dark themes
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isDark ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDark ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Workout reminders and achievements
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Privacy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Control your data sharing preferences
                  </p>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                  Manage
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Download your fitness data
                  </p>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;