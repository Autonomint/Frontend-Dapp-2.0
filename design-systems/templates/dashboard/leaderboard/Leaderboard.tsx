"use client";
import LeaderboardTable from "@/design-systems/organisms/dashboard/leaderboard/leaderboard-table";
import PortfolioMetrics from "@/design-systems/organisms/dashboard/leaderboard/portfolio-metrics";
import useGetLeaderboard from "@/hookes/api-hooks/useGetLeaderboard";
import useGetUserPoint from "@/hookes/api-hooks/useGetUserPoint";
import useGetOmniChainData from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import { formatNumber } from "@/utils/helpers";
import { formatEther, formatUnits } from "viem";

function Leaderboard() {
  // Fetch the total volume of borrowers amount in USD
  const { omniChainData } = useGetOmniChainData();

  // getting leaderboard data
  const {
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

  const { points, totalPoints } = useGetUserPoint();

  return (
    <div className="flex flex-col sm:px-4">
      <div className="grid md:grid-cols-4 grid-cols-2">
        <div className="col-span-1">
          {/* Total number of borrowers */}
          <PortfolioMetrics
            subHeading="Total number of borrowers"
            value={totalBorrowCount.toString() || ""}
          />
        </div>
        <div className="col-span-1">
          {/* Total number of dcds depositors */}
          <PortfolioMetrics
            subHeading="Total number of dCDS depositors"
            value={totalDepositedCount.toString() || ""}
          />
        </div>
        <div className="col-span-1">
          {/* Total Value Locked (TVL) */}
          <PortfolioMetrics
            subHeading="Total Value Locked (TVL)"
            value={`$${formatNumber(
              omniChainData
                ? Number(formatUnits(BigInt(omniChainData?.totalCdsDepositedAmount ?? 0n), 6)) +
                Number(
                  formatUnits(BigInt(omniChainData?.totalVolumeOfBorrowersAmountinUSD ?? 0n), 20)
                )
                : 0
            )}`}
          />
        </div>
        <div className="col-span-1">
          {/* Total Distributed Points */}
          <PortfolioMetrics
            subHeading="Total Distributed Points"
            value={formatNumber(Number(totalPoints || 0))}
          />
        </div>
      </div>
      {/* Leaderboard Table */}
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
