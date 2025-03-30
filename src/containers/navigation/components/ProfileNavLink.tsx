import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CustomNavLink = styled(Nav.Link)`
  color: ${({ theme }) => theme.textGrey};
  margin-right: 35px;
  font-size: large;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.blue};
    transform: scale(1.05);
  }

  &.active {
    color: ${({ theme }) => theme.blue};
    font-weight: bold;
    transform: scale(1.1);
    background-color: transparent;
  }
`;

const Icon = styled.span`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: contain;
  margin-right: 5px;
`;

interface ProfileNavLinkProps {
  isActive: boolean;
  avatar?: string;
}

export function ProfileNavLink({ isActive, avatar }: ProfileNavLinkProps) {
  return (
    <CustomNavLink as={Link} to="/profile" className={isActive ? "active" : ""}>
      <Icon>
        {avatar ? (
          <AvatarImage src={avatar} alt="Profile" />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </Icon>
      Profile
    </CustomNavLink>
  );
}
