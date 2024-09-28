import styled from "styled-components";

interface ToggleButtonProps {
  options: { label: React.ReactNode; value: string }[];
  activeValue: string;
  onChange: (value: string) => void;
}

const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 10px;
  width: 430px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 295px;
    padding: 0 10px;
  }
`;

const Button = styled.button<{ $active: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.blue : theme.backgroundColor};
  color: ${({ $active, theme }) => ($active ? theme.backgroundColor : theme.textGrey)};
  border: 2px solid ${({ theme }) => theme.blue};
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
    background-color: ${({ $active, theme }) =>
      $active ? theme.blue : theme.accentBackgroundColor};
    border: 2px solid ${({ theme }) => theme.blue};
  }

  @media (max-width: 600px) {
  width: 290px;
  padding: 8px 10px;
  font-size: 10px;

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
