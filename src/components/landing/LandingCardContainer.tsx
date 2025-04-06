import styled from "styled-components";

// Styled component to contain the Landing card
export const LandingCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: -5vh auto 0;
  padding: 20px;
  min-height: 90vh;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;
