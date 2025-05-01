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
            <li>• If target=1 but output=0: increase weights for lit pixels</li>
            <li>• If target=0 but output=1: decrease weights for lit pixels</li>
            <li>
              • Adjust bias the same way (up if target=1, down if target=0)
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 p-3 rounded">
          <h3 className="font-mono text-green-500">Auto Training</h3>
          <ul className="space-y-1 text-sm text-gray-300 mt-2">
            <li>• "TRAIN STEP" applies Rosenblatt's algorithm</li>
            <li>• Weights auto-adjust based on error</li>
            <li>• Formula: w_new = w_old + (target - output) × input</li>
            <li>• Green/red halos suggest which knobs to adjust</li>
          </ul>
        </div>
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
