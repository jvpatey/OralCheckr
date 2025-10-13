import styled, { keyframes } from "styled-components";

// Modern keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Modern glassmorphism heatmap container - more compact
export const HeatmapContainer = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadowLg};
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;

  /* Subtle gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0.05;
    border-radius: 16px;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    padding: 0.75rem;
    border-radius: 12px;
  }
`;

// Modern heatmap header with centered controls - more compact
export const HeatmapHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
`;

export const HeatmapTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  animation: ${slideInFromBottom} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    text-align: center;
  }
`;

// Year picker container for inline positioning
export const YearPickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: ${slideInFromBottom} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
`;

export const HeatmapLegend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

export const LegendColor = styled.div<{ $color: string }>`
  width: 15px;
  height: 15px;
  background-color: ${({ $color }) => $color};
  margin-right: 5px;
  border-radius: 3px;
`;

export const LegendText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textGrey};
`;

// Year summary styles
export const YearSummaryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

export const SummaryItem = styled.div`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 150px;
  flex: 1;
`;

export const SummaryTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.blue};
  margin-bottom: 5px;
`;

export const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
`;

// Month breakdown styles
export const MonthBreakdownContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

export const MonthCard = styled.div`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const MonthName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.blue};
  margin-bottom: 10px;
  text-align: center;
`;

export const MonthStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textGrey};
`;

export const StatValue = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
`;
