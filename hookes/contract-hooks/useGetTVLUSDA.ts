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

/**
 * @description This hook is used to get the TVL of the multiple tokens at once on both chains
 * @param tokenAddressArr array of token addresses
 * @returns {isTVLPending: boolean, totalTVLList: number[]}
 */
const useGetTVLBothChain = (tokenAddressArr: `0x${string}`[]) => {
  const { chainId } = useAccount();
  const [otherChainTvl, setOtherChainTvl] = useState<number[]>([]);

  const [otherChainDataLoading, setOtherChainDataLoading] = useState(false);
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
  }, [tokenAddressArr, chainId]);

  // fetching the tvl of the tokens on the other chain
  const getOtherChainData = async () => {
    setOtherChainDataLoading(true);
    // fetching the list of the token addresses on the other chain
    const otherChainAddressList =
      (await cdsContract.getSupportedTokenAddresses()) || [];
    const tvls = [];
    // fetching the tvl of the tokens on the other chain
    // removing OP address by slicing because its values already from both chain
    for (const tokenAddress of otherChainAddressList.slice(
      0,
      otherChainAddressList.length - 1
    )) {
      const tvl = await cdsContract.getTokenDepositedTillNow(tokenAddress);
      tvls.push(tvl);
    }

    setOtherChainTvl(tvls);
    setOtherChainDataLoading(false);
  };

  // calculating the total tvl of the tokens on both chains
  const totalTVLList = useMemo(() => {
    return tvlValue?.map(
      (item: any, index: number) =>
        Number(item) + Number(otherChainTvl[index] || 0)
    );
  }, [tvlValue, otherChainTvl]);



  return {
    isTVLPending: isTVLPending || otherChainDataLoading,
    totalTVLList: totalTVLList,
  };
};

export default useGetTVLUSDA;

export { useGetTVLBothChain };
