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
import { memo } from "react";

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

// HabitRow component to render a single habit row
const HabitRowComponent = memo(
  ({
    habit,
    index,
    logCount,
    isEditMode,
    isAddLogDisabled,
    isRemoveLogDisabled,
    handleEditHabit,
    handleDeleteHabit,
    handleLog,
    handleRemoveLog,
    selectedDate,
    theme,
  }: {
    habit: Habit;
    index: number;
    logCount: number;
    isEditMode: boolean;
    isAddLogDisabled: boolean;
    isRemoveLogDisabled: boolean;
    handleEditHabit: (index: number) => void;
    handleDeleteHabit: (index: number) => void;
    handleLog: (habitName: string, selectedDate: Date) => void;
    handleRemoveLog: (habitName: string, selectedDate: Date) => void;
    selectedDate: Date;
    theme: ReturnType<typeof useTheme>;
  }) => {
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
  }
);

// RenderHabits Component - Memoized to prevent unnecessary re-renders
const RenderHabits = memo(
  ({
    habits,
    selectedDate,
    isEditMode,
    handleEditHabit,
    handleDeleteHabit,
    handleLog,
    handleRemoveLog,
    getLogCount,
    isFutureDate,
  }: HabitListProps) => {
    const theme = useTheme();

    return (
      <>
        {habits.map((habit, index) => {
          const logCount = getLogCount(habit.name, selectedDate);
          const isAddLogDisabled = isFutureDate || logCount >= habit.count;
          const isRemoveLogDisabled = isFutureDate || logCount <= 0;

          return (
            <HabitRowComponent
              key={`${habit.name}-${index}`}
              habit={habit}
              index={index}
              logCount={logCount}
              isEditMode={isEditMode}
              isAddLogDisabled={isAddLogDisabled}
              isRemoveLogDisabled={isRemoveLogDisabled}
              handleEditHabit={handleEditHabit}
              handleDeleteHabit={handleDeleteHabit}
              handleLog={handleLog}
              handleRemoveLog={handleRemoveLog}
              selectedDate={selectedDate}
              theme={theme}
            />
          );
        })}
      </>
    );
  }
);

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
