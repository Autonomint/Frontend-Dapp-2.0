import {
  borrowingContractAddress,
  cdsAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { ethers } from "ethers";
import { NetworkId } from "@/utils/constants";
import { useEffect, useState } from "react";

const useGetTVLUSDA = (tokenAddress: `0x${string}`) => {
  const { address, chainId } = useAccount();
  const [otherChainUDSa, setOtherChainUSDa] = useState(0);

  const { isPending: isTVLPending, data: tvlValue } = useReadContract({
    abi: cdsAbi,
    address: cdsAddress[chainId as keyof typeof borrowingContractAddress],
    functionName: "tokenDepositedTillNow",
    args: [tokenAddress],
  });

  const provider = new ethers.JsonRpcProvider(
    chainId === NetworkId.BaseSepolia
      ? "https://optimism-sepolia.infura.io/v3/e9cf275f1ddc4b81aa62c5aa0b11ac0f"
      : "sepolia.base.org/"
  );

  const cdsContract = new ethers.Contract(
    cdsAddress[
      chainId === NetworkId.BaseSepolia
        ? (NetworkId.Optimism as keyof typeof cdsAddress)
        : (NetworkId.BaseSepolia as keyof typeof cdsAddress)
    ],
    cdsAbi,
    provider
  );

  useEffect(() => {
    getOtherChainData();
  }, [tokenAddress, chainId, address]);

  const getOtherChainData = async () => {
    setOtherChainUSDa(0);
    const usdaTvl2 = await cdsContract.tokenDepositedTillNow(
      chainId === NetworkId.BaseSepolia
        ? usDaAddress[NetworkId.Optimism as keyof typeof usDaAddress]
        : usDaAddress[NetworkId.BaseSepolia as keyof typeof usDaAddress]
    );
    setOtherChainUSDa(usdaTvl2);
  };

  return {
    isTVLPending,
    tvlValue: Number(tvlValue) + Number(otherChainUDSa),
  };
};

export default useGetTVLUSDA;
