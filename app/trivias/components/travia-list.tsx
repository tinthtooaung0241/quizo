"use client";
import useTravia from "@/hooks/useTravia";
import React, { useEffect, useState } from "react";
import TraviaCard from "./travia-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TraviaCardListSkeleton from "./travia-card-list-skeleton";

const TraviaCardList = () => {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [currentQ, setCurrentQ] = useState(0);
  const [totalQ, setTotalQ] = useState(0);
  const { traviaData, isLoading } = useTravia();

  const onCorrectCount = (correct: boolean) => {
    correct
      ? setCorrectCount((prev) => prev + 1)
      : setIncorrectCount((prev) => prev + 1);
  };

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

  if (isLoading) {
    return <TraviaCardListSkeleton />; //skeleton for travia loading
  }

  return (
    <>
      <div className="flex justify-center">
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
          <CarouselPrevious className="bg-red-300" />
          <CarouselNext />
        </Carousel>
      </div>
      <div>
        <p>
          Question {currentQ} of {totalQ}
        </p>
        <p>
          Correct {correctCount} Incorrect {incorrectCount}
        </p>
      </div>
    </>
  );
};

export default TraviaCardList;
