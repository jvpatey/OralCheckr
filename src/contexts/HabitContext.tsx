import React, { createContext, useState, useContext, ReactNode } from "react";

interface HabitContextType {
  selectedHabit: string;
  setSelectedHabit: (habitName: string) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const useHabitContext = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabitContext must be used within a HabitProvider");
  }
  return context;
};

interface HabitProviderProps {
  children: ReactNode;
}

export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
  const [selectedHabit, setSelectedHabit] = useState<string>("");

  return (
    <HabitContext.Provider value={{ selectedHabit, setSelectedHabit }}>
      {children}
    </HabitContext.Provider>
  );
};
