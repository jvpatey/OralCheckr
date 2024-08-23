import { useState, useEffect } from "react";
import styled from "styled-components";
import { PageBackground } from "../../PageBackground";
import { ToggleButton } from "./ToggleButton";
import { MonthView } from "./MonthView";
import { YearView } from "./YearView";
import { Habit } from "../../../containers/habit-tracker/habits/Habits";
import { LocalStorage } from "../../../common/constants/local-storage";

const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 190px);
  height: calc(100vh - 56px);
  overflow-y: auto;
  position: absolute;
  top: 56px;
  left: 190px;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    left: 70px;
  }
`;

export function Analytics() {
  const [view, setView] = useState<string>("month");
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    // Fetch habits from local storage when the component mounts
    const storedHabits = localStorage.getItem(LocalStorage.HABITS);
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits) as Habit[]);
    }
  }, []);

  const toggleOptions = [
    { label: "Month View", value: "month" },
    { label: "Year View", value: "year" },
  ];

  const handleSelectHabit = (habitName: string) => {
    console.log(`Selected habit in ${view}: ${habitName}`);
  };

  return (
    <PageBackground>
      <AnalyticsContainer>
        <ToggleButton
          options={toggleOptions}
          activeValue={view}
          onChange={setView}
        />
        {view === "month" ? (
          <MonthView habits={habits} onSelectHabit={handleSelectHabit} />
        ) : (
          <YearView habits={habits} onSelectHabit={handleSelectHabit} />
        )}
      </AnalyticsContainer>
    </PageBackground>
  );
}
