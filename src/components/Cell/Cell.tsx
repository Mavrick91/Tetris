import { type FC } from "react";
import { getTetrominoColor } from "~/utils/tetrominoes";

type Props = {
  numberColorIndex: number;
  columnIndex: number;
  rowIndex: number;
};

const getBorder = (columnIndex: number, rowIndex: number) => {
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

  return border;
};

const Cell: FC<Props> = ({ numberColorIndex, columnIndex, rowIndex }) => {
  return (
    <div
      className={`${getBorder(columnIndex, rowIndex)} border-slate-500 w-12 h-12 ${getTetrominoColor(
        numberColorIndex
      )}`}
    />
  );
};

export default Cell;
