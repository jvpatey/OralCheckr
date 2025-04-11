import styled from "styled-components";
import { scrollbarStyle } from "../styles/SharedStyles";

// Styled component for the page background
export const PageBackground = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: calc(56px + 20px) 20px 20px;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  ${scrollbarStyle}
`;
