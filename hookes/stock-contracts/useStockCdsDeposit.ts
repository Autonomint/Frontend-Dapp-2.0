import { stockCdsAddress } from "@/blockchain/contracts";
import { cdsStockOptionsABI } from "@/blockchain/abis/stock/cds";
import { useAccount, useWriteContract } from "wagmi";
import { StockAssetName } from "@/utils/constants";

interface StockCdsEIP712VerifyParams {
  excessProfitCumulativeValue: bigint;
  ethPrice: bigint;
  odosAssembledData: `0x${string}`;
  deadline: bigint;
  signature: `0x${string}`;
}

interface StockCdsDepositUserParams {
  user: `0x${string}`;
  tokenAddresses: `0x${string}`[];
  tokenAmounts: bigint[];
  lockingPeriod: bigint;
  assetName: StockAssetName;
  verifyParams: StockCdsEIP712VerifyParams;
}

const useStockCdsDeposit = (mutation?: Record<string, any>) => {
  const { chainId, address } = useAccount();

  const {
    data: stockCdsDepositHash,
    isError: stockCdsDepositError,
    isPending: stockCdsDepositIsPending,
    writeContract: writeStockCdsDeposit,
    reset: resetStockCdsDeposit,
    error: stockCdsDepositErrorData,
  } = useWriteContract({
    mutation: mutation || {},
  });

  const handleStockCdsDeposit = async (
    params: StockCdsDepositUserParams,
    value?: bigint,
  ) => {
    const contractAddress =
      stockCdsAddress[chainId as keyof typeof stockCdsAddress];

    writeStockCdsDeposit({
      abi: cdsStockOptionsABI,
      address: contractAddress as `0x${string}`,
      functionName: "deposit",
      args: [params],
      value,
    });
  };

  return {
    stockCdsDepositHash,
    stockCdsDepositError,
    stockCdsDepositIsPending,
    stockCdsDepositErrorData,
    handleStockCdsDeposit,
    resetStockCdsDeposit,
  };
};

export default useStockCdsDeposit;