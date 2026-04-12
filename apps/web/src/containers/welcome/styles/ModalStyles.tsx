import styled from "styled-components";
import { Modal, Form, Button } from "react-bootstrap";

// Modal shell — solid surface + cyan accents (aligned with welcome / bento)
export const StyledModal = styled(Modal)`
  .modal-content {
    background: ${({ theme }) => theme.surfaceColor};
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.borderLight};
    box-shadow:
      ${({ theme }) => theme.shadowXl},
      0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  }

  .modal-dialog {
    max-width: 480px;
  }
`;

export const ModalHeader = styled(Modal.Header)`
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /* Equal left/right columns so title stays visually centered with close on the right */
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  column-gap: 8px;
  padding: 16px 16px 0 16px;
  position: relative;

  .modal-title {
    grid-column: 2;
    grid-row: 1;
    justify-self: center;
    margin: 0 !important;
    max-width: 100%;
  }

  .btn-close {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
    align-self: start;
    position: static !important;
    margin: 0 !important;
    top: auto !important;
    right: auto !important;
    /* Drop Bootstrap SVG × — we draw a lighter glyph */
    background: transparent !important;
    background-image: none !important;
    filter: none !important;
    border: 1px solid transparent;
    border-radius: 8px;
    width: 28px;
    height: 28px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.55;
    flex-shrink: 0;
    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      opacity 0.2s ease,
      color 0.2s ease;

    &::before {
      content: "×";
      font-size: 17px;
      font-weight: 500;
      line-height: 1;
      color: ${({ theme }) => theme.textTertiary};
    }

    &:hover {
      opacity: 1;
      border-color: ${({ theme }) => theme.borderLight};
      background: ${({ theme }) => theme.surfaceElevated};
    }

    &:hover::before {
      color: ${({ theme }) => theme.textSecondary};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}30;
      opacity: 1;
    }
  }
`;

/** Title block — sits in center grid column of ModalHeader */
export const ModalTitleStack = styled(Modal.Title)`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 4px 0 0 0;
`;

/** Brand lockup — same treatment as hero title, scaled for modal (see WelcomeStyles HeroTitle) */
export const ModalWordmark = styled.p`
  margin: 0 0 8px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: clamp(1.2rem, 2.6vw + 0.65rem, 1.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.15;
  color: ${({ theme }) => theme.textPrimary};
`;

export const ModalWordmarkAccent = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 800;
  letter-spacing: -0.04em;
`;

/** Step headline — mirrors HeroSubtitle scale, primary color so it reads above body copy */
export const ModalHeading = styled.span`
  display: block;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: clamp(1.1rem, 1.2vw + 0.85rem, 1.35rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};
  line-height: 1.35;
`;

export const ModalBody = styled(Modal.Body)`
  background: transparent;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 16px 22px 22px 22px;
  /* Override Bootstrap body color so copy reads on dark surfaces */
  color: ${({ theme }) => theme.textSecondary};

  p {
    color: inherit;
  }
`;

// Form inputs — slightly smaller than CTAs so buttons read as primary actions (best practice)
export const InputStyle = styled(Form.Control)`
  font-family: var(--font-sans), system-ui, sans-serif;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  padding: 10px 16px;
  min-height: 44px;
  font-size: 0.9375rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.textPrimary};
  margin-top: 0;
  margin-bottom: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.textTertiary};
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}22;
    background: ${({ theme }) => theme.surfaceColor};
  }

  &:hover:not(:focus) {
    border-color: ${({ theme }) => theme.borderMedium};
  }
`;

// Required form group with asterisk
export const RequiredFormGroup = styled(Form.Group)`
  position: relative;
  margin-bottom: 0;

  &::before {
    content: "*";
    color: ${({ theme }) => theme.error || "#dc3545"};
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    font-size: 0.9375rem;
    font-weight: 600;
  }

  ${InputStyle} {
    padding-left: 26px;
  }
`;

// Password field styles
export const PasswordContainer = styled.div`
  position: relative;
  margin-top: 0;

  ${InputStyle} {
    padding-right: 72px;
  }

  ${RequiredFormGroup} & {
    ${InputStyle} {
      padding-left: 26px;
    }
  }
`;

export const PasswordToggle = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.textSecondary};
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surfaceElevated};
  }
`;

export const InfoIcon = styled.span`
  position: absolute;
  right: 44px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.textSecondary};
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surfaceElevated};
  }
`;

/** Intro copy — aligned with WelcomeStyles HeroDescription */
export const CardText = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 auto 20px;
  max-width: 32rem;
  text-align: center;
  font-size: clamp(0.95rem, 0.45vw + 0.82rem, 1.0625rem);
  line-height: 1.65;
  font-weight: 400;
