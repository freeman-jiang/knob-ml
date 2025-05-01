import ControlBar from "./components/ControlBar";
import InfoPanel from "./components/InfoPanel";
import InputMatrix from "./components/InputMatrix";
import OutputGauge from "./components/OutputGauge";
import WeightPanel from "./components/WeightPanel";
import usePerceptron from "./hooks/usePerceptron";

function App() {
  const {
    state,
    showHints,
    initializePerceptron,
    updateWeight,
    updateBias,
    toggleInput,
    setTarget,
    setLetterPattern,
    resetWeights,
    trainStep,
    toggleHints,
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
            A single-layer perceptron for binary classification of 4×4 pixel
            patterns
          </p>
        </div>
      </header>

      <main className="w-full px-4 py-8">
        <div className="flex flex-wrap flex-row gap-6 w-full justify-center items-stretch">
          {/* Left column: Input Matrix */}
          <div className="flex flex-col">
            <h2 className="text-xl font-mono mb-4 uppercase tracking-wider text-center">
              Input Matrix
            </h2>
            <InputMatrix inputs={state.inputs} toggleInput={toggleInput} />
          </div>

          {/* Middle column: Weight Panel */}
          <div className="flex flex-col">
            <h2 className="text-xl font-mono mb-4 uppercase tracking-wider text-center">
              Weight Panel
            </h2>
            <WeightPanel
              weights={state.weights}
              bias={state.bias}
              inputs={state.inputs}
              updateWeight={updateWeight}
              updateBias={updateBias}
              weightHints={getWeightHints()}
              biasHint={getBiasHint()}
              training={state.training}
            />{" "}
          </div>

          {/* Right column: Output Gauge */}
          <div className="flex flex-col">
            <h2 className="text-xl font-mono mb-4 uppercase tracking-wider text-center">
              Input Matrix
            </h2>
            <OutputGauge net={state.net} output={state.output} />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8">
          <ControlBar
            onClear={initializePerceptron}
            onReset={resetWeights}
            onLetterSelect={setLetterPattern}
            onToggleTraining={trainStep}
            onToggleHints={toggleHints}
            showHints={showHints}
            training={false}
            onSetTarget={setTarget}
            target={state.target}
            currentLetter={state.currentLetter}
          />
        </div>

        {/* Information panel */}
        <InfoPanel />
      </main>
    </div>
  );
}

export default App;
