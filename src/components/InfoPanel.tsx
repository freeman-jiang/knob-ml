import React from "react";

const InfoPanel: React.FC = () => {
  return (
    <div className="mt-8 bg-gray-800 p-4 rounded-md shadow-lg">
      <h2 className="text-xl font-mono uppercase tracking-wider border-b border-gray-700 pb-2">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div className="bg-gray-900 p-3 rounded">
          <h3 className="font-mono text-green-500">Manual Training</h3>
          <ul className="space-y-1 text-sm text-gray-300 mt-2">
            <li>• If correct (output matches target): do nothing</li>
            <li>• For lit pixels (+1): increase weights when target=1</li>
            <li>• For off pixels (-1): decrease weights when target=1</li>
            <li>• Reverse adjustments when target=0</li>
          </ul>
        </div>

        <div className="bg-gray-900 p-3 rounded">
          <h3 className="font-mono text-green-500">Auto Training</h3>
          <ul className="space-y-1 text-sm text-gray-300 mt-2">
            <li>• "TRAIN STEP" applies Rosenblatt's algorithm</li>
            <li>• Using bipolar inputs (-1, +1) for all pixels</li>
            <li>• Formula: Δw = (target - output) × input</li>
            <li>• All weights update (not just lit pixels)</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 bg-gray-900 p-3 rounded">
        <h3 className="font-mono text-green-500">Bipolar Inputs</h3>
        <p className="text-sm text-gray-300 mt-1">
          This perceptron uses bipolar inputs: lit pixels are +1, off pixels are
          -1. This means <strong>all</strong> pixels actively contribute to
          learning. When target=1 and output=0, weights increase for lit pixels
          (+1) and decrease for off pixels (-1). This creates clearer decision
          boundaries.
        </p>
      </div>

      <div className="mt-4 bg-gray-900 p-3 rounded">
        <h3 className="font-mono text-green-500">Cases</h3>
        <div className="flex flex-wrap justify-between text-sm text-gray-300 mt-1">
          <div className="w-1/2 pb-1">
            <span className="text-yellow-500">Case 1:</span> Target=1, Output=0
            → Increase weights
          </div>
          <div className="w-1/2 pb-1">
            <span className="text-yellow-500">Case 2:</span> Target=0, Output=1
            → Decrease weights
          </div>
          <div className="w-1/2">
            <span className="text-yellow-500">Case 3:</span> Target=0, Output=0
            → No change
          </div>
          <div className="w-1/2">
            <span className="text-yellow-500">Case 4:</span> Target=1, Output=1
            → No change
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
