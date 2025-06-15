import React from 'react';
import { RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onReset }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Game Controls</h3>
      
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
      >
        <RotateCcw className="w-5 h-5" />
        Reset Game
      </button>
      
      <div className="mt-4 text-sm text-gray-600">
        <h4 className="font-bold mb-2">How to Play:</h4>
        <ul className="space-y-1 text-xs">
          <li>• Take turns rolling the dice</li>
          <li>• Move forward by the dice number</li>
          <li>• Climb ladders to move up</li>
          <li>• Slide down snakes</li>
          <li>• First to reach 100 wins!</li>
        </ul>
      </div>
    </div>
  );
};

export default GameControls;