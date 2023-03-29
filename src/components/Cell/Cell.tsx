import { type FC } from "react";

type Props = {
  numberColorIndex: number;
};

const getColor = (numberColorIndex: number) => {
  switch (numberColorIndex) {
    case 0:
      return "bg-white";
    case 1:
      return "bg-blue-500";
    case 2:
      return "bg-red-500";
    case 3:
      return "bg-green-500";
    case 4:
      return "bg-yellow-500";
    case 5:
      return "bg-purple-500";
    case 6:
      return "bg-pink-500";
    case 7:
      return "bg-orange-500";
    default:
      return "bg-white";
  }
};

const Cell: FC<Props> = ({ numberColorIndex }) => {
  return <div className={`border h-11 w-11 ${getColor(numberColorIndex)}`} />;
};

export default Cell;
