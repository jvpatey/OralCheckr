import { Modal, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoutePaths } from "../../common/constants/routes";

interface SignUpModalProps {
  show: boolean;
  handleClose: () => void;
}

const ModalHeader = styled(Modal.Header)`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  color: ${({ theme }) => theme.blue};
  border: transparent;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const HeaderText = styled(Modal.Title)`
  font-size: 30px;
  margin-left: 20px;
`;

const ModalBody = styled(Modal.Body)`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 15px;
    border: transparent;
  }
`;

const InputStyle = styled(Form.Control)`
  background-color: ${({ theme }) => theme.disabledBackground};
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.blue};
  margin-top: 15px;
`;

const Button = styled.button<{ $signup?: boolean }>`
  background-color: ${(props) =>
    props.$signup ? props.theme.green : props.theme.green};
  color: ${(props) =>
    props.$signup ? props.theme.backgroundColor : props.theme.backgroundColor};
  font-weight: bold;
  border: 2px solid
    ${(props) => (props.$signup ? props.theme.green : props.theme.green)};
  width: 50%;
  margin-top: 10px;
  border-radius: 20px;
  padding: 0.5em 1em;
  cursor: pointer;
  margin: 10px auto;
  display: block;

  &:hover {
    background-color: ${(props) =>
      props.$signup
        ? props.theme.accentBackgroundColor
        : props.theme.accentBackgroundColor};
    color: ${(props) =>
      props.$signup ? props.theme.green : props.theme.green};
    border-color: ${(props) => props.theme.green};
    border-width: 2px;
  }
`;

const CardText = styled.h5`
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 20px;
  margin-right: 50px;
  margin-left: 50px;
  text-align: center;
  font-size: 1.25rem;
`;

export function SignUpModal({ show, handleClose }: SignUpModalProps) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    // Save the data in local storage
    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authenticated", "true");

    // Redirect to the landing page after successful signup
    navigate(RoutePaths.LANDING);
    handleClose();
  };

  return (
    <StyledModal show={show} onHide={handleClose} centered>
      <ModalHeader closeButton>
        <HeaderText>Sign Up</HeaderText>
      </ModalHeader>
      <ModalBody>
        <CardText>
          Please fill out the following fields to create a user account
        </CardText>
        <Form onSubmit={handleSignUpSubmit}>
          <Form.Group controlId="formFirstName" className="m-3">
            <InputStyle
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
            />
          </Form.Group>
          <Form.Group controlId="formLastName" className="m-3">
            <InputStyle
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="m-3">
            <InputStyle
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="m-3">
            <InputStyle
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </Form.Group>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          <Button $signup type="submit">
            Sign Up
          </Button>
        </Form>
      </ModalBody>
    </StyledModal>
  );
}
