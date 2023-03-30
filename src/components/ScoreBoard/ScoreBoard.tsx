import { type FC } from "react";

type Props = {
  score: number;
};

const ScoreBoard: FC<Props> = ({ score }) => {
  return (
    <div className="flex flex-col items-center absolute -top-[76px] inset-x-0 font-sans text-white">
      <div className="text-xl font-bold mb-2">Score</div>
      <div className="text-2xl font-mono">{score.toLocaleString()}</div>
    </div>
  );
};

export default ScoreBoard;
