import styled from "styled-components";
import { colors } from "../../common/color-utils";

export const PageBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${colors.bgWhite};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  overflow: hidden;
`;
