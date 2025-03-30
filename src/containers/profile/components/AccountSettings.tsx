import { useState } from "react";
import { Form, Toast } from "react-bootstrap";
import { updateProfile } from "../../../services/profileService";
import { validatePassword } from "../../../containers/welcome/utils/password-utils";
import { PasswordField } from "../../../containers/welcome/components";
import { InputStyle } from "../../../containers/welcome/styles/ModalStyles";
import {
  SettingsContainer,
  Section,
  SectionTitle,
  StyledForm,
  StyledButton,
  CurrentValue,
  DescriptionText,
  StyledLabel,
  PasswordFeedback,
  StyledToastContainer,
} from "../styles/AccountSettingsStyles";

interface AccountSettingsProps {
  currentEmail: string;
  refetch: () => Promise<any>;
}

export function AccountSettings({
  currentEmail,
  refetch,
}: AccountSettingsProps) {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailLoading(true);
    try {
      await updateProfile({ email: newEmail });
      setMessage({ type: "success", text: "Email updated successfully!" });
      setShowToast(true);
      setNewEmail("");
      await refetch();
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update email";
      setMessage({
        type: "error",
        text: errorMessage,
      });
      setShowToast(true);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setShowToast(true);
      return;
    }
    setIsPasswordLoading(true);
    try {
      await updateProfile({ currentPassword, newPassword });
      setMessage({ type: "success", text: "Password updated successfully!" });
      setShowToast(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update password";
      setMessage({
        type: "error",
        text: errorMessage,
      });
      setShowToast(true);
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    if (value) {
      const error = validatePassword(value);
      setPasswordError(error);
    } else {
      setPasswordError(null);
    }
  };

  const passwordsDoNotMatch =
    confirmPassword !== "" && newPassword !== confirmPassword;

  return (
    <>
      <StyledToastContainer>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={message?.type === "success" ? "success" : "danger"}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">
              {message?.type === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body
            className={message?.type === "success" ? "text-white" : ""}
          >
            {message?.text}
          </Toast.Body>
        </Toast>
      </StyledToastContainer>

      <SettingsContainer>
        <Section>
          <SectionTitle>Change Email Address</SectionTitle>
          <CurrentValue>Current Email: {currentEmail}</CurrentValue>
          <DescriptionText>
            Enter the new email address you want to use for your account:
          </DescriptionText>
          <StyledForm onSubmit={handleEmailUpdate}>
            <Form.Group className="mb-3">
              <InputStyle
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email address"
                required
              />
            </Form.Group>
            <StyledButton type="submit" disabled={isEmailLoading}>
              Update Email
            </StyledButton>
          </StyledForm>
        </Section>

        <Section>
          <SectionTitle>Change Password</SectionTitle>
          <DescriptionText>
            Changing your password will immediately update your login
            credentials. You'll need to use the new password the next time you
            log in.
          </DescriptionText>
          <StyledForm onSubmit={handlePasswordUpdate}>
            <Form.Group className="mb-3">
              <StyledLabel>Current Password</StyledLabel>
              <PasswordField
                value={currentPassword}
                onChange={setCurrentPassword}
                placeholder="Enter your current password"
                autoComplete="current-password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <StyledLabel>New Password</StyledLabel>
              <PasswordField
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="Enter your new password"
                autoComplete="new-password"
                showRequirements={true}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <StyledLabel>Confirm New Password</StyledLabel>
              <PasswordField
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm your new password"
                autoComplete="new-password"
                required
              />
              {passwordsDoNotMatch && (
                <PasswordFeedback>Passwords do not match</PasswordFeedback>
              )}
            </Form.Group>
            <StyledButton
              type="submit"
              disabled={
                isPasswordLoading || !!passwordError || passwordsDoNotMatch
              }
            >
              Update Password
            </StyledButton>
          </StyledForm>
        </Section>
      </SettingsContainer>
    </>
  );
}
