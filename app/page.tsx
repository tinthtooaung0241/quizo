"use client";

import { Button } from "../components/ui/button";
import { useFormParams } from "../providers/api-params-store-provider";
import useDialogStore from "../store/dialog-store";

export default function Home() {
  const { onOpen } = useDialogStore();
  const { ...current } = useFormParams((state) => state);
  console.log("page form", current);
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-y-8">
      <div className="flex flex-col font-bold">
        <h2 className="text-2xl">Welcome to</h2>
        <h1 className="text-6xl">Quizo</h1>
      </div>
      <div>
        <Button onClick={onOpen}>Open</Button>
      </div>
    </div>
  );
}
