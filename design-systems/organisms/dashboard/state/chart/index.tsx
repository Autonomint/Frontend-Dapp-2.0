"use client";
import React, { useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { BACKEND_API_URL } from "@/utils/urls";
import { useAccount } from "wagmi";
import { calculateAverages } from "@/utils/helpers";
import { ChartFilter } from "@/utils/interface";
import { StatsMetrics } from "../RatioOfCollaterals";
import { TimeFrame } from "../time-filter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 0,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

export function ChartComponent({
  title,
  timeFrame,
  maxH = "max-h-[300px]",
  hideElements = false,
  stats,
  chartApiFlag = "",
  isBorderRight = true,
}: {
  isBorderRight?: boolean;
  chartApiFlag: string;
  stats: { value: string | number; headline: string }[];
  title?: string;
  timeFrame?: string;
  maxH?: string;
  hideElements: boolean;
}) {
  let currentDate = new Date();

  const [time, setTime] = React.useState<ChartFilter>("allTime");

  const [chartData, setChartData] = React.useState<string[]>([]);
  const { chainId } = useAccount();
  const { theme } = useTheme();

  async function changeTime() {
    try {
      const res = await fetch(
        `${BACKEND_API_URL}/borrows/chart/${chartApiFlag}/${chainId}/` +
          `${time === "allTime" ? "0/YES" : `${time}/NO`}`
      );
      const data = await res.json();
      data.reverse();
      setChartData(data);
    } catch (error) {}
  }

  useEffect(() => {
    if (chartApiFlag && chainId) {
      changeTime();
    }
  }, [time, title, chainId]);

  // Reverse the data array to so correct order

  // getting formatted data for chart by interval
  const formattedData: { labels: string[]; averages: number[] } =
    useMemo(() => {
      return calculateAverages(chartData, time);
    }, [time, chartData]);

    // chart configuration
  const dataLocal = {
    labels: formattedData.labels,
    datasets: [
      {
        fill: true,
        data: formattedData.averages,
        borderColor: "#00679F",
        pointRadius: 0,
        borderWidth: 2,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          // if (theme === "dark") {
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, theme == "dark" ? "#002A4E" : "#E5F3FF");
          gradient.addColorStop(1, theme == "dark" ? "#002A4E00" : "#FFFDE4");
          return gradient;
        },
      },
    ],
  };

  return (
    <div
      className={`p-5 border ${
        !isBorderRight && "sm:border-r-0"
      } border-solid border-[#7A7A7A]`}
      style={{
        borderLeft: "none",
        borderTop: "none",
      }}
    >
      <div className="flex lg:flex-col  xl:flex-row justify-between">
        <div className="w-full sm:w-[40%] flex justify-start items-center  lg:w-full xl:w-[35%]  ">
          <span
            style={{
              display: hideElements ? "none" : "block",
            }}
            className="flex-1 justify-center items-center font-medium text-[20px] 2xl:text-[24px] text-grayLight"
          >
            {title}
          </span>
        </div>

        <div
          style={{}}
          className="hidden flex-1 lg:flex lg:mt-4 xl:mt-0 lg:w-[100%] xl:w-[65%] w-[60%]"
        >
          <TimeFrame timeFrame={time} setTime={setTime} />
        </div>
      </div>
      <div
        style={{
          display: hideElements ? "none" : "flex",
        }}
        className="flex flex-wrap  w-full py-3 my-3"
      >
        {stats.map((item, index) => {
          return (
            <StatsMetrics
              key={index}
              value={item.value.toString()}
              metricVal={item.headline}
            />
          );
        })}
      </div>

      <Line options={options} data={dataLocal} className={`w-1/2 ${maxH}`} />
    </div>
  );
}
