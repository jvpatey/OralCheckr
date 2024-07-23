import { DashboardTile as HabitDashboardTile } from "./styled/DashboardTile";
import styled from "styled-components";
import { Card } from "react-bootstrap";

// Extend the existing DashboardTile component and add a fixed height
const DashboardTile = styled(HabitDashboardTile)`
  @media (max-width: 1100px) {
    height: 200px;
  }
`;

export function HabitTrackerDash() {
  return (
    <DashboardTile style={{ width: "99%" }}>
      <Card.Body>
        <p>Habit Tracker</p>
      </Card.Body>
    </DashboardTile>
  );
}
