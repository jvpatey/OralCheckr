import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import styled from "styled-components";
import { PageBackground } from "../../components/PageBackground";
import { LandingContainer } from "../../components/landing/LandingContainer";
import { QuestionnaireCardContainer } from "../../components/questionnaire/QuestionnaireCardContainer";
import { QuestionnaireCard } from "../../components/questionnaire/QuestionnaireCard";
import { NavigationButton } from "../../components/questionnaire/NavigationButton";
import { StyledModal } from "../../components/questionnaire/Modal";

const TitleText = styled.h1`
  color: ${({ theme }) => theme.blue};
  margin-top: 20px;
  margin-bottom: 60px;
  text-align: center;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const CardText = styled.h5`
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 20px;
  margin-right: 40px;
  margin-left: 40px;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const NavButton = styled(NavigationButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 15px 20px;
  font-size: 1.25rem;
  text-align: center;
  border: solid 2px;
  border-color: ${({ theme }) => theme.green};
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.accentBackgroundColor};

  @media (max-width: 768px) {
    width: 70%;
    padding: 10px 15px;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.green};
    border: solid 2px;
    border-color: ${({ theme }) => theme.green};
  }
`;

const ModalButton = styled(Button)<ButtonProps>`
  &.btn-secondary {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.textGrey};
    border: 1px solid ${({ theme }) => theme.textGrey};

    &:hover {
      background-color: ${({ theme }) => theme.textGrey};
      color: ${({ theme }) => theme.accentBackgroundColor};
      border-color: ${({ theme }) => theme.backgroundColor};
    }
  }

  &.btn-primary {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    border-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};

    &:hover {
      background-color: ${({ theme }) => theme.blue};
      border-color: ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.accentBackgroundColor};
    }
  }
`;

interface RetakeQuestionnaireProps {
  resetResponses: () => void;
  isAuthenticated: boolean;
}

export function RetakeQuestionnaire({
  resetResponses,
  isAuthenticated,
}: RetakeQuestionnaireProps) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRetakeClick = () => {
    setShowModal(true);
  };

  const handleConfirmRetake = () => {
    localStorage.removeItem("questionnaire");
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("totalScore");
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
              <NavButton onClick={handleRetakeClick}>
                Retake Questionnaire
              </NavButton>
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
