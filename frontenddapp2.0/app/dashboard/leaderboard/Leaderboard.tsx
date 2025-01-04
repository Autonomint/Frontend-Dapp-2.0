"use client";
import React, { useState } from "react";
import { WithdrawModal } from "../../../customComponents/popups/WithdrawModal";

function PortolioTable() {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse text-[20px]">
        <thead className="text-left font-normal text-grayLight ">
          <tr>
            <th className="pl-5 font-normal py-5 w-1/2 lg:w-auto">Rank</th>
            <th className="pl-5 font-normal w-1/2 lg:w-auto">Address</th>
            <th className="pl-5 hidden md:table-cell font-normal">Borrowed</th>
            <th className="pl-5 hidden md:table-cell font-normal">Deposited</th>
            <th className="pl-5 hidden md:table-cell font-normal">
              LTV Ration
            </th>
            <th className="pl-5 hidden md:table-cell font-normal">Type</th>
            <th className="pr-5 hidden md:table-cell text-right font-normal">
              Points
            </th>
          </tr>
        </thead>
        <tbody className="font-normal ">
          <tr className="border border-solid">
            <td className="px-5 py-6">01</td>
            <td className="px-5 py-6">0x67a...8ujk</td>
            <td className="px-5 py-6 hidden md:table-cell">$800</td>
            <td className="px-5 py-6 hidden md:table-cell">--</td>
            <td className="px-5 py-6 hidden md:table-cell">0.4</td>
            <td className="px-5 py-6 hidden md:table-cell font-normal">
              <span className="bg-[#ABFFDE] border border-solid border-grayLight p-2">
                Borrower
              </span>
            </td>
            <td className="px-5 py-6 hidden md:table-cell font-normal text-right">
              189,789
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
      <span className="text-textBlack text-[32px] font-medium ">{value}</span>
      <span className="text-grayLight md:text-lg text-[14px] ">
        {subHeading}
      </span>
    </div>
  );
}

function Leaderboard() {
  return (
    <div className="flex flex-col">
      <div className="grid md:grid-cols-4 grid-cols-2">
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total number of borrowers"
            value="10,027"
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total number of dcds depositors"
            value="9,061"
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total Value Locked (TVL)"
            value="$12,000,267"
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total Earned Points"
            value="2.6 Million"
          />
        </div>
      </div>
      <PortolioTable />
    </div>
  );
}

export default Leaderboard;
