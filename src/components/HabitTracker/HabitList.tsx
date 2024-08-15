import { Habit, Logging } from "../../pages/habittracker/Habits";
import {
  HabitRow,
  PlaceholderText,
} from "../../components/habittracker/habit-components";
import { HabitTile } from "../../components/habittracker/HabitTile";
import { IconButton } from "../../components/habittracker/IconButton";
import {
  faTrashAlt,
  faPencilAlt,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../common/color-utils";

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
              <IconButton
                icon={faPencilAlt}
                onClick={() => handleEditHabit(index)}
                borderColor={colors.yellow}
                backgroundColor={colors.bgWhite}
                color={colors.yellow}
                hoverBackgroundColor={colors.yellow}
                hoverColor={colors.bgWhite}
              />
              <IconButton
                icon={faTrashAlt}
                onClick={() => handleDeleteHabit(index)}
                borderColor={colors.red}
                backgroundColor={colors.bgWhite}
                color={colors.red}
                hoverBackgroundColor={colors.red}
                hoverColor={colors.bgWhite}
              />
            </>
          ) : (
            <>
              <IconButton
                icon={faPlusCircle}
                onClick={() => handleLog(habit.name, selectedDate)}
                borderColor={colors.green}
                backgroundColor={colors.bgWhite}
                color={colors.green}
                hoverBackgroundColor={colors.green}
                hoverColor={colors.bgWhite}
                disabled={isAddLogDisabled}
              />
              <IconButton
                icon={faMinusCircle}
                onClick={() => handleRemoveLog(habit.name, selectedDate)}
                borderColor={colors.red}
                backgroundColor={colors.bgWhite}
                color={colors.red}
                hoverBackgroundColor={colors.red}
                hoverColor={colors.bgWhite}
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
