"use client";
import React, { useState } from "react";
import { WithdrawModal } from "../../components/popups/WithdrawModal";

function PortolioTable({
  tabPosition,
}: {
  tabPosition: "Borrowed" | "Deposited";
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse text-[20px]">
        <thead className="text-left font-normal text-grayLight font-plex-grotesk">
          <tr>
            <th className="pl-5 font-normal py-5 w-1/2 lg:w-auto">ID</th>
            <th className="pl-5 font-normal w-1/2 lg:w-auto">ETH Deposited</th>
            <th className="pl-5 hidden md:table-cell font-normal">
              USDa Minted
            </th>
            <th className="pl-5 hidden md:table-cell font-normal">
              Amount Protected
            </th>
            <th className="pl-5 hidden md:table-cell font-normal">
              Abond Minted
            </th>
            <th className="pl-5 hidden md:table-cell font-normal">
              Liquidation
            </th>
            <th className="pr-5 hidden md:table-cell text-right">Action</th>
          </tr>
        </thead>
        <tbody className="font-normal font-plex-grotesk">
          <tr className="border border-solid">
            <td className="px-5 py-6">02</td>
            <td className="px-5 py-6">1.789</td>
            <td className="px-5 py-6 hidden md:table-cell">$5,093</td>
            <td className="px-5 py-6 hidden md:table-cell">$3,000</td>
            <td className="px-5 py-6 hidden md:table-cell">--</td>
            <td className="px-5 py-6 hidden md:table-cell">YES</td>
            <td
              style={{
                display: tabPosition === "Borrowed" ? "block" : "none",
              }}
              className="px-5 py-6 hidden md:text-right md:block md:space-x-12"
            >
              <span className="font-bold text-[20px] underline font-plex-grotesk">
                Repay/Renew
              </span>
              <span className="font-bold text-[20px] underline font-plex-grotesk">
                View
              </span>
            </td>
            <td
              style={{
                display: tabPosition === "Deposited" ? "block" : "none",
              }}
              className="px-5 py-6 hidden md:text-right md:block md:space-x-12"
            >
              <span className="font-bold text-[20px] underline font-plex-grotesk">
                Withdraw
              </span>
              <span className="font-bold text-[20px] underline font-plex-grotesk">
                Rebalance
              </span>
              <span className="font-bold text-[20px] underline font-plex-grotesk">
                View
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function PortfolioMetrics({
  subHeading,
  value,
}: {
  subHeading: string;
  value: string;
}) {
  return (
    <div className="flex-1 flex flex-col p-5 gap-4 border border-solid">
      <span className="text-textBlack text-[32px] font-medium font-plex-grotesk">
        {value}
      </span>
      <span className="text-grayLight md:text-lg text-[14px] font-plex-grotesk">
        {subHeading}
      </span>
    </div>
  );
}

function Portfolio() {
  const [tabPosition, setTabPosition] = useState<"Borrowed" | "Deposited">(
    "Borrowed"
  );

  return (
    <div className="flex flex-col">
      <div className="grid md:grid-cols-4 grid-cols-2">
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Total Borrowed" value="$1,290" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Total Deposited" value="$2,320" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Fee Earned" value="$120" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Points" value="89,027" />
        </div>
      </div>
      <div className="flex">
        <div
          onClick={() => {
            setTabPosition("Borrowed");
          }}
          className={
            "lg:w-[24%] w-[50%] px-5 py-3 font-plex-grotesk text-[32px] font-medium border border-solid hover:cursor-pointer" +
            `${
              tabPosition == "Borrowed"
                ? " bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
                : "white"
            }`
          }
        >
          Borrowed Position
        </div>
        <div
          onClick={() => {
            setTabPosition("Deposited");
          }}
          className={
            "lg:w-[24%] w-[50%] px-5 py-3 font-plex-grotesk text-[32px] font-medium border border-solid hover:cursor-pointer" +
            `${
              tabPosition == "Deposited"
                ? " bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
                : "white"
            }`
          }
        >
          Deposited Position
        </div>
        <div className="lg:block w-[4%] hidden px-5 py-3 font-plex-grotesk text-[32px] font-medium border border-solid"></div>
        <div className="lg:block w-[48%] hidden px-5 py-3 font-plex-grotesk text-[32px] font-medium border border-solid"></div>
      </div>
      <PortolioTable tabPosition={tabPosition} />
    </div>
  );
}

export default Portfolio;
