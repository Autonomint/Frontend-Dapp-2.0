import { globalAbi } from "@/blockchain/abis/global";
import { globalAddress } from "@/utils/constants";
import { useAccount, useReadContract } from "wagmi";

// // get usdt amount deposited till now from CDS contract and store it in usdtAmountDepositedTillNow and setting default value to 0n
// const { data: globalData } = useReadGlobalGetOmniChainData({
//   query: { staleTime: 10 * 1000 },
//   scopeKey: "GlobalContractData",
// });
// console.log(globalData);
// /**
//  * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"getOmniChainData"`
//  *
//  * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
//  * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
//  */
// export const useReadGlobalGetOmniChainData =
//   /*#__PURE__*/ createUseReadContract({
//     abi: globalAbi,
//     address: globalAddress,
//     functionName: "getOmniChainData",
//   });

const useGetGlobalContractData = () => {
  const { address, chainId } = useAccount();
  const {
    data: GlobalContractData,
    isPending: isGlobalContractDataPending,
    error: GlobalContractDataError,
  } = useReadContract({
    abi: globalAbi,
    address: globalAddress[chainId as keyof typeof globalAddress],
    functionName: "getOmniChainData",
    query: { staleTime: 10 * 1000 },
    scopeKey: "GlobalContractData",
  });

  return {
    GlobalContractData,
    isGlobalContractDataPending,
    GlobalContractDataError,
  };
};

export default useGetGlobalContractData;
