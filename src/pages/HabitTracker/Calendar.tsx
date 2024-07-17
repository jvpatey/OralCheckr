import "bootstrap/dist/css/bootstrap.min.css";
import { PageBackground } from "../../components/styled/PageBackground";
import { Sidebar } from "../../components/Sidebar";

const links = [
  { name: "Calendar", path: "/habit-tracker/calendar" },
  { name: "Habits", path: "/habit-tracker/habits" },
  { name: "Analytics", path: "/habit-tracker/analytics" },
];

export function Calendar() {
  return (
    <PageBackground>
      <Sidebar links={links} />
    </PageBackground>
  );
}
