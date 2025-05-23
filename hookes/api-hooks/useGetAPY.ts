// get total index from CDS contract and store it in totalCDSIndex

import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
/**
 * Retrieves the total index from the CDS API for a given address.
 *
 * @param {`0x${string}` | undefined} address - The address to retrieve the total index for.
 * @return {Promise} A promise that resolves to the JSON response from the API.
 */

async function getAPY(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number
): Promise<any> {
  return fetch(`${BACKEND_API_URL}/cds/getAPY`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      chainId: chainId,
      index: index,
    }),
  }).then((response) => response.json());
}

/**
 * React hook to retrieve and manage APY from CDS contract.
 *
 * @param index - The index of the CDS position.
 * @returns Object containing APY and loading/error state.
 */

// get total index from CDS contract and store it in totalCDSIndex
const useGetAPY = (index: number) => {
  const { address, chainId } = useAccount();
  const { data: apy, isLoading : isLoadingAPY } = useQuery({
    queryKey: ["APY", index],
    queryFn: () =>
      getAPY(address ? address : undefined, chainId as number, index),
    enabled: !!address && !!chainId && !!index,
  });
  return {
    apy,
    isLoadingAPY,
  };
};

export default useGetAPY;
