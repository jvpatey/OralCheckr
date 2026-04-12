import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import {
  getHeatmapColorScaleRanges,
  isDarkThemeBackground,
} from "../../../../common/utilities/color-utils";
import { ApexOptions } from "apexcharts";
import { LoadingComponent } from "../../../../components/habit-tracker/analytics/LoadingComponent";
import { useTheme } from "styled-components";
import { lightTheme } from "../../../../common/utilities/color-utils";

// Global constants for days of the week and month names
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Modern heatmap chart container with glassmorphism
const HeatmapChartContainer = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: transparent;
  position: relative;
  z-index: 1;

  .apexcharts-heatmap-rect {
    stroke: ${({ theme }) =>
      isDarkThemeBackground(theme)
        ? "rgba(248, 250, 252, 0.14)"
        : "rgba(15, 23, 42, 0.12)"};
    stroke-width: 2px;
    transition: all 0.3s ease;

    &:hover {
      stroke: ${({ theme }) =>
        isDarkThemeBackground(theme)
          ? "rgba(248, 250, 252, 0.28)"
          : "rgba(15, 23, 42, 0.22)"};
      stroke-width: 3px;
    }
  }

  .apexcharts-legend-marker {
    stroke: transparent;
    border-radius: 4px;
  }

  .apexcharts-legend-series {
    margin-right: 1rem;
  }

  .apexcharts-legend-text {
    color: ${({ theme }) => theme.textSecondary} !important;
    font-size: 12px !important;
    font-weight: 500 !important;
  }

  .apexcharts-xaxis-label,
  .apexcharts-yaxis-label {
    color: ${({ theme }) => theme.textSecondary} !important;
    font-size: 11px !important;
    font-weight: 500 !important;
  }

  .apexcharts-gridline {
    stroke: ${({ theme }) => theme.glassBorder || "rgba(255, 255, 255, 0.1)"};
    stroke-dasharray: 3px;
  }
`;

// Function to generate the ApexCharts options for the heatmap
const useHeatmapOptions = (theme: ThemeType): ApexOptions => {
  return {
    chart: {
      height: 320,
      type: "heatmap",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
      fontFamily: "inherit",
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true },
        dynamicAnimation: { enabled: true },
      },
    },
    theme: {
      mode: isDarkThemeBackground(theme) ? "dark" : "light",
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.8,
        colorScale: {
          ranges: getHeatmapColorScaleRanges(theme),
        },
      },
    },
    legend: {
      labels: {
        colors: theme.textGrey,
      },
    },
    dataLabels: { enabled: false }, // Disable data labels on heatmap
    xaxis: {
      categories: Array.from({ length: 12 }, (_, i) => i + 1), // x-axis categories as months (1-12)
      tickAmount: 10,
      title: {
        text: "Months",
        style: { color: theme.blue, fontSize: "14px" },
      },
      labels: { style: { colors: theme.blue } },
    },
    yaxis: {
      title: {
        style: { color: theme.blue, fontSize: "14px" },
      },
      labels: {
        style: { colors: theme.blue },
        formatter: (value: number) => DAYS_OF_WEEK[value],
      },
    },
    grid: {
      borderColor: "transparent",
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        // Get the day and month for the current data point
        const dayOfMonth =
          w.globals.initialSeries[seriesIndex].data[dataPointIndex].day;
        const monthIndex = w.globals.seriesX[seriesIndex][dataPointIndex];
        const month = MONTH_NAMES[monthIndex - 1];

        // Get the log count
        const logs = series[seriesIndex][dataPointIndex];

        // Custom tooltip display
        return `<div style="padding: 5px; color: ${theme.textGrey}">
                  <div style="color: ${theme.blue}; font-weight: bold;">${month} ${dayOfMonth}</div>
                  Logs: ${logs}
                </div>`;
      },
    },
  };
};

// Interface for the Heatmap component
interface HeatmapProps {
  data: { name: string; data: { x: number; y: number; day: number }[] }[];
}

interface HeatmapChartProps {
  options: ApexOptions;
  data: HeatmapProps["data"];
  loading: boolean;
  isHeatmapChartMounted: () => void;
}

// typeof lightTheme to type the theme
type ThemeType = typeof lightTheme;

// Main Heatmap component
export function Heatmap({ data }: HeatmapProps) {
  const theme = useTheme() as ThemeType;
  const [loading, setLoading] = useState(true);
  const options = useHeatmapOptions(theme);

  const isHeatmapChartMounted = () => {
    setLoading(false);
  };

  return (
    <HeatmapChartContainer>
      <HeatmapChart
        options={options}
        data={data}
        loading={loading}
        isHeatmapChartMounted={isHeatmapChartMounted}
      />
    </HeatmapChartContainer>
  );
}

// HeatmapChart component for rendering the actual chart
function HeatmapChart({
  options,
  data,
  loading,
  isHeatmapChartMounted,
}: HeatmapChartProps) {
  useEffect(() => {
    isHeatmapChartMounted();
  }, []);

  return loading ? (
    <LoadingComponent />
  ) : (
    <ReactApexChart
      options={options}
      series={data}
      type="heatmap"
      height={320}
    />
  );
}
