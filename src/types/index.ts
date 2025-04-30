export interface PerceptronState {
  inputs: number[];
  weights: number[];
  bias: number;
  net: number;
  output: 0 | 1;
  target: 0 | 1;
  training: boolean;
  currentLetter: string | null;
}

export interface InputCell {
  id: number;
  active: boolean;
}

export interface Weight {
  id: number;
  value: number;
  inputActive: boolean;
}