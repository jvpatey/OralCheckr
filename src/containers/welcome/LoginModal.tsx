import { Modal, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { RoutePaths } from "../../common/constants/routes";
import { LoginData } from "../../services/authService";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { useLoginUser } from "../../hooks/auth/useLoginUser";

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
  const { updateAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Login mutation
  const { mutate: loginMutate } = useLoginUser();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    const loginData: LoginData = { email, password };

    try {
      // Login mutation
      loginMutate(loginData, {
        onSuccess: async (data) => {
          updateAuth(null);
          navigate(RoutePaths.LANDING);
          handleClose();
        },
        onError: (err: Error) => {
          setError(err.message);
        },
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Reset form states when modal is closed
  useEffect(() => {
    if (!show) {
      setEmail("");
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
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
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
