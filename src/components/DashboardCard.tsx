import { Card } from "react-bootstrap";

interface DashboardCardProps {
  title: string;
}

export function DashboardCard({ title }: DashboardCardProps) {
  return (
    <Card className="dashboard-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
}
