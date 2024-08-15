import { Habit, Logging } from "../../pages/habittracker/Habits";
import {
  HabitRow,
  PlaceholderText,
} from "../../components/habittracker/habit-components";
import { HabitTile } from "../../components/habittracker/HabitTile";
import { LogButton } from "../../components/habittracker/LogButton";
import { RemoveLogButton } from "../../components/habittracker/RemoveLogButton";
import { EditButton } from "../../components/habittracker/EditButton";
import { DeleteButton } from "../../components/habittracker/DeleteButton";

interface HabitListProps {
  habits: Habit[];
  selectedDate: Date;
  isEditMode: boolean;
  handleEditHabit: (index: number) => void;
  handleDeleteHabit: (index: number) => void;
  handleLog: (habitName: string, selectedDate: Date) => void;
  handleRemoveLog: (habitName: string, selectedDate: Date) => void;
  habitsLog: Logging;
}

export function HabitList({
  habits,
  selectedDate,
  isEditMode,
  handleEditHabit,
  handleDeleteHabit,
  handleLog,
  handleRemoveLog,
  habitsLog,
}: HabitListProps) {
  const renderHabits = () => {
    return habits.map((habit, index) => {
      const year = selectedDate.getFullYear();
      const month = selectedDate
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      const day = selectedDate.getDate();

      const logCount = habitsLog[habit.name]?.[year]?.[month]?.[day] || 0;

      // Determine if the Add Log button should be disabled
      const isAddLogDisabled = logCount >= habit.count;

      return (
        <HabitRow key={index}>
          <HabitTile habit={habit} logCount={logCount} />
          {isEditMode ? (
            <>
              <EditButton onClick={() => handleEditHabit(index)} />
              <DeleteButton onClick={() => handleDeleteHabit(index)} />
            </>
          ) : (
            <>
              <LogButton
                habitName={habit.name}
                selectedDate={selectedDate}
                onLog={handleLog}
                disabled={isAddLogDisabled}
              />
              <RemoveLogButton
                habitName={habit.name}
                selectedDate={selectedDate}
                onRemoveLog={handleRemoveLog}
                disabled={!(habitsLog[habit.name]?.[year]?.[month]?.[day] > 0)}
              />
            </>
          )}
        </HabitRow>
      );
    });
  };

  return habits.length === 0 ? (
    <PlaceholderText>
      Add a habit to start tracking your progress!
    </PlaceholderText>
  ) : (
    renderHabits()
  );
}
