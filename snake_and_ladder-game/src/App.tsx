import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import DiceRoller from './components/DiceRoller';
import PlayerInfo from './components/PlayerInfo';
import GameControls from './components/GameControls';
import WinnerModal from './components/WinnerModal';
import GameLog from './components/GameLog';
import { Crown } from 'lucide-react';

export interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
}

export interface GameMove {
  player: string;
  dice: number;
  from: number;
  to: number;
  special?: 'snake' | 'ladder';
}

// Snake and ladder positions
export const snakes = {
  16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78
};

export const ladders = {
  1: 38, 4: 14, 9: 21, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100
};

function App() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', position: 0, color: '#3B82F6' },
    { id: 2, name: 'Player 2', position: 0, color: '#EF4444' }
  ]);
  
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameLog, setGameLog] = useState<GameMove[]>([]);
  const [isMoving, setIsMoving] = useState(false);

  const rollDice = () => {
    if (isRolling || isMoving || winner) return;
    
    setIsRolling(true);
    setDiceValue(null);
    
    // Simulate dice rolling animation
    setTimeout(() => {
      const newDiceValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newDiceValue);
      setIsRolling(false);
      movePlayer(newDiceValue);
    }, 1000);
  };

  const movePlayer = (diceRoll: number) => {
    setIsMoving(true);
    const player = players[currentPlayer];
    let newPosition = player.position + diceRoll;
    
    // Don't move beyond 100
    if (newPosition > 100) {
      newPosition = player.position;
    }

    const move: GameMove = {
      player: player.name,
      dice: diceRoll,
      from: player.position,
      to: newPosition
    };

    // Update player position with animation delay
    setTimeout(() => {
      setPlayers(prev => prev.map(p => 
        p.id === player.id ? { ...p, position: newPosition } : p
      ));

      // Check for snakes and ladders after initial movement
      setTimeout(() => {
        let finalPosition = newPosition;
        
        if (snakes[newPosition as keyof typeof snakes]) {
          finalPosition = snakes[newPosition as keyof typeof snakes];
          move.special = 'snake';
          move.to = finalPosition;
        } else if (ladders[newPosition as keyof typeof ladders]) {
          finalPosition = ladders[newPosition as keyof typeof ladders];
          move.special = 'ladder';
          move.to = finalPosition;
        }

        if (finalPosition !== newPosition) {
          setTimeout(() => {
            setPlayers(prev => prev.map(p => 
              p.id === player.id ? { ...p, position: finalPosition } : p
            ));
          }, 800);
        }

        setGameLog(prev => [move, ...prev]);

        // Check for winner
        if (finalPosition === 100) {
          setTimeout(() => {
            setWinner(player);
          }, finalPosition !== newPosition ? 1200 : 400);
        } else {
          // Switch to next player
          setTimeout(() => {
            setCurrentPlayer(prev => (prev + 1) % players.length);
            setIsMoving(false);
          }, finalPosition !== newPosition ? 1200 : 400);
        }
      }, 500);
    }, 300);
  };

  const resetGame = () => {
    setPlayers(prev => prev.map(p => ({ ...p, position: 0 })));
    setCurrentPlayer(0);
    setDiceValue(null);
    setWinner(null);
    setGameLog([]);
    setIsMoving(false);
    setIsRolling(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Snake & Ladder
            </h1>
            <Crown className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-600 text-lg">Roll the dice and climb to victory!</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Game Board - Takes up 3 columns on xl screens */}
          <div className="xl:col-span-3">
            <GameBoard 
              players={players} 
              snakes={snakes} 
              ladders={ladders}
            />
          </div>

          {/* Game Controls Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Player Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Players</h3>
              <PlayerInfo 
                players={players} 
                currentPlayer={currentPlayer}
                isMoving={isMoving}
              />
            </div>

            {/* Dice Roller */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <DiceRoller 
                diceValue={diceValue}
                isRolling={isRolling}
                onRoll={rollDice}
                disabled={isMoving || winner !== null}
                currentPlayerName={players[currentPlayer].name}
              />
            </div>

            {/* Game Controls */}
            <GameControls onReset={resetGame} />

            {/* Game Log */}
            <GameLog moves={gameLog} />
          </div>
        </div>

        {/* Winner Modal */}
        {winner && (
          <WinnerModal 
            winner={winner} 
            onPlayAgain={resetGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;