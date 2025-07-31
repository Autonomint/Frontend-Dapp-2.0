import { PositionData } from "@/utils/interface";
import { BACKEND_API_URL } from "@/utils/urls";
import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { useQuery } from "wagmi/query";

/**
 * Retrieves deposits for a given address.
 * @param {`0x${string}` | undefined} address - The address to retrieve deposits for.
 * @return {Promise} A promise that resolves to the JSON response from the server.
 */
const getDeposits = (
  address: `0x${string}` | undefined,
  chainId: number
): Promise<PositionData[]> => {
  return fetch(`${BACKEND_API_URL}/borrows/${chainId}/${address}`).then(
    (response) =>
      response
        .json()
        .then((data) => data.sort((a: any, b: any) => a.index - b.index))
  );
};

/**
 * @desc get borrowed position list hook backend api
 * with pagination and sorting
 * @returns {positionList: PositionData[], pagedPositionList: PositionData[], positionListError: Error, positionListRefetch: () => void, positionListLoading: boolean, currentPage: number, pageSize: number, setPageSize: (size: number) => void, totalPages: number, handleNextPage: () => void, handlePrevPage: () => void, setCurrentPage: (page: number) => void}
 */
const useGetPositionList = () => {
  // Use the useAccount and useChainId hooks
  const { address } = useAccount();
  const chainId = useChainId();

  // State for pagination
  const [pageSize, setPageSize] = useState<number>(15); // Default page size
  const [currentPage, setCurrentPage] = useState<number>(1); // Default to first page
  const [pagedPositionList, setPagedPositionList] = useState<PositionData[]>(
    []
  );
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages

  // Query to fetch data
  const {
    data: positionList,
    error: positionListError,
    refetch: positionListRefetch,
    isLoading: positionListLoading,
  } = useQuery({
    queryKey: ["deposits", chainId, address],
    queryFn: () => getDeposits(address, chainId),
    select: (data) => data,
    enabled: !!address,
  });

  // Calculate the current page data and total pages
  const updatePagedData = () => {
    if (positionList) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setPagedPositionList(
        [...positionList]
          .sort((a, b) => a.index - b.index)
          .slice(startIndex, endIndex)
      );

      // Calculate total pages based on pageSize and positionList length
      setTotalPages(Math.ceil(positionList.length / pageSize));
    } else {
      setPagedPositionList([]);
    }
  };

  // Update the paged data and total pages whenever the position list, page size, or current page changes
  useEffect(() => {
    updatePagedData();
  }, [positionList, pageSize, currentPage]);

  // Function to go to the next page
  const handleNextPage = () => {
    if (positionList && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Function to go to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (chainId) {
      setCurrentPage(1);
    }
  }, [chainId]);

  return {
    positionList: (positionList || []) as PositionData[], // Complete list of positions
    pagedPositionList, // Current page's data
    positionListError, // Error in fetching
    positionListRefetch, // Function to refetch the data
    positionListLoading, // Loading state
    currentPage, // Current page number
    pageSize, // Page size
    setPageSize, // Function to change page size
    totalPages, // Total number of pages
    handleNextPage, // Function to go to next page
    handlePrevPage, // Function to go to previous page
    setCurrentPage,
  };
};

export default useGetPositionList;
