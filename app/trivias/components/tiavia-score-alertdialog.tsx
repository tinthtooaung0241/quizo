"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useDialogStore from "@/store/dialog-store";
import { useUser } from "@clerk/nextjs";
import { postUser } from "@/lib/queries";
import { auth } from "@clerk/nextjs/server";

interface ScoreAlertDialogPorps {
  point: number;
}

const ScoreAlertDialog = ({ point }: ScoreAlertDialogPorps) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { onOpen } = useDialogStore();

  const pointHandler = async () => {
    if (isSignedIn && user) {
      await postUser({
        userId: user.id,
        name: user?.fullName ?? "Anonymous",
        point: point,
        imageUrl: user?.imageUrl || "",
      });
    } else {
      console.log("sign in plz");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="flex h-12 items-center justify-center gap-x-2 rounded-full bg-[#6C63FF] px-6 text-base font-semibold text-white shadow-[4px_4px_0px_0px_#493D8A] transition-all duration-300 ease-in-out hover:-translate-x-[2px] hover:bg-[#4d47cc] hover:shadow-[2px_2px_0px_0px_#493D8A] active:shadow-none"
        onClick={() => pointHandler}
      >
        <p>Time for Results!</p>
        <div>
          <Image
            src={"/drum.svg"}
            alt="time for results. drum roll plz"
            width={100}
            height={100}
            className="w-8"
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#FFFACD] text-[#15114e]">
        <AlertDialogHeader className="flex items-center justify-center">
          <AlertDialogTitle className="flex flex-col items-center">
            <div>
              <DotLottieReact
                src="./assets/lotties/congratulation.lottie"
                loop
                autoplay
                className="h-16 w-16"
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="text-2xl font-bold">Well Done!</p>
              <div>
                <DotLottieReact
                  src="./assets/lotties/congratulation2.lottie"
                  loop
                  autoplay
                  className="h-9 w-9"
                />
              </div>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="flex items-center justify-center gap-x-2 text-lg">
            You scored <span className="font-bold text-[#D2691E]">{point}</span>{" "}
            points! Keep it up!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-3">
          <div className="flex w-full items-center justify-evenly">
            <AlertDialogCancel className="rounded-full bg-[#FF8C00] px-4 py-2 text-[#1E1236] hover:bg-[#FF6A00]">
              Maybe Next Time!
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-[#66D7B9] px-4 py-2 text-white hover:bg-[#4FB38B]"
              onClick={() => onOpen()}
            >
              Let&apos;s Do This Again!
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ScoreAlertDialog;
