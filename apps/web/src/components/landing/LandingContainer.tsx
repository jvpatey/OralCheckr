import styled from "styled-components";

// Page shell — max width and horizontal padding aligned with ModernWelcomeContainer;
// extra top padding clears the fixed ModernNavBar (nav sits outside this container).
export const LandingContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 0;
  padding: clamp(88px, 11vw, 120px) clamp(16px, 4vw, 32px)
    clamp(28px, 4vw, 40px);
  overflow-x: hidden;

  @media (min-width: 481px) and (max-width: 1023px) {
    padding-top: clamp(84px, 12vw, 108px);
  }

  @media (max-width: 480px) {
    padding: clamp(72px, 18vw, 92px) 12px clamp(24px, 5vw, 36px);
  }
`;

export const LandingHeroSection = styled.div`
  width: 100%;
  margin-bottom: clamp(20px, 3.5vw, 32px);

  /* Dashboard only — tighter stack under welcome (does not affect other routes) */
  & > div > p:first-of-type {
    margin-bottom: 10px;
  }

  && h1 {
    margin-bottom: clamp(10px, 2vw, 14px);
  }

  && h2 {
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    & > div > p:first-of-type {
      margin-bottom: 8px;
    }

    && h1 {
      margin-bottom: 12px;
    }
  }
`;
