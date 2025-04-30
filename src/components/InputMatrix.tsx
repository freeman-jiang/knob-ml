import React from 'react';

interface InputMatrixProps {
  inputs: number[];
  toggleInput: (index: number) => void;
}

const InputMatrix: React.FC<InputMatrixProps> = ({ inputs, toggleInput }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-mono mb-2 uppercase tracking-wider">Input Matrix</h2>
      <div className="grid grid-cols-5 gap-2 bg-gray-900 p-4 rounded-md shadow-inner">
        {inputs.map((input, index) => (
          <button
            key={index}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-sm transition-all transform ${
              input ? 'bg-green-500 shadow-lg scale-105' : 'bg-gray-800'
            }`}
            onClick={() => toggleInput(index)}
            aria-label={`Toggle pixel ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default InputMatrix;