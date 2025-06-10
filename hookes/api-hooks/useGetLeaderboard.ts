import { LeaderboardDetails } from "@/utils/interface";
import { BACKEND_API_URL } from "@/utils/urls";
import { it } from "node:test";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "wagmi/query";

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
/**
 * React hook to retrieve and manage leaderboard data for borrow and cds deposits.
 *
 * @returns Object containing leaderboard data, pagination state, and functions to navigate through the leaderboard.
 */
const useGetLeaderboard = () => {
  const { chainId } = useAccount();

  // State for pagination
  const [pageSize, setPageSize] = useState<number>(15); // Default page size
  const [currentPage, setCurrentPage] = useState<number>(1); // Default to first page
  const [pagedLeaderboardData, setPagedLeaderboardData] = useState<
    LeaderboardDetails[]
  >([]);
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages

  // Fetch and store borrow deposits using react-query
  const {
    data: borrowdeposits,
    error: borrowdepositsError,
    isPending: borrowdepositsPending,
  } = useQuery({
    queryKey: ["borrowDeposits", chainId],
    queryFn: () => getBorrowLeaderboard(),
  });

  // Fetch and store cds deposits using react-query
  const {
    data: cdsdeposits,
    error: cdsdepositsError,
    isPending: cdsdepositsPending,
  } = useQuery({
    queryKey: ["Cdsdeposits", chainId],
    queryFn: () => getCdsLeaderboard(),
    select: (data: any) => {
      return data || [];
    },
  });

  console.log(cdsdeposits, "cdsdeposits");

  const isLeaderboardPending = borrowdepositsPending || cdsdepositsPending;

  // Sorting function for the leaderboard details
  function sortLeaderboardDetails(
    items: LeaderboardDetails[]
  ): LeaderboardDetails[] {
    return items
      .map((item) => ({
        ...item,
        sortByValue: item.totalDepositedAmount || item.totalAmint || 0,
      }))
      .sort((a, b) => {
        // First, compare by totalDepositedAmount or totalAmint
        if (Number(a?.sortByValue) > Number(b?.sortByValue)) {
          return -1;
        } else if (Number(a?.sortByValue) < Number(b?.sortByValue)) {
          return 1;
        }
        // If both are equal, maintain the original order
        return 0;
      });
  }

  function mergeLeaderboardDetails(
    leaderboard: LeaderboardDetails[]
  ): LeaderboardDetails[] {
    const mergedData: { [address: string]: LeaderboardDetails } = {};

    leaderboard.forEach((entry) => {
      const existingEntry = mergedData[entry.address];

      if (existingEntry) {
        // Merge logic for summing numeric fields and handling string conversion
        mergedData[entry.address] = {
          ...existingEntry,
          rank: entry.rank, // Update with the latest rank or customize logic
          totalDepositedAmount: (
            (parseFloat(existingEntry.totalDepositedAmount || "0") || 0) +
            (parseFloat(entry.totalDepositedAmount || "0") || 0)
          ).toString(),
          cdsdeposit: (existingEntry.cdsdeposit || 0) + (entry.cdsdeposit || 0),
          totalAmint: (
            (parseFloat(existingEntry.totalAmint || "0") || 0) +
            (parseFloat(entry.totalAmint || "0") || 0)
          ).toString(),
          totalUSDa: (
            (parseFloat(existingEntry.totalUSDa || "0") || 0) +
            (parseFloat(entry.totalUSDa || "0") || 0)
          ).toString(),
          points: (
            Number(entry.points) + Number(existingEntry.points)
          ).toString(),

          totalLTV: (existingEntry.totalLTV || 0) + (entry.totalLTV || 0),
          yield: existingEntry.yield + entry.yield, // Summing yields
          chainId: entry.chainId, // Assuming latest chainId
        };
      } else {
        // If not a duplicate, simply add the entry
        mergedData[entry.address] = { ...entry };
      }
    });

    // Return the merged leaderboard details as an array
    return Object.values(mergedData);
  }
  const leaderboardData = useMemo(() => {
    return mergeLeaderboardDetails(
      sortLeaderboardDetails([
        // adding new property points for combine point of cds and borrow
        ...((borrowdeposits || []) as LeaderboardDetails[]).map((item) => ({
          ...item,
          points: item.points || "0",
        })),
        ...((cdsdeposits || []) as LeaderboardDetails[]),
      ])
    );
  }, [borrowdeposits, cdsdeposits, borrowdepositsError, cdsdepositsError]);

  // Calculate the current page data and total pages
  const updatePagedData = () => {
    if (leaderboardData) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setPagedLeaderboardData(leaderboardData.slice(startIndex, endIndex));

      // Calculate total pages based on pageSize and leaderboardData length
      setTotalPages(Math.ceil(leaderboardData.length / pageSize));
    }
  };

  // Update the paged data and total pages whenever leaderboardData, pageSize, or currentPage changes
  useEffect(() => {
    updatePagedData();
  }, [leaderboardData, pageSize, currentPage]);

  // Function to go to the next page
  const handleNextPage = () => {
    if (leaderboardData && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Function to go to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const totalBorrowCount = useMemo(() => {
    return (
      (leaderboardData as LeaderboardDetails[])?.filter(
        (entry) => Number(entry.totalUSDa || 0) > 0
      ).length || 0
    );
  }, [leaderboardData]);

  const totalDepositedCount = useMemo(() => {
    return (
      (leaderboardData as LeaderboardDetails[])?.filter(
        (entry) => Number(entry.totalDepositedAmount || 0) > 0
      ).length || 0
    );
  }, [leaderboardData]);

  return {
    leaderboardData: leaderboardData as LeaderboardDetails[], // Complete list of positions
    pagedLeaderboardData, // Current page's data
    borrowdepositsError, // Error in fetching borrow deposits
    cdsdepositsError, // Error in fetching cds deposits
    totalBorrowCount, // Total count of borrow deposits
    totalDepositedCount, // Total count of cds deposits
    currentPage, // Current page number
    pageSize, // Page size
    setPageSize, // Function to change page size
    totalPages, // Total number of pages
    handleNextPage, // Function to go to next page
    handlePrevPage, // Function to go to previous page
    isLeaderboardPending,
  };
};

export default useGetLeaderboard;
