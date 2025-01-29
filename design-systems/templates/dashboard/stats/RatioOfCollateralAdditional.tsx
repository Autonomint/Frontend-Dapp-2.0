"use client";
import React, { useState } from "react";
import { StatsMetrics, TimeFrame } from "./ChartComponent";
import { Line } from "react-chartjs-2";

function RatioOfCollateralAdditional({
  maxH = "max-h-[400px]",
}: {
  maxH?: string;
}) {
  const options = {
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

  const data = {
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

  const [feeOption, setFeeOption] = useState("Option Fees");
  return (
    <div className="w-[50%] p-5">
      <div className="flex justify-between gap-8 w-full">
        <div className="flex flex-1 border border-grayLight text-left relative">
          <div
            className={`flex-1 p-3 text-center cursor-pointer ${
              feeOption === "Option Fees"
                ? "bg-[#ABFFDE] border border-grayLight dark:text-textBlack "
                : ""
            }`}
            onClick={() => setFeeOption("Option Fees")}
          >
            Option Fees
          </div>
          <div className="w-[1px] bg-grayLight h-auto"></div>
          <div
            className={`flex-1 p-3 text-center cursor-pointer ${
              feeOption === "Borrowing Fees"
                ? "bg-[#ABFFDE] border border-grayLight dark:text-textBlack "
                : ""
            }`}
            onClick={() => setFeeOption("Borrowing Fees")}
          >
            Borrowing Fees
          </div>
        </div>

        <div className="flex justify-end flex-1">
          <TimeFrame timeFrame={"1M"} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "32px",
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

export default RatioOfCollateralAdditional;
