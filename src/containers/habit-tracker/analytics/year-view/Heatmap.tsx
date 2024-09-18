import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import { colors, greenHeatMapShades } from "../../../../common/utilities/color-utils";
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

// Heatmap card styles with media queries for responsiveness
const HeatmapCard = styled.div`
  background-color: ${colors.bgWhite};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-width: 1100px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;

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
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true },
        dynamicAnimation: { enabled: true },
      },
      events: {
        mounted: () => {
          console.log("Chart mounted event triggered");
        },
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
        // text: windowWidth > 768 ? "Week days" : "", // Show 'Week days' on larger screens, hide on smaller screens
        style: { color: colors.blue, fontSize: "14px" },
      },
      labels: {
        style: { colors: colors.blue },
        formatter: (value: number) => DAYS_OF_WEEK[value],
      },
    },
    grid: {
      borderColor: colors.bgWhite,
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        // Get the day and month for the current data point
        const dayOfMonth = w.globals.initialSeries[seriesIndex].data[dataPointIndex].day;
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

interface HeatmapChartProps {
  options: ApexOptions;
  data: HeatmapProps["data"];
  loading: boolean;
  isCompMounted: (isMounted: boolean) => void;
}

// Functional component to render the heatmap chart
export function Heatmap({ data }: HeatmapProps) {
  const [loading, setLoading] = useState(true);

  const isCompMounted = (isMounted: boolean) => {
    console.log(isMounted);
    setLoading(false);
  };

  const options = useHeatmapOptions();

  return (
    <HeatmapCard>
      <HeatmapChart options={options} data={data} loading={loading} isCompMounted={isCompMounted} />
    </HeatmapCard>
  );
}

function HeatmapChart({ options, data, loading, isCompMounted }: HeatmapChartProps) {
  useEffect(() => {
    console.log("Mounted");
    isCompMounted(true);
  }, []);

  return loading ? <h2>Loading</h2> : <ReactApexChart options={options} series={data} type="heatmap" height={350} />;
}

{
  /* <LoadingContainer>
<GreenSpinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</GreenSpinner>
</LoadingContainer> */
}
