import TETROMINOES from "~/constants/tetrominoes";
import { type Position, type Tetromino } from "~/types/tetromino";

export const getTetrominoColor = (numberColorIndex: number) => {
  switch (numberColorIndex) {
    case 0:
      return "bg-[#14110F]";
    case 1:
      return "bg-[#34312D]";
    case 2:
      return "bg-[#7E7F83]";
    case 3:
      return "bg-[#D9C5B2]";
    case 4:
      return "bg-[#F3F3F4]";
    case 5:
      return "bg-[#5D4E6D]";
    case 6:
      return "bg-[#4F345A]";
    case 7:
      return "bg-[#D0CFCF]";
    default:
      return "bg-[#14110F]";
  }
};

export function getBorder(columnIndex: number, rowIndex: number): string {
  let border = "border-b";

  if (columnIndex === 0 || columnIndex <= 9) {
    border += " border-l";
  }
  if (rowIndex === 0) {
    border += " border-t";
  }
  if (columnIndex === 9) {
    border += " border-r";
  }

  return `${border} border-slate-400`;
}

export function getRandomTetromino(): Tetromino {
  if (TETROMINOES.length === 0) {
    throw new Error("No tetrominoes");
  }

  // Shuffle the array of tetrominoes
  for (let i = TETROMINOES.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [TETROMINOES[i]!, TETROMINOES[j]!] = [TETROMINOES[j], TETROMINOES[i]];
  }

  return TETROMINOES[0]!;
}

export function getTetriminoCoordinates(tetrimino: Tetromino, position: Position): Position[] {
  const coordinates: Position[] = [];

  tetrimino.shape.forEach((row, rowIndex) => {
    row.forEach((numberColorIndex, columnIndex) => {
      if (numberColorIndex > 0)
        coordinates.push({
          x: position.x + columnIndex,
          y: position.y + rowIndex,
        });
    });
  });

  return coordinates;
}

export function isValidPosition(boardState: number[][], position: Position[]): boolean {
  return position.every(({ x, y }: Position) => {
    return (
      // check if y is in the range of boardState
      y >= 0 &&
      y < boardState.length &&
      // check if x is in the range of boardState
      x >= 0 &&
      x < boardState[0].length &&
      // check if there is no block at the position
      !boardState[y][x] &&
      // check if the position reach the bottom of the board
      y < boardState.length
    );
  });
}

export function moveTetriminoDown(boardState: number[][], tetrimino: Tetromino, position: Position): Position {
  const newPosition: Position = { x: position.x, y: position.y + 1 };
  const newCoordinates = getTetriminoCoordinates(tetrimino, newPosition);

  if (isValidPosition(boardState, newCoordinates)) {
    return newPosition;
  }

  return position;
}

export function mergeTetriminoWithBoard(board: number[][], tetrimino: Tetromino, position: Position): number[][] {
  const merged = board.map((row) => row.slice());
  const coordinates = getTetriminoCoordinates(tetrimino, position);

  coordinates.forEach(({ x, y }) => {
    merged[y][x] = tetrimino.color;
  });

  return merged;
}

export function isBoardFull(clearedBoard: number[][], tetrimino: Tetromino): boolean {
  const newTetriminoCoordinates = getTetriminoCoordinates(tetrimino, {
    x: 4,
    y: 0,
  });
  if (!isValidPosition(clearedBoard, newTetriminoCoordinates)) return true;
  return false;
}

export function rotateMatrix(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = new Array(cols).fill(0).map(() => new Array(rows).fill(0));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      result[col][rows - 1 - row] = matrix[row][col];
    }
  }

  return result;
}

export function clearFullRows(board: number[][]): number[][] {
  const clearedBoard = board.filter((row) => !row.every((cell) => cell > 0));

  while (clearedBoard.length < board.length) {
    clearedBoard.unshift(new Array(board[0].length).fill(0));
  }

  return clearedBoard;
}

export function getDropPosition(boardState: number[][], tetrimino: Tetromino, position: Position): number {
  let newY = position.y;

  while (true) {
    const newPosition: Position = { x: position.x, y: newY + 1 };
    const newCoordinates = getTetriminoCoordinates(tetrimino, newPosition);

    if (!isValidPosition(boardState, newCoordinates)) {
      break;
    }

    newY += 1;
  }

  return newY;
}
