import { LeaderboardDetails } from "@/utils/interface";
import { BACKEND_API_URL } from "@/utils/urls";
import { it } from "node:test";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "wagmi/query";

// Fetch the list
async function getLeaderboardList(): Promise<LeaderboardDetails[]> {
  const response = await fetch(`${BACKEND_API_URL}/points/getLeaderboard`);
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
    data: leaderboardData,
    error: leaderboardListError,
    isPending: leaderboardListPending,
  } = useQuery({
    queryKey: ["leaderboardList", chainId],
    queryFn: () => getLeaderboardList(),
    select: (data: any) => {
      return data || [];
    },
    enabled: !!chainId,
  });

  const leaderboardList = leaderboardData?.leaderboard || [];

  const isLeaderboardPending = leaderboardListPending;

  // Calculate the current page data and total pages
  const updatePagedData = () => {
    if (leaderboardList) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setPagedLeaderboardData(leaderboardList.slice(startIndex, endIndex));

      // Calculate total pages based on pageSize and leaderboardData length
      setTotalPages(Math.ceil(leaderboardList.length / pageSize));
    }
  };

  // Update the paged data and total pages whenever leaderboardData, pageSize, or currentPage changes
  useEffect(() => {
    updatePagedData();
  }, [leaderboardList, pageSize, currentPage]);

  // Function to go to the next page
  const handleNextPage = () => {
    if (leaderboardList && currentPage < totalPages) {
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
    return leaderboardData?.borrowerCount || 0;
  }, [leaderboardList]);

  const totalDepositedCount = useMemo(() => {
    return leaderboardData?.cdsCount || 0;
  }, [leaderboardList]);

  return {
    leaderboardData: leaderboardList as LeaderboardDetails[], // Complete list of positions
    pagedLeaderboardData, // Current page's data
    leaderboardListError, // Error in fetching borrow deposits
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
