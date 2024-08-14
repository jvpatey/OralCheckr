import styled from "styled-components";
import { colors } from "../../common/color-utils";

export const NavigationButton = styled.button`
  background-color: ${colors.blue};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;
  width: 150px;

  &:hover {
    background-color: ${colors.bgWhite};
    color: ${colors.blue};
    border: solid 2px ${colors.blue};
  }

  &:disabled {
    background-color: ${colors.disabledBgGrey};
    border: solid 2px ${colors.bgGrey};
    color: ${colors.bgGrey};
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    width: 100px;
    font-size: 0.9rem;
  }
`;
