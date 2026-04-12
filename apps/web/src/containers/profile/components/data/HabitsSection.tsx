import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteButton } from "../../styles/AccountTabStyles";
import { DeleteConfirmationModal } from "../modals/DeleteConfirmationModal";
import { useHabitsWithLastTracked } from "../../../../hooks/habits/useHabitsWithLastTracked";
import { useDeleteAllHabits } from "../../../../hooks/habits/useDeleteAllHabits";
import {
  Section,
  SectionTitle,
  HabitList,
  HabitItem,
  HabitName,
  HabitDate,
  EmptyHabit,
  WarningText,
  DescriptionText,
  GreenLabel,
  Spacing,
} from "../../styles/DataTabStyles";

interface HabitsSectionProps {
  isDeleting: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
}

export function HabitsSection({
  isDeleting,
  setIsDeleting,
}: HabitsSectionProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: habitsData,
    isLoading,
    isError,
    hasNoData,
  } = useHabitsWithLastTracked();

  const deleteAllHabitsMutation = useMutation({
    mutationFn: useDeleteAllHabits().mutateAsync,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });
      const previousData = queryClient.getQueryData(["habits"]);
      queryClient.setQueryData(["habits"], []);
      return { previousData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["habits"], context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habitLogs"] });
      queryClient.setQueryData(["habits"], []);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteAllHabitsMutation.mutateAsync();
    } catch (error) {
      console.error("Error deleting all habits:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <EmptyHabit>Loading habits...</EmptyHabit>;
    }

    if (isError) {
      return <EmptyHabit>Error loading habits</EmptyHabit>;
    }

    if (hasNoData) {
      return <EmptyHabit>No habits tracked yet</EmptyHabit>;
    }

    return (
      <HabitList>
        {habitsData.map((habit) => (
          <HabitItem key={habit.habitId}>
            <HabitName>{habit.name}</HabitName>
            <HabitDate>
              {habit.lastTracked ? (
                <>
                  <GreenLabel>Last tracked:</GreenLabel> {habit.lastTracked}
                </>
              ) : (
                "Not tracked yet"
              )}
            </HabitDate>
          </HabitItem>
        ))}
      </HabitList>
    );
  };

  return (
    <>
      <Section>
        <SectionTitle>Habit Tracking Data</SectionTitle>
        {renderContent()}

        <Spacing />
        <WarningText>Warning: This action cannot be undone.</WarningText>
        <DescriptionText>
          Deleting your habit tracking data will permanently remove all your
          tracked habits and their history. Your assessment data will not be
          affected.
        </DescriptionText>

        <DeleteButton
          onClick={() => setShowDeleteModal(true)}
          disabled={isDeleting || isLoading || hasNoData}
        >
          Delete All Habits
        </DeleteButton>
      </Section>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete All Habits"
        message="Are you sure you want to delete all your habits and tracking data? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
}
