import Image from "next/image";
import React from "react";

interface AnswerStatsPorps {
  correctCount: number;
  incorrectCount: number;
}

const AnswerStats = ({ correctCount, incorrectCount }: AnswerStatsPorps) => {
  return (
    <div>
      <div className="flex items-center gap-x-3">
        <Image
          className="w-7"
          src={"/correct-check.svg"}
          alt="correct answers"
          height={100}
          width={100}
        />
        <div className="font-medium text-green-600">
          Correct: {correctCount}
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Image
          className="w-7"
          src={"/incorrect-check.svg"}
          alt="incorrect answers"
          height={100}
          width={100}
        />
        <div className="font-medium text-red-600">
          InCorrect: {incorrectCount}
        </div>
      </div>
    </div>
  );
};

export default AnswerStats;
