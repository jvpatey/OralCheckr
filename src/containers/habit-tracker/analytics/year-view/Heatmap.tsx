import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import {
  colors,
  greenHeatMapShades,
} from "../../../../common/utilities/color-utils";
import { ApexOptions } from "apexcharts";

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

// Styled component for the heatmap container card
const HeatmapCard = styled.div`
  background-color: ${colors.bgWhite};
  border-radius: 10px;
  padding: 10px;
  width: 900px;
  max-width: 100%;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 95%;
    padding: 5px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 5px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 5px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

const GreenSpinner = styled(Spinner)`
  color: ${colors.green};

  .spinner-border {
    border-color: ${colors.green};
  }
`;

// Function to generate the ApexCharts options for the heatmap
const useHeatmapOptions = (): ApexOptions => {
  return {
    chart: {
      height: 350,
      type: "heatmap",
      toolbar: { show: false }, // Disable toolbar on the heatmap
      zoom: { enabled: false }, // Disable zooming
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 0, color: colors.bgWhite, name: "0 logs" },
            {
              from: 1,
              to: 1,
              color: greenHeatMapShades.Light,
              name: "1 log",
            },
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
    dataLabels: { enabled: false }, // Disable data labels on heatmap
    xaxis: {
      categories: Array.from({ length: 12 }, (_, i) => i + 1), // x-axis categories as months (1-12)
      tickAmount: 10,
      title: {
        text: "Months",
        style: { color: colors.blue, fontSize: "14px" },
      },
      labels: { style: { colors: colors.blue } },
    },
    yaxis: {
      title: {
        text: window.innerWidth > 768 ? "Week days" : "", // Show 'Week days' on large screens
        style: { color: colors.blue, fontSize: "14px" },
      },
      labels: {
        style: { colors: colors.blue },
        formatter: (value: number) => DAYS_OF_WEEK[value], // Map numbers to week days
      },
    },
    grid: {
      padding:
        window.innerWidth <= 768
          ? { top: 2, right: 2, bottom: 2, left: 10 }
          : { top: 10, right: 20, bottom: 10, left: 20 },
      borderColor: colors.bgWhite,
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
        return `<div style="padding: 5px; color: ${colors.textGrey}">
                  <div style="color: ${colors.blue}; font-weight: bold;">${month} ${dayOfMonth}
                  </div>
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

// Functional component to render the heatmap chart
export function Heatmap({ data }: HeatmapProps) {
  const [loading, setLoading] = useState(true);
  const options = useHeatmapOptions();

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false); // Set loading to false once the data is ready
    }
  }, [data]);

  return (
    <HeatmapCard>
      {loading ? (
        <LoadingContainer>
          <GreenSpinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </GreenSpinner>
        </LoadingContainer>
      ) : (
        <ReactApexChart
          options={options}
          series={data}
          type="heatmap"
          height={350}
        />
      )}
    </HeatmapCard>
  );
}
