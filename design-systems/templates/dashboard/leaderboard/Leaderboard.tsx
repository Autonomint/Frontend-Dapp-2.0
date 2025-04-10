"use client";
import LeaderboardTable from "@/design-systems/organisms/dashboard/leaderboard/leaderboard-table";
import PortfolioMetrics from "@/design-systems/organisms/dashboard/leaderboard/portfolio-metrics";
import useGetLeaderboard from "@/hookes/api-hooks/useGetLeaderboard";
import useGetUserPoint from "@/hookes/api-hooks/useGetUserPoint";
import useGetOmniChainData from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import { formatNumber } from "@/utils/helpers";
import { formatEther } from "viem";

function Leaderboard() {
  // Fetch the total volume of borrowers amount in USD
  const { omniChainData } = useGetOmniChainData();

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

  const { points, referralPoints, totalPoints } = useGetUserPoint();

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
              omniChainData
                ? Number(omniChainData?.totalCdsDepositedAmount ?? 0n) /
                    10 ** 6 +
                    Number(
                      formatEther(
                        (omniChainData?.totalVolumeOfBorrowersAmountinUSD ??
                          0n) / BigInt(10 ** 20)
                      )
                    )
                : 0
            )}`}
          />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics
            subHeading="Total Distributed Points"
            value={totalPoints + Number(referralPoints || 0).toString()}
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
