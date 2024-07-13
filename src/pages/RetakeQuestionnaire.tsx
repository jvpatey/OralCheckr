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
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { QuestionnaireCard } from "../components/styled/QuestionnaireCard";
import { NavigationButton } from "../components/styled/NavigationButton";

const TitleText = styled.h1`
  color: #07889b;
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
  color: #222831;
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

  @media (max-width: 768px) {
    width: 50%;
  }

  &:hover {
    background-color: #f5f5f5;
    color: #07889b;
    font-weight: bold;
    border: solid;
    border-color: #07889b;
  }
`;

const ModalButton = styled(Button)<ButtonProps>`
  &.btn-secondary {
    background-color: #f5f5f5;
    color: #07889b;
    border: 1px solid #07889b;

    &:hover {
      background-color: #07889b;
      color: #f5f5f5;
      border-color: #f5f5f5;
      font-weight: bold;
    }
  }

  &.btn-primary {
    background-color: #07889b;
    border-color: #07889b;
    color: #f5f5f5;

    &:hover {
      background-color: #f5f5f5;
      border-color: #07889b;
      color: #07889b;
      font-weight: bold;
    }
  }
`;

const StyledModal = styled(Modal)`
  padding: 10px;

  .modal-content {
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
  }

  .modal-header,
  .modal-footer {
    border: none;
  }

  .modal-title {
    color: #07889b;
    font-size: 1.5rem;
  }

  .modal-body {
    color: #222831;
    font-size: 1.2rem;
  }
`;

// page rendered when user tries to take the questionnaire but previous responses are stilled stored in Local Storage
export function RetakeQuestionnaire() {
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
    navigate(`${getFullPath(RoutePaths.QUESTIONNAIRE)}/1`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
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
        </DashboardCardContainer>
      </DashboardContainer>

      <StyledModal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to retake the questionnaire?</strong>
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
