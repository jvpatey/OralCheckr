import React from "react";
import { Form, Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { useRegisterUser } from "../../hooks/auth/useRegisterUser";
import { useConvertGuestToUser } from "../../hooks/auth/useConvertGuestToUser";
import { useGoogleLogin } from "../../hooks/auth/useGoogleLogin";
import { PasswordField } from "./components";
import { validatePassword } from "./utils/password-utils";
import {
  StyledModal,
  ModalHeader,
  HeaderText,
  ModalBody,
  InputStyle,
  CardText,
  RequiredFormGroup,
  RequiredNote,
  OrSeparator,
  StyledFormButton,
} from "./styles/ModalStyles";

// Get Google Client ID from environment variable or config.js
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  (window as any).APP_CONFIG?.GOOGLE_CLIENT_ID;

// Check if we have a valid Google client ID
const hasValidGoogleClientId =
  !!GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID.length > 0;

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
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // registration mutation
  const { mutate: registerMutate } = useRegisterUser();
  // mutation for converting guest to a registered user
  const { mutate: convertGuestMutate } = useConvertGuestToUser();
  // Google login mutation
  const { mutate: googleLoginMutate } = useGoogleLogin();

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
          onSuccess: async (data) => {
            // Create a proper user object from the response
            const userObj = {
              userId: data.userId,
              role: "user", // Convert from guest to regular user
            };

            // Update auth context with the user data
            updateAuth(userObj);

            // Short delay to allow auth state to update
            setTimeout(() => {
              navigate(RoutePaths.LANDING);
              handleClose();
            }, 100);
          },
          onError: (err: Error) => {
            setError(err.message);
          },
        });
      } else {
        // For new registrations, use the registration mutation.
        registerMutate(userData, {
          onSuccess: async (data) => {
            // Create a proper user object from the signup response
            const userObj = {
              userId: data.userId,
              role: "user",
            };

            // Update auth context with the user data
            updateAuth(userObj);

            // Short delay to allow auth state to update
            setTimeout(() => {
              navigate(RoutePaths.LANDING);
              handleClose();
            }, 100);
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

  // Handle Google login success - Using login flow
  const handleGoogleSuccess = (response: any) => {
    setError("");

    if (response && response.credential) {
      googleLoginMutate(
        { credential: response.credential },
        {
          onSuccess: (data) => {
            // Create a proper user object from the login response
            const userObj = {
              userId: data.userId,
              role: data.role || "user",
            };

            // Update auth context with the user data
            updateAuth(userObj);

            // Short delay to allow auth state to update
            setTimeout(() => {
              navigate(RoutePaths.LANDING);
              handleClose();
            }, 100);
          },
          onError: (err: Error) => {
            setError(err.message);
          },
        }
      );
    } else {
      setError("Google login failed: No credential received");
    }
  };

  // Initialize Google OAuth Client when modal shows
  useEffect(() => {
    if (show && hasValidGoogleClientId) {
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
            text: "signup_with",
            shape: "rectangular",
            width: 250,
            locale: "en",
          });
        }
      };
      document.body.appendChild(script);

      // Cleanup function
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [show, hasValidGoogleClientId]);

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
          <RequiredFormGroup controlId="formFirstName" className="m-3">
            <InputStyle
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              required
            />
          </RequiredFormGroup>
          <RequiredFormGroup controlId="formLastName" className="m-3">
            <InputStyle
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              required
            />
          </RequiredFormGroup>
          <RequiredFormGroup controlId="formEmail" className="m-3">
            <InputStyle
              type="email"
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
              showRequirements={true}
              autoComplete="new-password"
              id="signupPassword"
              required
            />
          </RequiredFormGroup>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          <RequiredNote>Required field</RequiredNote>

          <StyledFormButton
            type="submit"
            disabled={!formValid}
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
          >
            Sign Up with Email
          </StyledFormButton>

          <OrSeparator>OR</OrSeparator>

          {hasValidGoogleClientId ? (
            <div
              ref={googleButtonRef}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            ></div>
          ) : (
            <div
              style={{ textAlign: "center", margin: "1rem 0", color: "#666" }}
            >
              Google Sign-In temporarily unavailable
            </div>
          )}
        </Form>
      </ModalBody>
    </StyledModal>
  );
}
