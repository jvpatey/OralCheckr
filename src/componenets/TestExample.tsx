import Card from 'react-bootstrap/Card';

type Props = {
  cardTitle: string;
  cardBody: string;
  cardLink?: string;
  color?: string;
};

export function TestExample(props: Props) {
  const { cardTitle, cardBody, cardLink, color } = props;

  return (
    <Card style={{ width: '18rem', backgroundColor: color ?? 'grey' }}>
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardBody}</Card.Text>
        <Card.Link href="#">{cardLink}</Card.Link>
      </Card.Body>
    </Card>
  );
}
