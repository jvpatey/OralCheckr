import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import {
  colors,
  greenHeatMapShades,
} from "../../../../common/utilities/color-utils";
import { ApexOptions } from "apexcharts";
import { HeatmapEntry } from "../../../../common/utilities/heatmap-utils";

// Global constants
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

// Styled component for the Heatmap container card
const HeatmapCard = styled.div`
  background-color: ${colors.bgWhite};
  border-radius: 10px;
  padding: 10px;
  width: 900px;
  max-width: 100%;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 600px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }
`;

// Function to generate ApexOptions for the heatmap chart
const HeatmapOptions = (): ApexOptions => ({
  chart: {
    height: 350,
    type: "heatmap",
    toolbar: {
      show: false, // disable toolbar on heatmap
    },
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      colorScale: {
        ranges: [
          { from: 0, to: 0, color: colors.bgWhite, name: "0 logs" },
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
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: Array.from({ length: 12 }, (_, i) => i + 1), // months of the year represented as numbers
    title: {
      text: "Months",
      style: {
        color: colors.blue,
        fontSize: "14px",
      },
    },
    labels: {
      style: {
        colors: colors.blue,
      },
    },
  },
  yaxis: {
    title: {
      text: "Week days",
      style: {
        color: colors.blue,
        fontSize: "14px",
      },
    },
    labels: {
      style: {
        colors: colors.blue,
      },
      formatter: (value: number) => DAYS_OF_WEEK[value],
    },
  },
  grid: {
    padding: {
      top: 10,
      right: 20,
      bottom: 10,
      left: 20,
    },
    borderColor: colors.bgWhite,
  },
  tooltip: {
    enabled: true,
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      // Accessing the day of the month for the current data point
      const dayOfMonth =
        w.globals.initialSeries[seriesIndex].data[dataPointIndex].day;

      // Accessing the month index for the current data point
      const monthIndex = w.globals.seriesX[seriesIndex][dataPointIndex];

      // Mapping the month index to the full month name
      const month = MONTH_NAMES[monthIndex - 1];

      // Accessing the number of logs for the current data point
      const logs = series[seriesIndex][dataPointIndex];

      // Custom tooltip
      return `<div>
                <strong>${month} ${dayOfMonth}</strong><br/>
                logs: ${logs}
              </div>`;
    },
  },
});

interface HeatmapProps {
  data: HeatmapEntry[];
}

// Functional component to render the heatmap - used in the year view of the analytics page of the habit tracker
export function Heatmap({ data }: HeatmapProps) {
  const series = useMemo(() => {
    // Create a map to group logs by the day of the week
    const weekDayToLogsMap = new Map<
      string,
      { x: number; y: number; day: number }[]
    >();

    // Iterate over the data and populate the map
    data.forEach(({ month, dayOfWeek, logCount, dayOfMonth }) => {
      // Get existing logs for the day of the week, or initialize a new array
      const logs = weekDayToLogsMap.get(dayOfWeek.toString()) || [];

      // Add the current log entry to the array
      logs.push({ x: month, y: logCount, day: dayOfMonth });

      // Update the map with the new log entry
      weekDayToLogsMap.set(dayOfWeek.toString(), logs);
    });

    // Convert the map to an array of objects that is suitable for ApexCharts
    return Array.from(weekDayToLogsMap.entries()).map(([weekDay, logs]) => ({
      name: weekDay,
      data: logs,
    }));
  }, [data]);

  const options = HeatmapOptions();

  return (
    <HeatmapCard>
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height={350}
      />
    </HeatmapCard>
  );
}
