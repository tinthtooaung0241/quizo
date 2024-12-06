"use client";
import { Travia } from "@/types/travia";
import { useState } from "react";
import BooleanQuestion from "./boolean-question";
import MultipleQuestion from "./multiple-question";

interface TraviaCardProps {
  travia: Travia;
  onCorrectCount: (correct: boolean) => void;
}

const TraviaCard = ({ travia, onCorrectCount }: TraviaCardProps) => {
  const [selectedAnswerState, setSelectedAnswerState] = useState<{
    selectedAnswer: string | null;
    isCorrect: boolean;
  }>({
    selectedAnswer: null,
    isCorrect: false,
  });

  const handleClick = (answer: string) => {
    if (!selectedAnswerState.selectedAnswer) {
      const isCorrect = answer === travia.correct_answer;
      setSelectedAnswerState({ selectedAnswer: answer, isCorrect });
      onCorrectCount(isCorrect);
    }
  };
  return (
    <>
      {travia.type === "multiple" ? (
        <MultipleQuestion
          selectedAnswer={selectedAnswerState.selectedAnswer}
          isCorrect={selectedAnswerState.isCorrect}
          travia={travia}
          onAnswer={handleClick}
        />
      ) : (
        <BooleanQuestion
          selectedAnswer={selectedAnswerState.selectedAnswer}
          isCorrect={selectedAnswerState.isCorrect}
          travia={travia}
          onAnswer={handleClick}
        />
      )}
    </>
  );
};

export default TraviaCard;
