import { usDaAbi } from "@/blockchain/abis/usda";
import {
  borrowingContractAddress,
  borrowingWithdrawContractAddress,
  borrowWithdrawCoreAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useApproveUsda = (mutation: any) => {
  const {
    isPending: usdaApproveLoading,
    isSuccess: usdaApproveSuccess,
    isError: usdaApproveError,
    writeContractAsync: usdaApproveAsync,
    reset: approveReset,
    data: usdaApproveHash,
  } = useWriteContract({
    mutation,
  });
  const { chainId } = useAccount();

  const approveUsda = async (repayAmount: bigint, token: string) => {

    const contract = token === "cbBTC" || token === "krwq" ? borrowWithdrawCoreAddress[chainId as keyof typeof borrowWithdrawCoreAddress] : borrowingWithdrawContractAddress[chainId as keyof typeof borrowingWithdrawContractAddress]

    usdaApproveAsync({
      abi: usDaAbi,
      address: usDaAddress[chainId as keyof typeof usDaAddress],
      functionName: "approve",
      args: [contract as `0x${string}`, // address of borrowing contract based on chainId
        repayAmount, // Total usda amount
      ],
    });
  };

  /*
   * Approve the USDa token for a specific contract address
   * @param values - The amount of USDa to approve (in wei)
   * @param contractAddress - The address of the contract to approve
   */
  const approveUsdaDynamic = async (
    values: bigint,
    contractAddress: `0x${string}`
  ) => {
    usdaApproveAsync({
      abi: usDaAbi,
      address: usDaAddress[chainId as keyof typeof usDaAddress],
      functionName: "approve",
      args: [
        contractAddress, // address of borrowing contract based on chainId
        values,
      ],
    });
  };
  return {
    usdaApproveLoading,
    usdaApproveSuccess,
    usdaApproveError,
    approveUsda,
    approveReset,
    usdaApproveHash,
    approveUsdaDynamic,
  };
};

export default useApproveUsda;
