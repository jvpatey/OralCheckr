import styled from "styled-components";
import { colors } from "../../common/color-utils";

const StyledFooter = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: start;
  color: ${colors.textGrey};
  margin-left: 10px;
`;

// Functional component to style the footer
export function Footer() {
  return (
    <StyledFooter>
      <p>&copy; 2024 OralCheckr - All Rights Reserved - GetCoding Module 3</p>
    </StyledFooter>
  );
}
