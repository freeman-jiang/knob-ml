import React from 'react';
import usePerceptron from './hooks/usePerceptron';
import InputMatrix from './components/InputMatrix';
import WeightPanel from './components/WeightPanel';
import OutputGauge from './components/OutputGauge';
import ControlBar from './components/ControlBar';

function App() {
  const {
    state,
    initializePerceptron,
    updateWeight,
    updateBias,
    toggleInput,
    setTarget,
    setLetterPattern,
    resetWeights,
    trainStep,
    getWeightHints,
    getBiasHint,
  } = usePerceptron();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black py-4 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-mono font-bold text-center">
            Hand-Trained Perceptron Letter Recognizer
          </h1>
          <p className="text-center text-gray-400 mt-2 font-mono">
            A single-layer perceptron for binary classification of 5×5 pixel patterns
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column: Input Matrix */}
          <div className="lg:col-span-1">
            <InputMatrix
              inputs={state.inputs}
              toggleInput={toggleInput}
            />
          </div>

          {/* Middle column: Weight Panel */}
          <div className="lg:col-span-3">
            <WeightPanel
              weights={state.weights}
              bias={state.bias}
              inputs={state.inputs}
              updateWeight={updateWeight}
              updateBias={updateBias}
              weightHints={getWeightHints()}
              biasHint={getBiasHint()}
              training={state.training}
            />
          </div>

          {/* Right column: Output Gauge */}
          <div className="lg:col-span-1">
            <OutputGauge
              net={state.net}
              output={state.output}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8">
          <ControlBar
            onClear={initializePerceptron}
            onReset={resetWeights}
            onLetterSelect={setLetterPattern}
            onToggleTraining={trainStep}
            training={false}
            onSetTarget={setTarget}
            target={state.target}
            currentLetter={state.currentLetter}
          />
        </div>

        {/* Information panel */}
        <div className="mt-8 bg-gray-800 p-6 rounded-md shadow-lg">
          <h2 className="text-xl font-mono mb-4 border-b border-gray-700 pb-2">
            How to Use This Perceptron
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-mono text-lg mb-2">Manual Training</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Select a letter preset or draw a pattern</li>
                <li>Set your target output (YES=1 or NO=0)</li>
                <li>Adjust weights by rotating knobs</li>
                <li>Watch the output gauge respond in real-time</li>
                <li>Green/red halos around knobs suggest which weights to adjust</li>
              </ol>
            </div>
            <div>
              <h3 className="font-mono text-lg mb-2">Step Training</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Select a letter pattern and set target</li>
                <li>Click "TRAIN STEP" to perform one training step</li>
                <li>Watch weights automatically adjust</li>
                <li>Observe how each step affects the output</li>
                <li>Repeat steps until output matches target</li>
              </ol>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h3 className="font-mono text-lg mb-2">Understanding Perceptrons</h3>
            <p className="text-gray-300">
              The perceptron calculates a weighted sum of inputs (NET = Σ w_i × x_i + bias).
              If NET {'>'} 0, output is YES (1); otherwise, it's NO (0).
              Training adjusts weights to minimize error: w_new = w_old + lr × (target - output) × input.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;