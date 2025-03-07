import {
  abondAddress,
  testusdtAbiAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import React from "react";
import { useBalance, useAccount, useChainId } from "wagmi";

const useGetBalance = (token: "USDa" | "USDT" | "ABOND"): string => {
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
        : undefined,
  });
  return `${data?.formatted.slice(0, 8)} ${token}`;
};
export default useGetBalance;
