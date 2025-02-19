"use client";
import LeaderboardTable from "@/design-systems/organisms/dashboard/leaderboard/leaderboard-table";
import PortfolioMetrics from "@/design-systems/organisms/dashboard/leaderboard/portfolio-metrics";
import useGetLeaderboard from "@/hookes/api-hooks/useGetLeaderboard";
import useGetUserPoint from "@/hookes/api-hooks/useGetUserPoint";
import useGetOmniChainData from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import { formatNumber } from "@/utils/helpers";
import { formatEther } from "viem";

function Leaderboard() {
  const { isConnected: isWalletConnected } = useCheckWalletConnection();

  // Fetch the total volume of borrowers amount in USD
  const { omniChainData } = useGetOmniChainData();
  const {
    leaderboardData,
    borrowdepositsError,
    cdsdepositsError,
    totalBorrowCount,
    totalDepositedCount,
    currentPage,
    handleNextPage,
    handlePrevPage,
    pageSize,
    pagedLeaderboardData,
    setPageSize,
    totalPages,
    isLeaderboardPending,
  } = useGetLeaderboard();

  const { points, referralPoints } = useGetUserPoint();

  return (
    <div className="flex flex-col sm:px-4">
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
            value={
              points == undefined ? 0 : points[1] + Number(referralPoints ?? 0)
            }
          />
        </div>
      </div>
      <LeaderboardTable
        leaderboardData={pagedLeaderboardData}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isLeaderboardPending={isLeaderboardPending}
      />
    </div>
  );
}

export default Leaderboard;
