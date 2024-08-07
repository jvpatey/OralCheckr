import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: start;
  color: #222831;
  margin-left: 10px;
`;

export function Footer() {
  return (
    <StyledFooter>
      <p>&copy; 2024 OralCheckr - All Rights Reserved - GetCoding Module 3</p>
    </StyledFooter>
  );
}
