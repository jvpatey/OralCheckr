import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faPlusCircle} />
      </ButtonIcon>
    </ButtonContainer>
  );
}
