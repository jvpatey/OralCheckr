import styled, { keyframes } from "styled-components";

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface PageContainerProps {
  $isAuthenticated: boolean;
}

/** Inner layout on PageBackground (scroll + mesh live on PageBackground) */
export const PageContainer = styled.div<PageContainerProps>`
  position: relative;
  z-index: 1;
  width: 100%;
  align-self: stretch;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${({ $isAuthenticated }) =>
    $isAuthenticated
      ? "calc(80px + 2rem) clamp(16px, 4vw, 32px) 2rem"
      : /* No app nav on this route — keep top inset closer to welcome content rhythm */
        "clamp(20px, 3vw, 40px) clamp(16px, 4vw, 32px) 2rem"};

  @media (max-width: 768px) {
    padding: ${({ $isAuthenticated }) =>
      $isAuthenticated
        ? "calc(80px + 1.5rem) clamp(12px, 3vw, 20px) 1.5rem"
        : "clamp(16px, 3vw, 32px) clamp(12px, 3vw, 20px) 1.5rem"};
  }

  @media (max-width: 480px) {
    padding: ${({ $isAuthenticated }) =>
      $isAuthenticated
        ? "calc(80px + 1rem) 12px 1rem"
        : "16px 12px 1rem"};
  }
`;

export const AboutContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0 2rem;
  animation: ${fadeUp} 0.6s ease-out;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  box-sizing: border-box;
`;

/** Hero-aligned page title (WelcomeStyles HeroTitle scale) */
export const AboutTitle = styled.h1`
  font-family: var(--font-sans), system-ui, sans-serif;
  margin: 0 0 2rem;
  font-size: clamp(2rem, 4vw + 1rem, 3rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: ${({ theme }) => theme.textPrimary};
  text-align: center;
  animation: ${fadeUp} 0.8s ease-out;

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

export const AboutTitleAccent = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 800;
  letter-spacing: -0.04em;
`;

export const BackButtonContainer = styled.div`
  margin-bottom: 0.5rem;
`;
