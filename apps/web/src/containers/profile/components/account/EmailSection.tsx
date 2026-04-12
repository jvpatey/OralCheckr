import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { updateProfile } from "../../../../services/profileService";
import { InputStyle } from "../../../../containers/welcome/styles/ModalStyles";
import {
  Section,
  SectionTitle,
  StyledForm,
  CurrentValue,
  DescriptionText,
  PasswordFeedback,
} from "../../styles/AccountTabStyles";
import { SimpleButton } from "../../styles/SimpleButton";
import { FormLabel } from "../../styles/FormLabel";

interface EmailSectionProps {
  currentEmail: string;
  refetch: () => Promise<any>;
}

export function EmailSection({ currentEmail, refetch }: EmailSectionProps) {
  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError("");
    setSubmitSuccess(false);
    try {
      await updateProfile({ email: newEmail });
      setNewEmail("");
      setSubmitSuccess(true);
      await refetch();
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update email";
      setSubmitError(errorMessage);
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
        {submitError && <PasswordFeedback>{submitError}</PasswordFeedback>}
        {submitSuccess && (
          <PasswordFeedback $success>Email updated successfully.</PasswordFeedback>
        )}
        <SimpleButton type="submit" disabled={isLoading || !newEmail.trim()}>
          Update Email
        </SimpleButton>
      </StyledForm>
    </Section>
  );
}
