import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { updateProfile } from "../../../../services/profileService";
import {
  Section,
  SectionTitle,
  StyledForm,
  DescriptionText,
  PasswordFeedback,
} from "../../styles/AccountTabStyles";
import { SimpleButton } from "../../styles/SimpleButton";
import { FormLabel } from "../../styles/FormLabel";
import { PasswordField } from "../../../../containers/welcome/components/PasswordField";

interface PasswordSectionProps {
  refetch: () => Promise<any>;
  showToast: (type: "success" | "error", message: string) => void;
}

export function PasswordSection({ refetch, showToast }: PasswordSectionProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Check if new password and confirm password match
  useEffect(() => {
    if (confirmPassword.length === 0) {
      setPasswordMatch(true);
      return;
    }

    setPasswordMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  // Check password validity
  useEffect(() => {
    const hasLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

    // Password must have at least 3 of the 4 requirements
    const requirements = [hasUppercase, hasLowercase, hasNumber, hasSpecial];
    const validRequirements = requirements.filter(Boolean).length;

    setIsPasswordValid(hasLength && validRequirements >= 3);

    // Show appropriate error message
    if (newPassword.length > 0 && !hasLength) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (newPassword.length > 0 && validRequirements < 3) {
      setPasswordError(
        "Password must include at least 3 of: uppercase, lowercase, numbers, and special characters"
      );
    } else {
      setPasswordError("");
    }
  }, [newPassword]);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile({
        currentPassword,
        newPassword,
      });
      showToast("success", "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      await refetch();
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update password";
      showToast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsDoNotMatch = confirmPassword.length > 0 && !passwordMatch;

  return (
    <Section>
      <SectionTitle>Change Password</SectionTitle>
      <DescriptionText>
        Update your password by entering your current password and choosing a
        new one:
      </DescriptionText>
      <StyledForm onSubmit={handlePasswordUpdate}>
        {/* Hidden username field for accessibility and password managers */}
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="username"
          style={{ display: "none" }}
          aria-hidden="true"
        />

        <FormLabel>Current Password</FormLabel>
        <Form.Group style={{ marginBottom: "1.5rem" }}>
          <PasswordField
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder="Enter current password"
            id="currentPassword"
            autoComplete="current-password"
            required
          />
        </Form.Group>

        <FormLabel>New Password</FormLabel>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <PasswordField
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Enter new password"
            id="newPassword"
            autoComplete="new-password"
            required
          />
        </Form.Group>

        {passwordError && <PasswordFeedback>{passwordError}</PasswordFeedback>}

        <FormLabel>Confirm New Password</FormLabel>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <PasswordField
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm new password"
            id="confirmPassword"
            autoComplete="new-password"
            required
          />
        </Form.Group>

        {passwordsDoNotMatch && (
          <PasswordFeedback>Passwords do not match</PasswordFeedback>
        )}

        <SimpleButton
          type="submit"
          disabled={
            isLoading ||
            !passwordMatch ||
            !isPasswordValid ||
            confirmPassword.length === 0
          }
        >
          Update Password
        </SimpleButton>
      </StyledForm>
    </Section>
  );
}
