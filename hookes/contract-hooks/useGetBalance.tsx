import {
  abondAddress,
  nativeTokenAddress,
  testusdtAbiAddress,
  usDaAddress,
  usdcAddress,
} from "@/blockchain/contracts";
import React from "react";
import { useBalance, useAccount, useChainId } from "wagmi";

/**
 * Custom hook to fetch and format token balances for a connected wallet
 *
 * @param {"USDa" | "USDT" | "ABOND" | "AERO" | "OP"} token - The token symbol to fetch balance for
 * @returns {Object} An object containing the formatted and unformatted balance values
 * @property {string} balanceString - Formatted balance string with currency symbol (e.g., "$100.50")
 * @property {number} balance - Numeric balance value (formatted to 8 decimal places)
 * @property {number} balanceUnformatted - Raw balance value in the token's smallest unit (wei/satoshi)
 *
 * @example
 * // Basic usage
 * const { balanceString, balance, balanceUnformatted } = useGetBalance('USDa');
 *
 * @example
 * // Displaying balance in a component
 * function WalletBalance() {
 *   const { balanceString } = useGetBalance('AERO');
 *   return <div>Your balance: {balanceString}</div>;
 * }
 */
const useGetBalance = (
  token: "USDa" | "USDT" | "ABOND" | "AERO" | "OP" | "USDC",
): { balanceString: string; balance: number; balanceUnformatted: number } => {
  // Get current chain ID and connected wallet address
  const chainId = useChainId();
  const { address } = useAccount();

  // Fetch token balance using wagmi's useBalance hook
  const { data } = useBalance({
    address: address,
    // Resolve token address based on token symbol and current chain
    token:
      token === "USDa"
        ? usDaAddress[chainId as keyof typeof usDaAddress]
        : token === "USDT"
          ? testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
          : token === "ABOND"
            ? abondAddress[chainId as keyof typeof abondAddress]
            : token === "AERO" || token === "OP" // Both AERO and OP use native token address
              ? nativeTokenAddress[chainId as keyof typeof nativeTokenAddress]
              : token === "USDC"
                ? usdcAddress[chainId as keyof typeof usdcAddress]
                : testusdtAbiAddress[
                    chainId as keyof typeof testusdtAbiAddress
                  ], // Default to USDT if no match
  });

  // Format and return the balance in different formats
  return {
    // Format as currency string with $ prefix, limited to 8 decimal places
    balanceString: `$${data?.formatted.slice(0, 8) || 0} `,
    // Convert to number with 8 decimal places precision
    balance: Number(data?.formatted || 0),
    // Return raw balance value in wei/smallest unit
    balanceUnformatted: Number(data?.value || 0),
  };
};

export default useGetBalance;
