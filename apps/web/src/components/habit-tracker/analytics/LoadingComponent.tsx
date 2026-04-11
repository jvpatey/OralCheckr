import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

const GreenSpinner = styled(Spinner)`
  color: ${({ theme }) => theme.green};

  .spinner-border {
    border-color: ${({ theme }) => theme.green};
  }
`;

// Loading component
export const LoadingComponent = () => (
  <LoadingContainer>
    <GreenSpinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </GreenSpinner>
  </LoadingContainer>
);
