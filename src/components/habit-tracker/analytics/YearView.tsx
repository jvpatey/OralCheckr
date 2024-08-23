import styled from "styled-components";
import { HabitDropdown } from "./HabitDropdown";
import { Habit } from "../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../common/utilities/color-utils";

// Styled components for the layout
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.green};
  margin-bottom: 10px;
`;

interface ViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
}

export function YearView({ habits, onSelectHabit }: ViewProps) {
  return (
    <ViewContainer>
      <HabitsTitle>Habits</HabitsTitle>
      <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
    </ViewContainer>
  );
}
