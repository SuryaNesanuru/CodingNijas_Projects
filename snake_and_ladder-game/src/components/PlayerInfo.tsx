import React from 'react';
import { Player } from '../App';
import { User } from 'lucide-react';

interface PlayerInfoProps {
  players: Player[];
  currentPlayer: number;
  isMoving: boolean;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ players, currentPlayer, isMoving }) => {
  return (
    <div className="space-y-3">
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`
            flex items-center justify-between p-3 rounded-xl transition-all duration-300
            ${index === currentPlayer 
              ? 'bg-gradient-to-r from-emerald-100 to-blue-100 border-2 border-emerald-300 shadow-md' 
              : 'bg-gray-50 border border-gray-200'
            }
            ${isMoving && index === currentPlayer ? 'animate-pulse' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: player.color }}
            >
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{player.name}</p>
              {index === currentPlayer && (
                <p className="text-sm text-emerald-600 font-medium">
                  {isMoving ? 'Moving...' : 'Your turn!'}
                </p>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-bold text-gray-800">
              {player.position}
            </p>
            <p className="text-xs text-gray-500">
              Position
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;