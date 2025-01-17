"use client";
import Image from "next/image";
import React from "react";
import farmyourluckLogo from "../assets/cryptocurrency-color_eth.png";
import framyourlogodark from "../assets/cryptocurrency-color_eth (2).svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AppNavbar from "@/custom-components/AppNavbar";

function ChartComponent() {
  return <>HI</>;
}

function MetricFields({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex justify-between mb-3">
      <div className=" text-grayLight font-medium text-lg">{label}</div>
      <div
        className="font-medium text-lg"
        style={{
          color: color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function AdditionalMetics() {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-textBlack  font-medium text-xl dark:text-white">
        100% Synthetic LTV
      </div>
      <div className="flex flex-col mt-3">
        {[
          { label: "Deposit", value: `$0.7`, color: "#2DDA95" },
          { label: "Option Fee", value: `$0.7`, color: "#FF5270" },
          { label: "USDa borrowed", value: `$0.7`, color: "#627EEA" },
          { label: "Downside Protection", value: `$0.7`, color: "#05A552" },
        ].map((metric, index) => (
          <MetricFields
            key={index}
            label={metric.label}
            value={metric.value}
            color={metric.color}
          />
        ))}
      </div>
      <div className="w-full mt-6">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex w-full h-[60px] mb-2">
            {[
              {
                label: "Deposit",
                value: 2,
                gradient: "linear-gradient(to right, #627EEA4D,#627EEA00)",
                gradientText: "#627EEA",
              },
              {
                label: "Option Fee",
                value: 0.7,
                gradient: "linear-gradient(to right, #FF52704D,#FF527000)",
                gradientText: "#FF5270",
              },

              {
                label: "Downside Protection",
                value: 0.7,
                gradient: "linear-gradient(to right, #05A5524D, #05A55200)",
                gradientText: "#05A552",
              },
            ].map((metric, index, arr) => {
              const total = arr.reduce((acc, item) => acc + item.value, 0);
              const percentage = (metric.value / total) * 100;

              return (
                <div
                  key={index}
                  style={{
                    width: `${percentage}%`,
                  }}
                  className="relative h-full flex flex-col justify-end"
                >
                  <div
                    className="w-full"
                    style={{
                      position: "absolute",
                      backgroundColor: "transparent",
                      color: metric.gradientText,
                      left: "8px",
                    }}
                  >
                    {percentage.toFixed(2)}%
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      height: "48px",
                      width: "2px",
                      backgroundColor: metric.gradientText,
                      left: 0,
                    }}
                  />

                  <div
                    style={{
                      height: "80%",
                      background: metric.gradient,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex w-full h-2 bg-gray-200 rounded-none overflow-hidden">
            {[
              {
                label: "Deposit",
                value: 2,
                gradient: "#627EEA",
              },
              {
                label: "Option Fee",
                value: 0.7,
                gradient: "#FF5270",
              },
              {
                label: "Downside Protection",
                value: 0.7,
                gradient: "#05A552",
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
        </div>
      </div>
    </div>
  );
}

function AdditionalDetails() {
  return (
    <>
      <div className="flex flex-col p-6 gap-[18px] relative">
        <div className=" font-medium text-2xl">Mint USDa</div>
        <div className="flex flex-col gap-[18px] ">
          <div className="flex flex-col">
            <div className="flex">
              <Input className="rounded-none text-2xl h-12 px-4" value={0.7} />
              <Button
                className="rounded-none text-2xl h-12 px-4"
                variant={"outline"}
                size={"lg"}
              >
                Max
              </Button>
            </div>

            <div className="flex justify-between">
              <span className=" font-medium text-lg text-grayLight">
                Min: 0.05 ETH
              </span>
              <span className=" font-medium text-lg text-grayLight">
                Bal: 0.23 ETH
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[18px]">
            <div className="flex">
              <div className="relative w-full">
                <Input
                  className="rounded-none text-2xl h-12 px-4 pr-16"
                  value={0.7}
                />
                <Button
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 text-lg font-medium px-4 text-textBlack dark:text-white"
                  variant={"ghost"}
                  size={"sm"}
                >
                  USDa
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className=" font-medium text-lg text-grayLight">
                Min: 0.05 ETH
              </span>
              <span className=" font-medium text-lg text-grayLight">
                Bal: 0.23 ETH
              </span>
            </div>
          </div>
        </div>
        <AdditionalMetics />
      </div>
      <div className="col-span-1">
        <Button className="bg-textBlack text-white py-6 font-semibold text-[24px] w-full h-full rounded-md dark:bg-custom-gradient-to-top">
          Mint USDa
        </Button>
      </div>
    </>
  );
}

function MintUSDa() {
  const router = useRouter();
  return (
    <>
      <AppNavbar />
      <div className="grid md:grid-cols-3 grid-cols-1">
        <div className="col-span-2 hidden md:block border border-solid border-grayLight">
          <ChartComponent />
        </div>
        <div className="col-span-1 hidden md:block border border-solid border-grayLight">
          <AdditionalDetails />
        </div>
        <div className="col-span-1 block md:hidden border border-solid border-grayLight">
          <AdditionalDetails />
        </div>
        <div className="col-span-2 block md:hidden border border-solid border-grayLight">
          <ChartComponent />
        </div>

        <div className="col-span-2 border border-solid border-grayLight p-8">
          <div className="flex flex-col justify-start">
            <div className=" text-textBlack text-3xl font-medium dark:text-white">
              How it works?
            </div>
            <ol className="list-decimal list-outside pl-4 mt-3 text-grayLight">
              <li className="mb-3 text-lg">
                Select cards to view potential rewards.
              </li>
              <li className="mb-3 text-lg">
                Confirm your selection to reveal rewards.
              </li>
              <li className="mb-3 text-lg">
                Earn prizes or reclaim your option fees!
              </li>
              <li className="text-base">
                Earn prizes or reclaim your option fees!
              </li>
            </ol>
          </div>
        </div>
        <div className="col-span-1 border border-solid border-grayLight p-8">
          <div
            onClick={() => {
              router.push("/farmyourluck");
            }}
            className="flex flex-col justify-between h-full"
          >
            <Image
              src={farmyourluckLogo}
              width={50}
              height={50}
              alt="farm-your-luck"
              className="hidden md:block cursor-pointer dark:hidden"
            />
            <Image
              src={framyourlogodark}
              width={50}
              height={50}
              alt="farm-your-luck"
              className="hidden md:block cursor-pointer light:hidden"
            />
            <div className=" text-textBlack text-3xl font-medium dark:text-white">
              Farm Your Luck
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MintUSDa;
