import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { getFullPath } from "../common/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChartSimple,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const SidebarContainer = styled.div`
  height: calc(100vh - 56px);
  width: 190px;
  position: fixed;
  top: 60px;
  left: 0;
  background-color: #e0e0e0;
  color: #222831;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-top-right-radius: 20px;

  @media (max-width: 768px) {
    width: 70px;
  }
`;

const SidebarLink = styled(Link)`
  width: 100%;
  font-size: 15px;
  padding: 15px 20px;
  text-align: left;
  text-decoration: none;
  color: #222831;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #222831;

  &:hover {
    color: #07889b;
    transform: scale(1.05);
  }

  &.active {
    font-weight: bold;
    color: #07889b;
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 10px;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
`;

interface SidebarProps {
  links: { name: string; path: string }[];
}

export function Sidebar({ links }: SidebarProps) {
  const location = useLocation();

  const renderIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "calendar":
        return <FontAwesomeIcon icon={faCalendarDays} />;
      case "habits":
        return <FontAwesomeIcon icon={faList} />;
      case "analytics":
        return <FontAwesomeIcon icon={faChartSimple} />;
      default:
        return null;
    }
  };

  return (
    <SidebarContainer>
      {links.map((link, index) => (
        <SidebarLink
          to={getFullPath(link.path)}
          key={index}
          className={
            location.pathname === getFullPath(link.path) ? "active" : ""
          }
        >
          <Icon>{renderIcon(link.name)}</Icon>
          <span className="d-lg-inline d-none">{link.name}</span>
        </SidebarLink>
      ))}
    </SidebarContainer>
  );
}
