import { createContext, useContext } from "react";

export type ClipboardFunction = (text: string) => Promise<boolean>;

interface CopyContextType {
  onCopy?: ClipboardFunction;
}

export const CopyContext = createContext<CopyContextType>({});

export const useCopy = () => useContext(CopyContext);
