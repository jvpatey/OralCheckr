import React, { useState, useEffect, useContext, useRef } from "react";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import { LoginData } from "../../services/authService";
import { AuthContext } from "../authentication/AuthContext";
import { useLoginUser } from "../../hooks/auth/useLoginUser";
import { useGoogleLogin } from "../../hooks/auth/useGoogleLogin";
import { PasswordField } from "./components";
import {
  StyledModal,
  ModalHeader,
  HeaderText,
  ModalBody,
  InputStyle,
  RequiredFormGroup,
  RequiredNote,
  StyledFormButton,
  OrSeparator,
  CardText,
} from "./styles/ModalStyles";

// Get Google Client ID from environment variable or config.js
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  (window as any).APP_CONFIG?.GOOGLE_CLIENT_ID;

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
  const googleButtonRef = useRef<HTMLDivElement>(null);

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
  const handleGoogleSuccess = (response: any) => {
    setError("");
    setIsServerError(false);

    if (response && response.credential) {
      googleLoginMutate(
        { credential: response.credential },
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
    } else {
      setError("Google login failed: No credential received");
      setIsServerError(true);
    }
  };

  // Initialize Google OAuth Client when modal shows
  useEffect(() => {
    if (show) {
      // Clean up any previous instances
      const oldScripts = document.querySelectorAll(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      oldScripts.forEach((script) => script.remove());

      // Add Google's script
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // @ts-ignore - window.google is provided by the script
        window.google?.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleSuccess,
        });

        if (googleButtonRef.current) {
          // @ts-ignore
          window.google?.accounts.id.renderButton(googleButtonRef.current, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            width: 250,
            locale: "en",
          });
        }
      };
      document.body.appendChild(script);

      // Cleanup function
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [show]);

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
        <CardText>
          Welcome back! Enter your credentials below to access your account:
        </CardText>
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
          <RequiredFormGroup className="m-3">
            <PasswordField
              value={password}
              onChange={setPassword}
              placeholder="Password"
              autoComplete="current-password"
              id="formPassword"
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

          <StyledFormButton
            type="submit"
            disabled={!formValid}
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
          >
            Login with Email
          </StyledFormButton>

          <OrSeparator>OR</OrSeparator>

          <div
            ref={googleButtonRef}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          ></div>
        </Form>
      </ModalBody>
    </StyledModal>
  );
}
