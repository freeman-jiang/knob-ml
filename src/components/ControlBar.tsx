import React from 'react';

interface ControlBarProps {
  onClear: () => void;
  onReset: () => void;
  onLetterSelect: (letter: string) => void;
  onToggleTraining: () => void;
  training: boolean;
  onSetTarget: (target: 0 | 1) => void;
  target: 0 | 1;
  currentLetter: string | null;
}

const ControlBar: React.FC<ControlBarProps> = ({
  onClear,
  onReset,
  onLetterSelect,
  onToggleTraining,
  training,
  onSetTarget,
  target,
  currentLetter,
}) => {
  // Create alphabet buttons
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-lg">
      <div className="flex flex-col space-y-4">
        {/* Primary controls */}
        <div className="flex space-x-2">
          <button
            className="px-3 py-2 bg-gray-700 text-white font-mono rounded shadow hover:bg-gray-600 transition"
            onClick={onClear}
          >
            CLEAR
          </button>
          <button
            className="px-3 py-2 bg-gray-700 text-white font-mono rounded shadow hover:bg-gray-600 transition"
            onClick={onReset}
          >
            RESET WEIGHTS
          </button>
          <button
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-mono rounded shadow transition"
            onClick={onToggleTraining}
          >
            TRAIN STEP
          </button>
        </div>
        
        {/* Target setting */}
        <div className="flex items-center space-x-2">
          <span className="font-mono text-white">TARGET:</span>
          <div className="flex border border-gray-600 rounded overflow-hidden">
            <button
              className={`px-3 py-1 font-mono ${
                target === 0
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => onSetTarget(0)}
            >
              NO (0)
            </button>
            <button
              className={`px-3 py-1 font-mono ${
                target === 1
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => onSetTarget(1)}
            >
              YES (1)
            </button>
          </div>
        </div>
        
        {/* Alphabet selector */}
        <div className="mt-2">
          <div className="font-mono text-white mb-1">LETTER PRESETS:</div>
          <div className="grid grid-cols-6 md:grid-cols-13 gap-1">
            {letters.map((letter) => (
              <button
                key={letter}
                className={`w-8 h-8 font-mono rounded ${
                  currentLetter === letter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                onClick={() => onLetterSelect(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;