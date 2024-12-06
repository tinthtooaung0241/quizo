"use client";

import useTravia from "@/hooks/useTravia";
import { Button } from "../components/ui/button";
import useDialogStore from "../store/dialog-store";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
  const { onOpen } = useDialogStore();
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-y-8">
      <div className="flex flex-col font-bold">
        <h2 className="text-2xl">Welcome to</h2>
        <h1 className="text-6xl">Quizo</h1>
      </div>
      <div>
        <Button onClick={onOpen}>Open</Button>
      </div>
      <div className=""></div>
    </div>
  );
}
