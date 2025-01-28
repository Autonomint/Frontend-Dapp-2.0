"use client";
import React, { useEffect } from "react";
import { ChartComponent, options } from "./ChartComponent";
import RatioOfCollaterals from "./RatioOfCollaterals";
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
];

function page() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [loading, setLoading] = React.useState(true);
  const [feeOption, setFeeOption] = React.useState("option");

  // Get the ethprice, amint supply abond supply and global data from the contracts
  const { usdValue: ethPrice } = useGetUsdValue();
  const { totalSupplyUsda: usdaSupply } = useGetTotalSupplyUsda();
  const { totalSupplyAbond } = useGetTotalSupplyAbond();
  console.log(usdaSupply, "usdaSupply");

  const { omniChainData } = useGetomniChainData();
  const { userTotalBorrowAmount } = useGetTotalBorrow();

  // Get the ratio data and fees data from the backend
  const { data: ratioData = 0 } = useQuery({
    queryKey: ["ratioData"],
    queryFn: () =>
      fetch(
        `${BACKEND_API_URL}/borrows/ratio/${chainId}/${ethPrice ?? 0}`
      ).then((res) => res.json()),
  });

  const { data: feeOptions, refetch } = useQuery({
    queryKey: ["optionFees"],
    queryFn: () =>
      fetch(
        `${BACKEND_API_URL}/borrows/optionFees/${chainId}/1000000000000000000/${
          ethPrice ?? 0
        }/0`
      ).then((res) => res.json()),
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
      RatioValues[1].value = omniChainData.totalCdsDepositedAmount
        ? formatNumber(Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6)
        : "0";
      RatioValues[2].value = omniChainData.cdsPoolValue
        ? formatNumber(Number(omniChainData.cdsPoolValue / BigInt(10 ** 6)))
        : "0";
      RatioValues[3].value = (
        Number(omniChainData.cdsPoolValue / BigInt(10 ** 6)) -
        Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6
      ).toFixed(2);
      const total =
        Number(
          formatEther(
            omniChainData.totalVolumeOfBorrowersAmountinUSD / BigInt(100)
          )
        ) +
        Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6;
      RatioValuesBottom[0].value = (
        (Number(
          formatEther(
            omniChainData.totalVolumeOfBorrowersAmountinUSD / BigInt(100)
          )
        ) /
          total) *
        100
      ).toFixed(1);
      RatioValuesBottom[1].value = (
        (Number(omniChainData.totalCdsDepositedAmount) / 10 ** 6 / total) *
        100
      ).toFixed(1);

      // fees values
      OptionFeesValues[0].value = `${
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

  console.log(totalSupplyAbond, abondValues, "totalSupplyAbond");

  return (
    <div className="mt-[-20px]">
      <div className="grid md:grid-cols-2 grid-cols-1 ">
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
      {/* <div>
        <RatioOfCollateralAdditional />
      </div> */}
      <div className="grid md:grid-cols-2 grid-cols-1 pt-6">
        <div>
          <ChartComponent
            stats={BorrowFeesValues}
            title="Option Fees Chart"
            timeFrame="All Time"
            hideElements={false}
            chartApiFlag="optionFees"
          />
        </div>
        <div>
          <ChartComponent
            stats={OptionFeesValues}
            title="Borrowing Fees Chart"
            timeFrame="All Time"
            hideElements={false}
            chartApiFlag="borrowingFees"
          />
        </div>
      </div>
    </div>
  );
}

export default page;
