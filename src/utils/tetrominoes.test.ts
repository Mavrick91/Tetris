import TETROMINOES from "~/constants/tetrominoes";
import { type Position, type Tetromino } from "~/types/tetromino";
import {
  clearFullRows,
  getDropPosition,
  getRandomTetromino,
  getTetriminoCoordinates,
  isBoardFull,
  isValidPosition,
  mergeTetriminoWithBoard,
  moveTetriminoDown,
  rotateMatrix,
} from "./tetrominoes";

describe("getRandomTetromino", () => {
  test("should return a valid tetromino with shape and color properties", () => {
    const tetromino = getRandomTetromino();
    expect(tetromino).toHaveProperty("shape");
    expect(tetromino).toHaveProperty("color");
    expect(Array.isArray(tetromino.shape)).toBeTruthy();
    expect(typeof tetromino.color).toBe("number");
  });

  test("should return a random tetromino from the TETROMINOES array", () => {
    const samples = new Set();
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      const tetromino = getRandomTetromino();
      samples.add(JSON.stringify(tetromino));
    }

    // Check if at least 2 different tetrominos are present in the samples.
    // This isn't a 100% guarantee that the function is random, but it's a good indicator.
    expect(samples.size).toBeGreaterThanOrEqual(2);
  });

  test("should throw an error if there are no tetrominoes", () => {
    const originalTetrominoes = [...TETROMINOES];
    TETROMINOES.length = 0; // Empty the TETROMINOES array

    expect(getRandomTetromino).toThrowError("No tetrominoes");

    TETROMINOES.push(...originalTetrominoes); // Restore the original TETROMINOES array
  });

  test("should throw an error if an invalid tetromino is found", () => {
    const originalTetrominoes = [...TETROMINOES];

    // @ts-ignore
    TETROMINOES.push(undefined);

    let invalidTetrominoFound = false;

    for (let i = 0; i < 100; i++) {
      try {
        getRandomTetromino();
      } catch (error) {
        if (error.message === "Invalid tetromino") {
          invalidTetrominoFound = true;
          break;
        }
      }
    }

    expect(invalidTetrominoFound).toBeTruthy();

    TETROMINOES.length = originalTetrominoes.length; // Restore the original TETROMINOES array
  });
});

describe("getTetriminoCoordinates", () => {
  const tetriminoI: Tetromino = {
    shape: [[1, 1, 1, 1]],
    color: 1,
  };

  const tetriminoO: Tetromino = {
    shape: [
      [2, 2],
      [2, 2],
    ],
    color: 2,
  };

  const tetriminoComplex: Tetromino = {
    shape: [
      [3, 0, 0],
      [3, 3, 3],
    ],
    color: 3,
  };

  test("should return correct coordinates for I tetrimino", () => {
    const position = { x: 3, y: 2 };
    const coordinates = getTetriminoCoordinates(tetriminoI, position);

    expect(coordinates).toEqual([
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
      { x: 6, y: 2 },
    ]);
  });

  test("should return correct coordinates for O tetrimino", () => {
    const position = { x: 4, y: 1 };
    const coordinates = getTetriminoCoordinates(tetriminoO, position);

    expect(coordinates).toEqual([
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ]);
  });

  test("should return correct coordinates for a complex tetrimino", () => {
    const position = { x: 2, y: 1 };
    const coordinates = getTetriminoCoordinates(tetriminoComplex, position);

    expect(coordinates).toEqual([
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
    ]);
  });
});

describe("isValidPosition", () => {
  const emptyBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const occupiedBoard = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  test("should return true for valid position on an empty board", () => {
    const position = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];

    expect(isValidPosition(emptyBoard, position)).toBe(true);
  });

  test("should return false for invalid position on an occupied board", () => {
    const position = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];

    expect(isValidPosition(occupiedBoard, position)).toBe(false);
  });

  test("should return false for positions outside the board", () => {
    const position = [
      { x: -1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];

    expect(isValidPosition(emptyBoard, position)).toBe(false);
  });
});

