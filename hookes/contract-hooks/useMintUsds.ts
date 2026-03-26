import { borrowCoreAddress, borrowDepositCoreAddress, borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useWriteContract } from "wagmi";
import { AssetName, NetworkId } from "@/utils/constants";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";

interface BorrowInputs {
  depositingAmount: bigint; // uint256 can be represented by bigint
  value: bigint | undefined; // uint256 can be represented by bigint
  assetName: AssetName;
  hedgeDuration: bigint
  ethPrice: bigint | undefined
  verifyParams: Record<any, any>
}

const useDepositTokens = (mutation: any) => {
  const { chainId, address } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const {
    isPending: isDepositsLoading,
    data: depositDatahash, // Data received from the `useBorrowingContractDepositTokens` hook
    writeContract, // Function to initiate a write operation
    reset, // Function to reset the state of the hook
    isError: depositError, // Error state
    error: depositErrorData
  } = useWriteContract({
    mutation: {
      ...mutation,
    },
  });


  const mintUSDa = async ({
    depositingAmount,
    value,
    assetName,
    hedgeDuration,
    ethPrice,
    verifyParams
  }: BorrowInputs) => {
    const contractAddress = assetName === 12 || assetName === 13 || assetName === 14 ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress] : borrowingContractAddress[chainId as keyof typeof borrowingContractAddress]
    const abi = assetName === 12 || assetName === 13 || assetName === 14 || (assetName === 1 && chainId === NetworkId.Hyperliquid) ? borowCoreABI : borrowingContractAbi

    writeContract?.({
      abi: abi,
      address: contractAddress as `0x${string}`,
      functionName: "depositTokens",

      args: [
        {
          user: address as `0x${string}`,
          assetName,
          depositingAmount,
          hedgeValidity: hedgeDuration,
          verifyParams: {
            volatility: verifyParams?.volatility,
            ethPrice: verifyParams?.ethPrice,
            expiredETHAmount: verifyParams?.expiredETHAmount,
            plFromExpired: verifyParams?.plFromExpired,
            premiumCv: verifyParams?.premiumCv,
            hedgeCv: verifyParams?.hedgeCv,
            optionFees: verifyParams?.optionFees,
            odosAssembledData: verifyParams?.odosAssembledData,
            signature: verifyParams?.signature,
            deadline: verifyParams?.deadline,
          }
        },
      ],
      value,
    });
  };

  return {
    isDepositsLoading,
    depositDatahash,
    mintUSDa,
    reset,
    depositError,
  };
};

export default useDepositTokens;
