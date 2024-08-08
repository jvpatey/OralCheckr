import styled from "styled-components";

// Styled component for the date bubbles
const DayBubbleStyled = styled.div<{ selected: boolean; isEditMode: boolean }>`
  background-color: ${({ selected }) => (selected ? "#3f93b2" : "#ccc")};
  color: ${({ isEditMode }) => (isEditMode ? "#aaa" : "white")};
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 5px;
  cursor: ${({ isEditMode }) => (isEditMode ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ isEditMode }) => (isEditMode ? "#ccc" : "#3f93b2")};
    transform: ${({ isEditMode }) => (isEditMode ? "none" : "scale(1.05)")};
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 12px;
    margin: 2px;
  }
`;

interface DayBubbleProps {
  selected: boolean;
  onClick: () => void;
  date: Date;
  isEditMode: boolean;
}

export function DayBubble({
  selected,
  onClick,
  date,
  isEditMode,
}: DayBubbleProps) {
  return (
    <DayBubbleStyled
      selected={selected}
      onClick={onClick}
      isEditMode={isEditMode}
    >
      <div>{date.getDate()}</div>
      <div>{date.toLocaleDateString("en", { weekday: "short" })[0]}</div>
    </DayBubbleStyled>
  );
}
