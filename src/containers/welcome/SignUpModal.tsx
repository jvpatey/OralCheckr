import { Modal, Form, Alert, OverlayTrigger, Popover } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoutePaths } from "../../common/constants/routes";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { useRegisterUser } from "../../hooks/auth/useRegisterUser";
import { useConvertGuestToUser } from "../../hooks/auth/useConvertGuestToUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FormButton } from "../../components/questionnaire/FormButton";

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

const PasswordContainer = styled.div`
  position: relative;
  margin-top: 15px;
`;

const PasswordToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
`;

const InfoIcon = styled.span`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
`;

const RequirementList = styled.ul`
  padding-left: 20px;
  margin-bottom: 0;
`;

const RequirementItem = styled.li<{ $isMet: boolean }>`
  color: ${(props) =>
    props.$isMet ? props.theme.green : props.theme.textGrey};
  font-size: 0.9rem;
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
  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const { updateAuth, user } = useContext(AuthContext);
  // registration mutation
  const { mutate: registerMutate } = useRegisterUser();
  // mutation for converting guest to a registered user
  const { mutate: convertGuestMutate } = useConvertGuestToUser();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordRequirements = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[A-Z]/, message: "At least one uppercase letter" },
    { regex: /[a-z]/, message: "At least one lowercase letter" },
    { regex: /\d/, message: "At least one digit" },
    {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      message: "At least one special character",
    },
  ];

  const checkPasswordRequirements = (password: string) => {
    return passwordRequirements.map((req) => ({
      message: req.message,
      isMet: req.regex.test(password),
    }));
  };

  const validatePassword = (password: string): string | null => {
    const errors = passwordRequirements
      .filter((req) => !req.regex.test(password))
      .map((req) => req.message);

    return errors.length > 0 ? errors.join(", ") : null;
  };

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

  // Password requirements popover
  const passwordRequirementsPopover = (
    <Popover id="password-requirements-popover">
      <Popover.Header as="h3">Password Requirements</Popover.Header>
      <Popover.Body>
        <RequirementList>
          {checkPasswordRequirements(password).map((req, index) => (
            <RequirementItem key={index} $isMet={req.isMet}>
              {req.message}
            </RequirementItem>
          ))}
        </RequirementList>
      </Popover.Body>
    </Popover>
  );

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
            <PasswordContainer>
              <InputStyle
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="new-password"
                title="Hover over the info icon to see password requirements"
              />
              <OverlayTrigger
                trigger={["hover", "focus"]}
                placement="left"
                overlay={passwordRequirementsPopover}
              >
                <InfoIcon>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </InfoIcon>
              </OverlayTrigger>
              <PasswordToggle onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </PasswordToggle>
            </PasswordContainer>
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
