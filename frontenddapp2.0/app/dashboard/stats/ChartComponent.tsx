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
  legend: {
    display: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      data: labels.map(() => Math.random() * 100),
      borderColor: "transparent",
      backgroundColor: function (context: any) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return null;
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.top,
          0,
          chartArea.bottom
        );
        gradient.addColorStop(0, "#E5F3FF");
        gradient.addColorStop(1, "#FFFDE4");
        return gradient;
      },
    },
  ],
};

function TimeFrame({ timeFrame }: { timeFrame?: string }) {
  const timeFrames = ["All Time", "1Y", "6M", "1M", "10M"];
  return (
    <div className="border border-grayLight flex text-center">
      {timeFrames?.map((item) => (
        <span
          key={item}
          className={`p-3 text-[16px] font-medium ${
            item === timeFrame
              ? "bg-[#ABFFDE] border border-grayLight"
              : "border border-grayLight"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ChartComponent({
  title,
  timeFrame,
}: {
  title?: string;
  timeFrame?: string;
}) {
  return (
    <div className="p-5 border-r-0  border-l-0 mb-4">
      <div className="flex justify-between">
        <span className="font-medium text-[24px] text-grayLight">{title}</span>
        <div className="hidden lg:block">
          <TimeFrame timeFrame={timeFrame} />
        </div>
      </div>
      <Line options={options} data={data} className="w-1/2 max-h-[400px]" />
    </div>
  );
}
