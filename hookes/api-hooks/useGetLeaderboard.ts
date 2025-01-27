import { BACKEND_API_URL } from "@/utils/urls";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "wagmi/query";

export interface LeaderboardDetails {
  rank: string;
  address: string;
  totalDepositedAmount?: string;
  cdsdeposit?: number;
  totalAmint?: string;
  points: string;
  totalLTV?: number;
  yield: number;
  chainId: number;
}
// Fetch the total number of borrowers
async function getBorrowLeaderboard(): Promise<LeaderboardDetails[]> {
  const response = await fetch(`${BACKEND_API_URL}/borrows/leaderboard`);
  return await response.json();
}
// Fetch the total number of cds depositors
async function getCdsLeaderboard(): Promise<LeaderboardDetails[]> {
  const response = await fetch(`${BACKEND_API_URL}/cds/cds/leaderboard`);
  return await response.json();
}
const useGetLeaderboard = () => {
  const { chainId } = useAccount();

  //   Fetch and store deposits using react-query
  const { data: borrowdeposits, error: borrowdepositsError } = useQuery({
    queryKey: ["borrowDeposits", chainId],
    queryFn: () => getBorrowLeaderboard(),
  });

  //   Fetch and store cds deposits using react-query
  const { data: cdsdeposits, error: cdsdepositsError } = useQuery({
    queryKey: ["Cdsdeposits", chainId],
    queryFn: () => getCdsLeaderboard(),
  });

  function sortLeaderboardDetails(
    items: LeaderboardDetails[]
  ): LeaderboardDetails[] {
    return items.sort((a, b) => {
      // Convert totalDepositedAmount and totalAmint to numbers for comparison
      const aTotalDeposited = parseFloat(a.totalDepositedAmount || "0");
      const bTotalDeposited = parseFloat(b.totalDepositedAmount || "0");
      const aTotalAmint = parseFloat(a.totalAmint || "0");
      const bTotalAmint = parseFloat(b.totalAmint || "0");

      // First, compare by totalDepositedAmount
      if (aTotalDeposited > bTotalDeposited) return -1;
      if (aTotalDeposited < bTotalDeposited) return 1;

      // If totalDepositedAmount is equal, compare by totalAmint
      if (aTotalAmint > bTotalAmint) return -1;
      if (aTotalAmint < bTotalAmint) return 1;

      // If both are equal, maintain the original order
      return 0;
    });
  }

  const totalBorrowCount = useMemo(() => {
    return (borrowdeposits as LeaderboardDetails[])?.length || 0;
  }, [borrowdeposits]);

  const totalDepositedCount = useMemo(() => {
    return (cdsdeposits as LeaderboardDetails[])?.length || 0;
  }, [cdsdeposits]);

  const leaderboardData = useMemo(() => {
    return sortLeaderboardDetails([
      ...((borrowdeposits || []) as LeaderboardDetails[]),
      ...((cdsdeposits || []) as LeaderboardDetails[]),
    ]);
  }, [borrowdeposits, cdsdeposits, borrowdepositsError, cdsdepositsError]);

  return {
    leaderboardData,
    borrowdepositsError,
    cdsdepositsError,
    totalBorrowCount,
    totalDepositedCount,
  };
};
export default useGetLeaderboard;
