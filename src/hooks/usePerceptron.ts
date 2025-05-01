import { useCallback, useState } from "react";
import { PerceptronState } from "../types";
import { letterPatterns } from "../utils/letterPatterns";
import {
  applyActivation,
  calculateNet,
  toBipolar,
  updateWeights,
} from "../utils/perceptron";

const MATRIX_SIZE = 4;
const INPUT_COUNT = MATRIX_SIZE * MATRIX_SIZE;

type HintType = "increase" | "decrease" | "correct";

const usePerceptron = () => {
  const [state, setState] = useState<PerceptronState>({
    inputs: Array(INPUT_COUNT).fill(-1),
    weights: Array(INPUT_COUNT).fill(0),
    bias: 0,
    net: 0,
    output: 0,
    target: 1, // Default target is 1 (YES)
    training: false,
    currentLetter: null,
  });

  const [showHints, setShowHints] = useState(false);
  // Store calculated hints in state
  const [storedWeightHints, setStoredWeightHints] = useState<HintType[]>(
    Array(INPUT_COUNT).fill("correct")
  );
  const [storedBiasHint, setStoredBiasHint] = useState<HintType>("correct");

  // Initialize perceptron state
  const initializePerceptron = useCallback(() => {
    setState((prev) => ({
      ...prev,
      inputs: Array(INPUT_COUNT).fill(-1),
      weights: Array(INPUT_COUNT).fill(0),
      bias: 0,
      net: 0,
      output: 0,
      currentLetter: null,
      training: false,
    }));
  }, []);

  // Update weights manually
  const updateWeight = useCallback((index: number, value: number) => {
    setState((prev) => {
      const newWeights = [...prev.weights];
      newWeights[index] = value;

      // Recalculate net and output
      const newNet = calculateNet(prev.inputs, newWeights, prev.bias);
      const newOutput = applyActivation(newNet);

      return {
        ...prev,
        weights: newWeights,
        net: newNet,
        output: newOutput,
      };
    });
  }, []);

  // Update bias manually
  const updateBias = useCallback((value: number) => {
    setState((prev) => {
      const newBias = value;

      // Recalculate net and output
      const newNet = calculateNet(prev.inputs, prev.weights, newBias);
      const newOutput = applyActivation(newNet);

      return {
        ...prev,
        bias: newBias,
        net: newNet,
        output: newOutput,
      };
    });
  }, []);

  // Toggle pixel in the input matrix (toggle between -1 and 1)
  const toggleInput = useCallback((index: number) => {
    setState((prev) => {
      const newInputs = [...prev.inputs];
      newInputs[index] = newInputs[index] === -1 ? 1 : -1;

      // Recalculate net and output
      const newNet = calculateNet(newInputs, prev.weights, prev.bias);
      const newOutput = applyActivation(newNet);

      return {
        ...prev,
        inputs: newInputs,
        net: newNet,
        output: newOutput,
        currentLetter: null,
      };
    });
  }, []);

  // Set target (expected output)
  const setTarget = useCallback((target: 0 | 1) => {
    setState((prev) => ({
      ...prev,
      target,
    }));
  }, []);

  // Set a preset letter pattern
  const setLetterPattern = useCallback((letter: string) => {
    if (!letterPatterns[letter]) return;

    setState((prev) => {
      const newInputs = toBipolar([...letterPatterns[letter]]);

      // Recalculate net and output
      const newNet = calculateNet(newInputs, prev.weights, prev.bias);
      const newOutput = applyActivation(newNet);

      return {
        ...prev,
        inputs: newInputs,
        net: newNet,
        output: newOutput,
        currentLetter: letter,
      };
    });
  }, []);

  // Reset weights and bias to zero
  const resetWeights = useCallback(() => {
    setState((prev) => {
      const newWeights = Array(INPUT_COUNT).fill(0);
      const newBias = 0;

      // Recalculate net and output
      const newNet = calculateNet(prev.inputs, newWeights, newBias);
      const newOutput = applyActivation(newNet);

      return {
        ...prev,
        weights: newWeights,
        bias: newBias,
        net: newNet,
        output: newOutput,
      };
    });
  }, []);

  // Perform one step of perceptron training
  const trainStep = useCallback(() => {
    setState((prev) => {
      // Skip if already correct
      if (prev.output === prev.target) {
        return prev;
      }

      // Use a smaller learning rate for more gradual updates
      const [newWeights, newBias] = updateWeights(prev);

      // Recalculate net and output
      const newNet = calculateNet(prev.inputs, newWeights, newBias);
      const newOutput = applyActivation(newNet);

      return {
        ...prev,
        weights: newWeights,
        bias: newBias,
        net: newNet,
        output: newOutput,
      };
    });
  }, []);

  // Calculate weight adjustment hints based directly on target value
  const calculateWeightHints = useCallback(() => {
    return state.inputs.map((input) => {
      // For target=1, we want positive inputs to have positive weights (increase)
      // and negative inputs to have negative weights (decrease)
      // For target=0, we want the opposite
      if (input === 1) {
        // For +1 inputs: increase for target=1, decrease for target=0
        return state.target === 1 ? "increase" : "decrease";
      } else {
        // For -1 inputs: decrease for target=1, increase for target=0
        return state.target === 1 ? "decrease" : "increase";
      }
    }) as HintType[];
  }, [state.inputs, state.target]);

  // Calculate bias adjustment hint based directly on target value
  const calculateBiasHint = useCallback(() => {
    // For target=1, we want to increase bias to make activation more likely
    // For target=0, we want to decrease bias to make activation less likely
    return state.target === 1 ? "increase" : "decrease";
  }, [state.target]);

  // Toggle hint visibility and calculate new hints when showing them
  const toggleHints = useCallback(() => {
    setShowHints((prev) => {
      // If we're turning hints on, calculate and store new hints
      if (!prev) {
        setStoredWeightHints(calculateWeightHints());
        setStoredBiasHint(calculateBiasHint());
      }
      return !prev;
    });
  }, [calculateWeightHints, calculateBiasHint]);

  // Get weight adjustment hints (use stored hints when showing)
  const getWeightHints = useCallback(() => {
    return showHints
      ? storedWeightHints
      : Array(state.weights.length).fill("correct" as const);
  }, [showHints, storedWeightHints, state.weights.length]);

  // Get bias adjustment hint (use stored hint when showing)
  const getBiasHint = useCallback(() => {
    return showHints ? storedBiasHint : ("correct" as const);
  }, [showHints, storedBiasHint]);

  return {
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
  };
};

export default usePerceptron;
