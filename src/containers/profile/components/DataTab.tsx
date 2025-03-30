import { useState } from "react";
import { DeleteButton } from "../styles/AccountSettingsStyles";
import {
  Section,
  SectionTitle,
  DataItem,
  Label,
  Value,
  HabitList,
  HabitItem,
  HabitName,
  HabitDate,
  EmptyHabit,
  WarningText,
  DescriptionText,
  DataGrid,
} from "../styles/DataTabStyles";
import { useQuestionnaireData } from "../../../hooks/questionnaire/useQuestionnaireData";
import { deleteQuestionnaireData } from "../../../services/quesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { toast } from "react-toastify";
import { useHabitsWithLastTracked } from "../../../hooks/habits/useHabitsWithLastTracked";
import { useDeleteAllHabits } from "../../../hooks/habits/useDeleteAllHabits";
import styled from "styled-components";

// Green label for "Last tracked:" text
const GreenLabel = styled.span`
  color: ${({ theme }) => theme.green};
`;

// Spacing div for habits section
const Spacing = styled.div`
  margin-top: 1.5rem;
`;

export function DataTab() {
  // State for modals and loading
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteQuestionnaireModal, setShowDeleteQuestionnaireModal] =
    useState(false);
  const [showDeleteHabitsModal, setShowDeleteHabitsModal] = useState(false);

  // Query client for cache management
  const queryClient = useQueryClient();

  // Questionnaire data
  const {
    data: questionnaireData,
    isLoading: isLoadingQuestionnaire,
    isError: isQuestionnaireError,
    hasNoData: hasNoQuestionnaireData,
  } = useQuestionnaireData();

  // Habits data
  const {
    data: habitsData,
    isLoading: isLoadingHabits,
    isError: isHabitsError,
    hasNoData: hasNoHabitsData,
  } = useHabitsWithLastTracked();

  // Questionnaire deletion mutation
  const deleteQuestionnaireMutation = useMutation({
    mutationFn: deleteQuestionnaireData,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["questionnaireResponse"] });
      const previousData = queryClient.getQueryData(["questionnaireResponse"]);
      queryClient.setQueryData(["questionnaireResponse"], null);
      return { previousData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ["questionnaireResponse"],
        context?.previousData
      );
      toast.error("Failed to delete questionnaire data", {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaireResponse"] });
      toast.success("Questionnaire data deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaireResponse"] });
    },
  });

  // Habits deletion mutation
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
      toast.error("Failed to delete habits", {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habitLogs"] });
      toast.success("All habits deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      // Force immediate UI update by setting hasNoData
      queryClient.setQueryData(["habits"], []);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  // Questionnaire deletion handler
  const handleDeleteQuestionnaire = async () => {
    try {
      setIsDeleting(true);
      await deleteQuestionnaireMutation.mutateAsync();
    } catch (error) {
      console.error("Error deleting questionnaire data:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteQuestionnaireModal(false);
    }
  };

  // Habits deletion handler
  const handleDeleteAllHabits = async () => {
    try {
      setIsDeleting(true);
      await deleteAllHabitsMutation.mutateAsync();
    } catch (error) {
      console.error("Error deleting all habits:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteHabitsModal(false);
    }
  };

  // Render questionnaire content based on loading/error/data state
  const renderQuestionnaireContent = () => {
    if (isLoadingQuestionnaire) {
      return (
        <DataItem style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          <Value>Loading questionnaire data...</Value>
        </DataItem>
      );
    }

    if (isQuestionnaireError) {
      return (
        <DataItem style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          <Value>Error loading questionnaire data</Value>
        </DataItem>
      );
    }

    if (hasNoQuestionnaireData) {
      return (
        <DataItem style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          <Value>No questionnaire data available</Value>
        </DataItem>
      );
    }

    return (
      <>
        <DataItem>
          <Label>Most Recent Completion</Label>
          <Value>
            {questionnaireData.lastCompleted || "Not completed yet"}
          </Value>
        </DataItem>
        <DataItem>
          <Label>Oral Health Score</Label>
          <Value>
            {questionnaireData.score !== null
              ? `${questionnaireData.score}`
              : "No score available"}
          </Value>
        </DataItem>
      </>
    );
  };

  // Render habit content based on loading/error/data state
  const renderHabitContent = () => {
    if (isLoadingHabits) {
      return <EmptyHabit>Loading habits...</EmptyHabit>;
    }

    if (isHabitsError) {
      return <EmptyHabit>Error loading habits</EmptyHabit>;
    }

    if (hasNoHabitsData) {
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
        <SectionTitle>Questionnaire Data</SectionTitle>
        <DataGrid>{renderQuestionnaireContent()}</DataGrid>

        <WarningText>Warning: This action cannot be undone.</WarningText>
        <DescriptionText>
          Deleting your questionnaire data will permanently remove all your oral
          health assessments and scores. Your habit tracking data will not be
          affected.
        </DescriptionText>

        <DeleteButton
          onClick={() => setShowDeleteQuestionnaireModal(true)}
          disabled={
            isDeleting ||
            isLoadingQuestionnaire ||
            hasNoQuestionnaireData ||
            (!questionnaireData?.lastCompleted && !questionnaireData?.score)
          }
        >
          Delete Questionnaire Data
        </DeleteButton>
      </Section>

      <Section>
        <SectionTitle>Habit Tracking Data</SectionTitle>
        {renderHabitContent()}

        <Spacing />
        <WarningText>Warning: This action cannot be undone.</WarningText>
        <DescriptionText>
          Deleting your habit tracking data will permanently remove all your
          tracked habits and their history. Your questionnaire data will not be
          affected.
        </DescriptionText>

        <DeleteButton
          onClick={() => setShowDeleteHabitsModal(true)}
          disabled={isDeleting || isLoadingHabits || hasNoHabitsData}
        >
          Delete All Habits
        </DeleteButton>
      </Section>

      {/* Questionnaire Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteQuestionnaireModal}
        onHide={() => setShowDeleteQuestionnaireModal(false)}
        onConfirm={handleDeleteQuestionnaire}
        title="Delete Questionnaire Data"
        message="Are you sure you want to delete your questionnaire data? This action cannot be undone."
        isDeleting={isDeleting}
      />

      {/* Habits Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteHabitsModal}
        onHide={() => setShowDeleteHabitsModal(false)}
        onConfirm={handleDeleteAllHabits}
        title="Delete All Habits"
        message="Are you sure you want to delete all your habits and tracking data? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
}
