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

// Update weights using the perceptron learning rule
export const updateWeights = (
  state: PerceptronState,
  learningRate: number = 0.05
): [number[], number] => {
  const { inputs, weights, bias, target, output } = state;

  // Skip update if target equals output (perceptron is correct)
  if (target === output) {
    return [weights, bias];
  }

  // Calculate error term: (target - output)
  const error = target - output;

  // Update each weight: w_i += learning_rate * error * input_i
  // With bipolar inputs, ALL weights get updated (not just those with input=1)
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

// Convert binary pattern (0,1) to bipolar (-1,1) if needed
export const toBipolar = (pattern: number[]): number[] => {
  return pattern.map((val) => (val === 0 ? -1 : 1));
};
