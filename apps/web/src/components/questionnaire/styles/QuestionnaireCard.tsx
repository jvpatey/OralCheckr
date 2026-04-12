import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/** Loading shell — same surface language as in-flow QuestionPanel */
export const QuestionnaireCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(70vw, 800px);
  max-width: 800px;
  min-height: min(60vh, 420px);
  max-height: calc(100vh - 120px);
  margin: 0 auto;
  padding: clamp(24px, 5vw, 40px);
  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  animation: ${fadeUp} 0.8s ease-out both;

  @media (min-width: 1200px) {
    max-width: 900px;
  }

  @media (max-width: 768px) {
    width: min(88vw, 700px);
    min-height: 50vh;
    padding: 24px 18px;
    border-radius: 18px;
  }

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 16px;
    padding: 20px 16px;
  }
`;
