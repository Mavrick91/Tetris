import { type Tetromino } from "~/types/tetromino";
import { getTetrominoColor } from "~/utils/tetrominoes";

type NextTetriminosProps = {
  tetriminoQueue: Tetromino[];
};

const NextTetriminos = ({ tetriminoQueue }: NextTetriminosProps) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      {tetriminoQueue.map((tetrimino, columnIndex) => (
        <div key={columnIndex}>
          {tetrimino.shape.map((row, rowIndex) => {
            if (row.every((cell) => !cell)) {
              return null;
            }
            return (
              <div key={rowIndex} className="flex">
                {row.map((cell, cellIndex) => {
                  return (
                    <div
                      key={cellIndex}
                      className={`w-6 h-6 border-gray-400 ${
                        cell
                          ? `${getTetrominoColor(tetrimino.color)} border border-slate-300 shadow-inner`
                          : "bg-transparent"
                      }`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NextTetriminos;
