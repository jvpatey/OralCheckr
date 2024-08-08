import styled from "styled-components";

// Styled component for the date bubbles
const Bubble = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "#3f93b2" : "#ccc")};
  color: white;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: #3f93b2;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 12px;
  }
`;

interface DayBubbleProps {
  selected: boolean;
  onClick: () => void;
  date: Date;
}

export function DayBubble({ selected, onClick, date }: DayBubbleProps) {
  return (
    <Bubble selected={selected} onClick={onClick}>
      <div>{date.getDate()}</div>
      <div>{date.toLocaleDateString("en", { weekday: "short" })[0]}</div>
    </Bubble>
  );
}
