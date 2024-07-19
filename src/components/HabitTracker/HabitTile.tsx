import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

// Styled-components for various parts of the HabitTile component

const TileContainer = styled.div`
  perspective: 1000px;
  width: 150px;
  height: 150px;

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
    $flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

// Front side of the flip card
const FlipCardFront = styled.div`
  background-color: #e0e0e0;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  position: absolute;
`;

// Back side of the flip card
const FlipCardBack = styled(FlipCardFront)`
  background-color: #bdbdbd;
  color: #f5f5f5;
  transform: rotateY(180deg);
`;

// Styled component for displaying the habit name
const HabitName = styled.div`
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  text-align: center;
  word-wrap: break-word;
  width: 100%;
`;

// Styled component for the edit and delete icons container
const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
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
  position: absolute;
  top: 10px;
  left: 10px;
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
  margin-top: 40px;
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
  onDeleteClick?: () => void;
}

export function HabitTile({
  habitName,
  habitIndex,
  habitCount,
  onEditClick,
  onDeleteClick,
}: HabitTileProps) {
  // State for managing the flipped state of the card
  const [flipped, setFlipped] = useState(false);

  // Handler for flipping the card
  const handleFlip = () => setFlipped(!flipped);

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
            <IconWrapper
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick && onDeleteClick();
              }}
            >
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
