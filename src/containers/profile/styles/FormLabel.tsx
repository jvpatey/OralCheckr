import styled from "styled-components";

// Modern label with proper spacing
export const FormLabel = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;
