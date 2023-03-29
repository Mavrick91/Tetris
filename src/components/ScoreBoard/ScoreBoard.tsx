import { type FC } from "react";

type Props = {
  score: number;
};

const ScoreBoard: FC<Props> = ({ score }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold mb-2">Score</div>
      <div className="text-2xl font-mono">{score}</div>
    </div>
  );
};

export default ScoreBoard;
