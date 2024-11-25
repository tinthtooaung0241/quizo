import { TraviaFormSchemaType } from "@/components/get-travia-form";
import { createStore } from "zustand";

export type ParamsAction = {
  setFormParams: (data: TraviaFormSchemaType) => void;
};

export const defaultInitState: TraviaFormSchemaType = {
  amount: 10,
  type: undefined,
  category: undefined,
  difficulty: undefined,
};

export type FormParamsStore = TraviaFormSchemaType & ParamsAction;

export const createFormParamsStore = (
  initState: TraviaFormSchemaType = defaultInitState,
) => {
  return createStore<FormParamsStore>()((set) => ({
    ...initState,
    setFormParams: (data: TraviaFormSchemaType) => {
      set({
        ...data,
      });
    },
  }));
};
