import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";

export function Dashboard() {
  const links = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Questionnaire", href: "/questionnaire" },
  ];

  return (
    <div className="full-page-bg">
      <NavBar links={links} />
    </div>
  );
}
