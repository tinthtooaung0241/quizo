import { create } from "zustand";

type State = {
  open: boolean;
};

type Action = {
  onOpen: () => void;
  onClose: () => void;
};

const useDialogStore = create<State & Action>((set) => ({
  open: false,
  onOpen: () => {
    set({ open: true });
  },
  onClose: () => {
    set({ open: false });
  },
}));

export default useDialogStore;
