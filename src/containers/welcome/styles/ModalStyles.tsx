import styled from "styled-components";
import { Modal, Form } from "react-bootstrap";

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
`;

export const HeaderText = styled(Modal.Title)`
  font-size: 30px;
  margin-left: 20px;
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

// Password field styles
export const PasswordContainer = styled.div`
  position: relative;
  margin-top: 15px;
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
