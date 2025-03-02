import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import { PageBackground } from "../../components/PageBackground";
import { LandingContainer } from "../../components/landing/LandingContainer";
import { QuestionnaireCardContainer } from "../../components/questionnaire/styles/QuestionnaireCardContainer";
import { QuestionnaireCard } from "../../components/questionnaire/styles/QuestionnaireCard";
import { StyledModal } from "../../components/questionnaire/styles/Modal";
import { AuthContext } from "../authentication/AuthContext";
import { RetakeQuestionnaireProps } from "../../common/types/questionnaire/retake-questionnaire.types";
import {
  TitleText,
  CardText,
  ButtonContainer,
  PrimaryButton,
} from "../../components/questionnaire/styles/SharedQuestionnaireStyles";
import { ModalButton } from "./styles/RetakeQuestionnaireStyles";

export function RetakeQuestionnaire({
  resetResponses,
}: RetakeQuestionnaireProps) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

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

  return (
    <PageBackground>
      <LandingContainer>
        <QuestionnaireCardContainer $isAuthenticated={isAuthenticated}>
          <QuestionnaireCard>
            <TitleText>Oral Health Questionnaire</TitleText>
            <CardText>
              It looks like you've already completed the oral health
              questionnaire.
            </CardText>
            <CardText>
              If you wish to retake it to update your score and oral health
              status, please click the button below.
            </CardText>
            <ButtonContainer>
              <PrimaryButton
                onClick={handleRetakeClick}
                style={{ width: "80%" }}
              >
                Retake Questionnaire
              </PrimaryButton>
            </ButtonContainer>
          </QuestionnaireCard>
        </QuestionnaireCardContainer>
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