describe("moveTetriminoDown", () => {
  const emptyBoard = Array.from({ length: 20 }, () =>
    Array.from({ length: 10 }, () => 0)
  );

  test("moves tetrimino down when position is valid", () => {
    const tetrimino: Tetromino = TETROMINOES[0];
    const position: Position = { x: 4, y: 0 };
    const expectedPosition: Position = { x: 4, y: 1 };

    const result = moveTetriminoDown(emptyBoard, tetrimino, position);

    expect(result).toEqual(expectedPosition);
  });

  test("does not move tetrimino down when position is not valid", () => {
    const tetrimino: Tetromino = TETROMINOES[0];
    const position: Position = { x: 4, y: 20 };
    const expectedPosition: Position = { x: 4, y: 20 };

    const result = moveTetriminoDown(emptyBoard, tetrimino, position);

    expect(result).toEqual(expectedPosition);
  });
});

describe("mergeTetriminoWithBoard", () => {
  const emptyBoard = Array.from({ length: 20 }, () =>
    Array.from({ length: 10 }, () => 0)
  );

  test("merges tetrimino with the board", () => {
    const tetrimino: Tetromino = TETROMINOES[0]; // Use any tetromino
    const position: Position = { x: 4, y: 0 };

    const result = mergeTetriminoWithBoard(emptyBoard, tetrimino, position);

    const expectedBoard = emptyBoard.map((row) => row.slice());
    tetrimino.shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          expectedBoard[position.y + rowIndex][position.x + colIndex] =
            tetrimino.color;
        }
      });
    });

    expect(result).toEqual(expectedBoard);
  });
});

describe("isBoardFull", () => {
  it("should return true if the board is full", () => {
    const fullBoard = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // ...other rows filled with 1s
    ];

    const tetrimino = getRandomTetromino();
    const result = isBoardFull(fullBoard, tetrimino);
    expect(result).toBe(true);
  });

  it("should return false if the board is not full", () => {
    const notFullBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // ...other rows filled with 1s except the first row
    ];

    const tetrimino = getRandomTetromino();
    const result = isBoardFull(notFullBoard, tetrimino);
    expect(result).toBe(false);
  });
});

describe("rotateMatrix", () => {
  test("should correctly rotate a square matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];

    const expected = [
      [3, 1],
      [4, 2],
    ];

    expect(rotateMatrix(matrix)).toEqual(expected);
  });

  test("should correctly rotate a rectangular matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const expected = [
      [4, 1],
      [5, 2],
      [6, 3],
    ];

    expect(rotateMatrix(matrix)).toEqual(expected);
  });

  test("should correctly rotate a matrix with a single element", () => {
    const matrix = [[1]];

    const expected = [[1]];

    expect(rotateMatrix(matrix)).toEqual(expected);
  });
});

describe("clearFullRows", () => {
  it("removes full rows and adds empty rows on top", () => {
    const initialBoard = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const expectedBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    ];

    const result = clearFullRows(initialBoard);

    expect(result).toEqual(expectedBoard);
  });

  it("returns the same board if no full rows", () => {
    const initialBoard = [
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    ];

    const result = clearFullRows(initialBoard);

    expect(result).toEqual(initialBoard);
  });
});

describe("getDropPosition", () => {
  const emptyBoard: number[][] = Array.from({ length: 20 }, () =>
    Array.from({ length: 10 }, () => 0)
  );

  const tetrimino: Tetromino = {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: 1,
  };

  const startPosition: Position = { x: 4, y: 0 };

  test("should return correct drop position for empty board", () => {
    const result = getDropPosition(emptyBoard, tetrimino, startPosition);
    expect(result).toBe(18);
  });

  test("should return correct drop position for board with obstacles", () => {
    const boardWithObstacles = [
      ...emptyBoard.slice(0, 15),
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    ];

    const result = getDropPosition(
      boardWithObstacles,
      tetrimino,
      startPosition
    );
    expect(result).toBe(15);
  });

  test("should return correct drop position when Tetrimino is spawned inside obstacles", () => {
    const boardWithObstacles = [
      ...emptyBoard.slice(0, 14),
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    ];

    const result = getDropPosition(
      boardWithObstacles,
      tetrimino,
      startPosition
    );
    expect(result).toBe(13);
  });
});
