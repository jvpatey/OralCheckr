import { DashboardTile } from "./Styled/DashboardTile";
import { Card } from "react-bootstrap";

// styled-component styles for Habit Tracker Dash Component

export function HabitTrackerDash() {
  return (
    <DashboardTile style={{ width: "99%" }}>
      <Card.Body>
        <p>Habit Tracker</p>
      </Card.Body>
    </DashboardTile>
  );
}
