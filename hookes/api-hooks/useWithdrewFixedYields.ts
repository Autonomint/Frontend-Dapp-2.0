// get withdrew fixed yields from CDS contract and store it in withdrewFixedYields

import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
/**
 * Retrieves the withdrew fixed yields from the CDS API for a given address.
 *
 * @param {`0x${string}` | undefined} address - The address to retrieve the withdrew fixed yields for.
 * @return {Promise} A promise that resolves to the JSON response from the API.
 */

async function getWithdrewFixedYields(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number,
  token: string
): Promise<any> {
  return fetch(`${BACKEND_API_URL}/cds/withdrewFixedYields`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      chainId: chainId,
      index: index,
      collateralType: token,
    }),
  }).then((response) => response.json());
}

/**
 * React hook to retrieve and manage withdrew fixed yields from CDS contract.
 *
 * @param index - The index of the CDS position.
 * @returns Object containing withdrew fixed yields and loading/error state.
 */

// get withdrew fixed yields from CDS contract and store it in withdrewFixedYields
const useWithdrewFixedYields = (index: number, token: string) => {
  const { address, chainId } = useAccount();
  const { data: withdrewFixedYields, isLoading: isLoadingWithdrewFixedYields } = useQuery({
    queryKey: ["withdrewFixedYields", index],
    queryFn: () =>
      getWithdrewFixedYields(address ? address : undefined, chainId as number, index, token),
    enabled: !!address && !!chainId && !!index,
  });
  return {
    withdrewFixedYields,
    isLoadingWithdrewFixedYields,
  };
};

export default useWithdrewFixedYields;
