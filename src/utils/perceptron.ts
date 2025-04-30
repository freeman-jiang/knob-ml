import { PerceptronState } from "../types";

// Calculate the weighted sum (net input) of the perceptron
export const calculateNet = (
  inputs: number[],
  weights: number[],
  bias: number
): number => {
  // Sum of (input_i * weight_i) for all i, plus bias
  return inputs.reduce((sum, input, index) => {
    return sum + input * weights[index];
  }, bias);
};

// Apply the step activation function to the net input
export const applyActivation = (net: number): 0 | 1 => {
  return net > 0 ? 1 : 0;
};

// Calculate if a weight needs adjustment based on the perceptron learning rule
export const getWeightHint = (
  input: number,
  weight: number,
  target: 0 | 1,
  output: 0 | 1
): "increase" | "decrease" | "correct" => {
  if (target === output) return "correct";

  // Only adjust weights for active inputs
  if (input === 0) return "correct";

  return target > output ? "increase" : "decrease";
};

// Update weights using the perceptron learning rule
export const updateWeights = (
  state: PerceptronState,
  learningRate: number = 0.1
): [number[], number] => {
  const { inputs, weights, bias, target, output } = state;

  // Skip update if target equals output (perceptron is correct)
  if (target === output) {
    return [weights, bias];
  }

  // Calculate error term: (target - output)
  const error = target - output;

  // Update each weight: w_i += learning_rate * error * input_i
  const newWeights = weights.map((weight, i) => {
    return weight + learningRate * error * inputs[i];
  });

  // Update bias: bias += learning_rate * error
  const newBias = bias + learningRate * error;

  return [newWeights, newBias];
};

// Initialize weights and bias to small random values
export const initializeWeights = (size: number): number[] => {
  return Array(size)
    .fill(0)
    .map(() => Math.random() * 2 - 1);
};

// Clamp weight values to prevent extreme values
export const clampWeight = (
  value: number,
  min: number = -10,
  max: number = 10
): number => {
  return Math.max(min, Math.min(max, value));
};
