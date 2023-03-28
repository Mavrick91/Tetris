import React, { type FC } from "react";
import Cell from "../Cell";

export interface RowProps {
  row: number[];
}

const Row: FC<RowProps> = ({ row }) => {
  return (
    <div className="flex">
      {row.map((cell, index) => (
        <Cell key={index} cell={cell} />
      ))}
    </div>
  );
};

export default Row;
