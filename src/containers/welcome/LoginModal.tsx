import { Modal, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { RoutePaths } from "../../common/constants/routes";
import { useEffect } from "react";

interface LoginModalProps {
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

const UsernameStyle = styled(Form.Control)`
  background-color: ${({ theme }) => theme.disabledBackground};
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.blue};
`;

const PasswordStyle = styled(Form.Control)`
  background-color: ${({ theme }) => theme.disabledBackground};
  margin-top: 20px;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.blue};
`;

const Button = styled.button<{ $login?: boolean }>`
  background-color: ${(props) =>
    props.$login ? props.theme.green : props.theme.green};
  color: ${(props) =>
    props.$login ? props.theme.backgroundColor : props.theme.backgroundColor};
  font-weight: bold;
  border: 2px solid
    ${(props) => (props.$login ? props.theme.green : props.theme.green)};
  width: 50%;
  margin-top: 10px;
  border-radius: 20px;
  padding: 0.5em 1em;
  cursor: pointer;
  margin: 10px auto;
  display: block;

  &:hover {
    background-color: ${(props) =>
      props.$login
        ? props.theme.accentBackgroundColor
        : props.theme.accentBackgroundColor};
    color: ${(props) => (props.$login ? props.theme.green : props.theme.green)};
    border-color: ${(props) => props.theme.green};
    border-width: 2px;
  }
`;

export function LoginModal({ show, handleClose }: LoginModalProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const storedUsername = import.meta.env.VITE_USERNAME || "admin";
  const storedPassword = import.meta.env.VITE_PASSWORD || "admin";

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("authenticated", "true");
      navigate(RoutePaths.LANDING);
      handleClose(); // Close modal on successful login
    } else {
      setError("Invalid username or password");
    }
  };

  // Reset form states when modal is closed
  useEffect(() => {
    if (!show) {
      setUsername("");
      setPassword("");
      setError("");
    }
  }, [show]);

  return (
    <StyledModal show={show} onHide={handleClose} centered>
      <ModalHeader closeButton>
        <HeaderText>Login</HeaderText>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group controlId="formUsername" className="m-3">
            <UsernameStyle
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="m-3">
            <PasswordStyle
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </Form.Group>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          <Button $login type="submit">
            Login
          </Button>
        </Form>
      </ModalBody>
    </StyledModal>
  );
}
