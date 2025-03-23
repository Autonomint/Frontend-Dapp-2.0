import {
  abondAddress,
  nativeTokenAddress,
  testusdtAbiAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import React from "react";
import { useBalance, useAccount, useChainId } from "wagmi";

const useGetBalance = (
  token: "USDa" | "USDT" | "ABOND" | "MODE" | "OP"
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
        : token == "MODE"
        ? nativeTokenAddress[chainId as keyof typeof nativeTokenAddress]
        : token == "OP"
        ? nativeTokenAddress[chainId as keyof typeof nativeTokenAddress]
        : abondAddress[chainId as keyof typeof abondAddress],
  });

  console.log(data, "rawData");

  return {
    balanceString: `${data?.formatted.slice(0, 8)} ${token}`,
    balance: Number(data?.formatted.slice(0, 8)),
  };
};
export default useGetBalance;
