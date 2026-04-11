import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { RoutePaths } from "../../common/constants/routes";
import { PageBackground } from "../../components/PageBackground";
import { LandingContainer } from "../../components/landing/LandingContainer";
import {
  BackgroundEffects,
  HeroEyebrow,
  HeroTitleAccent,
  HeroDescription,
} from "../welcome/styles/WelcomeStyles";
import {
  StyledModal,
  ModalHeader,
  ModalTitleStack,
  ModalHeading,
  ModalBody,
} from "../welcome/styles/ModalStyles";
import {
  QuestionnaireFlowContainer,
  QuestionnaireHeroCopy,
  QuestionnairePageTitle,
  QuestionnaireCtaSection,
  QuestionnairePrimaryCta,
} from "../../components/questionnaire/styles/QuestionnaireFlowLayout";
import { AuthContext } from "../authentication/AuthContext";
import { RetakeQuestionnaireProps } from "../../common/types/questionnaire/retake-questionnaire.types";
import {
  RetakeScoreCard,
  RetakeScoreNumber,
  RetakeScoreLabel,
  RetakeCompletionLine,
  RetakeModalActions,
  RetakeModalCancel,
  RetakeModalConfirm,
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

  if (isLoading) {
    return (
      <PageBackground>
        <BackgroundEffects />
        <LandingContainer>
          <QuestionnaireFlowContainer $isAuthenticated={isAuthenticated}>
            <LoadingSpinner />
          </QuestionnaireFlowContainer>
        </LandingContainer>
      </PageBackground>
    );
  }

  if (hasNoData || !questionnaireData) {
    return null;
  }

  return (
    <PageBackground>
      <BackgroundEffects />
      <LandingContainer>
        <QuestionnaireFlowContainer $isAuthenticated={isAuthenticated}>
          <QuestionnaireHeroCopy>
            <HeroEyebrow>Assess</HeroEyebrow>
            <QuestionnairePageTitle>
              Oral Health <HeroTitleAccent>Questionnaire</HeroTitleAccent>
            </QuestionnairePageTitle>
          </QuestionnaireHeroCopy>

          <RetakeScoreCard>
            <RetakeScoreNumber $scoreColor={scoreColor}>
              {questionnaireData.score}
            </RetakeScoreNumber>
            <RetakeScoreLabel>Oral health score</RetakeScoreLabel>
            <RetakeCompletionLine>
              Completed on: {questionnaireData.lastCompleted}
            </RetakeCompletionLine>
          </RetakeScoreCard>

          <QuestionnaireHeroCopy>
            <HeroDescription>
              It looks like you&apos;ve already completed the oral health
              questionnaire.
            </HeroDescription>
            <HeroDescription>
              If you wish to retake it to update your score and oral health
              status, use the button below.
            </HeroDescription>
            <QuestionnaireCtaSection>
              <QuestionnairePrimaryCta onClick={handleRetakeClick}>
                Retake questionnaire
              </QuestionnairePrimaryCta>
            </QuestionnaireCtaSection>
          </QuestionnaireHeroCopy>
        </QuestionnaireFlowContainer>
      </LandingContainer>

      <StyledModal show={showModal} onHide={handleCloseModal} centered>
        <ModalHeader closeButton>
          <ModalTitleStack>
            <ModalHeading>Retake questionnaire?</ModalHeading>
          </ModalTitleStack>
        </ModalHeader>
        <ModalBody>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "inherit",
            }}
          >
            <strong>Are you sure you want to retake the questionnaire?</strong>{" "}
            This will clear your previous responses and oral health score.
          </p>
          <RetakeModalActions>
            <RetakeModalCancel type="button" onClick={handleCloseModal}>
              Cancel
            </RetakeModalCancel>
            <RetakeModalConfirm type="button" onClick={handleConfirmRetake}>
              Yes, retake
            </RetakeModalConfirm>
          </RetakeModalActions>
        </ModalBody>
      </StyledModal>
    </PageBackground>
  );
}
