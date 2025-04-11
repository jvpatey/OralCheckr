import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const StyledSpinner = styled(Spinner)`
  color: ${({ theme }) => theme.green};
`;

// Props for the LoadingSpinner component
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: string;
  fullHeight?: boolean;
}

// LoadingSpinner component
export const LoadingSpinner = ({
  size = "md",
  variant = "border",
  fullHeight = false,
}: LoadingSpinnerProps) => {
  // Get the spinner size
  const getSpinnerSize = () => {
    switch (size) {
      case "sm":
        return { width: "2rem", height: "2rem" };
      case "lg":
        return { width: "4rem", height: "4rem" };
      case "xl":
        return { width: "6rem", height: "6rem" };
      default:
        return { width: "3rem", height: "3rem" };
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
