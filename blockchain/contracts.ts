import { zeroAddress } from "viem";

type ChainAddresses = {
  [key: number]: `0x${string}`;
};

export const multiSignAddress = {
  8453: "0xD183EE82CcBA62ED8Bff80817D24219E59F20dB6",
  10: "0xD183EE82CcBA62ED8Bff80817D24219E59F20dB6",
} as const;

export const usDaAddress = {
  8453: "0x4e44fB5c61a89CF44a9080AB987335889FCaA6bd",
  1: "0x343f4E70e2489A566d056b12c647382f58857CC5",
  10: "0x4e44fB5c61a89CF44a9080AB987335889FCaA6bd",
  34443: "0x39B54D1631205F7FD2B29454CF73Ee85fA6C5E45",
} as const;

export const borrowingContractAddress = {
  8453: "0x5C6775563C5C9813f55E4C41b7B4c739532C3768",
  10: "0x5C6775563C5C9813f55E4C41b7B4c739532C3768",
} as const;

export const cdsAddress = {
  8453: "0x86efd14eE1590f671f624D38789964542966F7C8",
  10: "0x86efd14eE1590f671f624D38789964542966F7C8",
} as const;

export const testusdtAbiAddress = {
  8453: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
  10: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
} as const;

export const usdcAddress = {
  8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  10: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
} as const;

export const sUSDAddress = {
  10: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
  8453: zeroAddress,
} as const;

export const abondAddress = {
  8453: "0x87Af984DED0ACE6547485cAfd2526ab332454149",
  10: "0x87Af984DED0ACE6547485cAfd2526ab332454149",
} as const;

export const nativeTokenAddress: ChainAddresses = {
  8453: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
  10: "0x4200000000000000000000000000000000000042",
};

export const ethAddress: ChainAddresses = {
  8453: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  10: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
} as const;

export const wrsETHAddress: ChainAddresses = {
  8453: "0xEDfa23602D0EC14714057867A78d01e94176BEA0",
  10: "0x87eEE96D50Fb761AD85B1c982d28A042169d61b1",
} as const;

export const weETHAddress: ChainAddresses = {
  8453: "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A",
  10: "0x5A7fACB970D094B6C7FF1df0eA68D99E6e73CBFF",
} as const;

export const rsETHAddress: ChainAddresses = {
  8453: "0x1Bc71130A0e39942a7658878169764Bbd8A45993",
  10: "0x4186BFC76E2E237523CBC30FD220FE055156b41F",
} as const;

export const borrowAssetsAddress = {
  ETH: ethAddress,
  wrsETH: wrsETHAddress,
  weETH: weETHAddress,
  rsETH: rsETHAddress,
} as const;

export const globalAddress = {
  8453: "0x29400a68568De78c580491EA865300e7f6eE1092",
  10: "0x29400a68568De78c580491EA865300e7f6eE1092",
} as const;

export const mpoAddress = {
  8453: "0x715A3B65335FaB8291b77f5A6afa427c8cF2e015",
  10: "0x715A3B65335FaB8291b77f5A6afa427c8cF2e015",
} as const;
