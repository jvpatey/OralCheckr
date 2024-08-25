import styled from "styled-components";
import { colors } from "../../../common/utilities/color-utils";

interface ToggleButtonProps {
  options: { label: string; value: string }[];
  activeValue: string;
  onChange: (value: string) => void;
}

const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 5px;
  width: 370px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 290px;
    padding: 0 10px;
  }
`;

const Button = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) =>
    $active ? colors.blue : colors.bgWhite};
  color: ${({ $active }) => ($active ? colors.bgWhite : colors.textGrey)};
  border: 2px solid ${colors.blue};
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 50%;
  box-sizing: border-box;

  &:first-child {
    border-radius: 10px 0 0 10px;
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
  }

  &:hover {
    background-color: ${({ $active }) =>
      $active ? colors.blue : colors.bgGrey};
    border: 2px solid ${colors.blue};
  }
`;

export function ToggleButton({
  options,
  activeValue,
  onChange,
}: ToggleButtonProps) {
  return (
    <ToggleButtonContainer>
      {options.map((option) => (
        <Button
          key={option.value}
          $active={activeValue === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </ToggleButtonContainer>
  );
}
