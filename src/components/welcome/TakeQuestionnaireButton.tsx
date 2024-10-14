import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoutePaths } from "../../common/constants/routes";

// Styled button for Take Questionnaire button
const Button = styled.button`
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.accentBackgroundColor};
  border: 2px solid ${({ theme }) => theme.green};
  width: 30%;
  margin-top: 40px;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 1em 1.5em;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.green};
    border-color: ${({ theme }) => theme.green};
  }

  @media (max-width: 1024px) {
    width: 40%;
    font-size: 1.1rem;
    padding: 0.9em 1.2em;
  }

  @media (max-width: 768px) {
    width: 50%;
    font-size: 1rem;
    padding: 0.75em 1em;
  }

  @media (max-width: 480px) {
    width: 60%;
    font-size: 0.9rem;
    padding: 0.6em 0.8em;
  }
`;

export function TakeQuestionnaireButton() {
  const navigate = useNavigate();

  const handleTakeQuestionnaireClick = () => {
    // Navigate to the questionnaire route
    navigate(`${RoutePaths.QUESTIONNAIRE}/1`);
  };

  return (
    <Button onClick={handleTakeQuestionnaireClick}>
      Take Questionnaire
    </Button>
  );
}
