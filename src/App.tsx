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
      <header className="bg-black py-4 border-b border-gray-700 relative">
        <a
          href="https://github.com/freemanjiang/letterknob"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 text-gray-400 hover:text-white hidden md:block"
          title="View on GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
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
