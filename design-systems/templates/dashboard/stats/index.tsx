"use client";
import { ChartComponent } from "@/design-systems/organisms/dashboard/state/chart";
import useGetTotalBorrow from "@/hookes/api-hooks/useGetBorrowAmount";
import useFetchOptionFees from "@/hookes/api-hooks/useOptionFee";
import useGetTotalSupplyAbond from "@/hookes/contract-hooks/useGetAbondTotalSupply";
import useGetTotalSupplyUsda from "@/hookes/contract-hooks/useGetTotalSupplyUSDa";
import useGetomniChainData from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import { formatNumber } from "@/utils/helpers";
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { formatEther, formatUnits } from "viem";
import { useChainId, useReadContract } from "wagmi";
import RatioOfCollaterals, {
  StatsMetrics,
} from "../../../organisms/dashboard/state/RatioOfCollaterals";
import {
  abondValues,
  USDAPrice,
  usdaValues,
  BorrowFeesValues,
  lockedValues,
  OptionFeesValues,
  RatioValues,
  RatioValuesBottom,
} from "./data";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import { optionABI } from "@/blockchain/abis/option";
import { optionContractAddress } from "@/blockchain/contracts";

function StatsTemplate() {
  const { isConnected: isWalletConnected } = useCheckWalletConnection();
  const chainId = useChainId();
  const [loading, setLoading] = React.useState(true);

  // Get the ethprice, usda+ supply abond supply and global data from the contracts
  const { usdValue: ethPrice } = useGetUsdValue();
  const { totalSupplyUsda: usdaSupply } = useGetTotalSupplyUsda() as {
    totalSupplyUsda: bigint;
  };
  const { totalSupplyAbond } = useGetTotalSupplyAbond() as {
    totalSupplyAbond: bigint;
  };

  const { omniChainDataEth, omniChainDataCbbtc, omniChainDataKrwq } =
    useGetomniChainData();

  // getting total borrow amount for user
  const { userTotalBorrowAmount } = useGetTotalBorrow();
  const [feeOption, setFeeOption] = useState("Option Fees");

  // Get the ratio data and fees data from the backend
  const { data: ratioData = 0 } = useQuery({
    queryKey: ["ratioData"],
    queryFn: () =>
      fetch(
        `${BACKEND_API_URL}/borrows/ratio/${chainId}/${ethPrice ?? 0}`,
      ).then((res) => res.json()),
    staleTime: 0,
    refetchOnWindowFocus: true,
    enabled: !!chainId && !!ethPrice,
  });

  // getting current strike price percent limit from the contract
  const { data: currentStrikePricePercentLimit, refetch: refetchCurrentData } =
    useReadContract({
      abi: optionABI,
      address:
        optionContractAddress[chainId as keyof typeof optionContractAddress],
      functionName: "currentStrikePricePercentLimit",
      query: {
        select: (data) => Number(data || 0),
      },
    });

  // getting option fee for one ETH
  const { optionFees: feeOptions } = useFetchOptionFees(
    "1",
    (ethPrice || 0) as number,
    currentStrikePricePercentLimit as number,
    "ETH",
  );

  useEffect(() => {
    handleStatsItem();
    // refetch();
  }, [
    omniChainDataEth,
    ethPrice,
    usdaSupply,
    ratioData,
    feeOptions,
    totalSupplyAbond,
    ratioData,
  ]);

  const handleStatsItem = async () => {
    // check if all data is available
    setLoading(true);
    if (
      ethPrice &&
      usdaSupply != undefined &&
      omniChainDataEth != undefined &&
      ratioData != undefined &&
      feeOptions != undefined &&
      totalSupplyAbond != undefined
    ) {
      // total borrow amount for user
      USDAPrice[0].value = userTotalBorrowAmount;

      // usda+ supply for user
      usdaValues[0].value = usdaSupply
        ? formatNumber(Number(formatUnits(BigInt(usdaSupply), 6)))
        : "0";

      // usda+ supply for user
      usdaValues[1].value = "-";

      // total borrow amount + cds deposited amount
      lockedValues[0].value = omniChainDataEth.totalCdsDepositedAmount
        ? formatNumber(
            omniChainDataEth
              ? Number(
                  formatUnits(
                    BigInt(omniChainDataEth?.totalCdsDepositedAmount ?? 0n),
                    6,
                  ),
                ) +
                  Number(
                    formatUnits(
                      BigInt(
                        omniChainDataEth?.totalVolumeOfBorrowersAmountinUSD ??
                          0n,
                      ),
                      20,
                    ),
                  ) +
                  Number(
                    formatUnits(
                      BigInt(omniChainDataCbbtc?.totalCdsDepositedAmount ?? 0n),
                      6,
                    ),
                  ) +
                  Number(
                    formatUnits(
                      BigInt(
                        omniChainDataCbbtc?.totalVolumeOfBorrowersAmountinUSD ??
                          0n,
                      ),
                      20,
                    ),
                  ) +
                  Number(
                    formatUnits(
                      BigInt(omniChainDataKrwq?.totalCdsDepositedAmount ?? 0n),
                      6,
                    ),
                  ) +
                  Number(
                    formatUnits(
                      BigInt(
                        omniChainDataKrwq?.totalVolumeOfBorrowersAmountinUSD ??
                          0n,
                      ),
                      26,
                    ),
                  )
              : 0,
          )
        : "0";
      // total cds deposited amount
      lockedValues[1].value = omniChainDataEth.totalCdsDepositedAmount
        ? `${formatNumber(
            Number(
              formatUnits(BigInt(omniChainDataEth.totalCdsDepositedAmount), 6),
            ),
          )} USDA+`
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
      // ratio of collateral for user
      RatioValues[0].value =
        ratioData == undefined ? "-" : ratioData.toFixed(2);

      RatioValues[1].value = `$${
        omniChainDataEth.totalCdsDepositedAmount
          ? formatNumber(
              Number(formatUnits(omniChainDataEth.totalCdsDepositedAmount, 6)) +
                Number(
                  formatUnits(
                    omniChainDataCbbtc?.totalCdsDepositedAmount ?? 0n,
                    6,
                  ),
                ) +
                Number(
                  formatUnits(
                    omniChainDataKrwq?.totalCdsDepositedAmount ?? 0n,
                    6,
                  ),
                ),
            )
          : "0"
      }`;

      RatioValues[2].value = `$${
        omniChainDataEth.cdsPoolValue
          ? formatNumber(
              Number(formatUnits(omniChainDataEth.cdsPoolValue, 6)) +
                Number(formatUnits(omniChainDataCbbtc?.cdsPoolValue ?? 0n, 6)) +
                Number(formatUnits(omniChainDataKrwq?.cdsPoolValue ?? 0n, 6)),
            )
          : "0"
      }`;

      RatioValues[3].value = `$${(
        Number(formatUnits(omniChainDataEth.cdsPoolValue ?? 0n, 6)) +
        Number(formatUnits(omniChainDataCbbtc?.cdsPoolValue ?? 0n, 6)) +
        Number(formatUnits(omniChainDataKrwq?.cdsPoolValue ?? 0n, 6)) -
        Number(formatUnits(omniChainDataEth.totalCdsDepositedAmount ?? 0n, 6)) +
        Number(
          formatUnits(omniChainDataCbbtc?.totalCdsDepositedAmount ?? 0n, 6),
        ) +
        Number(formatUnits(omniChainDataKrwq?.totalCdsDepositedAmount ?? 0n, 6))
      ).toFixed(2)}`;

      const total =
        Number(
          formatEther(
            omniChainDataEth.totalVolumeOfBorrowersAmountinUSD / BigInt(100),
          ),
        ) +
        Number(
          formatEther(
            omniChainDataCbbtc?.totalVolumeOfBorrowersAmountinUSD / BigInt(100),
          ),
        ) +
        Number(
          formatEther(
            omniChainDataKrwq?.totalVolumeOfBorrowersAmountinUSD / BigInt(100),
          ),
        ) +
        Number(formatUnits(omniChainDataEth.totalCdsDepositedAmount, 6)) +
        Number(
          formatUnits(omniChainDataCbbtc?.totalCdsDepositedAmount ?? 0n, 6),
        ) +
        Number(
          formatUnits(omniChainDataKrwq?.totalCdsDepositedAmount ?? 0n, 6),
        );

      RatioValuesBottom[0].value = `${(
        ((Number(
          formatEther(
            omniChainDataEth.totalVolumeOfBorrowersAmountinUSD / BigInt(100),
          ),
        ) +
          (Number(
            formatEther(
              omniChainDataCbbtc.totalVolumeOfBorrowersAmountinUSD /
                BigInt(100),
            ),
          ) +
            Number(
              formatEther(
                omniChainDataKrwq.totalVolumeOfBorrowersAmountinUSD /
                  BigInt(100),
              ),
            ))) /
          total) *
        100
      ).toFixed(2)}%`;

      RatioValuesBottom[1].value = `${(
        ((Number(
          formatUnits(omniChainDataEth.totalCdsDepositedAmount ?? 0n, 6),
        ) +
          Number(
            formatUnits(omniChainDataCbbtc?.totalCdsDepositedAmount ?? 0n, 6),
          ) +
          Number(
            formatUnits(omniChainDataKrwq?.totalCdsDepositedAmount ?? 0n, 6),
          )) /
          total) *
        100
      ).toFixed(2)}%`;

      // fees values
      OptionFeesValues[0].value = `$${
        feeOptions == undefined ? 0 : Number(feeOptions).toFixed(2)
      }`;
      // FeesValues[1].value = `${
      //   feeOptions[1] == undefined
      //     ? 0
      //     : (parseFloat(feeOptions[1]) / 10 ** 6).toFixed(2)
      // }`;
      BorrowFeesValues[1].value = formatNumber(
        (Number(
          formatEther(
            omniChainDataEth.totalVolumeOfBorrowersAmountinUSD / BigInt(100),
          ),
        ) +
          Number(
            formatEther(
              omniChainDataCbbtc.totalVolumeOfBorrowersAmountinUSD /
                BigInt(100),
            ),
          ) +
          Number(
            formatEther(
              omniChainDataKrwq.totalVolumeOfBorrowersAmountinUSD / BigInt(100),
            ),
          )) *
          0.2,
      );

      // set abond Data
      abondValues[1].value = totalSupplyAbond
        ? formatNumber(Number(formatUnits(totalSupplyAbond, 18)))
        : "0";
      // abondValues[2].value = totalSupplyAbond
      //   ? formatNumber(Number(totalSupplyAbond) / 10 ** 18)
      //   : "0";
    }
  };

  return (
    <div className="md:mt-[-20px] sm:mx-4 border-x sm:border-grayLight">
      <div className="grid lg:grid-cols-2 grid-cols-1 ">
        <div>
          <ChartComponent
            stats={USDAPrice}
            title="USDA+ Price Chart"
            timeFrame="All Time"
            hideElements={false}
            chartApiFlag="usdaPrice"
          />
        </div>
        <div>
          <ChartComponent
            stats={usdaValues}
            title="USDA+ Supply Chart"
            timeFrame="1Y"
            hideElements={false}
            chartApiFlag=""
            isBorderRight={false}
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
            isBorderRight={false}
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

export default WithPrivateRoute(StatsTemplate);
