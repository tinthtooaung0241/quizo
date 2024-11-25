"use client";
import {
  createFormParamsStore,
  FormParamsStore,
  initFormParamsStore,
} from "@/store/api-params-store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type FormParamsStoreApi = ReturnType<typeof createFormParamsStore>;

export const FormParamsStoreContext = createContext<
  FormParamsStoreApi | undefined
>(undefined);

export interface FormParamsStoreProviderProps {
  children: ReactNode;
}

export const FormParamsStoreProvider = ({
  children,
}: FormParamsStoreProviderProps) => {
  const storeRef = useRef<FormParamsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createFormParamsStore();
  }

  return (
    <FormParamsStoreContext.Provider value={storeRef.current}>
      {children}
    </FormParamsStoreContext.Provider>
  );
};

export const useFormParams = <T,>(
  selector: (store: FormParamsStore) => T,
): T => {
  const formParamsStoreContext = useContext(FormParamsStoreContext);

  if (!formParamsStoreContext) {
    throw new Error(
      "useFormParams must be used within FormParamsStoreProvider!",
    );
  }

  return useStore(formParamsStoreContext, selector);
};
