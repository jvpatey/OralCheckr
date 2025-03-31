import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

const StyledSpinner = styled(Spinner)`
  color: ${({ theme }) => theme.green};
`;

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: string;
  fullHeight?: boolean;
}

export const LoadingSpinner = ({
  size = "md",
  variant = "border",
  fullHeight = false,
}: LoadingSpinnerProps) => {
  const getSpinnerSize = () => {
    switch (size) {
      case "sm":
        return { width: "1.5rem", height: "1.5rem" };
      case "lg":
        return { width: "3rem", height: "3rem" };
      default:
        return { width: "2rem", height: "2rem" };
    }
  };

  const { width, height } = getSpinnerSize();

  return (
    <LoadingContainer style={fullHeight ? { height: "100%" } : {}}>
      <StyledSpinner
        animation={variant as "border" | "grow"}
        role="status"
        style={{ width, height }}
      >
        <span className="visually-hidden">Loading...</span>
      </StyledSpinner>
    </LoadingContainer>
  );
};
