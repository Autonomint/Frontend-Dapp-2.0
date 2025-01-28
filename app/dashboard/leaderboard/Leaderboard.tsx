"use client";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useGetLeaderboard, {
  LeaderboardDetails,
} from "@/hookes/api-hooks/useGetLeaderboard";
import { formatNumber, sortWalletAddress } from "@/utils/helpers";
import { formatEther } from "viem";
import useGetOmniChainData from "@/hookes/contract-hooks/useGetUsdtMintTillNow";

function PortolioTable({
  leaderboardData,
}: {
  leaderboardData: LeaderboardDetails[];
}) {
  return (
    <div className="overflow-x-auto min-h-[500px]">
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
          {leaderboardData.map((item, index) => {
            return (
              <tr key={index} className="border border-grayLight">
                <td className="px-5 py-6">{index + 1}</td>
                <td className="px-5 py-6">{sortWalletAddress(item.address)}</td>
                <td className="px-5 py-6 hidden md:table-cell">
                  {item.totalAmint ? Number(item.totalAmint).toFixed(4) : "--"}
                </td>
                <td className="px-5 py-6 hidden md:table-cell">
                  {item.totalDepositedAmount
                    ? Number(item.totalDepositedAmount).toFixed(2)
                    : "--"}
                </td>
                <td className="px-5 py-6 hidden md:table-cell">
                  {item.totalLTV ? item.totalLTV : "--"}
                </td>
                <td className="px-5 py-6 hidden md:table-cell font-normal">
                  {!!item.totalAmint ? (
                    <span className="bg-[#ABFFDE] border border-solid border-grayLight p-2 dark:text-textBlack">
                      Borrower
                    </span>
                  ) : (
                    <span className="bg-[#ABFFDE] border border-solid border-grayLight p-2 dark:text-textBlack">
                      Deposit
                    </span>
                  )}
                </td>
                <td className="px-5 py-6 hidden md:table-cell font-normal text-right">
                  {item.points ? item.points : "--"}
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
    <div className="flex-1 flex flex-col p-5 gap-4 border border-grayLight">
      <span className="text-textBlack text-[32px] font-medium dark:text-white">
        {value}
      </span>
      <span className="text-grayLight md:text-lg text-[14px] ">
        {subHeading}
      </span>
    </div>
  );
}

function Leaderboard() {
  // Fetch the total volume of borrowers amount in USD
  const { omniChainData } = useGetOmniChainData();
  const {
    leaderboardData,
    borrowdepositsError,
    cdsdepositsError,
    totalBorrowCount,
    totalDepositedCount,
  } = useGetLeaderboard();

  console.log(leaderboardData, "leaderboardData");

  return (
    <div className="flex flex-col">
      <div className="grid md:grid-cols-4 grid-cols-2">
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total number of borrowers"
            value={totalBorrowCount.toString() || ""}
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total number of dcds depositors"
            value={totalDepositedCount.toString() || ""}
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total Value Locked (TVL)"
            value={`$${formatNumber(
              Number(omniChainData?.totalCdsDepositedAmount ?? 0n) / 10 ** 6 +
                Number(
                  formatEther(
                    (omniChainData?.totalVolumeOfBorrowersAmountinUSD ?? 0n) /
                      BigInt(100)
                  )
                )
            )}`}
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total Distributed Points"
            value="2.6 Million"
          />
        </div>
      </div>
      <PortolioTable leaderboardData={leaderboardData} />
    </div>
  );
}

export default Leaderboard;
