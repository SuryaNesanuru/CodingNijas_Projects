import React from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface DiceRollerProps {
  diceValue: number | null;
  isRolling: boolean;
  onRoll: () => void;
  disabled: boolean;
  currentPlayerName: string;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ 
  diceValue, 
  isRolling, 
  onRoll, 
  disabled,
  currentPlayerName
}) => {
  const getDiceIcon = (value: number | null) => {
    if (!value) return Dice1;
    
    switch (value) {
      case 1: return Dice1;
      case 2: return Dice2;
      case 3: return Dice3;
      case 4: return Dice4;
      case 5: return Dice5;
      case 6: return Dice6;
      default: return Dice1;
    }
  };

  const DiceIcon = getDiceIcon(diceValue);

  return (
    <div className="text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        {currentPlayerName}'s Turn
      </h3>
      
      <div className="mb-6">
        <div 
          className={`
            inline-flex items-center justify-center w-20 h-20 bg-white border-4 border-gray-300 rounded-xl shadow-lg
            ${isRolling ? 'animate-spin' : 'animate-pulse'}
            transition-all duration-300
          `}
        >
          <DiceIcon 
            className={`w-12 h-12 ${isRolling ? 'text-gray-400' : 'text-gray-700'}`}
          />
        </div>
        
        {diceValue && !isRolling && (
          <div className="mt-3">
            <p className="text-2xl font-bold text-emerald-600">
              You rolled: {diceValue}
            </p>
          </div>
        )}
        
        {isRolling && (
          <div className="mt-3">
            <p className="text-lg text-gray-600 animate-pulse">
              Rolling...
            </p>
          </div>
        )}
      </div>
      
      <button
        onClick={onRoll}
        disabled={disabled || isRolling}
        className={`
          px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 transform
          ${disabled || isRolling
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          }
        `}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default DiceRoller;