import styled from "styled-components";
import { Modal, Form, Button } from "react-bootstrap";
import { FormButton } from "../../../components/questionnaire/styles/FormButton";

// Modal structure styles
export const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 15px;
    border: transparent;
  }
`;

export const ModalHeader = styled(Modal.Header)`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  color: ${({ theme }) => theme.blue};
  border: transparent;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  justify-content: center;
  position: relative;

  .btn-close {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const HeaderText = styled(Modal.Title)`
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
`;

export const ModalBody = styled(Modal.Body)`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

// Form input styles
export const InputStyle = styled(Form.Control)`
  background-color: ${({ theme }) => theme.disabledBackground};
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.blue};
  margin-top: 15px;
`;

// Required form group with asterisk
export const RequiredFormGroup = styled(Form.Group)`
  position: relative;

  &::before {
    content: "*";
    color: ${({ theme }) => theme.red || "#dc3545"};
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    font-size: 1.2rem;
  }

  ${InputStyle} {
    padding-left: 20px;
  }
`;

// Password field styles
export const PasswordContainer = styled.div`
  position: relative;
  margin-top: 15px;

  ${RequiredFormGroup} & {
    ${InputStyle} {
      padding-left: 20px;
    }
  }
`;

export const PasswordToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
`;

export const InfoIcon = styled.span`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
`;

// Text styles
export const CardText = styled.h5`
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 20px;
  margin-right: 50px;
  margin-left: 50px;
  text-align: center;
  font-size: 1.25rem;
`;

// Required fields note
export const RequiredFieldsNote = styled.div`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.8rem;
  margin-left: 15px;
  margin-bottom: 5px;

  &::before {
    content: "*";
    color: ${({ theme }) => theme.red || "#dc3545"};
    margin-right: 4px;
  }
`;

// Required field label
export const RequiredLabel = styled.label`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  margin-left: 5px;

  &::after {
    content: " *";
    color: ${({ theme }) => theme.red || "#dc3545"};
    margin-left: 2px;
  }
`;

// Small note for required fields
export const RequiredNote = styled.div`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.7rem;
  text-align: right;
  margin-top: 5px;
  margin-right: 15px;
  font-style: italic;

  &::before {
    content: "* ";
    color: ${({ theme }) => theme.red || "#dc3545"};
  }
`;

// Password requirement styles
export const RequirementList = styled.ul`
  padding-left: 20px;
  margin-bottom: 0;
`;

export const RequirementItem = styled.li<{ $isMet: boolean }>`
  color: ${(props) =>
    props.$isMet ? props.theme.green : props.theme.textGrey};
  font-size: 0.9rem;
`;

export const OrSeparator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  color: ${({ theme }) => theme.textGrey};

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.textGrey};
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;

  & > div {
    width: 48%;
  }
`;

export const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  height: 44px;
  background-color: white;
  color: #757575;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  width: 48%;
  font-size: 0.9rem;

  &:hover {
    background-color: #f8f8f8;
    color: #757575;
    border-color: #ccc;
  }

  img {
    height: 18px;
    margin-right: 8px;
  }
`;

export const StyledFormButton = styled(FormButton)`
  border-radius: 6px;
  width: 100%;
  margin: 0;
  height: 44px;
  padding: 10px 16px;
  border: none;
  box-shadow: none;
  outline: none;
`;
