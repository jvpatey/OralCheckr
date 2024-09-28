import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: start;
  color: ${({ theme }) => theme.textGrey};
  font-size: 15px;
  margin-left: 10px;

  @media (max-width: 430px) {
    font-size: 10px;
  }
`;

// Functional component to style the footer
export function Footer() {
  return (
    <StyledFooter>
      <p>&copy; 2024 OralCheckr - All Rights Reserved - GetCoding Module 3</p>
    </StyledFooter>
  );
}
