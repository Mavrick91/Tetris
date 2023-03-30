import { type FC } from "react";
import { getBorder, getTetrominoColor } from "~/utils/tetrominoes";

type Props = {
  numberColorIndex: number;
  columnIndex: number;
  rowIndex: number;
};

const Cell: FC<Props> = ({ numberColorIndex, columnIndex, rowIndex }) => {
  return (
    <div
      className={`${getBorder(columnIndex, rowIndex)} border-slate-500 w-12 h-12 ${getTetrominoColor(
        numberColorIndex
      )} shadow-lg`}
      style={{
        boxShadow: numberColorIndex
          ? "inset -3px 3px 7px rgba(255, 255, 255, 0.55), inset 3px -3px 7px rgba(0, 0, 0, 0.6)"
          : "",
      }}
    ></div>
  );
};

export default Cell;
