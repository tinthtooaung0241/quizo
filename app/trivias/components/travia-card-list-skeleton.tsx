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
    <div className="flex flex-col items-center justify-center">
      <Carousel
        className="flex w-full max-w-4xl flex-col"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="py-10">
          {[...Array(5)].map((_, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center"
            >
              <Skeleton className="h-[400px] w-full rounded-xl" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex w-full justify-between">
          <div>
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
        <CarouselPrevious className="w-10 bg-[#FF6347] hover:bg-[#FF4500]" />
        <CarouselNext className="w-10 bg-[#32CD32] hover:bg-[#228B22]" />
      </Carousel>
    </div>
  );
};

export default TraviaCardListSkeleton;
