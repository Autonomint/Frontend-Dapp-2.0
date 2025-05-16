import {
  borrowingContractAddress,
  cdsAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { ethers } from "ethers";
import { NetworkId } from "@/utils/constants";
import { useEffect, useState, useMemo } from "react";
import { Abi, formatUnits } from "viem";

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
      ? "https://opt-mainnet.g.alchemy.com/v2/WfZVOiAVMU-JQu__2JHJs_R8HjIsBcKE"
      : "https://base-mainnet.g.alchemy.com/v2/WfZVOiAVMU-JQu__2JHJs_R8HjIsBcKE"
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

const useGetTVLBothChain = (tokenAddressArr: `0x${string}`[]) => {
  const { address, chainId } = useAccount();
  const [otherChainTvl, setOtherChainTvl] = useState<number[]>([]);

  const { isPending: isTVLPending, data: tvlValue } = useReadContracts({
    contracts: tokenAddressArr.map((address) => ({
      abi: cdsAbi as Abi,
      address: cdsAddress[chainId as keyof typeof borrowingContractAddress],
      functionName: "tokenDepositedTillNow",
      args: [address],
    })),
    query: {
      select: (data: any) => {
        return data.map((item: any) => item.result);
      },
    },
  });

  const provider = new ethers.JsonRpcProvider(
    chainId === NetworkId.BaseSepolia
      ? "https://opt-sepolia.g.alchemy.com/v2/WfZVOiAVMU-JQu__2JHJs_R8HjIsBcKE"
      : "https://base-sepolia.g.alchemy.com/v2/WfZVOiAVMU-JQu__2JHJs_R8HjIsBcKE"
  );

  const cdsContract = new ethers.Contract(
    cdsAddress[
      chainId === NetworkId.BaseSepolia
        ? NetworkId.Optimism
        : (NetworkId.BaseSepolia as keyof typeof cdsAddress)
    ],
    cdsAbi,
    provider
  );

  useEffect(() => {
    getOtherChainData();
  }, [tokenAddressArr, chainId, address]);

  const getOtherChainData = async () => {
    const otherChainAddress1 = await cdsContract.supportedTokenAddresses(0);
    const otherChainAddress2 = await cdsContract.supportedTokenAddresses(1);
    const otherChainAddress3 = await cdsContract.supportedTokenAddresses(2);
    const tvls = [];
    for (const tokenAddress of [
      otherChainAddress1,
      otherChainAddress2,
      otherChainAddress3,
    ]) {
      const tvl = await cdsContract.tokenDepositedTillNow(tokenAddress);
      console.log(tvl, tokenAddress, "tvlOtherChainLool");
      tvls.push(tvl);
    }
    setOtherChainTvl(tvls);
  };

  const totalTVLList = useMemo(() => {
    return tvlValue?.map(
      (item: any, index: number) =>
        Number(item) + Number(otherChainTvl[index] || 0)
    );
  }, [tvlValue, otherChainTvl]);

  console.log({ totalTVLList, tvlValue, otherChainTvl }, "usd11");

  return {
    isTVLPending,
    totalTVLList: totalTVLList,
  };
};

export default useGetTVLUSDA;

export { useGetTVLBothChain };
