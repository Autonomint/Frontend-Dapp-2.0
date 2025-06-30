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
import { alchemyApiKeys, NetworkId } from "@/utils/constants";
import { useEffect, useState, useMemo } from "react";
import { Abi, formatUnits } from "viem";
import { rpcUrls } from "@/utils/urls";

/**
 * @description This hook is used to get the TVL of the USDA on both chains
 * @param tokenAddress token address
 * @returns {isTVLPending: boolean, tvlValue: number}
 */
const useGetTVLUSDA = (tokenAddress: `0x${string}`) => {
  const { address, chainId } = useAccount();
  const [otherChainUDSa, setOtherChainUSDa] = useState(0);

  const { isPending: isTVLPending, data: tvlValue } = useReadContract({
    abi: cdsAbi,
    address: cdsAddress[chainId as keyof typeof borrowingContractAddress],
    functionName: "getTokenDepositedTillNow",
    args: [tokenAddress],
  });

  const provider = new ethers.JsonRpcProvider(
    `${
      rpcUrls[
        chainId === NetworkId.BaseSepolia
          ? NetworkId.Optimism
          : NetworkId.BaseSepolia
      ]
    }/${alchemyApiKeys}`
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
  }, [tokenAddress, chainId, address]);

  const getOtherChainData = async () => {
    setOtherChainUSDa(0);
    const usdaTvl2 = await cdsContract.tokenDepositedTillNow(
      chainId === NetworkId.BaseSepolia
        ? usDaAddress[NetworkId.Optimism]
        : usDaAddress[NetworkId.BaseSepolia]
    );
    setOtherChainUSDa(usdaTvl2);
  };

  console.log(
    otherChainUDSa,
    tokenAddress,
    chainId === NetworkId.BaseSepolia
      ? usDaAddress[NetworkId.Optimism]
      : usDaAddress[NetworkId.BaseSepolia],
    cdsAddress[
      chainId === NetworkId.BaseSepolia
        ? NetworkId.Optimism
        : (NetworkId.BaseSepolia as keyof typeof cdsAddress)
    ],
    "usdaTvl2"
  );

  return {
    isTVLPending,
    tvlValue: Number(tvlValue) + Number(otherChainUDSa),
  };
};

/**
 * @description This hook is used to get the TVL of the multiple tokens at once on both chains
 * @param tokenAddressArr array of token addresses
 * @returns {isTVLPending: boolean, totalTVLList: number[]}
 */
const useGetTVLBothChain = (tokenAddressArr: `0x${string}`[]) => {
  const { address, chainId } = useAccount();
  const [otherChainTvl, setOtherChainTvl] = useState<number[]>([]);

  // fetching the tvl of the tokens on the current chain
  const { isPending: isTVLPending, data: tvlValue } = useReadContracts({
    contracts: tokenAddressArr.map((address) => ({
      abi: cdsAbi as Abi,
      address: cdsAddress[chainId as keyof typeof borrowingContractAddress],
      functionName: "getTokenDepositedTillNow",
      args: [address],
    })),
    query: {
      select: (data: any) => {
        return data.map((item: any) => item.result);
      },
    },
  });

  // Provider for fetching other chain data
  const provider = new ethers.JsonRpcProvider(
    `${
      rpcUrls[
        chainId === NetworkId.BaseSepolia
          ? NetworkId.Optimism
          : NetworkId.BaseSepolia
      ]
    }/${alchemyApiKeys}`
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

  // fetching the tvl of the tokens on the other chain
  const getOtherChainData = async () => {
    // fetching the list of the token addresses on the other chain
    const otherChainAddressList =
      (await cdsContract.getSupportedTokenAddresses()) || [];
    const tvls = [];
    // fetching the tvl of the tokens on the other chain
    for (const tokenAddress of otherChainAddressList.slice(
      0,
      otherChainAddressList.length - 1
    )) {
      const tvl = await cdsContract.getTokenDepositedTillNow(tokenAddress);
      tvls.push(tvl);
    }
    console.log(tvls, otherChainAddressList, "tvlOtherChainLool");
    setOtherChainTvl(tvls);
  };

  // calculating the total tvl of the tokens on both chains
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
