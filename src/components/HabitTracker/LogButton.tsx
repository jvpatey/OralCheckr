import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface LogButtonProps {
  habitName: string;
  selectedDate: Date;
  onLog: (habitName: string, selectedDate: Date) => void;
  disabled?: boolean;
}

// Updated ButtonContainer styled component to match RemoveLogButton styles
const ButtonContainer = styled.div<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#f5f5f5")};
  border: 2px solid ${({ disabled }) => (disabled ? "#ccc" : "#41bc7a")};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#41bc7a")};
  width: 50px;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: box-shadow 0.3s, background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#41bc7a")};
    border: 2px solid ${({ disabled }) => (disabled ? "#ccc" : "#41bc7a")};
    color: ${({ disabled }) => (disabled ? "#ccc" : "#f5f5f5")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
  }

  @media (max-width: 768px) {
    width: 45px;
  }
`;

const ButtonIcon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function LogButton({
  habitName,
  selectedDate,
  onLog,
  disabled,
}: LogButtonProps) {
  const handleLogClick = () => {
    if (!disabled) {
      onLog(habitName, selectedDate);
    }
  };

  return (
    <ButtonContainer onClick={handleLogClick} disabled={disabled}>
      <ButtonIcon>
        <FontAwesomeIcon icon={faPlusCircle} />
      </ButtonIcon>
    </ButtonContainer>
  );
}
