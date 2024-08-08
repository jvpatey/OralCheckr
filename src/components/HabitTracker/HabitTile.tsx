import { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

// Common styles for both sides of the flip card
const flipCardCommonStyles = css`
  background-color: #f5f5f5;
  color: #3f93b2;
  font-weight: 600;
  border: 2px solid #3f93b2;
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

// Styled component for the tile container
const TileContainer = styled.div`
  perspective: 1000px;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 85%;
  }

  &:hover .arrow-icon {
    opacity: 1;
  }
`;

// Styled component for the flip card with conditional flipping
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
  ${flipCardCommonStyles}
`;

// Back side of the flip card
const FlipCardBack = styled.div`
  ${flipCardCommonStyles}
  transform: rotateX(180deg);
`;

// Styled component for displaying the habit name
const HabitName = styled.div`
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  text-align: center;
`;

// Styled component for the arrow icon
const ArrowIconWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 5px;
  font-size: 12px;
  cursor: pointer;
  color: #07889b;
  opacity: 0;
  transition: opacity 0.3s;
`;

// Styled component for the text on the back side
const BackText = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 10px;

  .label {
    color: #646660;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 2px;
  }

  .value {
    color: #41bc7a;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  .spaced {
    margin-top: 5px;
  }
`;

interface HabitTileProps {
  habit: {
    name: string;
    count: number;
  };
}

export function HabitTile({ habit }: HabitTileProps) {
  const [flipped, setFlipped] = useState(false);

  // Handler for flipping the card
  const handleFlip = () => setFlipped(!flipped);

  return (
    <TileContainer onClick={handleFlip}>
      <FlipCard $flipped={flipped}>
        <FlipCardFront>
          <HabitName>{habit.name}</HabitName>
          <ArrowIconWrapper className="arrow-icon">
            <FontAwesomeIcon icon={faSync} />
          </ArrowIconWrapper>
        </FlipCardFront>
        <FlipCardBack>
          <BackText>
            <div className="label spaced">
              Habit: <span className="value">{habit.name}</span>
            </div>
            <div className="label">
              Count (times/day): <span className="value">{habit.count}</span>
            </div>
          </BackText>
          <ArrowIconWrapper className="arrow-icon">
            <FontAwesomeIcon icon={faSync} />
          </ArrowIconWrapper>
        </FlipCardBack>
      </FlipCard>
    </TileContainer>
  );
}
