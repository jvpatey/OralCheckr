import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { NavLink } from "../../../common/links";

interface MobileMenuProps {
  links: NavLink[];
  isActive: (href: string) => boolean;
  handleLogout: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isGuest?: boolean;
  onCreateAccount: () => void;
  userAvatar?: string;
}

const CustomDropdownToggle = styled(Dropdown.Toggle)`
  color: ${({ theme }) => theme.textGrey};
  background: none;
  border: none;
  margin-right: 20px;

  &:hover {
    color: ${({ theme }) => theme.blue};
    transform: scale(1.1);
    background-color: transparent;
  }

  &:focus,
  &:active {
    color: ${({ theme }) => theme.textGrey};
    background-color: transparent;
    box-shadow: none;
  }

  &.show {
    color: ${({ theme }) => theme.textGrey};
    background-color: transparent;
    transform: scale(1.1);
  }
`;

const CustomDropdownMenu = styled(Dropdown.Menu)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
`;

const CustomDropdownItem = styled(Dropdown.Item)`
  color: ${({ theme }) => theme.textGrey};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.blue};
    background-color: transparent;
  }

  &.active {
    color: ${({ theme }) => theme.blue};
    font-weight: bold;
  }
`;

const Icon = styled.span`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const AvatarImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: contain;
  margin-right: 5px;
`;

export function MobileMenu({
  links,
  isActive,
  handleLogout,
  isGuest = false,
  onCreateAccount,
  userAvatar,
}: MobileMenuProps) {
  return (
    <Dropdown className="ms-auto d-lg-none">
      <CustomDropdownToggle id="dropdown-basic">
        <FontAwesomeIcon icon={faBars} />
      </CustomDropdownToggle>
      <CustomDropdownMenu align="end">
        {isGuest && (
          <CustomDropdownItem onClick={onCreateAccount}>
            <Icon>
              <FontAwesomeIcon icon={faPlus} />
            </Icon>
            Create Account
          </CustomDropdownItem>
        )}
        {links.map((link) => (
          <CustomDropdownItem
            key={link.path}
            className={isActive(link.path) ? "active" : ""}
            as={Link}
            to={link.path === "/" ? "/" : link.path}
            onClick={link.name === "Log Out" ? handleLogout : undefined}
          >
            <Icon>
              {link.name === "Profile" ? (
                userAvatar ? (
                  <AvatarImage src={userAvatar} alt="Profile" />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )
              ) : (
                <FontAwesomeIcon icon={link.icon} />
              )}
            </Icon>
            {link.name}
          </CustomDropdownItem>
        ))}
      </CustomDropdownMenu>
    </Dropdown>
  );
}
