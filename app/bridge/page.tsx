"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import CustomDropdown from "../../custom-components/CustomDropdown";
import AppNavbar from "@/custom-components/AppNavbar";

import { GenericDropdownMenu } from "@/components/ui/DropdownCustom/GenericDropdownMenu";

function BridgeComponent({
  heading,
  network,
  token,
  totalAmount,
}: {
  heading: string;
  network: string;
  token: string;
  totalAmount: string;
}) {
  return (
    <div
      className={`flex flex-col md:p-6 p-5 justify-between border border-y-0 border-r-0 border-grayLight border-solid rounded-none ${
        heading === "To"
          ? "bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top"
          : "bg-none dark:bg-none"
      }`}
    >
      <div className=" text-[32px] font-medium mb-4">{heading}</div>
      <div className="flex flex-col gap-7">
        <div className="flex gap-6">
          <div className="flex flex-col gap-3 flex-1">
            <span className="text-[18px] font-medium text-grayLight">
              Network
            </span>
            <GenericDropdownMenu
              buttonText="Sepolia"
              items={[]}
              className="w-full text-[24px] border border-grayLight h-[65px]"
            />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <span className="text-[18px] font-medium text-grayLight">
              Network
            </span>
            <GenericDropdownMenu
              buttonText="USDa"
              items={[]}
              className="w-full text-[24px] border border-grayLight h-[65px]"
            />
          </div>
        </div>
        <div className="border border-solid border-grayLight p-5">
          <div className="flex justify-between">
            <div
              className={
                `${heading == "From" ? "" : "dark:text-white"}` +
                "text-grayLight text-lg "
              }
            >
              You {heading == "From" ? "Send" : "Receive"}
            </div>
            <div className="text-grayLight text-lg flex gap-3 ">
              Available Bal: 7001
              <span className="text-textBlack text-lg dark:text-white">
                Max
              </span>
            </div>
          </div>
          <div className="text-[42px] text-textBlack  mt-8 dark:text-white">
            $1,201
          </div>
        </div>
      </div>
    </div>
  );
}

function BridgeMetricFields({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col justify-between mb-3">
      <div className=" text-gray-500 font-medium text-[18px]">{label}</div>
      <div className="font-medium text-[20px] text-black dark:text-white">
        {value}
      </div>
    </div>
  );
}

function page() {
  return (
    <div className="flex flex-col h-full">
      <AppNavbar activeBack={false} />
      <div className="grid md:grid-cols-2 md:grid-rows-[85%_15%] flex-grow">
        <BridgeComponent
          heading={"From"}
          network={"Sepolia"}
          token={"USDa"}
          totalAmount={"$1,202"}
        />
        <BridgeComponent
          heading={"To"}
          network={"Base"}
          token={"USDC"}
          totalAmount={"$1,200"}
        />
        <div className="flex flex-wrap justify-between py-5 px-8 border  border-solid border-grayLight rounded-md h-full">
          <BridgeMetricFields
            label={"Amount to receive"}
            value={"160 Hug × 23 Hug"}
          />
          <BridgeMetricFields label={"Gas"} value={"$1.80 (0.001 ETH)"} />
          <BridgeMetricFields label={"Time"} value={"~2min"} />
        </div>

        <Button className="bg-textBlack text-white py-4 font-semibold text-[24px] w-full h-full rounded-md dark:bg-custom-gradient-to-bottom border border-grayLight">
          Bridge
        </Button>
      </div>
    </div>
  );
}

export default page;
