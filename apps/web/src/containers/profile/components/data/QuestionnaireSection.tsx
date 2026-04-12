import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteButton } from "../../styles/AccountTabStyles";
import { ConfirmationModal } from "../../../../components/shared/ConfirmationModal";
import { ModalHeadingAccent } from "../../../welcome/styles/ModalStyles";
import { useQuestionnaireData } from "../../../../hooks/questionnaire/useQuestionnaireData";
import { deleteQuestionnaireData } from "../../../../services/quesService";
import { LoadingSpinner } from "../../../../components/common/LoadingSpinner";
import {
  Section,
  SectionTitle,
  DataGrid,
  DataItem,
  DataItemInner,
  Label,
  Value,
  WarningText,
  DescriptionText,
} from "../../styles/DataTabStyles";
import { SectionTitleAccent } from "../../styles/ProfileStyles";

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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaireResponse"] });
      queryClient.invalidateQueries({ queryKey: ["questionnaireProgress"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaireResponse"] });
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
        <DataItem style={{ gridColumn: "1 / -1" }}>
          <DataItemInner>
            <LoadingSpinner size="sm" />
          </DataItemInner>
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
        <SectionTitle>
          Questionnaire <SectionTitleAccent>data</SectionTitleAccent>
        </SectionTitle>
        <DataGrid>{renderContent()}</DataGrid>

        <WarningText>Warning: This action cannot be undone.</WarningText>
        <DescriptionText>
          Deleting your questionnaire data will permanently remove all your oral
          health questionnaire responses and scores. Your habit tracking data
          will not be affected.
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

      <ConfirmationModal
        show={showDeleteModal}
        title={
          <>
            Delete{" "}
            <ModalHeadingAccent>questionnaire data</ModalHeadingAccent>
          </>
        }
        message="Are you sure you want to delete your questionnaire data? This action cannot be undone."
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
