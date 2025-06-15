import React from 'react';
import { Player } from '../App';
import { Trophy, Sparkles, RotateCcw } from 'lucide-react';

interface WinnerModalProps {
  winner: Player;
  onPlayAgain: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onPlayAgain }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
        {/* Celebration Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 opacity-50"></div>
        
        {/* Floating Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Sparkles
              key={i}
              className={`absolute w-4 h-4 text-yellow-400 animate-ping`}
              style={{
                top: `${20 + (i * 10)}%`,
                left: `${10 + (i * 12)}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          {/* Trophy */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg animate-bounce">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          
          {/* Winner Announcement */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-pulse">
            🎉 Congratulations! 🎉
          </h2>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div 
              className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: winner.color }}
            />
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {winner.name} Wins!
            </p>
          </div>
          
          <p className="text-gray-600 mb-8">
            Amazing game! You've reached the top and claimed victory! 🏆
          </p>
          
          {/* Play Again Button */}
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;