import styled from "styled-components";
import { Accordion } from "react-bootstrap";
import { Section } from "../../../containers/profile/styles/AccountTabStyles";

export const FAQContainer = styled.div`
  margin-bottom: 2rem;
`;

export const StyledAccordion = styled(Accordion)`
  .accordion-button {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.darkGrey};
    font-weight: 500;

    &:not(.collapsed) {
      color: ${({ theme }) => theme.blue};
      background-color: ${({ theme }) => theme.accentBackgroundColor};
      box-shadow: none;
    }

    &:focus {
      box-shadow: none;
      border-color: rgba(0, 0, 0, 0.125);
    }

    &::after {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }
  }

  .accordion-body {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textGrey};
    padding: 1rem 1.25rem;
    line-height: 1.6;
  }

  .accordion-item {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) =>
      theme.backgroundColor === "#2c2c2c" ? "#2c2c2c" : "rgba(0,0,0,.125)"};
  }
`;

export const ContentSection = styled(Section)`
  margin-top: 2rem;
`;

export const ContentBox = styled.div`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 1.25rem;
  border-radius: 8px;
  line-height: 1.6;
`;

export const ContentItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SubHeading = styled.h4`
  color: ${({ theme }) => theme.blue};
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
`;

export const ContentText = styled.div`
  color: ${({ theme }) => theme.textGrey};
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.blue};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const SocialLink = styled.a`
  color: ${({ theme }) => theme.blue};
  font-size: 1rem;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.green};
    transform: translateY(-2px);
  }
`;