`;

// Required fields note
export const RequiredFieldsNote = styled.div`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.8rem;
  margin-left: 15px;
  margin-bottom: 5px;

  &::before {
    content: "*";
    color: ${({ theme }) => theme.red || "#dc3545"};
    margin-right: 4px;
  }
`;

// Required field label
export const RequiredLabel = styled.label`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  margin-left: 5px;

  &::after {
    content: " *";
    color: ${({ theme }) => theme.red || "#dc3545"};
    margin-left: 2px;
  }
`;

// Small note for required fields
export const RequiredNote = styled.div`
  color: ${({ theme }) => theme.textTertiary};
  font-size: 0.8125rem;
  text-align: right;
  margin-top: -6px;
  margin-bottom: 12px;
  font-style: italic;
  font-weight: 400;
  opacity: 0.92;

  &::before {
    content: "* ";
    color: ${({ theme }) => theme.error || "#dc3545"};
  }
`;

// Password requirement styles
export const RequirementList = styled.ul`
  padding: 14px 18px;
  margin: 12px 0 0 0;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 14px;
  list-style: none;
`;

export const RequirementItem = styled.li<{ $isMet: boolean }>`
  color: ${(props) =>
    props.$isMet ? props.theme.success : props.theme.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: "${(props) => (props.$isMet ? "✓" : "○")}";
    margin-right: 12px;
    font-weight: bold;
    color: ${(props) =>
      props.$isMet ? props.theme.success : props.theme.textSecondary};
    width: 16px;
    text-align: center;
    transition: all 0.3s ease;
  }
`;

export const OrSeparator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 16px 0;
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textTertiary};
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};
  }

  &::before {
    margin-right: 14px;
  }

  &::after {
    margin-left: 14px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;

  & > div {
    width: 48%;
  }
`;

export const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans), system-ui, sans-serif;
  min-height: 46px;
  padding: 11px 20px;
  background: ${({ theme }) => theme.surfaceColor};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => `${theme.primary}40`};
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: -0.02em;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
  width: 100%;
  margin-bottom: 12px;

  &:hover {
    background: ${({ theme }) => theme.surfaceElevated};
    color: ${({ theme }) => theme.textPrimary};
    border-color: ${({ theme }) => `${theme.primary}60`};
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  img {
    height: 20px;
    margin-right: 12px;
  }
`;

/** Primary submit — taller & heavier type than inputs (visual hierarchy) */
export const StyledFormButton = styled.button`
  font-family: var(--font-sans), system-ui, sans-serif;
  width: 100%;
  margin: 0;
  min-height: 50px;
  padding: 13px 24px;
  border-radius: 9999px;
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #ffffff;
  background: ${({ theme }) => theme.primaryGradient};
  border: 1px solid ${({ theme }) => theme.primary};
  cursor: pointer;
  transition:
    box-shadow 0.25s ease,
    filter 0.25s ease,
    opacity 0.25s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  &:active:not(:disabled) {
    filter: brightness(0.98);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    filter: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }
`;

/** Outline pill — matches welcome Login / footer Support */
export const ModalOutlineButton = styled.button`
  font-family: var(--font-sans), system-ui, sans-serif;
  width: 100%;
  min-height: 46px;
  padding: 11px 20px;
  border-radius: 9999px;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }
`;

/**
 * Wraps modal guest CTA — same footprint as StyledFormButton so primary + secondary align.
 * (ContinueAsGuestButton renders the button as a direct child after Fragment flattening.)
 */
export const ModalGuestSlot = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4px;

  & > button {
    min-height: 50px;
    padding: 13px 24px;
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    box-sizing: border-box;
  }
`;

export const ModalMutedMessage = styled.p`
  margin: 12px 0;
  text-align: center;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.textTertiary};
`;

// Global popover styles for password requirements
export const GlobalPopoverStyles = styled.div`
  /* Target all popovers globally with more aggressive selectors */
  .popover,
  .popover.show,
  .popover.bs-popover-top,
  .popover.bs-popover-bottom,
  .popover.bs-popover-left,
  .popover.bs-popover-right {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    max-width: 280px;
    z-index: 9999 !important;
    padding: 0 !important;
    margin: 0 !important;
    backdrop-filter: none !important;
  }

  .popover-body,
  .popover-body * {
    background: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
  }

  .popover-arrow,
  .popover-arrow::before,
  .popover-arrow::after {
    display: none !important;
    visibility: hidden !important;
  }

  /* Hide any default Bootstrap popover styling */
  .popover-content,
  .popover-content * {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
  }

  /* Target the specific popover ID */
  #password-requirements-popover {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
`;
