import styled from "styled-components";

// Styled component for the page background
export const PageBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  overflow: hidden;
`;
