import React, { useState, useEffect, useContext } from "react";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import { LoginData } from "../../services/authService";
import { AuthContext } from "../authentication/AuthContext";
import { useLoginUser } from "../../hooks/auth/useLoginUser";
import { useGoogleLogin } from "../../hooks/auth/useGoogleLogin";
import { PasswordField } from "./components";
import { GoogleLogin } from "@react-oauth/google";
import {
  StyledModal,
  ModalHeader,
  HeaderText,
  ModalBody,
  InputStyle,
  RequiredFormGroup,
  RequiredNote,
  ButtonContainer,
  GoogleButton,
  StyledFormButton,
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

  // Login mutations
  const { mutate: loginMutate } = useLoginUser();
  const { mutate: googleLoginMutate } = useGoogleLogin();

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

  // Handle Google login success
  const handleGoogleSuccess = (credentialResponse: any) => {
    setError("");
    setIsServerError(false);

    googleLoginMutate(
      { credential: credentialResponse.credential },
      {
        onSuccess: () => {
          updateAuth(null);
          navigate(RoutePaths.LANDING);
          handleClose();
        },
        onError: (err: Error) => {
          setError(err.message);
          setIsServerError(true);
        },
      }
    );
  };

  // Handle Google login error
  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
    setIsServerError(true);
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
          <RequiredFormGroup controlId="formUsername" className="m-3">
            <InputStyle
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </RequiredFormGroup>
          <RequiredFormGroup controlId="formPassword" className="m-3">
            <PasswordField
              value={password}
              onChange={setPassword}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </RequiredFormGroup>
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
          <RequiredNote>Required field</RequiredNote>

          <ButtonContainer>
            <GoogleButton
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("google-login-button")?.click();
              }}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
              />
              Sign in with Google
            </GoogleButton>

            <StyledFormButton type="submit" disabled={!formValid}>
              Login
            </StyledFormButton>
          </ButtonContainer>

          {/* Hidden Google login button that gets triggered by our custom button */}
          <div style={{ display: "none" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              type="standard"
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="100%"
              containerProps={{ id: "google-login-button" }}
            />
          </div>
        </Form>
      </ModalBody>
    </StyledModal>
  );
}
