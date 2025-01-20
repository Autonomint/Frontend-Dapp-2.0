"use client";
import React from "react";
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

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      data: [10, 20, 25, 45, 55, 65, 75, 85, 95],
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
        gradient.addColorStop(0, "#002A4E");
        gradient.addColorStop(1, "#002A4E00");
        return gradient;
        // }

        // const gradient = ctx.createLinearGradient(
        //   0,
        //   chartArea.top,
        //   0,
        //   chartArea.bottom
        // );
        // gradient.addColorStop(0, "#E5F3FF");
        // gradient.addColorStop(1, "#FFFDE4");
        // return gradient;
      },
    },
  ],
};

export function TimeFrame({ timeFrame }: { timeFrame?: string }) {
  const timeFrames = ["All Time", "1Y", "6M", "1M", "10M"];
  return (
    <div className="border border-grayLight flex text-center w-full">
      {timeFrames?.map((item) => (
        <span
          key={item}
          className={`p-3 w-full text-[16px] font-medium ${
            item === timeFrame
              ? "bg-[#ABFFDE] border border-grayLight dark:text-textBlack"
              : "border border-grayLight"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function StatsMetrics({
  value,
  metricVal,
  className,
}: {
  value: string;
  metricVal: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col flex-1 gap-3">
      <span className="text-[24px] font-medium text-textBlack dark:text-white">
        {value}
      </span>
      <span className="text-[14px] font-normal text-grayLight">
        {metricVal}
      </span>
    </div>
  );
}

export function ChartComponent({
  title,
  timeFrame,
  maxH = "max-h-[400px]",
  hideElements = false,
}: {
  title?: string;
  timeFrame?: string;
  maxH?: string;
  hideElements: boolean;
}) {
  return (
    <div
      className="p-5 border border-solid border-[#7A7A7A]"
      style={{
        borderLeft: "none",
        borderTop: "none",
      }}
    >
      <div className="flex justify-between">
        <span
          style={{
            display: hideElements ? "none" : "block",
          }}
          className="flex-1 font-medium text-[24px] text-grayLight"
        >
          {title}
        </span>
        <div
          style={{
            display: hideElements ? "none" : "block",
          }}
          className="hidden flex-1 lg:block"
        >
          <TimeFrame timeFrame={timeFrame} />
        </div>
      </div>
      <div
        style={{
          display: hideElements ? "none" : "flex",
        }}
        className="flex py-3 my-3"
      >
        <StatsMetrics value={"489,829,928"} metricVal={"USDa Minted"} />
        <StatsMetrics value={"$1"} metricVal={"USDa Price"} />
      </div>

      <Line options={options} data={data} className={`w-1/2 ${maxH}`} />
    </div>
  );
}
