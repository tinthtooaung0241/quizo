import { createStore } from "zustand/vanilla";

export type CounterState = {
  point: number;
};

export type CounterActions = {
  updatePoint: (newPoint: number) => void;
};

export type CounterStore = CounterState & CounterActions;

export const initCounterStore = (): CounterState => {
  return { point: 0 };
};

export const defaultInitState: CounterState = {
  point: 0,
};

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    updatePoint: (newPoint) => set({ point: newPoint }),
  }));
};
