import styled, { keyframes } from "styled-components";
import { Navbar } from "react-bootstrap";

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

// Modern glassmorphism navbar for 2025
export const CustomNavbar = styled(Navbar)`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  width: 100%;
  animation: ${fadeInDown} 1s ease-out;
  border-bottom: 1px solid ${({ theme }) => theme.borderLight};
  box-shadow: ${({ theme }) => theme.shadowMd};
  z-index: 1100;
  padding: 16px 0;

  @media (max-width: 768px) {
    padding: 12px 0;

    .d-lg-none {
      display: block;
    }
    .d-lg-flex {
      display: none;
    }
  }
`;
