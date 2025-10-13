import { useState, FormEvent } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../config/environment";

interface ContactFormProps {
  onSubmitSuccess?: () => void;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 500;
  font-size: 0.95rem;
`;

const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.primary};
  margin-left: 4px;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  background: ${({ theme }) => theme.surfaceColor};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
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
  padding: 0.875rem 1rem;
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  background: ${({ theme }) => theme.surfaceColor};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
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
  padding: 0.875rem 2rem;
  background: ${({ theme, $isSubmitting }) =>
    $isSubmitting ? theme.borderLight : theme.primaryGradient};
  color: white;
  border: 1px solid
    ${({ theme, $isSubmitting }) =>
      $isSubmitting ? theme.borderMedium : theme.primary};
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: ${({ $isSubmitting }) => ($isSubmitting ? "not-allowed" : "pointer")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadowMd};

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLg};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    transform: none;
    box-shadow: ${({ theme }) => theme.shadowSm};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme.successLight}22;
  border: 1px solid ${({ theme }) => theme.success};
  border-radius: 12px;
  color: ${({ theme }) => theme.success};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
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
