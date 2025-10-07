
import { createContext, useContext, useState } from "react";

type SelectionContextType = {
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  orderedNames: string[];
  setOrderedNames: (n: string[]) => void;
};

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orderedNames, setOrderedNames] = useState<string[]>([]);
  return (
    <SelectionContext.Provider value={{ currentIndex, setCurrentIndex, orderedNames, setOrderedNames }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error("useSelection must be used within a SelectionProvider");
  return context;
}

