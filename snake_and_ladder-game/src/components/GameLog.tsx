import React from 'react';
import { GameMove } from '../App';
import { ScrollText, TrendingUp, TrendingDown } from 'lucide-react';

interface GameLogProps {
  moves: GameMove[];
}

const GameLog: React.FC<GameLogProps> = ({ moves }) => {
  if (moves.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <ScrollText className="w-5 h-5 text-gray-600" />
          <h3 className="text-xl font-bold text-gray-800">Game Log</h3>
        </div>
        <p className="text-gray-500 text-center py-4">
          No moves yet. Start playing to see the game history!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <ScrollText className="w-5 h-5 text-gray-600" />
        <h3 className="text-xl font-bold text-gray-800">Game Log</h3>
      </div>
      
      <div className="max-h-64 overflow-y-auto space-y-2">
        {moves.map((move, index) => (
          <div
            key={index}
            className={`
              p-3 rounded-lg border-l-4 text-sm
              ${move.special === 'snake' 
                ? 'bg-red-50 border-red-400' 
                : move.special === 'ladder'
                ? 'bg-blue-50 border-blue-400'
                : 'bg-gray-50 border-gray-300'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800">
                {move.player}
              </span>
              <span className="text-xs text-gray-500">
                Move #{moves.length - index}
              </span>
            </div>
            
            <div className="mt-1">
              <span className="text-gray-600">
                Rolled {move.dice}, moved {move.from} → {move.to}
              </span>
              
              {move.special && (
                <div className="flex items-center gap-1 mt-1">
                  {move.special === 'snake' ? (
                    <>
                      <TrendingDown className="w-3 h-3 text-red-500" />
                      <span className="text-red-600 text-xs font-medium">
                        Snake! Slid down
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-3 h-3 text-blue-500" />
                      <span className="text-blue-600 text-xs font-medium">
                        Ladder! Climbed up
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLog;