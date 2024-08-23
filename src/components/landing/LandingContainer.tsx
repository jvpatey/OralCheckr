import styled from "styled-components";

// Styled component to position the Landing
export const LandingContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    max-width: 100vw;
  }
`;
