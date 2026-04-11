import React, { createContext, useState, useContext, ReactNode } from "react";

// Type for habit context - tracks currently selected habit
interface HabitContextType {
  selectedHabit: string;
  setSelectedHabit: (habitName: string) => void;
}

// Create context with undefined default value
const HabitContext = createContext<HabitContextType | undefined>(undefined);

// Hook to access habit context
export const useHabitContext = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabitContext must be used within a HabitProvider");
  }
  return context;
};

// Props for HabitProvider component
interface HabitProviderProps {
  children: ReactNode;
}

// Provider component to wrap app and share selected habit state
export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
  const [selectedHabit, setSelectedHabit] = useState<string>("");

  return (
    <HabitContext.Provider value={{ selectedHabit, setSelectedHabit }}>
      {children}
    </HabitContext.Provider>
  );
};
