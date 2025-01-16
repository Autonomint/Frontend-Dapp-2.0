import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

/**
 * Retrieves the total index from the CDS API for a given address.
 *
 * @param {`0x${string}` | undefined} address - The address to retrieve the total index for.
 * @return {Promise} A promise that resolves to the JSON response from the API.
 */

async function getInterestGained(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number
): Promise<any> {
  return fetch(`${BACKEND_API_URL}/borrows/interestGained`, {
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

// get total index from CDS contract and store it in totalCDSIndex
const useInterestGain = (index: number) => {
  const { address, chainId } = useAccount();
  const { data: interestGained, isPending: isInterestGainedPending } = useQuery(
    {
      queryKey: ["interestGained"],
      queryFn: () =>
        getInterestGained(
          address ? address : undefined,
          chainId as number,
          index
        ),
    }
  );

  return {
    interestGained,
    isInterestGainedPending,
  };
};

export default useInterestGain;
