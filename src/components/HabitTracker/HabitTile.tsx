import { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faCheck } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../common/color-utils";

// Common styles for both sides of the flip card
const flipCardCommonStyles = css<{ $isComplete: boolean }>`
  background-color: ${colors.bgWhite};
  color: ${({ $isComplete }) => ($isComplete ? colors.green : colors.blue)};
  font-weight: 600;
  border: 2px solid
    ${({ $isComplete }) => ($isComplete ? colors.green : colors.blue)};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  position: absolute;
  backface-visibility: hidden;
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
  position: relative;

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

// Styled component for the progress bar
const ProgressBar = styled.div<{ $progress: number; $isComplete: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${({ $isComplete }) =>
    $isComplete ? "rgba(65, 188, 122, 0.2)" : "rgba(63, 147, 178, 0.2)"};
  z-index: 1;
  transition: width 0.3s ease;
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
const FlipCardFront = styled.div<{ $isComplete: boolean }>`
  ${flipCardCommonStyles}
  z-index: 2;
`;

// Back side of the flip card
const FlipCardBack = styled.div<{ $isComplete: boolean }>`
  ${flipCardCommonStyles}
  transform: rotateX(180deg);
  z-index: 2;
`;

// Styled component for displaying the habit name
const HabitName = styled.div`
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  text-align: center;
  z-index: 2;
`;

// Styled component for the arrow icon
const ArrowIconWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 5px;
  font-size: 12px;
  cursor: pointer;
  color: ${colors.blue};
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
    color: ${colors.textGrey};
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 2px;
  }

  .value {
    color: ${colors.green};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  .spaced {
    margin-top: 5px;
  }
`;

// Styled component for displaying the log count in a bubble
const LogCountBubble = styled.div`
  background-color: ${colors.bgWhite};
  color: ${colors.green};
  border: 2px solid ${colors.green};
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 10px;
  z-index: 2;
`;

interface HabitTileProps {
  habit: {
    name: string;
    count: number;
  };
  logCount: number;
}

export function HabitTile({ habit, logCount }: HabitTileProps) {
  const [flipped, setFlipped] = useState(false);

  // Calculate the progress as a percentage
  const progress = Math.min((logCount / habit.count) * 100, 100);

  // Determine if the habit is complete
  const isComplete = logCount >= habit.count;

  // Handler for flipping the card
  const handleFlip = () => setFlipped(!flipped);

  return (
    <TileContainer onClick={handleFlip}>
      <FlipCard $flipped={flipped}>
        <FlipCardFront $isComplete={isComplete}>
          <ProgressBar $progress={progress} $isComplete={isComplete} />
          <HabitName>{habit.name}</HabitName>
          <LogCountBubble>
            {isComplete ? <FontAwesomeIcon icon={faCheck} /> : logCount}
          </LogCountBubble>
          <ArrowIconWrapper className="arrow-icon">
            <FontAwesomeIcon icon={faSync} />
          </ArrowIconWrapper>
        </FlipCardFront>
        <FlipCardBack $isComplete={isComplete}>
          <BackText>
            <div className="label spaced">
              Habit: <span className="value">{habit.name}</span>
            </div>
            <div className="label">
              Count (times/day): <span className="value">{habit.count}</span>
            </div>
          </BackText>
          <LogCountBubble>
            {isComplete ? <FontAwesomeIcon icon={faCheck} /> : logCount}
          </LogCountBubble>
          <ArrowIconWrapper className="arrow-icon">
            <FontAwesomeIcon icon={faSync} />
          </ArrowIconWrapper>
        </FlipCardBack>
      </FlipCard>
    </TileContainer>
  );
}
