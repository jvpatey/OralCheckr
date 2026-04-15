import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { RoutePaths } from "../../common/constants/routes";
import { PageBackground } from "../../components/PageBackground";
import { LandingContainer } from "../../components/landing/LandingContainer";
import { BackgroundEffects, HeroTitleAccent } from "../welcome/styles/WelcomeStyles";
import {
  StyledModal,
  ModalHeader,
  ModalTitleStack,
  ModalHeading,
  ModalBody,
} from "../welcome/styles/ModalStyles";
import {
  QuestionnaireFlowContainer,
  QuestionnaireStackHeader,
  QuestionnaireFlowBodyCentered,
  QuestionnairePrimaryCta,
} from "../../components/questionnaire/styles/QuestionnaireFlowLayout";
import {
  HeaderMainRow,
  HeaderTitleColumn,
  HabitHeroEyebrow,
  HeaderText,
  HeaderSubtitle,
} from "../../components/habit-tracker/habits/HabitComponents";
import { AuthContext } from "../authentication/AuthContext";
import { RetakeQuestionnaireProps } from "../../common/types/questionnaire/retake-questionnaire.types";
import {
  RetakePageStack,
  RetakeBelowCard,
  RetakeHeroDescription,
  RetakeCtaSection,
  RetakeScoreCard,
  RetakeScoreNumber,
  RetakeScoreLabel,
  RetakeCompletionLine,
  RetakeCompletionMuted,
  RetakeModalMessage,
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
    void resetResponses();
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
          <QuestionnaireStackHeader>
            <HeaderMainRow>
              <HeaderTitleColumn>
                <HabitHeroEyebrow>Assess</HabitHeroEyebrow>
                <HeaderText>
                  Oral Health <HeroTitleAccent>Questionnaire</HeroTitleAccent>
                </HeaderText>
                <HeaderSubtitle>
                  You have a completed assessment on file. Your latest score
                  and date are shown below.
                </HeaderSubtitle>
              </HeaderTitleColumn>
            </HeaderMainRow>
          </QuestionnaireStackHeader>

          <QuestionnaireFlowBodyCentered>
            <RetakePageStack>
              <RetakeScoreCard>
                <RetakeScoreNumber $scoreColor={scoreColor}>
                  {questionnaireData.score}
                </RetakeScoreNumber>
                <RetakeScoreLabel>Oral health score</RetakeScoreLabel>
                <RetakeCompletionLine>
                  <RetakeCompletionMuted>Completed on: </RetakeCompletionMuted>
                  {questionnaireData.lastCompleted ?? "—"}
                </RetakeCompletionLine>
              </RetakeScoreCard>

              <RetakeBelowCard>
                <RetakeHeroDescription>
                  Made progress since your last check-in? Retake the
                  questionnaire to refresh your results.
                </RetakeHeroDescription>
                <RetakeCtaSection>
                  <QuestionnairePrimaryCta onClick={handleRetakeClick}>
                    Retake questionnaire
                  </QuestionnairePrimaryCta>
                </RetakeCtaSection>
              </RetakeBelowCard>
            </RetakePageStack>
          </QuestionnaireFlowBodyCentered>
        </QuestionnaireFlowContainer>
      </LandingContainer>

      <StyledModal show={showModal} onHide={handleCloseModal} centered>
        <ModalHeader closeButton>
          <ModalTitleStack>
            <ModalHeading>Retake questionnaire?</ModalHeading>
          </ModalTitleStack>
        </ModalHeader>
        <ModalBody>
          <RetakeModalMessage>
            <strong>Are you sure you want to retake the questionnaire?</strong>{" "}
            This will clear your previous responses and oral health score.
          </RetakeModalMessage>
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
