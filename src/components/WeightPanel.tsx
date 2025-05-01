import React from "react";
import Knob from "./Knob";

interface WeightPanelProps {
  weights: number[];
  bias: number;
  inputs: number[];
  updateWeight: (index: number, value: number) => void;
  updateBias: (value: number) => void;
  weightHints: ("increase" | "decrease" | "correct")[];
  biasHint: "increase" | "decrease" | "correct";
  training: boolean;
}

const WeightPanel: React.FC<WeightPanelProps> = ({
  weights,
  bias,
  inputs,
  updateWeight,
  updateBias,
  weightHints,
  biasHint,
  training,
}) => {
  return (
    <div className="w-96 bg-gray-800 p-4 rounded-md shadow-lg flex flex-col items-center">
      <div className="flex flex-wrap w-72 gap-2 gap-y-4 rounded-md justify-center pt-1">
        {weights.map((weight, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-16 h-16"
          >
            <Knob
              value={weight}
              min={-3}
              max={3}
              onChange={(value) => updateWeight(index, value)}
              size={50}
              hint={weightHints[index]}
              disabled={training}
              label={`w${index}`}
              activeInput={inputs[index] === 1}
            />
            <div
              className={`w-2 h-2 rounded-full mt-1 ${
                inputs[index] ? "bg-green-500" : "bg-gray-600"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center border-t border-gray-700 pt-4">
        <div className="flex flex-col items-center">
          <Knob
            value={bias}
            min={-3}
            max={3}
            onChange={updateBias}
            size={60}
            hint={biasHint}
            disabled={training}
            label="BIAS"
          />
        </div>
      </div>
    </div>
  );
};

export default WeightPanel;
