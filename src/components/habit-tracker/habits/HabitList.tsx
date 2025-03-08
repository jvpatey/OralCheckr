import { Habit } from "../../../services/habitService";
import { HabitRow, PlaceholderText } from "./HabitComponents";
import { HabitTile } from "./HabitTile";
import { IconButton } from "./IconButton";
import {
  faTrashAlt,
  faPencilAlt,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "styled-components";

export interface HabitListProps {
  habits: Habit[];
  selectedDate: Date;
  isEditMode: boolean;
  handleEditHabit: (index: number) => void;
  handleDeleteHabit: (index: number) => void;
  handleLog: (habitName: string, selectedDate: Date) => void;
  handleRemoveLog: (habitName: string, selectedDate: Date) => void;
  getLogCount: (habitName: string, date: Date) => number;
  isFutureDate: boolean;
}

// RenderHabits Component
export function RenderHabits({
  habits,
  selectedDate,
  isEditMode,
  handleEditHabit,
  handleDeleteHabit,
  handleLog,
  handleRemoveLog,
  getLogCount,
  isFutureDate,
}: HabitListProps) {
  const theme = useTheme();

  return (
    <>
      {habits.map((habit, index) => {
        const logCount = getLogCount(habit.name, selectedDate);
        const isAddLogDisabled = isFutureDate || logCount >= habit.count;
        const isRemoveLogDisabled = isFutureDate || logCount <= 0;

        return (
          <HabitRow key={index}>
            <HabitTile habit={habit} logCount={logCount} />
            {isEditMode ? (
              <>
                <IconButton
                  icon={faPencilAlt}
                  onClick={() => handleEditHabit(index)}
                  borderColor={theme.yellow}
                  color={theme.yellow}
                  hoverBackgroundColor={theme.yellow}
                />
                <IconButton
                  icon={faTrashAlt}
                  onClick={() => handleDeleteHabit(index)}
                  borderColor={theme.red}
                  color={theme.red}
                  hoverBackgroundColor={theme.red}
                />
              </>
            ) : (
              <>
                <IconButton
                  icon={faPlusCircle}
                  onClick={() => handleLog(habit.name, selectedDate)}
                  borderColor={theme.green}
                  color={theme.green}
                  hoverBackgroundColor={theme.green}
                  disabled={isAddLogDisabled}
                />
                <IconButton
                  icon={faMinusCircle}
                  onClick={() => handleRemoveLog(habit.name, selectedDate)}
                  borderColor={theme.red}
                  color={theme.red}
                  hoverBackgroundColor={theme.red}
                  disabled={isRemoveLogDisabled}
                />
              </>
            )}
          </HabitRow>
        );
      })}
    </>
  );
}

// Functional component to render the list of entered habits - used in the Habits component
export function HabitList({
  habits,
  selectedDate,
  isEditMode,
  handleEditHabit,
  handleDeleteHabit,
  handleLog,
  handleRemoveLog,
  getLogCount,
  isFutureDate,
}: HabitListProps) {
  return habits.length === 0 ? (
    <PlaceholderText>
      Add a habit to start tracking your progress!
    </PlaceholderText>
  ) : (
    <RenderHabits
      habits={habits}
      selectedDate={selectedDate}
      isEditMode={isEditMode}
      handleEditHabit={handleEditHabit}
      handleDeleteHabit={handleDeleteHabit}
      handleLog={handleLog}
      handleRemoveLog={handleRemoveLog}
      getLogCount={getLogCount}
      isFutureDate={isFutureDate}
    />
  );
}
