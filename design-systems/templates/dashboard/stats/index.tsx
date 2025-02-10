"use client";
import React, { useEffect, useState } from "react";
import { ChartComponent, options } from "./ChartComponent";
import RatioOfCollaterals, { StatsMetrics } from "./RatioOfCollaterals";
import { Line } from "react-chartjs-2";
import RatioOfCollateralAdditional from "./RatioOfCollateralAdditional";
import { useAccount, useChainId } from "wagmi";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import useGetTotalSupplyUsda from "@/hookes/contract-hooks/useGetTotalSupplyUSDa";
import useGetTotalSupplyAbond from "@/hookes/contract-hooks/useGetAbondTotalSupply";
import useGetomniChainData from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { formatNumber } from "@/utils/helpers";
import { formatEther } from "viem";
import useGetTotalBorrow from "@/hookes/api-hooks/useGetBorrowAmount";
const amintValues = [
  {
    headline: "Total Supply",
    value: "0",
  },
  {
    headline: "Total Market Cap",
    value: "0",
  },
];
const amintPrice = [
  {
    headline: "USDa Minted",
    value: "0",
  },
  {
    headline: "USDa price",
    value: "$1",
  },
];
const lockedValues = [
  {
    headline: "Total Value Locked",
    value: "$0",
  },
  {
    headline: "Total Stablecoins Locked",
    value: "0 USDa",
  },
];
const RatioValues = [
  {
    value: "0",
    headline: "Current Ratio",
  },
  {
    value: "0 USDa",
    headline: "Total dCDS Pool value",
  },
  {
    value: "0 USDa",
    headline: "Net dCDS Pool Value",
  },
  {
    value: "+0%",
    headline: "dCDS Profit/Loss",
  },
];
const RatioValuesBottom = [
  {
    headline: "Collateral",
    value: "+0%",
  },
  {
    headline: "dCDS",
    value: "+0%",
  },
];

const abondValues = [
  {
    headline: "ABOND Price",
    value: "$4",
  },
  {
    headline: "ABOND Total Supply",
    value: "0",
  },
  {
    headline: "ABOND  Market Cap",
    value: "-",
    lastElement: true,
  },
];

const BorrowFeesValues = [
  { headline: "Borrowing Fees", value: "5%" },

  {
    headline: "Total Collateral Protected",
    value: "0 USDa",
  },

  {
    headline: "Total ABOND Yield",
    value: "-",
  },
];
const OptionFeesValues = [
  {
    headline: "Option Fee",
    value: "0",
  },

  {
    headline: "Total Upside Gained",
    value: "15%",
  },
  {
    headline: "",
    value: "",
  },
];

