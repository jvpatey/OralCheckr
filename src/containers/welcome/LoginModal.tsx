import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RoutePaths } from "../../common/constants/routes";
import { LoginData } from "../../services/authService";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { useLoginUser } from "../../hooks/auth/useLoginUser";
import { FormButton } from "../../components/questionnaire/styles/FormButton";
import { PasswordField } from "./components";
import {
  StyledModal,
  ModalHeader,
  HeaderText,
  ModalBody,
  InputStyle,
} from "./styles/ModalStyles";

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

export function LoginModal({ show, handleClose }: LoginModalProps) {
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  // Login mutation
  const { mutate: loginMutate } = useLoginUser();

  // Check if form is valid - just check if fields have content
  useEffect(() => {
    const hasEmail = email.length > 0;
    const hasPassword = password.length > 0;
    setFormValid(hasEmail && hasPassword);
  }, [email, password]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    // Validate email format on submission
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }

    // Clear any previous errors before submitting
    setError("");
    setIsServerError(false);

    const loginData: LoginData = { email, password };

    try {
      // Login mutation
      loginMutate(loginData, {
        onSuccess: async () => {
          updateAuth(null);
          navigate(RoutePaths.LANDING);
          handleClose();
        },
        onError: (err: Error) => {
          // Display the specific error message from the server
          setError(err.message);
          setIsServerError(true);
        },
      });
    } catch (err: any) {
      // Display any other errors that might occur
      setError(err.message);
      setIsServerError(true);
    }
  };

  // Reset form states when modal is closed
  useEffect(() => {
    if (!show) {
      setEmail("");
      setPassword("");
      setError("");
      setIsServerError(false);
      setFormValid(false);
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
            <InputStyle
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="m-3">
            <PasswordField
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </Form.Group>
          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => {
                setError("");
                if (isServerError) {
                  setIsServerError(false);
                }
              }}
            >
              {error}
            </Alert>
          )}
          <FormButton type="submit" disabled={!formValid} variant="login">
            Login
          </FormButton>
        </Form>
      </ModalBody>
    </StyledModal>
  );
}
