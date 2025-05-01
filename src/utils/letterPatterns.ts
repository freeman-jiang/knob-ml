// 4x4 pixel patterns for simplified letter forms
// 1 represents an active pixel, 0 represents an inactive pixel

// Define letter pattern keys as a type for better TypeScript support

// We only have 4 shapes
// See: https://youtu.be/l-9ALe3U-Fg?si=A_qPAfT6f3f7U-Ab&t=54
export const letterPatterns: Record<string, number[]> = {
  "T-left": [
    1, 1, 1, 0,
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0,
  ],
  
  "T-right": [
    0, 1, 1, 1,
    0, 0, 1, 0,
    0, 0, 1, 0,
    0, 0, 1, 0
  ],
  "J-left": [
    0, 0, 1, 0,
    0, 0, 1, 0,
    1, 0, 1, 0,
    1, 1, 1, 0
  ],
  "J-right": [
    0, 0, 0, 1,
    0, 0, 0, 1,
    0, 1, 0, 1,
    0, 1, 1, 1
  ]
};
