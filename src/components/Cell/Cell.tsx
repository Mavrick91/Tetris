import { type FC } from "react";
import { getBorder, getTetrominoColor } from "~/utils/tetrominoes";

type Props = {
  numberColorIndex: number;
  columnIndex: number;
  rowIndex: number;
};

const Cell: FC<Props> = ({ numberColorIndex, columnIndex, rowIndex }) => {
  return <div className={`${getBorder(columnIndex, rowIndex)} w-12 h-12 ${getTetrominoColor(numberColorIndex)}`} />;
};

export default Cell;
