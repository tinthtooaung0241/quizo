"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Travia } from "@/types/travia";
import { CheckCircle, CircleCheck, CircleX } from "lucide-react";
import { useMemo, useState } from "react";
import { string } from "zod";
import MultipleQuestion from "./multiple-question";
import BooleanQuestion from "./boolean-question";

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
