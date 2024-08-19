import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { RoutePaths } from "../common/Routes";
import { getFullPath } from "../common/Routes";
import styled from "styled-components";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { QuestionnaireCardContainer } from "../components/styled/QuestionnaireCardContainer";
import { QuestionnaireCard } from "../components/styled/QuestionnaireCard";
import { NavigationButton } from "../components/styled/NavigationButton";
import { StyledModal } from "../components/styled/Modal";
import { colors } from "../common/color-utils";

const TitleText = styled.h1`
  color: ${colors.blue};
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
  color: ${colors.textGrey};
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
  width: 70%;
  text-align: center;
  border: solid;
  border-color: ${colors.blue};

  @media (max-width: 768px) {
    width: 50%;
  }

  &:hover {
    background-color: ${colors.bgWhite};
    color: ${colors.blue};
    border: solid;
    border-color: ${colors.blue};
  }
`;

const ModalButton = styled(Button)<ButtonProps>`
  &.btn-secondary {
    background-color: ${colors.bgWhite};
    color: ${colors.textGrey};
    border: 1px solid ${colors.textGrey};

    &:hover {
      background-color: ${colors.textGrey};
      color: ${colors.bgWhite};
      border-color: ${colors.bgWhite};
    }
  }

  &.btn-primary {
    background-color: ${colors.bgWhite};
    border-color: ${colors.blue};
    color: ${colors.blue};

    &:hover {
      background-color: ${colors.blue};
      border-color: ${colors.blue};
      color: ${colors.bgWhite};
    }
  }
`;

interface RetakeQuestionnaireProps {
  resetResponses: () => void;
}

// page rendered when user tries to take the questionnaire but previous responses are still stored in Local Storage
export function RetakeQuestionnaire({
  resetResponses,
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
    navigate(`${getFullPath(RoutePaths.QUESTIONNAIRE)}/1`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <PageBackground>
      <DashboardContainer>
        <QuestionnaireCardContainer>
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
              <NavButton as={Link} to={getFullPath(RoutePaths.DASHBOARD)}>
                Back to Dashboard
              </NavButton>
            </ButtonContainer>
          </QuestionnaireCard>
        </QuestionnaireCardContainer>
      </DashboardContainer>

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
