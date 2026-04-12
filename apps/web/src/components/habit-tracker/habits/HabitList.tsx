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
  }) => {
    return (
      <HabitRow>
        {isEditMode ? (
          <IconButton
            look="subtle"
            accent="edit"
            icon={faPencilAlt}
            onClick={() => handleEditHabit(index)}
          />
        ) : (
          <IconButton
            look="subtle"
            accent="minus"
            icon={faMinusCircle}
            onClick={() => handleRemoveLog(habit.name, selectedDate)}
            disabled={isRemoveLogDisabled}
          />
        )}
        <HabitTile habit={habit} logCount={logCount} />
        {isEditMode ? (
          <IconButton
            look="subtle"
            accent="delete"
            icon={faTrashAlt}
            onClick={() => handleDeleteHabit(index)}
          />
        ) : (
          <IconButton
            look="subtle"
            accent="plus"
            icon={faPlusCircle}
            onClick={() => handleLog(habit.name, selectedDate)}
            disabled={isAddLogDisabled}
          />
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
