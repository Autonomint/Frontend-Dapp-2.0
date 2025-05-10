import {
  borrowAssetsAddress,
  borrowingContractAddress,
  ethAddress,
} from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ValueOf, zeroAddress } from "viem";
import { NetworkId } from "@/utils/constants";

/**
 * Custom hook to fetch the eth assets price, exchange rate, and asset price
 * of a given asset from the borrowing smart contract.
 *
 * @param assetAddress - (Optional) The address of the asset to get the USD value for.
 * If not provided, defaults to the ETH address for the connected network.
 *
 * @returns An object containing:
 * - `isUsdValuePending`: boolean indicating if the query is still loading
 * - `usdValue`: the USD equivalent of the asset amount
 * - `assetPrice`: calculated asset price in USD (in human-readable format)
 * - `exchangeRate`: the rate used for conversion
 */
const useGetUsdValue = (assetAddress?: ValueOf<typeof borrowAssetsAddress>) => {
  const { address, chainId } = useAccount(); // Get current user's wallet address and connected chain ID

  // Read data from the `getUSDValue` function of the borrowing smart contract
  const { isPending: isUsdValuePending, data: usdValue } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ], // Get the contract address for the current chain
    functionName: "getUSDValue",
    args: [
      assetAddress
        ? assetAddress[
            (chainId || NetworkId.BaseSepolia) as keyof typeof assetAddress
          ] // Use provided asset address based on current chain
        : ethAddress[
            (chainId || NetworkId.BaseSepolia) as keyof typeof ethAddress
          ], // Default to ETH address if assetAddress is not provided
    ],
    query: { enabled: !!address && !!chainId }, // Only run the query if wallet is connected and chain is available
  });

  console.log(usdValue, "usdValue"); // Debug log for inspecting the returned value

  return {
    isUsdValuePending, // Indicates if the USD value query is still loading
    usdValue: usdValue?.[1] || 0, // Second item is typically the asset amount in smallest units (like wei)
    assetPrice: Math.floor(
      (Number(usdValue?.[0]) * Number(usdValue?.[1])) / 1e18
    ), // Calculate the actual price by multiplying rate with amount and dividing by 1e18 to convert from wei
    exchangeRate: Number(usdValue?.[0]), // First item is typically the exchange rate
  };
};

export default useGetUsdValue;
