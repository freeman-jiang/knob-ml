import React from "react";

interface MiniLetterGridProps {
  pattern: number[];
  isSelected: boolean;
  onClick: () => void;
}

const MiniLetterGrid: React.FC<MiniLetterGridProps> = ({
  pattern,
  isSelected,
  onClick,
}) => {
  const gridSize = Math.sqrt(pattern.length); // Assuming square grids (e.g., 4x4)
  if (!Number.isInteger(gridSize)) {
    console.error(
      "Pattern length must be a perfect square for MiniLetterGrid."
    );
    return null; // Or handle non-square patterns differently
  }

  return (
    <button
      onClick={onClick}
      className={`p-1 rounded focus:outline-none border-2 ${
        isSelected
          ? "border-green-500"
          : "border-transparent hover:border-gray-400 border-gray-500"
      } transition-colors duration-150`}
      aria-label={`Select pattern ${isSelected ? "(selected)" : ""}`}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: "2rem", // Adjust size as needed
          height: "2rem", // Adjust size as needed
          gap: "1px", // Creates the grid lines effect
        }}
      >
        {pattern.map((cell, index) => (
          <div
            key={index}
            className={`w-full h-full ${
              cell === 1 ? "bg-green-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </button>
  );
};

export default MiniLetterGrid;
