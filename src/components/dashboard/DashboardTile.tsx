import styled from "styled-components";
import { Card } from "react-bootstrap";
import { colors } from "../../common/utilities/color-utils";

// Styled component to style the tiles within the Dashboard Card
export const DashboardTile = styled(Card)`
  background-color: ${colors.bgWhite};
  border: transparent;
  border-radius: 20px;
  display: flex;
  height: 98%;
  width: 98%;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;
