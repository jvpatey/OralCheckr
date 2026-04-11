import { useState, FormEvent } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../config/environment";

interface ContactFormProps {
  onSubmitSuccess?: () => void;
}

const FormContainer = styled.form`
  font-family: var(--font-sans), system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

/** Name + email side by side; stacks on narrow viewports */
const NameEmailRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  align-items: flex-start;

  & > * {
    flex: 1 1 200px;
    min-width: 0;
  }
`;

const Label = styled.label`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: -0.02em;
`;

const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.primary};
  margin-left: 4px;
`;

const Input = styled.input`
  font-family: var(--font-sans), system-ui, sans-serif;
  padding: 0.625rem 0.875rem;
  min-height: 44px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  background: ${({ theme }) => theme.surfaceColor};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.875rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}22;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textTertiary};
    opacity: 0.7;
  }

  &:disabled {
    background: ${({ theme }) => theme.surfaceElevated};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const TextArea = styled.textarea`
  font-family: var(--font-sans), system-ui, sans-serif;
  padding: 0.625rem 0.875rem;
  line-height: 1.5;
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  background: ${({ theme }) => theme.surfaceColor};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.875rem;
  resize: vertical;
  min-height: 120px;
  box-sizing: border-box;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}22;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textTertiary};
    opacity: 0.7;
  }

  &:disabled {
    background: ${({ theme }) => theme.surfaceElevated};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button<{ $isSubmitting: boolean }>`
  font-family: var(--font-sans), system-ui, sans-serif;
  padding: 10px 20px;
  min-height: 44px;
  background: ${({ theme, $isSubmitting }) =>
    $isSubmitting ? theme.borderLight : theme.primaryGradient};
  color: white;
  border: 1px solid
    ${({ theme, $isSubmitting }) =>
      $isSubmitting ? theme.borderMedium : theme.primary};
  border-radius: 9999px;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  cursor: ${({ $isSubmitting }) => ($isSubmitting ? "not-allowed" : "pointer")};
  transition:
    filter 0.25s ease,
    box-shadow 0.25s ease,
    opacity 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-sizing: border-box;

  &:hover:not(:disabled) {
    filter: brightness(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  &:active:not(:disabled) {
    filter: brightness(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    filter: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.error};
  font-size: 0.8125rem;
  margin-top: 0.15rem;
  font-weight: 500;
  line-height: 1.4;
`;

const SuccessMessage = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  line-height: 1.45;
  background: ${({ theme }) => theme.successLight}22;
  border: 1px solid ${({ theme }) => theme.success};
  border-radius: 12px;
  color: ${({ theme }) => theme.success};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.875rem;
  box-shadow: ${({ theme }) => theme.shadowSm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <>
      {isSuccess && (
        <SuccessMessage>
          <FontAwesomeIcon icon={faCheckCircle} />
          Thanks for your message! I'll get back to you as soon as possible.
        </SuccessMessage>
      )}

      <FormContainer onSubmit={handleSubmit}>
        <NameEmailRow>
          <FormGroup>
            <Label htmlFor="name">
              Name
              <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              disabled={isSubmitting}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">
              Email
              <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
        </NameEmailRow>

        <FormGroup>
          <Label htmlFor="subject">
            Subject
            <RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            disabled={isSubmitting}
          />
          {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">
            Message
            <RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your feedback, bug report, or question..."
            disabled={isSubmitting}
          />
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
        </FormGroup>

        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          $isSubmitting={isSubmitting}
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
            </>
          )}
        </SubmitButton>
      </FormContainer>
    </>
  );
}
