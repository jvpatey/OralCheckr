import "bootstrap/dist/css/bootstrap.min.css";
import { PageBackground } from "../../components/styled/PageBackground";
import { Sidebar } from "../../components/Sidebar";
import { links } from "../../common/SidebarLinks";

export function Habits() {
  return (
    <PageBackground>
      <Sidebar links={links} />
    </PageBackground>
  );
}
