import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Travia } from "@/types/travia";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface MultipleQuestionProps {
  selectedAnswer: string | null;
  travia: Travia;
  isCorrect: boolean;
  onAnswer: (answer: string) => void;
}

const shuffleAnswers = (
  correct_answer: string,
  incorrect_answers: string[],
) => {
  const answers = [...incorrect_answers, correct_answer];
  return answers.sort(() => Math.random() - 0.5);
};

const MultipleQuestion = ({
  selectedAnswer,
  travia,
  isCorrect,
  onAnswer,
}: MultipleQuestionProps) => {
  const shuffledAnswers = shuffleAnswers(
    travia.correct_answer,
    travia.incorrect_answers,
  );

  const [answers, setAnswers] = useState<string[]>(shuffledAnswers);

  return (
    <div className="bg-primary w-98 flex flex-col gap-y-4 rounded-xl px-6 py-4 shadow-[6px_6px_0px_rgba(196,148,1,1)]">
      <p className="text-text-secondary text-wrap text-lg font-bold">
        {travia.question}
      </p>
      <div className="flex flex-col gap-y-4">
        {answers.map((answer, index) => (
          <div
            key={answer}
            className="flex w-full items-center justify-center gap-2"
          >
            <div className="bg-secondary flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
              {index + 1}
            </div>
            <Button
              onClick={() => {
                console.log(answers, shuffledAnswers);
                onAnswer(answer);
              }}
              variant={"outline"}
              className={cn(
                `relative flex-1 text-wrap border-none font-semibold shadow-[6px_6px_0px_rgba(196,148,1,1)] transition-all duration-200 ease-in-out hover:bg-[#B37400]`,
                selectedAnswer === answer
                  ? isCorrect
                    ? "bg-[#00BFA6]"
                    : "bg-[#E63946]"
                  : "bg-background hover:translate-x-[3px] hover:text-white hover:shadow-[3px_3px_0px_rgba(196,148,1,1)] active:translate-x-[3px] active:shadow-none",
              )}
            >
              {selectedAnswer === answer && isCorrect ? (
                <CircleCheck
                  className={cn(
                    "text-text-secondary absolute left-4 h-5 w-5",
                    selectedAnswer === answer ? "flex" : "hidden",
                  )}
                  strokeWidth={3}
                />
              ) : (
                <CircleX
                  className={cn(
                    "text-text-secondary absolute left-4 h-5 w-5",
                    selectedAnswer === answer ? "flex" : "hidden",
                  )}
                  strokeWidth={3}
                />
              )}
              {answer}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleQuestion;