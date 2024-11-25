import { TraviaFormSchemaType } from "@/components/get-travia-form";
import { stat } from "fs";
import { createStore } from "zustand";

export type ParamsAction = {
  setFormParams: (data: TraviaFormSchemaType) => void;
};

export type ParamsState = {
  formParams: TraviaFormSchemaType;
};

export type FormParamsStore = ParamsAction & ParamsState;

export const defaultInitState: TraviaFormSchemaType = {
  amount: 10,
  type: undefined,
  category: undefined,
  difficulty: undefined,
};

export const createFormParamsStore = (
  initState: TraviaFormSchemaType = defaultInitState,
) => {
  return createStore<FormParamsStore>()((set) => ({
    formParams: { ...initState },
    setFormParams: (data: Partial<TraviaFormSchemaType>) => {
      set((state) => ({ formParams: { ...state.formParams, ...data } }));
    },
  }));
};
