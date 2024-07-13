import styled from "styled-components";
import { Card } from "react-bootstrap";

// styled-component styles for Habit Tracker Dash Component

const StyledCard = styled(Card)`
  background-color: #f5f5f5;
  border: transparent;
  border-radius: 20px;
  width: 99%;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

export function HabitTrackerDash() {
  return (
    <StyledCard>
      <Card.Body>
        <p>Habit Tracker</p>
      </Card.Body>
    </StyledCard>
  );
}
