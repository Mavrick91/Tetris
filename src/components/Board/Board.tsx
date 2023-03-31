import { type FC, useCallback, useEffect, useState, type Dispatch, type SetStateAction, useRef } from "react";
import { type Position, type Tetromino } from "~/types/tetromino";
import { isEqual } from "lodash";
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
} from "~/utils/tetrominoes";
import Row from "../Row";

type BoardState = number[][];

const initialBoard: BoardState = Array.from({ length: 20 }, () => Array.from({ length: 10 }, () => 0));

type Props = {
  tetrimino: Tetromino;
  setTetrimino: Dispatch<SetStateAction<Tetromino | undefined>>;
  setScore: Dispatch<SetStateAction<number>>;
  tetriminoQueue: Tetromino[];
  setTetriminoQueue: Dispatch<SetStateAction<Tetromino[]>>;
  interval: number;
};

const Board: FC<Props> = ({ tetrimino, setTetrimino, setScore, tetriminoQueue, setTetriminoQueue, interval }) => {
  const [boardState, setBoardState] = useState(initialBoard);
  const [position, setPosition] = useState<Position>({ x: 4, y: 0 });

  const mergedBoard = mergeTetriminoWithBoard(boardState, tetrimino, position);

  const updateScore = useCallback(
    (clearedRows: number) => {
      const pointsPerRow = 100;
      const bonus = clearedRows > 1 ? 50 * (clearedRows - 1) : 0;
      setScore((prevScore) => prevScore + clearedRows * pointsPerRow + bonus);
    },
    [setScore]
  );

  const moveDown = useCallback(() => {
    const newPosition = moveTetriminoDown(boardState, tetrimino, position);

    if (!isEqual(position, newPosition)) {
      setPosition(newPosition);
    } else {
      const initialRowCount = boardState.filter((row) => row.some((cell) => cell > 0)).length;
      const clearedBoard = clearFullRows(mergedBoard);
      const newRowCount = clearedBoard.filter((row) => row.some((cell) => cell > 0)).length;
      const clearedRows = initialRowCount - newRowCount;

      if (clearedRows > 0) {
        updateScore(clearedRows);
      }

      setBoardState(clearedBoard);
      const [, ...remainingTetriminos] = tetriminoQueue;
      setTetriminoQueue([...remainingTetriminos, getRandomTetromino()]);
      setTetrimino(tetriminoQueue[0]);
      setPosition({ x: 4, y: 0 });
    }
  }, [boardState, mergedBoard, position, setTetrimino, setTetriminoQueue, tetrimino, tetriminoQueue, updateScore]);

  const moveDownRef = useRef(moveDown);
  moveDownRef.current = moveDown;

  useEffect(() => {
    const moveDownTimer = setInterval(() => {
      if (isBoardFull(boardState, tetrimino)) {
        alert("Game Over");
        clearInterval(moveDownTimer);
      } else moveDownRef.current();
    }, interval);

    return () => clearInterval(moveDownTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardState, interval]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const newPosition = { ...position };

      switch (event.key) {
        case "a":
          newPosition.x -= 1;
          break;
        case "d":
          newPosition.x += 1;
          break;
        case "s":
          newPosition.y += 1;
          break;
        case "w":
          const rotatedShape = rotateMatrix(tetrimino.shape);
          const rotatedTetrimino = { ...tetrimino, shape: rotatedShape };
          const newCoordinates = getTetriminoCoordinates(rotatedTetrimino, position);
          if (isValidPosition(boardState, newCoordinates)) {
            setTetrimino(rotatedTetrimino);
          }
          break;
        case " ":
          const newPosY = getDropPosition(boardState, tetrimino, position);
          newPosition.y = newPosY;
          break;
        default:
          return;
      }

      const newCoordinates = getTetriminoCoordinates(tetrimino, newPosition);
      if (isValidPosition(boardState, newCoordinates)) {
        setPosition(newPosition);
      }
    },
    [boardState, position, setTetrimino, tetrimino]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [boardState, tetrimino, position, handleKeyDown]);

  return (
    <div
      className="flex flex-col border-[16px] border-[#3A506B] rounded-tl rounded-bl"
      style={{
        boxShadow: "6px 3px 7px rgba(0, 0, 0)",
      }}
    >
      {mergedBoard.map((row, index) => (
        <Row key={index} row={row} rowIndex={index} />
      ))}
    </div>
  );
};

export default Board;
