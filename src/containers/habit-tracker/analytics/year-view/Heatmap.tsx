import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import {
  colors,
  greenHeatMapShades,
} from "../../../../common/utilities/color-utils";
import { ApexOptions } from "apexcharts";

// Global constants
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKS_IN_YEAR = 52;

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
const getHeatmapOptions = (habitName: string, year: number): ApexOptions => ({
  chart: {
    height: 350,
    type: "heatmap",
    background: colors.bgWhite,
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 0,
      useFillColorAsStroke: true,
      colorScale: {
        ranges: [
          {
            from: 1,
            to: 1,
            color: greenHeatMapShades.Light,
            name: "0-1",
          },
          {
            from: 2,
            to: 3,
            color: greenHeatMapShades.MediumLight,
            name: "2-3",
          },
          {
            from: 4,
            to: 5,
            color: greenHeatMapShades.Medium,
            name: "4-5",
          },
          {
            from: 6,
            to: 7,
            color: greenHeatMapShades.MediumDark,
            name: "6-7",
          },
          {
            from: 8,
            to: 10,
            color: greenHeatMapShades.Dark,
            name: "8-10",
          },
          {
            from: 11,
            to: 20,
            color: greenHeatMapShades.Darkest,
            name: "11+",
          },
        ],
      },
    },
  },
  grid: {
    padding: {
      top: 10,
      right: 20,
      bottom: 10,
      left: 20,
    },
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: `${habitName} logs for ${year}`,
  },
  xaxis: {
    labels: {
      formatter: function (value) {
        const weekNumber = Number(value);
        const monthLabels: Record<number, string> = {
          1: "Jan",
          5: "Feb",
          9: "Mar",
          14: "Apr",
          18: "May",
          22: "Jun",
          27: "Jul",
          31: "Aug",
          35: "Sep",
          40: "Oct",
          44: "Nov",
          48: "Dec",
        };
        return Object.keys(monthLabels)
          .map(Number)
          .reduce(
            (prev, curr) =>
              Math.abs(curr - weekNumber) < Math.abs(prev - weekNumber)
                ? curr
                : prev,
            0
          ) in monthLabels
          ? monthLabels[
              Object.keys(monthLabels)
                .map(Number)
                .reduce(
                  (prev, curr) =>
                    Math.abs(curr - weekNumber) < Math.abs(prev - weekNumber)
                      ? curr
                      : prev,
                  0
                )
            ]
          : "";
      },
      rotate: -45,
      style: {
        fontSize: "12px",
        colors: colors.textGrey,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: Array(7).fill(colors.textGrey),
      },
    },
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (value) {
        return `${value} logs`;
      },
    },
    x: {
      show: false,
    },
    marker: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 350,
          width: "100%",
        },
        xaxis: {
          labels: {
            rotate: -30,
            style: {
              fontSize: "10px",
            },
          },
        },
        yaxis: {
          labels: {
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
        chart: {
          height: 300,
          width: "100%",
        },
        xaxis: {
          labels: {
            rotate: -30,
            style: {
              fontSize: "8px",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "8px",
            },
          },
        },
      },
    },
  ],
});

// Interface for the heatmap props
interface HeatmapProps {
  data: { date: string; count: number }[];
  year: number;
  habitName: string;
}

// Functional component to render the heatmap - used in the year view of the analytics page of the habit tracker
export function Heatmap({ data, year, habitName }: HeatmapProps) {
  // Filter data to include only entries for the selected year
  const filteredData = data.filter((entry) => {
    const entryYear = new Date(entry.date).getFullYear();
    return entryYear === year;
  });

  // Get data for weeks and days of week for axis
  const series = DAYS_OF_WEEK.map((day, dayIndex) => ({
    name: day,
    data: Array.from({ length: WEEKS_IN_YEAR }, (_, weekIndex) => {
      const count =
        filteredData.find((d) => {
          const date = new Date(d.date);
          const weekOfYear = Math.floor(
            (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
              (1000 * 60 * 60 * 24 * 7)
          );
          return date.getDay() === dayIndex && weekOfYear === weekIndex;
        })?.count || 0;

      return { x: weekIndex + 1, y: count };
    }),
  }));

  // Get the options object for ApexCharts
  const options = getHeatmapOptions(habitName, year);

  return (
    <HeatmapCard>
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height={400}
      />
    </HeatmapCard>
  );
}
