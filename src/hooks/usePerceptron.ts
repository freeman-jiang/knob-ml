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

  // Get weight adjustment hints
  const getWeightHints = useCallback(() => {
    return state.weights.map((weight, index) => {
      const input = state.inputs[index];

      // Don't suggest changes if target equals output
      if (state.target === state.output) return "correct";

      // For bipolar inputs, both +1 and -1 contribute to learning
      // For +1 inputs, increase weights if target > output, decrease if target < output
      // For -1 inputs, do the opposite (decrease if target > output, increase if target < output)
      if (input === 1) {
        return state.target > state.output ? "increase" : "decrease";
      } else {
        // input === -1
        return state.target > state.output ? "decrease" : "increase";
      }
    });
  }, [state.weights, state.inputs, state.target, state.output]);

  // Get bias adjustment hint
  const getBiasHint = useCallback(() => {
    // Don't suggest changes if target equals output
    if (state.target === state.output) return "correct";

    return state.target > state.output ? "increase" : "decrease";
  }, [state.target, state.output]);

  return {
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
  };
};

export default usePerceptron;
