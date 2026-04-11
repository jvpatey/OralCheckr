import styled from "styled-components";
import { passwordRequirements } from "../utils/password-utils";

const TooltipContainer = styled.div<{ $show: boolean }>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  z-index: 1000;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  visibility: ${(props) => (props.$show ? "visible" : "hidden")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
`;

const TooltipContent = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  min-width: 320px;
  max-width: 320px;
  list-style: none;
`;

const RequirementItem = styled.div<{ $isMet: boolean }>`
  color: ${(props) =>
    props.$isMet ? props.theme.success : props.theme.textSecondary};
  font-size: 0.8rem;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: "${(props) => (props.$isMet ? "✓" : "○")}";
    margin-right: 10px;
    font-weight: bold;
    color: ${(props) =>
      props.$isMet ? props.theme.success : props.theme.textSecondary};
    width: 14px;
    text-align: center;
    transition: all 0.3s ease;
    font-size: 0.75rem;
  }
`;

interface CustomPasswordTooltipProps {
  show: boolean;
  password: string;
}

export function CustomPasswordTooltip({
  show,
  password,
}: CustomPasswordTooltipProps) {
  const checkPasswordRequirements = (password: string) => {
    return passwordRequirements.map((req) => ({
      message: req.message,
      isMet: req.regex.test(password),
    }));
  };

  return (
    <TooltipContainer $show={show}>
      <TooltipContent>
        {checkPasswordRequirements(password).map((req, index) => (
          <RequirementItem key={index} $isMet={req.isMet}>
            {req.message}
          </RequirementItem>
        ))}
      </TooltipContent>
    </TooltipContainer>
  );
}
