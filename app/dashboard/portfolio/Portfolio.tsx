"use client";
import { SearchIcon } from "@/components/ui/SvgIcons";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function PortolioTable({
  tabPosition,
}: {
  tabPosition: "Borrowed" | "Deposited";
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse text-[20px]">
        <thead className="text-left font-normal text-grayLight ">
          <tr>
            <th className="pl-5 font-normal py-5 w-1/5 lg:w-auto">ID</th>
            <th className="pl-5 font-normal w-4/5 lg:w-auto">ETH Deposited</th>
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
            <th className="pr-5 font-normal lg:w-auto text-right">Action</th>
          </tr>
        </thead>
        <tbody className="font-normal ">
          {Array(2)
            .fill(0)
            .map(() => {
              return (
                <tr className="border border-solid border-grayLight">
                  <td className="px-5 py-6">02</td>
                  <td className="px-5 py-6">1.789</td>
                  <td className="px-5 py-6 hidden md:table-cell">$5,093</td>
                  <td className="px-5 py-6 hidden md:table-cell">$3,000</td>
                  <td className="px-5 py-6 hidden md:table-cell">--</td>
                  <td className="px-5 py-6 hidden md:table-cell">YES</td>
                  <td
                    className={`px-5 py-6 ${
                      tabPosition === "Borrowed" ? "block" : "none"
                    } md:text-right md:table-cell md:space-x-12`}
                    style={{
                      display: tabPosition === "Borrowed" ? "block" : "none",
                    }}
                  >
                    <span className="font-bold text-[20px] underline ">
                      Repay/Renew
                    </span>
                    <span className="font-bold text-[20px] underline  hidden md:inline">
                      View
                    </span>
                  </td>

                  <td
                    className={`px-5 py-6 ${
                      tabPosition === "Deposited" ? "block" : "none"
                    } md:text-right md:table-cell md:space-x-12`}
                    style={{
                      display: tabPosition === "Deposited" ? "block" : "none",
                    }}
                  >
                    <span className="font-bold text-[20px] underline ">
                      Withdraw
                    </span>
                    <span className="font-bold text-[20px] underline  ">
                      Rebalance
                    </span>
                    <span className="font-bold text-[20px] underline  hidden md:inline">
                      View
                    </span>
                  </td>
                </tr>
              );
            })}
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
    <div className="flex-1 flex flex-col p-5 gap-4 border-grayLight border-r-0 border border-solid">
      <span className="text-textBlack md:text-[32px] text-[24px] font-medium ">
        {value}
      </span>
      <span className="text-grayLight md:text-lg text-[14px] ">
        {subHeading}
      </span>
    </div>
  );
}

function Portfolio() {
  const [tabPosition, setTabPosition] = useState<"Borrowed" | "Deposited">(
    "Borrowed"
  );

  // will handle all this through redux later
  const [isRebalanceDialogOpen, setIsRebalanceDialogOpen] = useState(false);

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
      <div className="flex mt-[24px]">
        <div
          onClick={() => {
            setTabPosition("Borrowed");
          }}
          className={
            "lg:w-[24%] flex-1 lg:px-5 lg:py-3 p-3  md:text-[32px] text-[18px] font-medium border-grayLight border border-r-0 border-solid hover:cursor-pointer" +
            `${
              tabPosition == "Borrowed"
                ? " bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient"
                : ""
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
            "lg:w-[24%] flex-1  lg:px-5 lg:py-3 p-3   md:text-[32px] text-[18px] font-medium border border-r-0 border-grayLight border-solid hover:cursor-pointer" +
            `${
              tabPosition == "Deposited"
                ? " bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient"
                : ""
            }`
          }
        >
          Deposited Position
        </div>
        <div className="lg:block w-[4%] hidden px-5 py-3  text-[32px] font-medium border-grayLight border  border-r-0 border-solid"></div>
        <div className="flex w-[48%]  px-5 py-3 flex-row items-center justify-start  text-[32px] font-medium border-grayLight border border-r-0 border-solid">
          <SearchIcon width={24} height={24} fontSize={24} />
          <Input
            className="border-0 md:!text-[32px] ml-2  p-0 !font-normal text-grayLight"
            placeholder="Search Transactions"
          />
        </div>
      </div>
      <PortolioTable tabPosition={tabPosition} />
      {/* <RebalancePopup
        isDialogOpen={isRebalanceDialogOpen}
        setIsDialogOpen={() => setIsRebalanceDialogOpen(false)}
      />
      <WithdrawModal
        isDialogOpen={true}
        setIsDialogOpen={() => setIsRebalanceDialogOpen(false)}
      /> */}
    </div>
  );
}

export default Portfolio;
