import React from "react";

const InfoPanel: React.FC = () => {
  return (
    <div className="mt-8 bg-gray-800 p-4 rounded-md shadow-lg">
      <h2 className="text-xl font-mono uppercase tracking-wider border-b border-gray-700 pb-2">
        This is a Perceptron
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div className="bg-gray-900 p-3 rounded">
          <h3 className="font-mono text-green-500">Input & Output</h3>
          <ul className="space-y-1 text-sm text-gray-300 mt-2">
            <li>
              • <strong>Inputs:</strong> 16 pixels (4×4 grid)
            </li>
            <li>
              • Each input is <span className="text-green-400">+1</span> (lit)
              or <span className="text-red-400">-1</span> (unlit)
            </li>
            <li>
              • <strong>Output:</strong> binary classification (0 or 1)
            </li>
            <li>
              • <strong>Target:</strong> your desired output (YES=1, NO=0)
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 p-3 rounded">
          <h3 className="font-mono text-green-500">Calculation</h3>
          <ul className="space-y-1 text-sm text-gray-300 mt-2">
            <li>
              • <strong>Output:</strong> sum(input<sub>i</sub> × weight
              <sub>i</sub>) + bias
            </li>
            <li>
              • <strong>Activation:</strong> output = 1 if net {">"} 0, else 0
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 bg-gray-900 p-3 rounded">
        <h3 className="font-mono text-green-500">Training Algorithm</h3>
        <p className="text-sm text-gray-300 mt-1">
          The perceptron's weights update according to Rosenblatt's rule:
        </p>
        <div className="my-2 px-3 py-2 bg-gray-800 rounded font-mono text-sm text-yellow-400">
          Δw<sub>i</sub> = (target - output) × input<sub>i</sub>
        </div>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>• If output matches target: no change</li>
          <li>
            • For target=1, output=0: increase weights for lit pixels (+1),
            decrease for unlit (-1)
          </li>
          <li>
            • For target=0, output=1: decrease weights for lit pixels (+1),
            increase for unlit (-1)
          </li>
          <li>• Bias is updated similarly: Δbias = (target - output)</li>
        </ul>
      </div>

      <div className="mt-4 bg-gray-900 p-3 rounded">
        <h3 className="font-mono text-green-500">How to Train</h3>
        <ol className="list-decimal list-inside text-sm text-gray-300 mt-1 ml-2 space-y-1">
          <li>Choose a letter pattern or draw your own</li>
          <li>Set target (YES=1 or NO=0)</li>
          <li>Click "SHOW HINTS" to see which way to turn knobs</li>
          <li>Adjust weights following the hint arrows</li>
          <li>Or click "TRAIN STEP" to automatically update weights</li>
          <li>When the output matches your target, try another pattern</li>
          <li>Goal: Train to recognize some letters, reject others</li>
        </ol>
      </div>

      <div className="mt-4 bg-gray-900 p-3 rounded">
        <h3 className="font-mono text-green-500">Relevant Links</h3>
        <ol className="list-decimal list-inside text-sm text-gray-300 mt-1 ml-2 space-y-1">
          <li>
            <a
              href="https://youtu.be/l-9ALe3U-Fg?si=I1skChiEBK7SR0Qv"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              ChatGPT is made from 100 million of these [The Perceptron]
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default InfoPanel;
