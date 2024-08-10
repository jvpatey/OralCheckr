import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

// Styled component styles for the log button
const ButtonContainer = styled.div`
  background-color: #f5f5f5;
  border: 2px solid #41bc7a;
  color: #41bc7a;
  width: 50px;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s, background-color 0.3s;

  &:hover {
    background-color: #41bc7a;
    border: 2px solid #41bc7a;
    color: #f5f5f5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 45px;
  }
`;

const EditButtonContainer = styled(ButtonContainer)`
  border: 2px solid #f1c232;
  color: #f1c232;

  &:hover {
    background-color: #f1c232;
    border: 2px solid #f1c232;
    color: #f5f5f5;
  }
`;

const DeleteButtonContainer = styled(ButtonContainer)`
  border: 2px solid #e74c3c;
  color: #e74c3c;

  &:hover {
    background-color: #e74c3c;
    border: 2px solid #e74c3c;
    color: #f5f5f5;
  }
`;

const ButtonIcon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface LogButtonProps {
  habitName: string;
  selectedDate: Date;
  onLog: (habitName: string, selectedDate: Date) => void;
}

export function LogButton({ habitName, selectedDate, onLog }: LogButtonProps) {
  const handleLogClick = () => {
    onLog(habitName, selectedDate);
  };

  return (
    <ButtonContainer onClick={handleLogClick}>
      <ButtonIcon>
        <FontAwesomeIcon icon={faClipboardCheck} />
      </ButtonIcon>
    </ButtonContainer>
  );
}

export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <EditButtonContainer onClick={onClick}>
      <ButtonIcon>
        <FontAwesomeIcon icon={faPencilAlt} />
      </ButtonIcon>
    </EditButtonContainer>
  );
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <DeleteButtonContainer onClick={onClick}>
      <ButtonIcon>
        <FontAwesomeIcon icon={faTrashAlt} />
      </ButtonIcon>
    </DeleteButtonContainer>
  );
}
