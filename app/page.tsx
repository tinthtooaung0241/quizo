"use client";

import useTravia from "@/hooks/useTravia";
import { Button } from "../components/ui/button";
import { useFormParams } from "../providers/api-params-store-provider";
import useDialogStore from "../store/dialog-store";
import { TraviaFormSchemaType } from "@/components/get-travia-form";
import { ParamsState } from "@/store/api-params-store";

export default function Home() {
  const { onOpen } = useDialogStore();
  const { traviaData, response_code, isLoading, error } = useTravia();
  console.log(traviaData, "traviaData");
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
