import styled from "styled-components";
import { Accordion } from "react-bootstrap";

const accordionChevronMask =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='black' fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E\")";

/** Support / About page sections — decoupled from profile AccountTabStyles */
export const SupportSection = styled.div`
  margin-bottom: 3rem;
  position: relative;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const SupportSectionTitle = styled.h3`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textPrimary};
  font-size: clamp(1.125rem, 0.8vw + 1rem, 1.35rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.35;
  margin: 0 0 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderLight};

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const FAQContainer = styled.div`
  margin-bottom: 2rem;
`;

export const StyledAccordion = styled(Accordion)`
  .accordion-item {
    background: ${({ theme }) => theme.surfaceColor};
    border: 1px solid ${({ theme }) => theme.borderLight};
    border-radius: 20px !important;
    margin-bottom: 12px;
    overflow: hidden;
    box-shadow:
      ${({ theme }) => theme.shadowLg},
      0 0 0 1px ${({ theme }) => theme.borderLight} inset;
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease;

    &:hover {
      border-color: ${({ theme }) => `${theme.primary}35`};
      box-shadow:
        ${({ theme }) => theme.shadowLg},
        0 0 0 1px ${({ theme }) => `${theme.primary}20`} inset;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .accordion-button {
    font-family: var(--font-sans), system-ui, sans-serif;
    background: ${({ theme }) => theme.surfaceColor};
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 600;
    font-size: 0.9375rem;
    padding: 1.125rem 1.35rem;
    border: none;
    box-shadow: none;
    transition:
      background 0.2s ease,
      color 0.2s ease;

    &:not(.collapsed) {
      background: ${({ theme }) => theme.surfaceElevated};
      color: ${({ theme }) => theme.primary};
      box-shadow: none;
    }

    &:focus {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}22;
      border-color: transparent;
    }

    &:focus-visible {
      outline: none;
    }

    &::after {
      background-image: none !important;
      background-color: ${({ theme }) => theme.primary};
      -webkit-mask-image: ${accordionChevronMask};
      mask-image: ${accordionChevronMask};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-position: center;
      -webkit-mask-size: 1rem;
      mask-size: 1rem;
      width: 1rem;
      height: 1rem;
      transition: transform 0.25s ease;
    }

    &:not(.collapsed)::after {
      transform: rotate(180deg);
    }
  }

  .accordion-body {
    font-family: var(--font-sans), system-ui, sans-serif;
    background: ${({ theme }) => theme.surfaceElevated};
    color: ${({ theme }) => theme.textSecondary};
    padding: 1.35rem 1.35rem 1.5rem;
    line-height: 1.65;
    font-size: clamp(0.95rem, 0.35vw + 0.85rem, 1.0625rem);
    font-weight: 400;
    border-top: 1px solid ${({ theme }) => theme.borderLight};
  }
`;

export const ContentSection = styled(SupportSection)`
  margin-top: 2rem;
`;

export const ContentBox = styled.div`
  margin-top: 1rem;
  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  padding: 1.5rem;
  border-radius: 20px;
  line-height: 1.65;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}30`};
    box-shadow:
      ${({ theme }) => theme.shadowLg},
      0 0 0 1px ${({ theme }) => `${theme.primary}18`} inset;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 18px;
  }

  @media (max-width: 480px) {
    padding: 1.125rem;
    border-radius: 16px;
  }
`;

export const ContentItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SubHeading = styled.h4`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textPrimary};
  margin: 0 0 0.75rem;
  font-size: clamp(1rem, 0.5vw + 0.9rem, 1.125rem);
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const ContentText = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  font-size: clamp(0.95rem, 0.45vw + 0.82rem, 1.0625rem);
  line-height: 1.65;
  font-weight: 400;
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  margin-top: 1rem;
`;

export const SocialLink = styled.a`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  padding: 10px 18px;
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  border-radius: 9999px;
  text-decoration: none;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    padding: 9px 16px;
    font-size: 0.875rem;
  }
`;
