import { stockBorrowDepositAddress, stockBorrowingAddress } from "@/blockchain/contracts";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";
import { useAccount, useWriteContract } from "wagmi";
import { StockAssetName } from "@/utils/constants";
import { borrowStockOptionsABI } from "@/blockchain/abis/stock/borrow";

interface StockEIP712VerifyParams {
  ethPrice: bigint;
  strikePrice: bigint;
  optionFees: bigint;
  deadline: bigint;
  signature: `0x${string}`;
}

interface StockBorrowDepositParams {
  user: `0x${string}`;
  assetName: StockAssetName;
  depositingAmount: bigint;
  hedgeValidity: bigint;
  verifyParams: StockEIP712VerifyParams;
}

const useStockDepositTokens = (mutation?: Record<string, any>) => {
  const { chainId, address } = useAccount();

  const {
    data: stockDepositHash,
    isError: stockDepositError,
    isPending: stockDepositIsPending,
    writeContract: writeStockDeposit,
    reset: resetStockDeposit,
    error: stockDepositErrorData,
  } = useWriteContract({
    mutation: mutation || {},
  });

  const handleStockDepositTokens = async (
    depositParam: StockBorrowDepositParams,
    value?: bigint,
  ) => {
    const contractAddress =
      stockBorrowingAddress[chainId as keyof typeof stockBorrowDepositAddress];

    writeStockDeposit({
      abi: borrowStockOptionsABI,
      address: contractAddress as `0x${string}`,
      functionName: "depositTokens",
      args: [depositParam],
      value,
    });
  };

  return {
    stockDepositHash,
    stockDepositError,
    stockDepositIsPending,
    stockDepositErrorData,
    handleStockDepositTokens,
    resetStockDeposit,
  };
};

export default useStockDepositTokens;