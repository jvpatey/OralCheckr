import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteButton } from "../../styles/AccountTabStyles";
import { ConfirmationModal } from "../../../../components/shared/ConfirmationModal";
import { ModalHeadingAccent } from "../../../welcome/styles/ModalStyles";
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
  HabitDatePrefix,
  Spacing,
} from "../../styles/DataTabStyles";
import { SectionTitleAccent } from "../../styles/ProfileStyles";

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
                  <HabitDatePrefix>Last tracked:</HabitDatePrefix>{" "}
                  {habit.lastTracked}
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
        <SectionTitle>
          Habit tracking <SectionTitleAccent>data</SectionTitleAccent>
        </SectionTitle>
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

      <ConfirmationModal
        show={showDeleteModal}
        title={
          <>
            Delete <ModalHeadingAccent>all habits</ModalHeadingAccent>
          </>
        }
        message="Are you sure you want to delete all your habits and tracking data? This action cannot be undone."
        confirmLabel={isDeleting ? "Deleting…" : "Delete"}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isDestructive
        isBusy={isDeleting}
        backdrop="static"
        keyboard={false}
      />
    </>
  );
}
