"use client";
import Image from "next/image";
import React from "react";
import farmyourluckLogo from "../assets/cryptocurrency-color_eth.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
      <div className="text-textBlack  font-medium text-xl">
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
      {/* <Button className="bg-textBlack w-full absolute left-0 bottom-0  rounded-none h-16 font-bold text-[#FFFFFF] text-[32px] ">
        Mint USDa
      </Button> */}
    </div>
  );
}

function AdditionalDetails() {
  return (
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
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-lg font-medium px-4 text-textBlack"
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
  );
}

function MintUSDa() {
  const router = useRouter();
  return (
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
          <div className=" text-textBlack text-3xl font-medium">
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
            className="hidden md:block"
          />
          <div className=" text-textBlack text-3xl font-medium">
            Farm Your Luck
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintUSDa;
