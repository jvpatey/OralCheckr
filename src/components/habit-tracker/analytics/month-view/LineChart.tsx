import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { Logging } from "../../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../../common/utilities/color-utils";
import { getDaysInMonth } from 'date-fns';
import { upperFirst } from "lodash";

// Styled component for the chart container
const ChartContainer = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  margin-top: 40px;

  .apexcharts-canvas {
    background: ${({ theme }) => theme.accentBackgroundColor};
    border-radius: 8px;
  }

  @media (max-width: 1024px) {
    height: 30vh;
  }

  @media (max-width: 768px) {
    height: 60vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
  }
`;

// interface for the line chart props
interface LineChartProps {
  habitsLog: Logging;
  selectedHabit: string;
  year: number;
  month: string;
}

// Function to generate the ApexCharts options object
const generateChartOptions = (
  daysInMonth: number,
  month: string
): ApexCharts.ApexOptions => {
  return {
    chart: {
      type: "line",
      height: "100%",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      title: {
        text: "Day of the Month",
        style: {
          color: colors.green,
        },
      },
      labels: {
        style: {
          colors: colors.blue,
          fontSize: "10px",
        },
        rotate: -45,
        hideOverlappingLabels: true,
      },
    },
    yaxis: {
      title: {
        text: "Logs",
        style: {
          color: colors.green,
        },
      },
      labels: {
        style: {
          colors: colors.blue,
        },
        formatter: (value: number) => Math.floor(value).toString(),
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
        formatter: (dayOfMonth: number) => `${upperFirst(month)} ${dayOfMonth}`,
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
    // adjustments to chart for smaller screens (ipad, iphone sizes)
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          xaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          xaxis: {
            labels: {
              rotate: -90,
              style: {
                fontSize: "8px",
              },
            },
          },
        },
      },
    ],
  };
};

// Functional component to render the line chart for habits logged in a month
export function LineChart({
  habitsLog,
  selectedHabit,
  year,
  month,
}: LineChartProps) {
  const logsForHabit = habitsLog[selectedHabit]?.[year]?.[month] || {};
  const daysInMonth = getDaysInMonth(new Date(year, Number(month) - 1));

  // Create an array to store the number of logs for each day of the month
  const seriesData = Array.from({ length: daysInMonth }, (_, dayIndex) => {
    const dayOfMonth = dayIndex + 1;
    const logsForDay = logsForHabit[dayOfMonth] || 0;
    return logsForDay;
  });

  // Get the options object for ApexCharts
  const options = generateChartOptions(daysInMonth, month);

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
