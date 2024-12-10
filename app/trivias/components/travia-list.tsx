"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import useTravia from "@/hooks/useTravia";
import { useEffect, useState } from "react";
import TraviaCard from "./travia-card";
import TraviaCardListSkeleton from "./travia-card-list-skeleton";
import AnswerStats from "./answer-stats";
import ScoreAlertDialog from "./tiavia-score-alertdialog";

const caculatePoint = (correctCount: number, incorrectCount: number) => {
  const point = correctCount * 10 - incorrectCount;
  return point;
};

const TraviaCardList = () => {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [currentQ, setCurrentQ] = useState(0);
  const [totalQ, setTotalQ] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { traviaData, isLoading } = useTravia();

  const onCorrectCount = (correct: boolean) => {
    correct
      ? setCorrectCount((prev) => prev + 1)
      : setIncorrectCount((prev) => prev + 1);
  };

  const triggerHandler = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  const progress = (currentQ / totalQ) * 100;
  const point = caculatePoint(correctCount, incorrectCount);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTotalQ(api.scrollSnapList().length);
    setCurrentQ(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentQ(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (correctCount + incorrectCount === traviaData?.length) {
      setDialogOpen(true);
    }
  }, [correctCount, incorrectCount, traviaData]);

  if (isLoading) {
    return <TraviaCardListSkeleton />; //skeleton for travia loading
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Carousel
          className="flex w-full max-w-4xl flex-col"
          opts={{
            align: "start",
          }}
          setApi={setApi}
        >
          <CarouselContent className="py-10">
            {traviaData?.map((travia) => (
              <CarouselItem
                key={travia.question}
                className="flex items-center justify-center"
              >
                <TraviaCard travia={travia} onCorrectCount={onCorrectCount} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex w-full justify-between">
            <div>
              <AnswerStats
                correctCount={correctCount}
                incorrectCount={incorrectCount}
              />
            </div>
            {dialogOpen && (
              <ScoreAlertDialog point={point} triggerHandler={triggerHandler} />
            )}
            <div className="flex flex-col items-center justify-center gap-y-2">
              <Progress value={progress} className="w-40" />
              <p className="text-md font-medium">
                Questions {currentQ} of {totalQ}
              </p>
            </div>
          </div>
          <CarouselPrevious className="w-10 bg-[#FF6347] hover:bg-[#FF4500]" />
          <CarouselNext className="w-10 bg-[#32CD32] hover:bg-[#228B22]" />
        </Carousel>
      </div>
    </>
  );
};

export default TraviaCardList;
