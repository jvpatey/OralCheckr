import { Card } from "react-bootstrap";

export function IntroText() {
  return (
    <>
      <Card.Text
        style={{
          color: "#EFEFEF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        Welcome to OralCheckr, your personalized oral health checker app.
      </Card.Text>
      <Card.Text
        style={{
          color: "#EFEFEF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Take our questionnaire to get your oral health status and personalized
        recommendations.
      </Card.Text>
    </>
  );
}
