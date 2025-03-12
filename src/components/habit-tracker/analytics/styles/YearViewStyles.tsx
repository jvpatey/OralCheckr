import styled from "styled-components";

// Heatmap container styles
export const HeatmapContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const HeatmapTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.blue};
  margin-bottom: 15px;
  text-align: center;
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
