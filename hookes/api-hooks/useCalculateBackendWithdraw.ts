import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type calculateData = {
  address: `0x${string}` | undefined;
  index: number;
  chainId: number;
  ethPrice: string;
};
async function calculateWithdrawAmount(data: calculateData) {
  let bodyValue = JSON.stringify({
    ...data,
  });
  const response = await fetch(
    `${BACKEND_API_URL}/cds/calculateWithdrawAmount`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: bodyValue,
    }
  );
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}

/**
 * React hook to calculate the withdraw amount for a CDS position .
 *
 * @returns Object containing the calculateBackendWithdraw function and the withdrawdata.
 */
const useCalculateWithdrawAmount = () => {
  const queryClient = useQueryClient();

  const { mutate: calculateBackendWithdraw, data: withdrawdata } = useMutation({
    // Specify the mutation function
    mutationFn: calculateWithdrawAmount,
    // Handle any errors that occur during the mutation
    onError(error) {
      queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
    },
    // Perform actions after the mutation is completed or rejected
    onSettled() {
      // Invalidate the query for `dCDSdepositorsData`
      queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });

      // Invalidate the queries for `dCDSdeposits`
      queryClient.invalidateQueries({ queryKey: ["dCDSdeposits"] });
    },
  });

  return {
    calculateBackendWithdraw,
    withdrawdata,
  };
};

export default useCalculateWithdrawAmount;
