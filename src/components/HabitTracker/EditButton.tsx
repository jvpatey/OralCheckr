import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const EditButtonContainer = styled.div`
  background-color: #f5f5f5;
  border: 2px solid #f1c232;
  color: #f1c232;
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
    background-color: #f1c232;
    border: 2px solid #f1c232;
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

export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <EditButtonContainer onClick={onClick}>
      <ButtonIcon>
        <FontAwesomeIcon icon={faPencilAlt} />
      </ButtonIcon>
    </EditButtonContainer>
  );
}
