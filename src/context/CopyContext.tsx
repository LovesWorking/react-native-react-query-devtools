import { createContext, useContext } from "react";

type CopyFunctionType = (value: string) => Promise<boolean>;

interface CopyContextType {
  onCopy?: CopyFunctionType;
}

export const CopyContext = createContext<CopyContextType>({});

export const useCopy = () => useContext(CopyContext);
