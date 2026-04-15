import { Habit } from "../../../services/habitService";
import { HabitRow, PlaceholderText } from "./HabitComponents";
import { HabitTile } from "./HabitTile";
import { IconButton } from "./IconButton";
import {
  faTrashAlt,
  faPencilAlt,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

export interface HabitListProps {
  habits: Habit[];
  selectedDate: Date;
  isEditMode: boolean;
  handleEditHabit: (index: number) => void;
  handleDeleteHabit: (index: number) => void;
  handleLog: (habitId: number, selectedDate: Date) => void;
  handleRemoveLog: (habitId: number, selectedDate: Date) => void;
  getLogCount: (habitName: string, date: Date) => number;
  isFutureDate: boolean;
  completionTokens: Record<number, number>;
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
    completionToken,
  }: {
    habit: Habit;
    index: number;
    logCount: number;
    isEditMode: boolean;
    isAddLogDisabled: boolean;
    isRemoveLogDisabled: boolean;
    handleEditHabit: (index: number) => void;
    handleDeleteHabit: (index: number) => void;
    handleLog: (habitId: number, selectedDate: Date) => void;
    handleRemoveLog: (habitId: number, selectedDate: Date) => void;
    selectedDate: Date;
    completionToken?: number;
  }) => {
    const habitId = typeof habit.habitId === "number" ? habit.habitId : null;

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
            icon={faMinus}
            onClick={() => {
              if (habitId !== null) {
                handleRemoveLog(habitId, selectedDate);
              }
            }}
            disabled={isRemoveLogDisabled || habitId === null}
          />
        )}
        <HabitTile
          habit={habit}
          logCount={logCount}
          completionToken={completionToken}
          habitId={habitId}
        />
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
            icon={faPlus}
            onClick={() => {
              if (habitId !== null) {
                handleLog(habitId, selectedDate);
              }
            }}
            disabled={isAddLogDisabled || habitId === null}
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
    completionTokens,
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
              completionToken={
                typeof habit.habitId === "number"
                  ? completionTokens[habit.habitId]
                  : undefined
              }
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
  completionTokens,
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
      completionTokens={completionTokens}
    />
  );
}
