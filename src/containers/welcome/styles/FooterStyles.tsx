import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  width: 100%;
  margin-top: 40px;
  padding: 8px 0;
  border-top: 1px solid ${({ theme }) => theme.borderLight};
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  @media (max-width: 768px) {
    margin-top: 32px;
    padding: 6px 0;
  }

  @media (max-width: 480px) {
    margin-top: 28px;
    padding: 6px 0;
  }
`;

export const FooterContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
    flex-direction: column;
    gap: 12px;
  }
`;

export const FooterCopyright = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.9;
  letter-spacing: -0.01em;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    text-align: center;
  }
`;

export const FooterLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.textSecondary};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px 16px;
  border-radius: 12px;
  position: relative;
  letter-spacing: -0.01em;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}15;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary}20;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 14px;
  }
`;
