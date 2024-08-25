import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { Logging } from "../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../common/utilities/color-utils";

// Styled component for the chart container
const ChartContainer = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  margin-top: 40px;

  .apexcharts-canvas {
    background: ${colors.white};
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    height: 70vh;
  }

  @media (max-width: 480px) {
    height: 50vh;
  }
`;

// interface for the line chart props
interface LineChartProps {
  habitsLog: Logging;
  selectedHabit: string;
  year: number;
  month: string;
}

// functional component to render the line chart for habits logged in a month
export function LineChart({
  habitsLog,
  selectedHabit,
  year,
  month,
}: LineChartProps) {
  const logsForHabit = habitsLog[selectedHabit]?.[year]?.[month] || {};
  const daysInMonth = new Date(year, new Date().getMonth() + 1, 0).getDate();

  const seriesData = Array.from(
    { length: daysInMonth },
    (_, i) => logsForHabit[i + 1] || 0
  );

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: "100%",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: Array.from({ length: daysInMonth }, (_, i) =>
        (i + 1).toString()
      ),
      title: {
        text: "Day of the Month",
        style: {
          color: colors.textGrey,
        },
      },
    },
    yaxis: {
      title: {
        text: "Logs",
        style: {
          color: colors.textGrey,
        },
      },
      min: 0,
      tickAmount: 5,
    },
    colors: [colors.blue],
    markers: {
      size: 4,
      colors: [colors.blue],
      strokeColors: colors.white,
      strokeWidth: 2,
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
      y: {
        formatter: (val: number) => `${val} logs`,
      },
    },
    grid: {
      borderColor: colors.bgGrey,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Logs",
      data: seriesData,
    },
  ];

  return (
    <ChartContainer>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="100%"
      />
    </ChartContainer>
  );
}
