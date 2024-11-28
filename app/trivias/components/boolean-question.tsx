import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Travia } from "@/types/travia";
import { CircleCheck, CircleX } from "lucide-react";

interface BooleanQuestionProps {
  travia: Travia;
  selectedAnswer: string | null;
  isCorrect: boolean;
  onAnswer: (answer: string) => void;
}

const BooleanQuestion = ({
  travia,
  selectedAnswer,
  isCorrect,
  onAnswer,
}: BooleanQuestionProps) => {
  const answers = ["True", "False"];
  return (
    <div className="bg-primary flex w-96 flex-col items-center justify-center gap-y-8 rounded-xl px-6 py-4 shadow-[6px_6px_0px_rgba(196,148,1,1)]">
      <p className="text-text-secondary text-lg font-bold">{travia.question}</p>
      <div className="flex w-full items-center justify-evenly gap-6">
        {answers.map((answer) => (
          <Button
            key={answer}
            onClick={() => onAnswer(answer)}
            variant={"outline"}
            className={cn(
              "text-text-primary relative w-52 border-none bg-[#E0DFFF] font-semibold shadow-[6px_6px_0px_rgba(150,150,150,0.4)] transition-all duration-200 ease-in-out",
              selectedAnswer === answer
                ? isCorrect
                  ? "bg-[#00BFA6]"
                  : "bg-[#E63946]"
                : "hover:translate-x-[3px] hover:bg-[#C9C6FF] hover:shadow-[3px_3px_0px_rgba(150,150,150,0.4)] active:translate-x-[3px] active:shadow-none",
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
        ))}
      </div>
    </div>
  );
};

export default BooleanQuestion;
