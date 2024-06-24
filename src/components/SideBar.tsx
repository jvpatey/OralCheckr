import SidebarMenu from "react-bootstrap-sidebar-menu";

interface SidebarLink {
  text: string;
  href: string;
}

interface SidebarProps {
  links: SidebarLink[];
}

export function SideBar({ links }: SidebarProps) {
  return (
    <div className="sidebar-menu">
      <SidebarMenu>
        <SidebarMenu.Body className="sidebar-body">
          <SidebarMenu.Nav>
            {links.map((link) => (
              <SidebarMenu.Nav.Link key={link.href} href={link.href}>
                <SidebarMenu.Nav.Title className="sidebar-links">
                  {link.text}
                </SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
            ))}
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
      </SidebarMenu>
    </div>
  );
}
