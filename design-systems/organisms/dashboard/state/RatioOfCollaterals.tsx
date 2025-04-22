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
import { calculateAverages, cn } from "@/utils/helpers";
import { BACKEND_API_URL } from "@/utils/urls";
import { useAccount } from "wagmi";
import { useTheme } from "next-themes";
import { ChartFilter } from "@/utils/interface";
import { TimeFrame } from "./time-filter";

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
  classNameValue,
  classNameMetricVal,
}: {
  value: string;
  metricVal: string;
  classNameValue?: string;
  classNameMetricVal?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center flex-1 text-left gap-3">
      <span
        className={cn(
          "text-[24px] font-medium text-textBlack dark:text-white",
          classNameValue
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-[14px] font-normal text-grayLight",
          classNameMetricVal
        )}
      >
        {metricVal}
      </span>
    </div>
  );
}

function RatioOfCollaterals({
  timeFrame,
  stats,
  RatioValuesBottom,
  chartApiFlag,
  maxH = "max-h-[300px]",
}: {
  maxH?: string;
  chartApiFlag: string;
  RatioValuesBottom: { value: string; headline: string }[];
  timeFrame: string;
  stats: { value: string; headline: string }[];
}) {
  const [time, setTime] = React.useState<ChartFilter>("allTime");
  let currentDate = new Date();
  const { theme } = useTheme();

  const [chartData, setChartData] = React.useState<string[]>([]);
  const { chainId } = useAccount();

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
    if (chainId) {
      changeTime();
    }
  }, [time, chainId]);

  const formattedData: { labels: string[]; averages: number[] } =
    useMemo(() => {
      return calculateAverages(chartData, time);
    }, [time, chartData]);

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

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, theme == "dark" ? "#002A4E" : "#E5F3FF");
          gradient.addColorStop(1, theme == "dark" ? "#002A4E00" : "#FFFDE4");
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
  return (
    <div className="flex flex-col lg:flex-row   items-start h-full">
      <div
        className="p-5 flex w-full lg:w-[50%] flex-1 flex-col justify-between  h-full"
        style={{
          borderLeft: "none",
          borderTop: "none",
        }}
      >
        <div className="flex justify-between">
          <span className="flex-1 font-medium text-[24px] text-grayLight">
            {"Ratio of Collaterals"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-7 w-full mt-8">
          {stats.map((item, index) => {
            return (
              <StatsMetrics
                value={item.value}
                key={index}
                metricVal={item.headline}
                classNameValue={` ${
                  item.headline === "dCDS Profit/Loss"
                    ? "text-[#05A552] dark:text-[#06BE5F]"
                    : "dark:text-white"
                }`}
              />
            );
          })}
        </div>
        <div className="flex w-full h-8 bg-gray-200 rounded-none overflow-hidden my-[12px]">
          {[
            {
              label: "Deposit",
              value: Number(RatioValuesBottom[0]?.value.replace("%", "")),
              gradient: "#05A552",
            },
            {
              label: "Option Fee",
              value: Number(RatioValuesBottom[1].value.replace("%", "")),
              gradient: "#478BFF",
            },
          ].map((metric, index, arr) => {
            const total = arr.reduce((acc, item) => acc + item.value, 0);
            const percentage = (metric.value / total) * 100;

            return (
              <div
                key={index}
                style={{
                  width: `${percentage}%`,
                  background: metric.gradient,
                }}
                title={`${metric.label}: ${percentage.toFixed(2)}%`}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-7 w-full">
          {RatioValuesBottom.map((item, index) => {
            return (
              <StatsMetrics
                key={index}
                value={item.value}
                metricVal={item.headline}
                classNameValue={` ${
                  item.headline === "Collateral"
                    ? "text-[#05A552] dark:text-[#06BE5F]"
                    : item.headline === "dCDS"
                    ? "text-[#478BFF] dark:text-[#38B6FF]"
                    : "dark:text-white"
                }`}
              />
            );
          })}
        </div>
      </div>
      {/* <div className="border-l border-grayLight h-[calc(50%+2rem)] w-[10px] p-5"></div> */}
      <div className="flex  w-full lg:w-[50%] flex-col h-full">
        <div className=" hidden  flex-1 justify-end md:flex items-end  mt-4 mr-4">
          <div className="lg:w-[80%] w-[60%]">
            <TimeFrame timeFrame={time} setTime={setTime} />
          </div>
        </div>

        <Line
          options={options}
          data={dataLocal}
          className={`w-1/2 p-4 sm:p-0 ${maxH}`}
        />
      </div>
    </div>
  );
}

export default RatioOfCollaterals;
