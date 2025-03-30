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
} from "../styles/DataTabStyles";
import { useQuestionnaireData } from "../../../hooks/questionnaire/useQuestionnaireData";
import { deleteQuestionnaireData } from "../../../services/quesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { toast } from "react-toastify";

export function DataTab() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    data: questionnaireData,
    isLoading,
    isError,
    hasNoData,
  } = useQuestionnaireData();
  const queryClient = useQueryClient();

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

  const handleDeleteQuestionnaire = async () => {
    try {
      setIsDeleting(true);
      await deleteQuestionnaireMutation.mutateAsync();
    } catch (error) {
      console.error("Error deleting questionnaire data:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Section>
        <SectionTitle>Questionnaire Data</SectionTitle>
        <DataItem>
          <Label>Most Recent Completion</Label>
          <Value>
            {isLoading
              ? "Loading..."
              : isError
              ? "Error loading data"
              : hasNoData || !questionnaireData.lastCompleted
              ? "No questionnaire data"
              : questionnaireData.lastCompleted}
          </Value>
        </DataItem>
        <DataItem>
          <Label>Oral Health Score</Label>
          <Value>
            {isLoading
              ? "Loading..."
              : isError
              ? "Error loading data"
              : hasNoData || questionnaireData.score === null
              ? "No oral health score"
              : `${questionnaireData.score}`}
          </Value>
        </DataItem>
        <DeleteButton
          onClick={() => setShowDeleteModal(true)}
          disabled={
            isDeleting ||
            isLoading ||
            hasNoData ||
            (!questionnaireData?.lastCompleted && !questionnaireData?.score)
          }
        >
          Delete Questionnaire Data
        </DeleteButton>
      </Section>

      <Section>
        <SectionTitle>Habit Tracking Data</SectionTitle>
        <HabitList>
          <HabitItem>No habits tracked yet</HabitItem>
        </HabitList>
        <DeleteButton style={{ marginTop: "1rem" }}>
          Delete All Habits
        </DeleteButton>
      </Section>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteQuestionnaire}
        title="Delete Questionnaire Data"
        message="Are you sure you want to delete your questionnaire data? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
}
