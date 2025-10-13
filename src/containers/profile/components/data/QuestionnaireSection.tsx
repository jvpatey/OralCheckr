import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DeleteButton } from "../../styles/AccountTabStyles";
import { DeleteConfirmationModal } from "../modals/DeleteConfirmationModal";
import { useQuestionnaireData } from "../../../../hooks/questionnaire/useQuestionnaireData";
import { deleteQuestionnaireData } from "../../../../services/quesService";
import { LoadingSpinner } from "../../../../components/common/LoadingSpinner";
import {
  Section,
  SectionTitle,
  DataGrid,
  DataItem,
  Label,
  Value,
  WarningText,
  DescriptionText,
} from "../../styles/DataTabStyles";

interface QuestionnaireSectionProps {
  isDeleting: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
}

export function QuestionnaireSection({
  isDeleting,
  setIsDeleting,
}: QuestionnaireSectionProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: questionnaireData,
    isLoading,
    isError,
    hasNoData,
  } = useQuestionnaireData();

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
      toast.error("Failed to delete assessment data", {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaireResponse"] });
      queryClient.invalidateQueries({ queryKey: ["hasSavedResponse"] });
      queryClient.invalidateQueries({ queryKey: ["questionnaireProgress"] });
      toast.success("Questionnaire data deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaireResponse"] });
      queryClient.invalidateQueries({ queryKey: ["hasSavedResponse"] });
      queryClient.invalidateQueries({ queryKey: ["questionnaireProgress"] });
    },
  });

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteQuestionnaireMutation.mutateAsync();
    } catch (error) {
      console.error("Error deleting assessment data:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <DataItem style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          <LoadingSpinner size="sm" />
        </DataItem>
      );
    }

    if (isError) {
      return (
        <DataItem style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          <Value>Error loading assessment data</Value>
        </DataItem>
      );
    }

    if (hasNoData) {
      return (
        <DataItem style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          <Value>No assessment data available</Value>
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

  return (
    <>
      <Section>
        <SectionTitle>Questionnaire Data</SectionTitle>
        <DataGrid>{renderContent()}</DataGrid>

        <WarningText>Warning: This action cannot be undone.</WarningText>
        <DescriptionText>
          Deleting your questionnaire data will permanently remove all your oral
          health questionnaire responses and scores. Your habit tracking data will not be
          affected.
        </DescriptionText>

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

      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Questionnaire Data"
        message="Are you sure you want to delete your questionnaire data? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
}
