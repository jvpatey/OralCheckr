import { Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { useRegisterUser } from "../../hooks/auth/useRegisterUser";
import { useConvertGuestToUser } from "../../hooks/auth/useConvertGuestToUser";
import { FormButton } from "../../components/questionnaire/styles/FormButton";
import { PasswordField } from "./components";
import { validatePassword } from "../../common/utilities/welcome/password-utils";
import {
  StyledModal,
  ModalHeader,
  HeaderText,
  ModalBody,
  InputStyle,
  CardText,
} from "./styles/ModalStyles";

interface SignUpModalProps {
  show: boolean;
  handleClose: () => void;
}

export function SignUpModal({ show, handleClose }: SignUpModalProps) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const { updateAuth, user } = useContext(AuthContext);
  // registration mutation
  const { mutate: registerMutate } = useRegisterUser();
  // mutation for converting guest to a registered user
  const { mutate: convertGuestMutate } = useConvertGuestToUser();

  // Check if all form fields are valid
  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // Only check if fields have content, not if password meets requirements
    const hasPassword = password.length > 0;

    setFormValid(!!firstName && !!lastName && isEmailValid && hasPassword);
  }, [firstName, lastName, email, password]);

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    const userData = { firstName, lastName, email, password };

    try {
      if (user && user.role === "guest") {
        // convert guest mutation when guest signs up for account
        convertGuestMutate(userData, {
          onSuccess: async () => {
            updateAuth(null);
            navigate(RoutePaths.LANDING);
            handleClose();
          },
          onError: (err: Error) => {
            setError(err.message);
          },
        });
      } else {
        // For new registrations, use the registration mutation.
        registerMutate(userData, {
          onSuccess: async () => {
            updateAuth(null);
            navigate(RoutePaths.LANDING);
            handleClose();
          },
          onError: (err: Error) => {
            setError(err.message);
          },
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Reset form states when modal is closed
  useEffect(() => {
    if (!show) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setError("");
      setFormValid(false);
    }
  }, [show]);

  return (
    <StyledModal show={show} onHide={handleClose} centered>
      <ModalHeader closeButton>
        <HeaderText>Sign Up</HeaderText>
      </ModalHeader>
      <ModalBody>
        <CardText>
          To get started, enter your details below to create an account:
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
            <PasswordField
              value={password}
              onChange={setPassword}
              placeholder="Password"
              showRequirements={true}
              autoComplete="new-password"
            />
          </Form.Group>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          <FormButton type="submit" disabled={!formValid} variant="signup">
            Sign Up
          </FormButton>
        </Form>
      </ModalBody>
    </StyledModal>
  );
}
