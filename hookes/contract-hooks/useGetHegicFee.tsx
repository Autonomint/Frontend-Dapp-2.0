// import { hegicEth } from "@/blockchain/abis/hegicEth";
// import {
//   abondAddress,
//   hegicETHAddress,
//   testusdtAbiAddress,
//   usDaAddress,
// } from "@/blockchain/contracts";
// import React from "react";
// import { useBalance, useAccount, useChainId, useReadContract } from "wagmi";

// const useGetHegicFees = (token: "USDa" | "TUSDT" | "ABOND") => {
//   const chainId = useChainId();
//   const { address } = useAccount();

//   const {
//     isPending: isUsdValuePending,
//     data: quoteValue,
//     error: quoteError,
//   } = useReadContract({
//     abi: hegicEth,
//     address: hegicETHAddress,
//     functionName: "fee",
//     query: { enabled: !!address },
//     args: [1, options, false],
//   });
// };
// export default useGetHegicFees;
