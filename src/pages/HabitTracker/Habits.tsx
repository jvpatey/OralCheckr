import { useState } from "react";
import styled from "styled-components";
import { PageBackground } from "../../components/Styled/PageBackground";
import { Sidebar } from "../../components/Sidebar";
import { links } from "../../common/SidebarLinks";
import { HabitTile } from "../../components/HabitTracker/HabitTile";
import { AddHabitTile } from "../../components/HabitTracker/AddHabitTile";

const HabitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-left: 10px;
  width: calc(100% - 190px);
  position: absolute;
  top: 56px;
  left: 190px;
`;

export function Habits() {
  const [habits, setHabits] = useState<string[]>([]);

  const handleAddHabit = () => {
    const newHabitName = prompt("Enter habit name:");
    if (newHabitName) {
      setHabits([...habits, newHabitName]);
    }
  };

  return (
    <PageBackground>
      <Sidebar links={links} />
      <HabitGrid>
        <AddHabitTile onAddClick={handleAddHabit} />
        {habits.map((habit, index) => (
          <HabitTile key={index} habitName={habit} />
        ))}
      </HabitGrid>
    </PageBackground>
  );
}
