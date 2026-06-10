import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import { parseUnits } from "ethers";
import { useAccount } from "wagmi";

export interface StockSignedDataReturn {
  ethPrice: number;
  strikePrice: number;
  optionFees: number;
  expiredUSDAmount: number;
  deadline: number;
  signature: `0x${string}`;
}

export interface StockGetDepositBorrowDto {
  address: string;
  chainId: number;
  index: number;
  collateralType?: string;
  strikePrice?: number;
  optionFees?: string;
}

/**
 * Function to fetch the stock options borrow signed data
 */
async function signedDataForStockDeposit(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number,
  collateralType: string,
  strikePrice: number,
  optionFees: string
): Promise<StockSignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/stock-options/borrows/signedDataForBorrowDeposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      chainId: chainId,
      index: index,
      collateralType: collateralType,
      strikePrice: parseUnits((strikePrice).toString(), 2).toString(),
      optionFees: optionFees,
    }),
  }).then((response) => response.json());
}

/**
 * Custom hook to fetch signed data for stock options deposit
 */
const useGetStockSignedData = (index?: number) => {
  const { address, chainId } = useAccount();

  const {
    data: stockSignedData,
    isPending: isPendingStockSignedData,
    mutateAsync: refetchStockSignedData,
  } = useMutation({
    mutationFn: (variables: {
      collateralType: string;
      strikePrice: number;
      optionFees: string;
    }) =>
      signedDataForStockDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0,
        variables.collateralType,
        variables.strikePrice,
        variables.optionFees,
      ),
  });

  return {
    stockSignedData,
    isPendingStockSignedData,
    refetchStockSignedData,
  };
};

export default useGetStockSignedData;