import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoutePaths } from "../../../common/constants/routes";
import { AuthContext } from "../../authentication/AuthContext";
import { useContext } from "react";
import {
  SidebarContainer,
  SidebarLink,
  LinkContent,
  Icon,
  Text,
} from "../styles/SidebarStyles";

// Props for sidebar navigation
interface SidebarProps {
  links: { name: string; path: string; icon: any }[];
}

// Sidebar navigation component
export function Sidebar({ links }: SidebarProps) {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  // Hide sidebar for unauthenticated users
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarContainer>
      {links.map((link, index) => {
        // Check if current path matches link path
        const currentPath = location.pathname + location.hash.replace("#", "");
        const isActive =
          currentPath === link.path ||
          (link.path === RoutePaths.QUESTIONNAIRE &&
            currentPath.startsWith(RoutePaths.QUESTIONNAIRE) &&
            currentPath !== RoutePaths.RESULTS);

        return (
          <SidebarLink
            to={link.path}
            key={index}
            className={isActive ? "active" : ""}
            data-tooltip={link.name}
          >
            <LinkContent>
              <Icon>
                <FontAwesomeIcon icon={link.icon} />
              </Icon>
              <Text>{link.name}</Text>
            </LinkContent>
          </SidebarLink>
        );
      })}
    </SidebarContainer>
  );
}
