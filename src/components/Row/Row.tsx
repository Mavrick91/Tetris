import React, { type FC } from "react";
import Cell from "../Cell";

type Props = {
  row: number[];
};

const Row: FC<Props> = ({ row }) => {
  return (
    <div className="flex">
      {row.map((cell, index) => (
        <Cell key={index} numberColorIndex={cell} />
      ))}
    </div>
  );
};

export default Row;
