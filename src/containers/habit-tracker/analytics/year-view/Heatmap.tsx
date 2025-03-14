import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { greenHeatMapShades } from "../../../../common/utilities/color-utils";
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

// Heatmap card styles with media queries for responsiveness
const HeatmapCard = styled.div`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-width: 1100px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;

  .apexcharts-heatmap-rect {
    stroke: ${({ theme }) => theme.accentBackgroundColor};
    stroke-width: 3px;
  }

  .apexcharts-legend-marker {
    stroke: transparent;
  }

  @media (min-width: 1280px) {
    max-width: 1100px;
    padding: 10px;
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    max-width: 1100px;
  }

  @media (max-width: 1024px) {
    max-width: 750px;
    padding: 5px;
  }

  @media (max-width: 820px) {
    max-width: 600px;
    padding: 5px;
  }

  @media (max-width: 768px) {
    max-width: 550px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 5px;
  }
`;

// Function to generate the ApexCharts options for the heatmap
const useHeatmapOptions = (theme: ThemeType): ApexOptions => {
  return {
    chart: {
      height: 350,
      type: "heatmap",
      toolbar: { show: false }, // Disable toolbar on the heatmap
      zoom: { enabled: false }, // Disable zooming
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true },
        dynamicAnimation: { enabled: true },
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.8,
        colorScale: {
          ranges: [
            { from: 0, to: 0, color: theme.backgroundColor, name: "0 logs" },
            { from: 1, to: 1, color: greenHeatMapShades.Light, name: "1 log" },
            {
              from: 2,
              to: 5,
              color: greenHeatMapShades.MediumLight,
              name: "2-5 logs",
            },
            {
              from: 6,
              to: 7,
              color: greenHeatMapShades.Medium,
              name: "6-7 logs",
            },
            {
              from: 8,
              to: 9,
              color: greenHeatMapShades.MediumDark,
              name: "8-9 logs",
            },
            {
              from: 10,
              to: 11,
              color: greenHeatMapShades.Dark,
              name: "10-11 logs",
            },
            {
              from: 12,
              to: Infinity,
              color: greenHeatMapShades.Darkest,
              name: "12+ logs",
            },
          ],
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
    <HeatmapCard>
      <HeatmapChart
        options={options}
        data={data}
        loading={loading}
        isHeatmapChartMounted={isHeatmapChartMounted}
      />
    </HeatmapCard>
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
      height={350}
    />
  );
}