function StatsTemplate() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [loading, setLoading] = React.useState(true);

  // Get the ethprice, amint supply abond supply and global data from the contracts
  const { usdValue: ethPrice } = useGetUsdValue();
  const { totalSupplyUsda: usdaSupply } = useGetTotalSupplyUsda();
  const { totalSupplyAbond } = useGetTotalSupplyAbond();

  const { omniChainData } = useGetomniChainData();
  const { userTotalBorrowAmount } = useGetTotalBorrow();
  const [feeOption, setFeeOption] = useState("Option Fees");

  // Get the ratio data and fees data from the backend
  const { data: ratioData = 0 } = useQuery({
    queryKey: ["ratioData"],
    queryFn: () =>
      fetch(
        `${BACKEND_API_URL}/borrows/ratio/${chainId}/${ethPrice ?? 0}`
      ).then((res) => res.json()),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const { data: feeOptions, refetch } = useQuery({
    queryKey: ["optionFees"],
    queryFn: () =>
      fetch(
        `${BACKEND_API_URL}/borrows/optionFees/${chainId}/1000000000000000000/${
          ethPrice ?? 0
        }/0`
      ).then((res) => res.json()),
    staleTime: 0,
  });

  useEffect(() => {
    handleStatsItem();
    refetch();
  }, [
    omniChainData,
    ethPrice,
    usdaSupply,
    ratioData,
    feeOptions,
    totalSupplyAbond,
    feeOptions,
    ratioData,
  ]);

  const handleStatsItem = async () => {
    // check if all data is available
    setLoading(true);
    if (
      ethPrice &&
      usdaSupply != undefined &&
      omniChainData != undefined &&
      ratioData != undefined &&
      feeOptions != undefined &&
      totalSupplyAbond != undefined
    ) {
      amintPrice[0].value = userTotalBorrowAmount;

      amintValues[0].value = usdaSupply
        ? formatNumber(Number(usdaSupply) / 10 ** 6)
        : "0";

      amintValues[1].value = usdaSupply
        ? formatNumber(Number(usdaSupply) / 10 ** 6)
        : "0";

      // locked values
      lockedValues[0].value = omniChainData.totalCdsDepositedAmount
        ? formatNumber(
            Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6 +
              Number(
                formatEther(
                  omniChainData.totalVolumeOfBorrowersAmountinUSD / BigInt(100)
                )
              )
          )
        : "0";
      lockedValues[1].value = omniChainData.totalCdsDepositedAmount
        ? `${formatNumber(
            Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6
          )} USDa`
        : "0";
      // lockedValues[2].value = omniChainData.totalCdsDepositedAmount
      //   ? formatNumber(
      //       Number(
      //         formatEther(
      //           omniChainData.totalVolumeOfBorrowersAmountinUSD / BigInt(100)
      //         )
      //       )
      //     )
      //   : "0";

      // ratio values
      RatioValues[0].value =
        ratioData == undefined ? "-" : ratioData.toFixed(2);
      RatioValues[1].value = `$${
        omniChainData.totalCdsDepositedAmount
          ? formatNumber(
              Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6
            )
          : "0"
      }`;
      RatioValues[2].value = `$${
        omniChainData.cdsPoolValue
          ? formatNumber(Number(omniChainData.cdsPoolValue / BigInt(10 ** 6)))
          : "0"
      }`;
      RatioValues[3].value = `$${(
        Number(omniChainData.cdsPoolValue / BigInt(10 ** 6)) -
        Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6
      ).toFixed(2)}`;
      const total =
        Number(
          formatEther(
            omniChainData.totalVolumeOfBorrowersAmountinUSD / BigInt(100)
          )
        ) +
        Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6;
      RatioValuesBottom[0].value = `${(
        (Number(
          formatEther(
            omniChainData.totalVolumeOfBorrowersAmountinUSD / BigInt(100)
          )
        ) /
          total) *
        100
      ).toFixed(1)}%`;
      RatioValuesBottom[1].value = `${(
        (Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6 / total) *
        100
      ).toFixed(1)}%`;

      // fees values
      OptionFeesValues[0].value = `$${
        feeOptions[1] == undefined
          ? 0
          : (parseFloat(feeOptions[1]) / 10 ** 6).toFixed(2)
      }`;
      // FeesValues[1].value = `${
      //   feeOptions[1] == undefined
      //     ? 0
      //     : (parseFloat(feeOptions[1]) / 10 ** 6).toFixed(2)
      // }`;
      BorrowFeesValues[1].value = formatNumber(
        Number(
          formatEther(
            omniChainData.totalVolumeOfBorrowersAmountinUSD / BigInt(100)
          )
        ) * 0.2
      );

      // set abond Data
      abondValues[1].value = totalSupplyAbond
        ? formatNumber(Number(totalSupplyAbond) / 10 ** 18)
        : "0";
      // abondValues[2].value = totalSupplyAbond
      //   ? formatNumber(Number(totalSupplyAbond) / 10 ** 18)
      //   : "0";
    }
  };

  return (
    <div className="md:mt-[-20px]">
      <div className="grid lg:grid-cols-2 grid-cols-1 ">
        <div>
          <ChartComponent
            stats={amintPrice}
            title="USDa Price Chart"
            timeFrame="All Time"
            hideElements={false}
            chartApiFlag="amintPrice"
          />
        </div>
        <div>
          <ChartComponent
            stats={amintValues}
            title="USDa Supply Chart"
            timeFrame="1Y"
            hideElements={false}
            chartApiFlag=""
          />
        </div>
        <div>
          <ChartComponent
            stats={abondValues}
            title="ABOND"
            timeFrame="All Time"
            hideElements={false}
            chartApiFlag=""
          />
        </div>
        <div>
          <ChartComponent
            stats={lockedValues}
            title="Value Locked"
            timeFrame="1M"
            chartApiFlag=""
            hideElements={false}
          />
        </div>
      </div>
      <div className="border-[1px] border-b border-grayLight">
        <RatioOfCollaterals
          RatioValuesBottom={RatioValuesBottom}
          stats={RatioValues}
          timeFrame="10D"
          chartApiFlag="ratio"
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 ">
        <div className="p-5 border-left border-grayLight border-[1px]">
          <div className="flex justify-between">
            <span className="flex-1 font-medium text-[24px] text-grayLight">
              {"Fees"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-7 w-full mt-8">
            <div className="flex flex-col gap-8">
              {BorrowFeesValues.map((item, index) => {
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
            <div className="flex  flex-col gap-8">
              {OptionFeesValues.map((item, index) => {
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
          </div>
        </div>
        <div className="flex  relative flex-col">
          <div className=" p-5 pb-0 flex gap-3 md:gap-0 flex-col md:flex-row w-full justify-between items-center">
            <div className=" w-full md:w-[50%] sm:w-[40%] flex justify-start items-center  lg:w-full xl:w-[35%]  ">
              <span className="flex-1 justify-center items-center font-medium text-[20px] 2xl:text-[24px] text-grayLight">
                {"Fees chart"}
              </span>
            </div>
            <div className=" w-full   md:w-[50%]   top-[20px] right-[20px]">
              <div className="flex w-[100%] flex-1 border border-grayLight text-left relative">
                <div
                  className={`flex-1 text-[15px] 2xl:text-[18px] flex items-center justify-center p-[2px] 2xl:p-[8px] text-center cursor-pointer ${
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
                  className={`flex-1 p-[2px] py-[10px] flex items-center justify-center  text-[15px] 2xl:text-[18px] 2xl:p-[8px] text-center cursor-pointer ${
                    feeOption === "Borrowing Fees"
                      ? "bg-[#ABFFDE] border border-grayLight dark:text-textBlack "
                      : ""
                  }`}
                >
                  Borrowing Fees
                </div>
              </div>
            </div>
          </div>

          <div className="">
            {feeOption === "Option Fees" ? (
              <ChartComponent
                stats={[]}
                title=""
                timeFrame="All Time"
                hideElements={false}
                chartApiFlag="optionFees"
              />
            ) : (
              <ChartComponent
                stats={[]}
                title=""
                timeFrame="All Time"
                hideElements={false}
                chartApiFlag="borrowingFees"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsTemplate;
