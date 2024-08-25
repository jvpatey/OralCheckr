import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { colors, heatMapColors } from "../../../common/utilities/color-utils";
import { ApexOptions } from "apexcharts";

// Styled component for the Heatmap container card
const HeatmapCard = styled.div`
  background-color: ${colors.bgWhite};
  border-radius: 10px;
  padding: 20px;
  width: 900px;
  max-width: 1200px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// interface for the heat map props
interface HeatmapProps {
  data: { date: string; count: number }[];
}

// Functional component to render the heatmap - used in the year view of the analytics page of the habit tracker
export function Heatmap({ data }: HeatmapProps) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeksInYear = 52;

  // Get data for weeks and days of week for axis
  const series = daysOfWeek.map((day, dayIndex) => ({
    name: day,
    data: Array.from({ length: weeksInYear }, (_, weekIndex) => {
      const count =
        data.find((d) => {
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

  // options for heatmap chart from Apex Charts
  const options: ApexOptions = {
    chart: {
      height: 400,
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
              color: heatMapColors.greenLight,
              name: "0-1",
            },
            {
              from: 2,
              to: 3,
              color: heatMapColors.greenMediumLight,
              name: "2-3",
            },
            {
              from: 4,
              to: 5,
              color: heatMapColors.greenMedium,
              name: "4-5",
            },
            {
              from: 6,
              to: 7,
              color: heatMapColors.greenMediumDark,
              name: "6-7",
            },
            {
              from: 8,
              to: 10,
              color: heatMapColors.greenDark,
              name: "8-10",
            },
            {
              from: 11,
              to: 20,
              color: heatMapColors.greenDarkest,
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
      text: "Habit Logs",
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
  };

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
