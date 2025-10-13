import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { RoutePaths } from "../../common/constants/routes";
import { PageBackground } from "../../components/PageBackground";
import { LandingContainer } from "../../components/landing/LandingContainer";
import { StyledModal } from "../../components/questionnaire/styles/Modal";
import { AuthContext } from "../authentication/AuthContext";
import { RetakeQuestionnaireProps } from "../../common/types/questionnaire/retake-questionnaire.types";
import {
  ModalButton,
  ModernRetakeContainer,
  HeroTitle,
  DescriptionText,
  ModernActionSection,
  ModernGradientButton,
  ModernScoreCard,
  ModernScoreNumber,
  ModernScoreLabel,
  ModernCompletionText,
} from "./styles/RetakeQuestionnaireStyles";
import { useQuestionnaireData } from "../../hooks/questionnaire/useQuestionnaireData";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { getScoreColor } from "./utils/oral-health-status-utils";

export function RetakeQuestionnaire({
  resetResponses,
}: RetakeQuestionnaireProps) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const {
    data: questionnaireData,
    isLoading,
    hasNoData,
  } = useQuestionnaireData();

  // If there's no data, redirect to the start screen
  useEffect(() => {
    if (!isLoading && (hasNoData || !questionnaireData)) {
      navigate(RoutePaths.QUESTIONNAIRE);
    }
  }, [hasNoData, questionnaireData, isLoading, navigate]);

  const theme = useTheme();
  const scoreColor = questionnaireData?.score
    ? getScoreColor(questionnaireData.score, theme)
    : theme.blue;

  const handleRetakeClick = () => {
    setShowModal(true);
  };

  const handleConfirmRetake = () => {
    setShowModal(false);
    resetResponses();
    navigate(`${RoutePaths.QUESTIONNAIRE}/1`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Show loading state while checking data
  if (isLoading) {
    return (
      <PageBackground>
        <LandingContainer>
          <ModernRetakeContainer $isAuthenticated={isAuthenticated}>
            <LoadingSpinner />
          </ModernRetakeContainer>
        </LandingContainer>
      </PageBackground>
    );
  }

  // Don't render anything if there's no data (will redirect)
  if (hasNoData || !questionnaireData) {
    return null;
  }

  return (
    <PageBackground>
      <LandingContainer>
        <ModernRetakeContainer $isAuthenticated={isAuthenticated}>
          <HeroTitle>Oral Health Questionnaire</HeroTitle>

          <ModernScoreCard>
            <ModernScoreNumber $scoreColor={scoreColor}>
              {questionnaireData.score}
            </ModernScoreNumber>
            <ModernScoreLabel>ORAL HEALTH SCORE</ModernScoreLabel>
            <ModernCompletionText>
              Completed on: {questionnaireData.lastCompleted}
            </ModernCompletionText>
          </ModernScoreCard>

          <DescriptionText>
            It looks like you've already completed the oral health
            questionnaire.
          </DescriptionText>

          <DescriptionText>
            If you wish to retake it to update your score and oral health
            status, please click the button below.
          </DescriptionText>

          <ModernActionSection>
            <ModernGradientButton onClick={handleRetakeClick}>
              Retake Questionnaire
            </ModernGradientButton>
          </ModernActionSection>
        </ModernRetakeContainer>
      </LandingContainer>

      <StyledModal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to retake the questionnaire?</strong>{" "}
          This will clear your previous responses and oral health score.
        </Modal.Body>
        <Modal.Footer>
          <ModalButton variant="secondary" onClick={handleCloseModal}>
            Cancel
          </ModalButton>
          <ModalButton variant="primary" onClick={handleConfirmRetake}>
            Yes, Retake
          </ModalButton>
        </Modal.Footer>
      </StyledModal>
    </PageBackground>
  );
}
