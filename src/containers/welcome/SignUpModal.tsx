import { Modal, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoutePaths } from "../../common/constants/routes";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { useRegisterUser } from "../../hooks/auth/useRegisterUser";
import { useMoveLocalResponsesToDB } from "../../hooks/auth/useMoveLocalResponsesToDB";
import { useConvertGuestToUser } from "../../hooks/auth/useConvertGuestToUser";

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
  const { updateAuth, user } = useContext(AuthContext);
  // registration mutation
  const { mutate: registerMutate } = useRegisterUser();
  // mutation for moving local responses to DB
  const { mutateAsync: moveLocalResponses } = useMoveLocalResponsesToDB();
  // mutation for converting guest to a registered user
  const { mutate: convertGuestMutate } = useConvertGuestToUser();

  const validatePassword = (password: string): string | null => {
    const requirements = [
      { regex: /.{8,}/, message: "Password must be at least 8 characters" },
      { regex: /[A-Z]/, message: "Must contain at least one uppercase letter" },
      { regex: /[a-z]/, message: "Must contain at least one lowercase letter" },
      { regex: /\d/, message: "Must contain at least one digit" },
      {
        regex: /[!@#$%^&*(),.?":{}|<>]/,
        message: "Must contain at least one special character",
      },
    ];

    const errors = requirements
      .filter((req) => !req.regex.test(password))
      .map((req) => req.message);

    return errors.length > 0 ? errors.join(", ") : null;
  };

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
          onSuccess: async (data) => {
            await moveLocalResponses(data.userId);
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
          onSuccess: async (data) => {
            await moveLocalResponses(data.userId);
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
            <InputStyle
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                const passwordFeedback = validatePassword(e.target.value);
                if (passwordFeedback) {
                  setError(passwordFeedback);
                } else {
                  setError("");
                }
              }}
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
