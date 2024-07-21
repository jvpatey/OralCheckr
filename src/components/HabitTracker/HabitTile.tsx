import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

// Styled-components for various parts of the HabitTile component
const TileContainer = styled.div`
  perspective: 1000px;
  width: 65%;
  height: 50px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

// FlipCard styled component with conditional flipping based on the flipped prop
const FlipCard = styled.div<{ $flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ $flipped }) =>
    $flipped ? "rotateX(180deg)" : "rotateX(0deg)"};
`;

// Front side of the flip card
const FlipCardFront = styled.div`
  background-color: #e0e0e0;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  position: absolute;
`;

// Back side of the flip card
const FlipCardBack = styled(FlipCardFront)`
  background-color: #bdbdbd;
  color: #f5f5f5;
  transform: rotateX(180deg);
`;

// Styled component for displaying the habit name
const HabitName = styled.div`
  font-size: 18px;
`;

// Styled component for the edit and delete icons container
const IconsContainer = styled.div`
  display: flex;
`;

// Styled component for the edit and delete icons
const IconWrapper = styled.div`
  cursor: pointer;
  color: #222831;
  margin: 0 10px;

  &:hover {
    transform: scale(1.1);
    color: #07889b;
  }
`;

// Styled component for displaying the index
const IndexDisplay = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #222831;
  background-color: #f5f5f5;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Styled component for the text on the back side
const BackText = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-wrap: break-word;
  width: 100%;

  .label {
    color: #222831;
    font-weight: bold;
  }

  .value {
    color: #07889b;
  }

  .spaced {
    margin-top: 10px;
  }
`;

interface HabitTileProps {
  habitName: string;
  habitIndex: number;
  habitCount: number;
  onEditClick?: () => void;
  onDeleteClick?: (index: number) => void;
}

export function HabitTile({
  habitName,
  habitIndex,
  habitCount,
  onEditClick,
  onDeleteClick,
}: HabitTileProps) {
  const [flipped, setFlipped] = useState(false);

  // Handler for flipping the card
  const handleFlip = () => setFlipped(!flipped);

  // Handler for delete icon click
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this habit?")) {
      onDeleteClick && onDeleteClick(habitIndex);
    }
  };

  return (
    <TileContainer onClick={handleFlip}>
      <FlipCard $flipped={flipped}>
        <FlipCardFront>
          <IndexDisplay>{habitIndex}</IndexDisplay>
          <HabitName>{habitName}</HabitName>
          <IconsContainer>
            <IconWrapper
              onClick={(e) => {
                e.stopPropagation();
                onEditClick && onEditClick();
              }}
            >
              <FontAwesomeIcon icon={faPencil} />
            </IconWrapper>
            <IconWrapper onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrashCan} />
            </IconWrapper>
          </IconsContainer>
        </FlipCardFront>
        <FlipCardBack>
          <IndexDisplay>{habitIndex}</IndexDisplay>
          <BackText>
            <div className="label">
              Habit: <span className="value">{habitName}</span>
            </div>
            <div className="label spaced">
              Count (times/day): <span className="value">{habitCount}</span>
            </div>
          </BackText>
        </FlipCardBack>
      </FlipCard>
    </TileContainer>
  );
}
