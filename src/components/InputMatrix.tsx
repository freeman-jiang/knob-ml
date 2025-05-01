import React from "react";

interface InputMatrixProps {
  inputs: number[];
  toggleInput: (index: number) => void;
}

const InputMatrix: React.FC<InputMatrixProps> = ({ inputs, toggleInput }) => {
  return (
    <div className="bg-gray-800 p-4 py-6 rounded-md shadow-lg self-center w-96 h-full">
      <div className="flex flex-wrap gap-2 rounded-md shadow-inner justify-center">
        {inputs.map((input, index) => (
          <button
            key={index}
            className={`size-[4.35rem] rounded-sm transition-all transform ${
              input === 1 ? "bg-green-500 shadow-lg scale-105" : "bg-gray-700"
            }`}
            onClick={() => toggleInput(index)}
            aria-label={`Toggle pixel ${index}`}
          />
        ))}
      </div>
      <div className="mt-6 px-5 text-center text-gray-300 text-sm">
        <p>
          Click each cell to toggle it on/off or use the preset inputs below.
        </p>
      </div>
    </div>
  );
};

export default InputMatrix;
