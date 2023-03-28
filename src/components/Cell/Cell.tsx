import { type FC } from "react";

type Props = {
  cell: number;
};

const Cell: FC<Props> = ({ cell }) => {
  return <div className="border h-11 w-11"></div>;
};

export default Cell;
