import { useCallback, useEffect, useState } from "react";
import { type Tetromino } from "~/types/tetromino";
import { getRandomTetromino } from "~/utils/tetrominoes";
import Board from "../Board";
import ScoreBoard from "../ScoreBoard";

const Tetris = () => {
  const [tetrimino, setTetrimino] = useState<Tetromino>();
  const [score, setScore] = useState(0);

  useEffect(() => {
    setTetrimino(getRandomTetromino());
  }, []);

  const updateTetrimino = useCallback((tetrimino: Tetromino) => {
    setTetrimino(tetrimino);
  }, []);

  if (!tetrimino) {
    return null;
  }

  return (
    <div>
      <Board
        setScore={setScore}
        tetrimino={tetrimino}
        setTetrimino={updateTetrimino}
      />
      <ScoreBoard score={score} />
    </div>
  );
};

export default Tetris;
