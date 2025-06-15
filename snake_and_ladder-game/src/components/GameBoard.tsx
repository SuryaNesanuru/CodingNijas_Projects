import React from 'react';
import { Player } from '../App';

interface GameBoardProps {
  players: Player[];
  snakes: Record<number, number>;
  ladders: Record<number, number>;
}

const GameBoard: React.FC<GameBoardProps> = ({ players, snakes, ladders }) => {
  // Create board squares (1-100)
  const createBoard = () => {
    const squares = [];
    
    // Board is 10x10, numbered 1-100
    // Row 1: 100, 99, 98, 97, 96, 95, 94, 93, 92, 91
    // Row 2: 81, 82, 83, 84, 85, 86, 87, 88, 89, 90
    // And so on...
    
    for (let row = 0; row < 10; row++) {
      const rowSquares = [];
      for (let col = 0; col < 10; col++) {
        let squareNumber;
        
        if (row % 2 === 0) {
          // Even rows (0, 2, 4, 6, 8) go right to left
          squareNumber = 100 - (row * 10) - col;
        } else {
          // Odd rows (1, 3, 5, 7, 9) go left to right
          squareNumber = 100 - (row * 10) - (9 - col);
        }
        
        rowSquares.push(squareNumber);
      }
      squares.push(rowSquares);
    }
    
    return squares;
  };

  const board = createBoard();

  const getSquareContent = (squareNumber: number) => {
    const playersOnSquare = players.filter(p => p.position === squareNumber);
    const isSnakeHead = snakes[squareNumber];
    const isLadderBottom = ladders[squareNumber];
    
    return {
      players: playersOnSquare,
      isSnakeHead: !!isSnakeHead,
      isLadderBottom: !!isLadderBottom,
      snakeTail: isSnakeHead,
      ladderTop: isLadderBottom
    };
  };

  const getSquareClasses = (squareNumber: number) => {
    const { isSnakeHead, isLadderBottom } = getSquareContent(squareNumber);
    
    let classes = "aspect-square border border-gray-300 flex flex-col items-center justify-center text-xs md:text-sm font-bold relative transition-all duration-300 ";
    
    // Alternating colors for chess-board pattern
    if ((Math.floor((squareNumber - 1) / 10) + (squareNumber - 1)) % 2 === 0) {
      classes += "bg-emerald-50 ";
    } else {
      classes += "bg-blue-50 ";
    }
    
    // Special squares
    if (squareNumber === 1) {
      classes += "bg-gradient-to-br from-green-200 to-green-300 border-green-400 ";
    } else if (squareNumber === 100) {
      classes += "bg-gradient-to-br from-yellow-200 to-yellow-300 border-yellow-400 ";
    } else if (isSnakeHead) {
      classes += "bg-gradient-to-br from-red-100 to-red-200 border-red-300 ";
    } else if (isLadderBottom) {
      classes += "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 ";
    }
    
    return classes;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
      <div className="grid grid-cols-10 gap-1 md:gap-2 aspect-square max-w-2xl mx-auto">
        {board.map((row, rowIndex) =>
          row.map((squareNumber, colIndex) => {
            const { players: playersOnSquare, isSnakeHead, isLadderBottom, snakeTail, ladderTop } = getSquareContent(squareNumber);
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getSquareClasses(squareNumber)}
              >
                {/* Square number */}
                <div className="text-gray-700 mb-1">
                  {squareNumber}
                </div>
                
                {/* Special square indicators */}
                {squareNumber === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-green-700">START</span>
                  </div>
                )}
                
                {squareNumber === 100 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-700">FINISH</span>
                  </div>
                )}
                
                {/* Snake head indicator */}
                {isSnakeHead && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🐍</span>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-red-600 font-bold">
                      ↓{snakeTail}
                    </div>
                  </div>
                )}
                
                {/* Ladder bottom indicator */}
                {isLadderBottom && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🪜</span>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-600 font-bold">
                      ↑{ladderTop}
                    </div>
                  </div>
                )}
                
                {/* Player tokens */}
                {playersOnSquare.length > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-1">
                      {playersOnSquare.map((player, index) => (
                        <div
                          key={player.id}
                          className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white shadow-lg animate-bounce"
                          style={{ 
                            backgroundColor: player.color,
                            animationDelay: `${index * 0.1}s`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🐍</span>
          </div>
          <span className="text-gray-600">Snake Head</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🪜</span>
          </div>
          <span className="text-gray-600">Ladder Bottom</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
          <span className="text-gray-600">Start (1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span className="text-gray-600">Finish (100)</span>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;