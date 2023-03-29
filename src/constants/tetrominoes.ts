import { type Tetromino } from "~/types/tetromino";

const TETROMINOES: Tetromino[] = [
  {
    // I shape
    shape: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: 1,
  },
  {
    // J shape
    shape: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    color: 2,
  },
  {
    // L shape
    shape: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    color: 3,
  },
  {
    // O shape
    shape: [
      [4, 4],
      [4, 4],
    ],
    color: 4,
  },
  {
    // S shape
    shape: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    color: 5,
  },
  {
    // T shape
    shape: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    color: 6,
  },
  {
    // Z shape
    shape: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
    color: 7,
  },
];

export default TETROMINOES;
