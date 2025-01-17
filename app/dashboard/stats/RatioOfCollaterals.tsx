"use client";
import React from "react";
import { TimeFrame } from "./ChartComponent";
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

export const labels = ["January", "February", "March", "April", "May"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      data: [10, 20, 25, 45, 55],
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

export function StatsMetrics({
  value,
  metricVal,
}: {
  value: string;
  metricVal: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center flex-1 text-left">
      <span className="text-[24px] font-medium text-textBlack dark:text-white">
        {value}
      </span>
      <span className="text-[14px] font-normal text-grayLight">
        {metricVal}
      </span>
    </div>
  );
}

function RatioOfCollaterals({ timeFrame }: { timeFrame: string }) {
  return (
    <div className="flex col-span-2 items-center h-full">
      <div
        className="p-5 flex flex-1 flex-col justify-between col-span-2 h-full"
        style={{
          borderLeft: "none",
          borderTop: "none",
        }}
      >
        <div className="flex justify-between">
          <span className="flex-1 font-medium text-[24px] text-grayLight">
            {"Ratio of Collaterals"}
          </span>
          <div className="hidden flex-1 lg:block mr-4">
            <TimeFrame timeFrame={timeFrame} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-7 w-full mt-8">
          <StatsMetrics value={"1.15"} metricVal={"Current Ratio"} />
          <StatsMetrics
            value={"$489,992,092"}
            metricVal={"Total dCDS Pool value"}
          />
          <StatsMetrics
            value={"$788,917,981"}
            metricVal={"Net dCDS Pool Value"}
          />
          <StatsMetrics value={"+$788,917"} metricVal={"dCDS Profit/Loss"} />
        </div>
      </div>
      <div className="border-l border-grayLight h-[calc(50%+2rem)] w-[10px] p-5"></div>
      <div className="flex flex-1">
        <Line options={options} data={data} className={`w-1/2 max-h-[250px]`} />
      </div>
    </div>
  );
}

export default RatioOfCollaterals;
