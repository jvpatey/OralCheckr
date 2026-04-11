import styled from "styled-components";

// Page shell — max width and horizontal padding aligned with ModernWelcomeContainer;
// extra top padding clears the fixed ModernNavBar (nav sits outside this container).
export const LandingContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  padding: clamp(88px, 11vw, 120px) clamp(16px, 4vw, 32px)
    clamp(40px, 5vw, 56px);
  overflow-x: hidden;

  @media (min-width: 481px) and (max-width: 1023px) {
    padding-top: clamp(84px, 12vw, 108px);
  }

  @media (max-width: 480px) {
    padding: clamp(72px, 18vw, 92px) 12px clamp(32px, 6vw, 48px);
  }
`;

export const LandingHeroSection = styled.div`
  width: 100%;
  margin-bottom: clamp(40px, 6vw, 56px);
`;
