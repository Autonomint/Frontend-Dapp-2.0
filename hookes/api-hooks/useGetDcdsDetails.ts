import { dcdsDepositDetails, DcdsDetailsResponse } from "@/utils/interface";
import { BACKEND_API_URL } from "@/utils/urls";
import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { useQuery } from "wagmi/query";

/**
 * Retrieves deposits for a given address.
 * @param {`0x${string}` | undefined} address - The address to retrieve deposits for.
 * @return {Promise} A promise that resolves to the JSON response from the server.
 */
function getDeposits(
  address: `0x${string}` | undefined,
  chainId: Number
): Promise<DcdsDetailsResponse> {
  return fetch(`${BACKEND_API_URL}/cds/totalDeposits/${84532}/${address}`).then(
    (response) => response.json()
  );
}
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
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages

  // Query to fetch data
  const {
    data: dcdsPositionList,
    error: dcdsPositionListError,
    refetch: dcdsPositionListRefetch,
    isLoading: dcdsPositionListLoading,
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
      setPagedDcdsPositionList(dcdsPositionList.slice(startIndex, endIndex));

      // Calculate total pages based on pageSize and positionList length
      setTotalPages(Math.ceil(dcdsPositionList.length / pageSize));
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
  };
};

export default useGetDcdsDepositList;
