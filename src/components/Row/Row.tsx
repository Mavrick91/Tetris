import React, { type FC } from "react";
import Cell from "../Cell";

type Props = {
  row: number[];
  rowIndex: number;
};

const Row: FC<Props> = ({ row, rowIndex }) => {
  return (
    <div className="flex">
      {row.map((cell, index) => (
        <Cell key={index} numberColorIndex={cell} columnIndex={index} rowIndex={rowIndex} />
      ))}
    </div>
  );
};

export default Row;
