import ReactApexChart from "react-apexcharts";
import styled, { useTheme } from "styled-components";
import { Logging } from "../../../../containers/habit-tracker/analytics/Analytics";
import { getDaysInMonth } from "date-fns";
import { upperFirst } from "lodash";
import { lightTheme } from "../../../../common/utilities/color-utils";
import { useHabitContext } from "../../../../contexts/HabitContext";

// Styled component for the chart container
const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

// Type definition for the theme
type ThemeType = typeof lightTheme;

interface LineChartProps {
  habitsLog: Logging;
  year: number;
  month: string;
}

// Function to generate chart options
const generateChartOptions = (
  daysInMonth: number,
  month: string,
  theme: ThemeType
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
          color: theme.green,
        },
      },
      labels: {
        style: {
          colors: theme.blue,
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
          color: theme.green,
        },
      },
      labels: {
        style: {
          colors: theme.blue,
        },
        formatter: (value: number) => Math.floor(value).toString(),
      },
      min: 0,
      tickAmount: 5,
    },
    colors: [theme.blue],
    markers: {
      size: 4,
      colors: [theme.blue],
      strokeColors: "transparent",
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
      borderColor: theme.textGrey,
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
export function LineChart({ habitsLog, year, month }: LineChartProps) {
  const theme = useTheme() as ThemeType;
  const { selectedHabit } = useHabitContext();
  const logsForHabit =
    habitsLog[selectedHabit]?.[year]?.[month.toLowerCase()] || {};

  // Get the number of days in the current month
  const daysInMonth = getDaysInMonth(
    new Date(year, new Date(`${month} 1, ${year}`).getMonth())
  );

  // Create an array to store the number of logs for each day of the month
  const seriesData = Array.from({ length: daysInMonth }, (_, dayIndex) => {
    const dayOfMonth = dayIndex + 1;
    const logsForDay = logsForHabit[dayOfMonth] || 0;
    return logsForDay;
  });

  // Get the options object for ApexCharts
  const options = generateChartOptions(daysInMonth, month, theme);

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
