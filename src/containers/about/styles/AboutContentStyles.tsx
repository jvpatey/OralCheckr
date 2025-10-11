import styled from "styled-components";
import { Accordion } from "react-bootstrap";
import { Section } from "../../../containers/profile/styles/AccountTabStyles";

export const FAQContainer = styled.div`
  margin-bottom: 2rem;
`;

export const StyledAccordion = styled(Accordion)`
  .accordion-item {
    background: ${({ theme }) => theme.surfaceElevated};
    border: 1px solid ${({ theme }) => theme.borderLight};
    border-radius: 16px !important;
    margin-bottom: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .accordion-button {
    background: ${({ theme }) => theme.surfaceElevated};
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 600;
    font-size: 1rem;
    padding: 1.25rem 1.5rem;
    border: none;
    box-shadow: none;
    transition: all 0.3s ease;

    &:not(.collapsed) {
      background: ${({ theme }) => theme.glassBg};
      backdrop-filter: blur(${({ theme }) => theme.glassBlur});
      -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
      color: ${({ theme }) => theme.primary};
      box-shadow: none;
    }

    &:focus {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
      border-color: transparent;
    }

    &::after {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2322C55E'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
      transition: transform 0.3s ease;
    }

    &:not(.collapsed)::after {
      transform: rotate(180deg);
    }
  }

  .accordion-body {
    background: ${({ theme }) => theme.surfaceElevated};
    color: ${({ theme }) => theme.textSecondary};
    padding: 1.5rem;
    line-height: 1.7;
    font-size: 0.95rem;
    border-top: 1px solid ${({ theme }) => theme.borderLight};
  }
`;

export const ContentSection = styled(Section)`
  margin-top: 2rem;
`;

export const ContentBox = styled.div`
  margin-top: 1rem;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.borderLight};
  padding: 1.5rem;
  border-radius: 16px;
  line-height: 1.7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

export const ContentItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SubHeading = styled.h4`
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.25px;
`;

export const ContentText = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.95rem;
  line-height: 1.7;
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.primaryGradient};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);

    &::after {
      width: 100%;
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const SocialLink = styled.a`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 20px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.primary};
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.9rem;
    border-radius: 10px;
  }
`;
