import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const TileContainer = styled.div`
  perspective: 1000px;

  &:hover {
    font-weight: bold;
    transform: scale(1.05);
    color: #07889b;
  }
`;

const FlipCard = styled.div<{ flipped: boolean }>`
  width: 150px;
  height: 150px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const FlipCardFront = styled.div`
  background-color: #e0e0e0;
  border-radius: 15px;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const FlipCardBack = styled(FlipCardFront)`
  background-color: #bdbdbd;
  color: #f5f5f5;
  transform: rotateY(180deg);
  justify-content: space-between;
`;

const HabitName = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditIcon = styled.div`
  cursor: pointer;
  color: #007bff;
  margin-top: 5px;
`;

interface HabitTileProps {
  habitName: string;
  onEditClick?: () => void;
}

export function HabitTile({ habitName, onEditClick }: HabitTileProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    <TileContainer onClick={handleFlip}>
      <FlipCard flipped={flipped}>
        <FlipCardFront>
          <HabitName>{habitName}</HabitName>
          {onEditClick && (
            <EditIcon
              onClick={(e) => {
                e.stopPropagation();
                onEditClick && onEditClick();
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </EditIcon>
          )}
        </FlipCardFront>
        <FlipCardBack>
          <HabitName>{habitName}</HabitName>
        </FlipCardBack>
      </FlipCard>
    </TileContainer>
  );
}
