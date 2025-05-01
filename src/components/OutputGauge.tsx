import React from "react";
import { cn } from "../lib/utils";

interface OutputGaugeProps {
  net: number;
  output: 0 | 1;
}

const OutputGauge: React.FC<OutputGaugeProps> = ({ net, output }) => {
  // Normalize net input to gauge range (-1 to 1)
  const normalizedValue = Math.max(-1, Math.min(1, net / 10));

  // Calculate needle rotation (-90 to 90 degrees)
  const needleRotation = normalizedValue * 90;

  return (
    <div className="bg-gray-800 p-4 py-6 rounded-md shadow-lg w-96 h-full flex flex-col items-center">
      <div className="relative w-60 h-60 bg-gray-800 rounded-full border-2 border-gray-700 shadow-lg flex items-center justify-center">
        {/* Gauge background - more subtle gradient */}
        <div className="absolute w-full h-full rounded-full overflow-hidden">
          <div className="absolute left-0 w-1/2 h-full bg-red-600/80" />
          <div className="absolute right-0 w-1/2 h-full bg-green-600/80" />
          <div className="absolute left-0 w-full h-full bg-transparent" />
        </div>

        {/* Gradient overlay for better aesthetics */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-b from-gray-800/50 to-black/20" />

        {/* Gauge labels */}
        <div className="absolute w-full h-full pointer-events-none">
          <div className="absolute top-12 left-12 text-red-400 font-mono text-xs">
            NO
          </div>
          <div className="absolute top-12 right-12 text-green-400 font-mono text-xs">
            YES
          </div>
        </div>

        {/* Gauge needle */}
        <div
          className="absolute left-1/2 bottom-1/2 w-0.5 h-[45%] bg-white rounded-full transition-transform duration-300 ease-out origin-bottom"
          style={{
            transform: `translateX(-50%) rotate(${needleRotation}deg)`,
          }}
        />

        {/* Needle center */}
        <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-gray-700 border border-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

        {/* Digital readout */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <span className="font-mono text-[0.65rem] text-white/40">NET: </span>
          <span
            className={cn(
              "font-mono text-[0.65rem]",
              net >= 0 ? "text-green-400/80" : "text-red-400/80"
            )}
          >
            {net.toFixed(2)}
          </span>
        </div>

        {/* Output indicator */}
        <div
          className={cn(
            "absolute bottom-6 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full",
            "flex items-center justify-center shadow-md border border-gray-700",
            output ? "bg-green-600/80" : "bg-red-600/80"
          )}
        >
          <span className="font-mono text-xs text-white/90">{output}</span>
        </div>
      </div>
    </div>
  );
};

export default OutputGauge;
