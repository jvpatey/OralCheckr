import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const RemoveLogButtonContainer = styled.div<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#f5f5f5")};
  border: 2px solid ${({ disabled }) => (disabled ? "#ccc" : "#ff6961")};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#ff6961")};
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
    background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#ff6961")};
    border: 2px solid ${({ disabled }) => (disabled ? "#ccc" : "#ff6961")};
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

interface RemoveLogButtonProps {
  habitName: string;
  selectedDate: Date;
  onRemoveLog: (habitName: string, selectedDate: Date) => void;
  disabled: boolean;
}

export function RemoveLogButton({
  habitName,
  selectedDate,
  onRemoveLog,
  disabled,
}: RemoveLogButtonProps) {
  const handleRemoveLogClick = () => {
    if (!disabled) {
      onRemoveLog(habitName, selectedDate);
    }
  };

  return (
    <RemoveLogButtonContainer
      onClick={handleRemoveLogClick}
      disabled={disabled}
    >
      <ButtonIcon>
        <FontAwesomeIcon icon={faMinusCircle} />
      </ButtonIcon>
    </RemoveLogButtonContainer>
  );
}
