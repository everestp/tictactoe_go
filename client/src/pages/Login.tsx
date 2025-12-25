import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Multi Player Tic Tac Toe
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create or join a room to start playing
        </p>

        {/* Section */}
        <h2 className="font-semibold text-blue-600 text-2xl text-center mb-4">
          Create / Join Room
        </h2>

        {/* Input */}
          <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     mb-6"
        />
        <input
          type="text"
          placeholder="Enter Room ID"
          className="w-full px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     mb-6"
        />

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            className="flex-1 px-6 py-2 rounded-lg bg-blue-600 text-white font-medium
                       hover:bg-blue-700 active:scale-95
                       transition-all duration-200"
          >
            Create
          </button>

          <button
            className="flex-1 px-6 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium
                       hover:bg-blue-50 active:scale-95
                       transition-all duration-200"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
