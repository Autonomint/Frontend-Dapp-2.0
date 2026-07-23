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
  hedgeValidity: bigint;
}

export type StockGetDepositBorrowDto = {
  address: string;
  chainId: number;
  index: number;
  collateralType?: string;
  strikePrice?: number;
  expiry?: string;
  optionType?: string;
};

async function signedDataForStockDeposit(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number,
  collateralType: string,
  strikePrice: number,
  expiry: string,
  optionType: string
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
      expiry: expiry,
      optionType: optionType,
    }),
  }).then((response) => response.json());
}

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
      expiry: string;
      optionType: string;
    }) =>
      signedDataForStockDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0,
        variables.collateralType,
        variables.strikePrice,
        variables.expiry,
        variables.optionType,
      ),
  });

  return {
    stockSignedData,
    isPendingStockSignedData,
    refetchStockSignedData,
  };
};

export default useGetStockSignedData;