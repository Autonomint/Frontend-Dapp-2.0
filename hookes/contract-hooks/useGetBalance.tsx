import {
  abondAddress,
  nativeTokenAddress,
  testusdtAbiAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import React from "react";
import { useBalance, useAccount, useChainId } from "wagmi";

const useGetBalance = (
  token: "USDa" | "USDT" | "ABOND" | "AERO" | "OP"
): { balanceString: string; balance: number } => {
  const chainId = useChainId();
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
    token:
      token == "USDa"
        ? usDaAddress[chainId as keyof typeof usDaAddress]
        : token == "USDT"
        ? testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
        : token == "ABOND"
        ? abondAddress[chainId as keyof typeof abondAddress]
        : token == "AERO"
        ? nativeTokenAddress[chainId as keyof typeof nativeTokenAddress]
        : token == "OP"
        ? nativeTokenAddress[chainId as keyof typeof nativeTokenAddress]
        : abondAddress[chainId as keyof typeof abondAddress],
  });


  return {
    balanceString: `$${data?.formatted.slice(0, 8) || 0} `,
    balance: Number(data?.formatted.slice(0, 8) || 0),
  };
};
export default useGetBalance;
