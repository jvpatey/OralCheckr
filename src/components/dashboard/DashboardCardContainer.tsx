import styled from "styled-components";

// Styled component to contain the dashboard card
export const DashboardCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;
