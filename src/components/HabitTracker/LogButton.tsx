import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

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
    width: auto;
  }
`;

const AddIcon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function LogButton() {
  return (
    <ButtonContainer>
      <AddIcon>
        <FontAwesomeIcon icon={faClipboardCheck} />
      </AddIcon>
    </ButtonContainer>
  );
}
