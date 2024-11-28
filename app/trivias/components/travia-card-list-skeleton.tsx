"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const TraviaCardListSkeleton = () => {
  return (
    <div className="flex justify-center">
      <Carousel
        className="flex w-full max-w-4xl flex-col"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="py-10">
          {[...Array(3)].map((_, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center"
            >
              <Skeleton className="h-[300px] w-full max-w-[600px] rounded-xl" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-red-300" />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TraviaCardListSkeleton;
