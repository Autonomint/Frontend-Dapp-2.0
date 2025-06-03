import { zeroAddress } from "viem";

type ChainAddresses = {
  [key: number]: `0x${string}`;
};

// Addresses for the multi-sign contract
export const multiSignAddress = {
  8453: "0xD183EE82CcBA62ED8Bff80817D24219E59F20dB6",
  10: "0xD183EE82CcBA62ED8Bff80817D24219E59F20dB6",
} as const;

// Addresses for the usDa contract
export const usDaAddress = {
  8453: "0x4e44fB5c61a89CF44a9080AB987335889FCaA6bd",
  1: "0x343f4E70e2489A566d056b12c647382f58857CC5",
  10: "0x4e44fB5c61a89CF44a9080AB987335889FCaA6bd",
  34443: "0x39B54D1631205F7FD2B29454CF73Ee85fA6C5E45",
} as const;

// Addresses for the borrowing contract
export const borrowingContractAddress = {
  8453: "0x5C6775563C5C9813f55E4C41b7B4c739532C3768",
  10: "0x5C6775563C5C9813f55E4C41b7B4c739532C3768",
} as const;

// Addresses for the borrowing deposit contract
export const borrowingDepositContractAddress = {
  84532: "0x79b4c9F408702a904ea70bCA538E591d08E33EF0",
  11155420: "0x0c2A3d2EB1787F05263A9E1E685a5DC0b410E435",
} as const;

// Addresses for the borrowing withdraw contract
export const borrowingWithdrawContractAddress = {
  84532: "0x718BDf21C71ED621bdcc5e33a66e21Bc0D2ebB5b",
  11155420: "0x6Dca68026a1449e15da3C1D007F36F19b8Ea4A79",
} as const;

// Addresses for the cds contract
export const cdsAddress = {
  8453: "0x86efd14eE1590f671f624D38789964542966F7C8",
  10: "0x86efd14eE1590f671f624D38789964542966F7C8",
} as const;

// Addresses for the cds deposit contract
export const cdsDepositAddress = {
  84532: "0x36E4a1590768477A3cfE2Ca78c3D0fd098855701",
  11155420: "0x783487b17e7B80d264421a0d52bc5E68a5F36757",
} as const;

// Addresses for the cds withdraw contract
export const cdsWithdrawAddress = {
  84532: "0xc3414FF2bB20A226967DF827267b4F3f465D60f7",
  11155420: "0xE34D631201720f662f09a500fAE4923fa3bDE6E2",
} as const;

// Addresses for the USDT contract
export const testusdtAbiAddress = {
  8453: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
  10: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
} as const;

// Addresses for the USDC contract
export const usdcAddress = {
  8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  10: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
} as const;

// Addresses for the sUSD contract
export const sUSDAddress = {
  10: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
  8453: zeroAddress,
} as const;

// Addresses for the abond contract
export const abondAddress = {
  8453: "0x87Af984DED0ACE6547485cAfd2526ab332454149",
  10: "0x87Af984DED0ACE6547485cAfd2526ab332454149",
} as const;

// Addresses for the native token
export const nativeTokenAddress: ChainAddresses = {
  8453: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
  10: "0x4200000000000000000000000000000000000042",
};

// Addresses for the ETH contract
export const ethAddress: ChainAddresses = {
  8453: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  10: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
} as const;

// Addresses for the wrsETH contract
export const wrsETHAddress: ChainAddresses = {
  8453: "0xEDfa23602D0EC14714057867A78d01e94176BEA0",
  10: "0x87eEE96D50Fb761AD85B1c982d28A042169d61b1",
} as const;

// Addresses for the weETH contract
export const weETHAddress: ChainAddresses = {
  8453: "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A",
  10: "0x5A7fACB970D094B6C7FF1df0eA68D99E6e73CBFF",
} as const;

// Addresses for the rsETH contract
export const rsETHAddress: ChainAddresses = {
  84532: "0x7118Ee6D6eBeb3028FFc885b2f62Cf7264c2168F",
  11155420: "0x101ddb5026322f42E0F133352c115AD4B40B9412",
} as const;

// Addresses for the wsuperOETH contract
export const wsuperOETHAddress: ChainAddresses = {
  84532: "0x7F1Ed7Dcb429ed1Adb93f5d56537c4bDaf54eD50",
  11155420: zeroAddress,
} as const;

// Addresses for the borrow assets
export const borrowAssetsAddress = {
  ETH: ethAddress,
  wrsETH: wrsETHAddress,
  weETH: weETHAddress,
  rsETH: rsETHAddress,
  wsuperOETHb: wsuperOETHAddress,
} as const;

// Addresses for the global contract
export const globalAddress = {
  8453: "0x29400a68568De78c580491EA865300e7f6eE1092",
  10: "0x29400a68568De78c580491EA865300e7f6eE1092",
} as const;

// Addresses for the mpo contract
export const mpoAddress = {
  8453: "0x715A3B65335FaB8291b77f5A6afa427c8cF2e015",
  10: "0x715A3B65335FaB8291b77f5A6afa427c8cF2e015",
} as const;

export const treasuryAddress = {
  8453: "0xB868684d9E37704327436B94912899747690FfEc",
  10: "0xB868684d9E37704327436B94912899747690FfEc",
} as const;
