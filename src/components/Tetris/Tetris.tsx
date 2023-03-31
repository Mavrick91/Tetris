import { useEffect, useState } from "react";
import { type Tetromino } from "~/types/tetromino";
import { getRandomTetromino } from "~/utils/tetrominoes";
import Board from "../Board";
import NextTetriminos from "../NextTetrimino";
import ScoreBoard from "../ScoreBoard";

const Tetris = () => {
  const [tetrimino, setTetrimino] = useState<Tetromino>();
  const [score, setScore] = useState(0);
  const [tetriminoQueue, setTetriminoQueue] = useState<Tetromino[]>([
    getRandomTetromino(),
    getRandomTetromino(),
    getRandomTetromino(),
  ]);

  useEffect(() => {
    setTetrimino(getRandomTetromino());
    setTetriminoQueue([getRandomTetromino(), getRandomTetromino(), getRandomTetromino()]);
  }, []);

  if (!tetrimino) {
    return null;
  }

  return (
    <div className="flex shadow-lg">
      <Board
        setScore={setScore}
        tetrimino={tetrimino}
        setTetrimino={setTetrimino}
        tetriminoQueue={tetriminoQueue}
        setTetriminoQueue={setTetriminoQueue}
      />
      <div
        className="p-6 px-12 rounded-tr rounded-br border-8 border-[#3A506B] border-t-[92px] relative flex items-start justify-center w-[210px]"
        style={{
          boxShadow: "6px 3px 7px rgba(0, 0, 0)",
        }}
      >
        <ScoreBoard score={score} />
        <NextTetriminos tetriminoQueue={tetriminoQueue} />
      </div>
    </div>
  );
};

export default Tetris;
