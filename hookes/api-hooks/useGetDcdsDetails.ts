import { dcdsDepositDetails, DcdsDetailsResponse } from "@/utils/interface";
import { BACKEND_API_URL } from "@/utils/urls";
import { useEffect, useState } from "react";
import { reset } from "viem/actions";
import { useAccount, useChainId } from "wagmi";
import { useQuery } from "wagmi/query";

/**
 * Retrieves deposits for a given address.
 * @param {`0x${string}` | undefined} address - The address to retrieve deposits for.
 * @return {Promise} A promise that resolves to the JSON response from the server.
 */
function getDeposits(
  address: `0x${string}` | undefined,
  chainId: number
): Promise<DcdsDetailsResponse> {
  return fetch(
    `${BACKEND_API_URL}/cds/totalDeposits/${chainId}/${address}`
  ).then((response) => response.json());
}

/**
 * @desc get cds position list hook backend api
 * with pagination and sorting
 * @returns {dcdsPositionList: dcdsDepositDetails[], pagedDcdsPositionList: dcdsDepositDetails[], dcdsPositionListError: Error, dcdsPositionListRefetch: () => void, dcdsPositionListLoading: boolean, currentPage: number, pageSize: number, setPageSize: (size: number) => void, totalPages: number, handleNextPage: () => void, handlePrevPage: () => void, setCurrentPage: (page: number) => void}
 */
const useGetDcdsDepositList = () => {
  // Use the useAccount and useChainId hooks
  const { address } = useAccount();
  const chainId = useChainId();

  // State for pagination
  const [pageSize, setPageSize] = useState<number>(15); // Default page size
  const [currentPage, setCurrentPage] = useState<number>(1); // Default to first page
  const [pagedDcdsPositionList, setPagedDcdsPositionList] = useState<
    dcdsDepositDetails[]
  >([]);
  const [totalPages, setTotalPages] = useState<number>(1); // Total number of pages

  // Query to fetch data
  const {
    data: dcdsPositionList,
    error: dcdsPositionListError,
    refetch: dcdsPositionListRefetch,
    isLoading: dcdsPositionListLoading,
    isError: dcdsPositionListIsError,
  } = useQuery({
    queryKey: ["dcdsDepositsDetails", chainId, address],
    queryFn: () => getDeposits(address ? address : undefined, chainId),
    enabled: !!address,
    select: (data) => data.deposits,
    retry: 1,
  });

  // Calculate the current page data and total pages
  const updatePagedData = () => {
    if (dcdsPositionList) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      setPagedDcdsPositionList(
        [...dcdsPositionList]
          .sort((a, b) => a.index - b.index)
          .slice(startIndex, endIndex)
      );

      // Calculate total pages based on pageSize and positionList length
      setTotalPages(Math.ceil(dcdsPositionList.length / pageSize));
    } else {
      setPagedDcdsPositionList([]);
    }
  };

  // Update the paged data and total pages whenever the position list, page size, or current page changes
  useEffect(() => {
    updatePagedData();
  }, [dcdsPositionList, pageSize, currentPage]);

  // Function to go to the next page
  const handleNextPage = () => {
    if (dcdsPositionList && currentPage < totalPages) {
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
    dcdsPositionList: (dcdsPositionList || []) as dcdsDepositDetails[], // Complete list of positions
    pagedDcdsPositionList, // Current page's data
    dcdsPositionListError, // Error in fetching
    dcdsPositionListRefetch, // Function to refetch the data
    dcdsPositionListLoading, // Loading state
    currentPage, // Current page number
    pageSize, // Page size
    setPageSize, // Function to change page size
    totalPages, // Total number of pages
    handleNextPage, // Function to go to next page
    handlePrevPage, // Function to go to previous page
    setCurrentPage, // Function to set current page
  };
};

export default useGetDcdsDepositList;
