import styled from "styled-components";

export const FormLabel = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  display: block;
  margin: 1rem 0 6px 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
`;
