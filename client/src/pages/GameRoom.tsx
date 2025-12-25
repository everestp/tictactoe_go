import React from "react";

const GameRoom = () => {
  // Simulate game state (replace with real multiplayer logic later)
  const isWaiting = true;
  const currentTurn = "X"; // or "O"
  const yourSymbol = "X";
  const opponentSymbol = "O";

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
      
      {/* Subtle background overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gray-200" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-10 animate-pulse delay-1000" />
      </div>

      {/* Main Game Container */}
      <div className="relative z-10 w-full max-w-4xl px-8 py-12">
        
        {/* Players Info Bar */}
        <div className="flex justify-between items-center mb-12">
          {/* You */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-md">
              X
            </div>
            <div>
              <p className="text-gray-700 text-sm opacity-70">You</p>
              <p className="text-gray-900 text-xl font-semibold">Player 1</p>
            </div>
          </div>

          {/* VS */}
          <div className="text-gray-700 text-4xl font-bold opacity-50">VS</div>

          {/* Opponent */}
          <div className="flex flex-row-reverse items-center space-x-4 space-x-reverse">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-md">
              {isWaiting ? "?" : "O"}
            </div>
            <div className="text-right">
              <p className="text-gray-700 text-sm opacity-70">Opponent</p>
              <p className="text-gray-900 text-xl font-semibold">
                {isWaiting ? "Waiting..." : "Player 2"}
              </p>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {isWaiting && (
          <div className="text-center mb-8">
            <p className="text-gray-900 text-2xl font-medium mb-4">
              Waiting for opponent to join…
            </p>
            <div className="inline-flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-700 rounded-full animate-bounce" />
              <div className="w-4 h-4 bg-gray-700 rounded-full animate-bounce delay-150" />
              <div className="w-4 h-4 bg-gray-700 rounded-full animate-bounce delay-300" />
            </div>
          </div>
        )}

        {/* Current Turn Indicator */}
        {!isWaiting && (
          <div className="text-center mb-8">
            <p className="text-gray-900 text-xl">
              Current turn:{" "}
              <span className="font-bold text-3xl">
                {currentTurn === yourSymbol ? "Yours (X)" : "Opponent (O)"}
              </span>
            </p>
          </div>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {Array(9).fill(null).map((_, i) => (
            <Cell key={i} index={i} isWaiting={isWaiting} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Cell = ({ index, isWaiting }: { index: number; isWaiting: boolean }) => {
  // Simulate some marks for preview (remove in real game)
  const previewMarks = [0, 4, 8]; // diagonal for demo
  const isMarked = previewMarks.includes(index);
  const mark = index === 0 ? "X" : index === 4 ? "O" : index === 8 ? "X" : null;

  return (
    <button
      disabled={isWaiting}
      className={`
        aspect-square rounded-3xl
        bg-gray-50 backdrop-blur-sm
        border-4 border-gray-300
        flex items-center justify-center
        text-7xl font-extrabold
        shadow-md
        transition-all duration-300
        ${isWaiting ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:scale-105 hover:bg-gray-100 active:scale-95"}
        ${isMarked ? "text-gray-900" : ""}
      `}
    >
      {isMarked && (
        <span
          className={`
            drop-shadow-md
            ${mark === "X" ? "text-gray-800" : "text-gray-600"}
            animate-in fade-in zoom-in duration-500
          `}
        >
          {mark}
        </span>
      )}
    </button>
  );
};

export default GameRoom;
