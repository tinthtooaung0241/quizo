import { TraviaFormSchemaType } from "@/components/get-travia-form";
import { createJSONStorage, persist } from "zustand/middleware";
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
  return createStore<FormParamsStore>()(
    persist(
      (set) => ({
        formParams: { ...initState },
        setFormParams: (data: Partial<TraviaFormSchemaType>) => {
          set((state) => ({ formParams: { ...state.formParams, ...data } }));
        },
      }),
      {
        name: "api-params-store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
