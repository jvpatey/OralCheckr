import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { updateProfile } from "../../../../services/profileService";
import { InputStyle } from "../../../../containers/welcome/styles/ModalStyles";
import {
  Section,
  SectionTitle,
  StyledForm,
  StyledButton,
  CurrentValue,
  DescriptionText,
} from "../../styles/AccountTabStyles";
import { FormLabel } from "../../styles/FormLabel";

interface EmailSectionProps {
  currentEmail: string;
  refetch: () => Promise<any>;
  showToast: (type: "success" | "error", message: string) => void;
}

export function EmailSection({
  currentEmail,
  refetch,
  showToast,
}: EmailSectionProps) {
  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile({ email: newEmail });
      showToast("success", "Email updated successfully!");
      setNewEmail("");
      await refetch();
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update email";
      showToast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <SectionTitle>Change Email Address</SectionTitle>
      <CurrentValue>Current Email: {currentEmail}</CurrentValue>
      <DescriptionText>
        Enter the new email address you want to use for your account:
      </DescriptionText>
      <StyledForm onSubmit={handleEmailUpdate}>
        <FormLabel>New Email Address</FormLabel>
        <Form.Group style={{ marginBottom: "1.5rem" }}>
          <InputStyle
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email address"
            required
          />
        </Form.Group>
        <StyledButton type="submit" disabled={isLoading}>
          Update Email
        </StyledButton>
      </StyledForm>
    </Section>
  );
}
