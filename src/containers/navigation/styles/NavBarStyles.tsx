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

export const CustomNavbar = styled(Navbar)`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 100%;
  animation: ${fadeInDown} 1s ease-out;
  border-bottom: 1px solid ${({ theme }) => `${theme.textGrey}25`};
  box-shadow: 0 2px 4px ${({ theme }) => `${theme.textGrey}10`};

  @media (max-width: 768px) {
    .d-lg-none {
      display: block;
    }
    .d-lg-flex {
      display: none;
    }
  }
`;
