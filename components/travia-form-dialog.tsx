"use client";
import useDialogStore from "@/store/dialog-store";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import TraviaForm from "./get-travia-form";

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
      <DialogContent>
        <DialogHeader className="felx mb-4 items-center justify-center">
          <DialogTitle className="text-xl">Challenge Your Brain</DialogTitle>
        </DialogHeader>
        <TraviaForm />
      </DialogContent>
    </Dialog>
  );
};

export default TraviaFormDialog;
