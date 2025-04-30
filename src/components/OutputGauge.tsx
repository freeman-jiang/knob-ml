import React from 'react';

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
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-mono mb-2 uppercase tracking-wider">Output Gauge</h2>
      
      <div className="relative w-48 h-48 bg-black rounded-full border-4 border-gray-700 shadow-lg flex items-center justify-center">
        {/* Gauge background */}
        <div className="absolute w-full h-full rounded-full overflow-hidden">
          <div className="absolute left-0 w-1/2 h-full bg-red-900" />
          <div className="absolute right-0 w-1/2 h-full bg-green-900" />
          <div className="absolute left-0 w-full h-full bg-transparent border-t-2 border-b-2 border-gray-300" />
        </div>
        
       
        
        {/* Gauge labels */}
        <div className="absolute w-full h-full">
          <div className="absolute top-6 left-12 text-red-400 font-mono">NO</div>
          <div className="absolute top-6 right-12 text-green-400 font-mono">YES</div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-gray-300 font-mono text-xs">0</div>
        </div>
        
        {/* Gauge needle */}
        <div
          className="absolute left-1/2 bottom-1/2 w-1 h-[45%] bg-white rounded-full transition-transform duration-200 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
        />
        
        {/* Needle center */}
        <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Digital readout */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black border border-gray-700 px-2 rounded">
          <span className="font-mono text-sm text-gray-300">NET: </span>
          <span className="font-mono text-sm text-green-400">{net.toFixed(2)}</span>
        </div>
        
        {/* Output indicator */}
        <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full
          ${output ? 'bg-green-500' : 'bg-red-500'} shadow-lg flex items-center justify-center`}
        >
          <span className="font-mono text-xs text-white">{output}</span>
        </div>
      </div>
    </div>
  );
};

export default OutputGauge;