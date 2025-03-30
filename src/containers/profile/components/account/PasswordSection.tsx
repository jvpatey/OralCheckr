import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { updateProfile } from "../../../../services/profileService";
import { validatePassword } from "../../../../containers/welcome/utils/password-utils";
import { PasswordField } from "../../../../containers/welcome/components";
import {
  Section,
  SectionTitle,
  StyledForm,
  StyledButton,
  DescriptionText,
  PasswordFeedback,
} from "../../styles/AccountTabStyles";
import { FormLabel } from "../../styles/FormLabel";

interface PasswordSectionProps {
  showToast: (type: "success" | "error", message: string) => void;
}

export function PasswordSection({ showToast }: PasswordSectionProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await updateProfile({ currentPassword, newPassword });
      showToast("success", "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update password";
      showToast("error", errorMessage);
    } finally {
      setIsLoading(false);
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
    <Section>
      <SectionTitle>Change Password</SectionTitle>
      <DescriptionText>
        Changing your password will immediately update your login credentials.
        You'll need to use the new password the next time you log in.
      </DescriptionText>
      <StyledForm onSubmit={handlePasswordUpdate}>
        <FormLabel>Current Password</FormLabel>
        <Form.Group style={{ marginBottom: "1.25rem" }}>
          <PasswordField
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder="Enter your current password"
            autoComplete="current-password"
            required
          />
        </Form.Group>

        <FormLabel>New Password</FormLabel>
        <Form.Group style={{ marginBottom: "1.25rem" }}>
          <PasswordField
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter your new password"
            autoComplete="new-password"
            showRequirements={true}
            required
          />
        </Form.Group>

        <FormLabel>Confirm New Password</FormLabel>
        <Form.Group style={{ marginBottom: "1.5rem" }}>
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
          disabled={isLoading || !!passwordError || passwordsDoNotMatch}
        >
          Update Password
        </StyledButton>
      </StyledForm>
    </Section>
  );
}
