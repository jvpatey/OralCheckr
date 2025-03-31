import styled from "styled-components";

// Custom label with less spacing
export const FormLabel = styled.div`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  margin-top: 1rem;
  margin-bottom: -5px;
`;
