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
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 300px;

  @media (max-width: 768px) {
    min-height: 350px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    min-height: 400px;
    padding: 6px;
  }
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
  theme: any,
  seriesData: number[]
): ApexCharts.ApexOptions => {
  const maxValue = Math.max(...seriesData, 0);
  return {
    chart: {
      type: "line",
      height: "100%",
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0,
      background: "transparent",
    },
    theme: {
      mode: theme.mode,
    },
    stroke: {
      curve: "smooth",
      width: 3,
      lineCap: "round",
    },
    xaxis: {
      categories: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      title: {
        text: "Day of the Month",
        style: {
          color: theme.textPrimary,
          fontSize: "12px",
          fontWeight: "600",
        },
      },
      labels: {
        style: {
          colors: theme.textSecondary,
          fontSize: "11px",
          fontWeight: "500",
        },
        rotate: -45,
        hideOverlappingLabels: true,
      },
      axisBorder: {
        color: theme.glassBorder || "rgba(255, 255, 255, 0.1)",
      },
      axisTicks: {
        color: theme.glassBorder || "rgba(255, 255, 255, 0.1)",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.textSecondary,
          fontSize: "11px",
          fontWeight: "500",
        },
        formatter: (value: number) => Math.floor(value).toString(),
      },
      min: 0,
      max: Math.max(1, Math.ceil(maxValue || 1)),
      forceNiceScale: false,
      decimalsInFloat: 0,
      tickAmount: Math.max(1, Math.ceil(maxValue || 1)),
      floating: false,
    },
    colors: [theme.primary],
    markers: {
      size: 6,
      colors: [theme.primary],
      strokeColors: theme.backgroundColor,
      strokeWidth: 3,
      hover: {
        size: 8,
      },
    },
    tooltip: {
      enabled: true,
      theme: theme.mode,
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
      x: {
        formatter: (dayOfMonth: number) => `${upperFirst(month)} ${dayOfMonth}`,
      },
      y: {
        formatter: (val: number) => `${val} logs`,
      },
    },
    grid: {
      borderColor: theme.glassBorder || "rgba(255, 255, 255, 0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 40,
      },
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
                colors: theme.textSecondary,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: theme.textSecondary,
                fontSize: "10px",
              },
              formatter: (value: number) => Math.floor(value).toString(),
            },
            max: Math.max(1, Math.ceil(maxValue)),
            forceNiceScale: false,
            decimalsInFloat: 0,
            tickAmount: Math.max(1, Math.ceil(maxValue)),
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
                fontSize: "9px",
                colors: theme.textSecondary,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: theme.textSecondary,
                fontSize: "9px",
              },
              formatter: (value: number) => Math.floor(value).toString(),
            },
            max: Math.max(1, Math.ceil(maxValue)),
            forceNiceScale: false,
            decimalsInFloat: 0,
            tickAmount: Math.max(1, Math.ceil(maxValue)),
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
                colors: theme.textSecondary,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: theme.textSecondary,
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
  const options = generateChartOptions(daysInMonth, month, theme, seriesData);

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
        width="100%"
      />
    </ChartContainer>
  );
}
