"use client";
import useDialogStore from "@/store/dialog-store";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import TraviaForm from "./get-travia-form";
import Image from "next/image";

const TraviaFormDialog = () => {
  const open = useDialogStore((state) => state.open);
  const { onClose } = useDialogStore();

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
      aria-labelledby="Challenge your brain"
      aria-describedby="generate to get your questions"
    >
      <DialogContent className="">
        <DialogHeader className="felx mb-4 items-center justify-center">
          <div>
            <Image
              src={"/brain.svg"}
              height={100}
              width={100}
              alt="Brain"
              className="w-10"
            />
          </div>
          <DialogTitle className="relative flex w-full items-center justify-center text-xl font-semibold">
            Challenge Your Brain
            <div className="absolute right-8 rotate-12">
              <Image
                src={"/lighbulb.svg"}
                height={100}
                width={100}
                alt="Brain"
                className="w-10"
              />
            </div>
          </DialogTitle>
        </DialogHeader>
        <TraviaForm />
      </DialogContent>
    </Dialog>
  );
};

export default TraviaFormDialog;
