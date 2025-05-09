import { zeroAddress } from "viem";

type ChainAddresses = {
  [key: number]: `0x${string}`;
};

// Addresses for the multi-sign contract
export const multiSignAddress = {
  84532: "0xE4cd803312bd41F719eCDC21D51c961cA57c6B0f",
  11155420: "0xED0d14799C80c0533a128e61705a5B64F5367F8D",
} as const;

// Addresses for the usDa contract
export const usDaAddress = {
  84532: "0xD78bd3A6937977c5f89513bdF9cCf30B567F4189",
  11155111: "0x343f4E70e2489A566d056b12c647382f58857CC5",
  11155420: "0xcCc59Cabdbf6028B78DCE4Ea7d4E74DFbbC06aa6",
  919: "0x39B54D1631205F7FD2B29454CF73Ee85fA6C5E45",
} as const;

// Addresses for the borrowing contract
export const borrowingContractAddress = {
  84532: "0x35645c4870CE383c745e200B44BC6a6e87c63E86",
  11155420: "0x10EE8dC1B68039178989fFefeeE791519069e220",
} as const;

// Addresses for the cds contract
export const cdsAddress = {
  84532: "0x5aD374eCF70fa4ab23A6B7ac2Cc2Bf11C2A30630",
  11155420: "0xE0828CafCa48aDa33F5353eAE2873097a0c063BF",
} as const;

// Addresses for the USDT contract
export const testusdtAbiAddress = {
  84532: "0x1eBFf56C8f5d6B71bAFc607764767187018687E9",
  11155420: "0xDCa91575A8bb40a1EbC4C8985d0d05fbfb16D9d6",
} as const;

// Addresses for the USDC contract
export const usdcAddress = {
  84532: "0x7293ec00aF71Ba1fDFff81b79BD5bF01C2a0e051",
  11155420: "0x58dFf3FbD0209365db39AD7801921Ffa5d637a17",
} as const;

// Addresses for the sUSD contract
export const sUSDAddress = {
  11155420: "0xD7D674d80e79CF3A3b67D6a510AC1B0493dF47cF",
  84532: zeroAddress,
} as const;

// Addresses for the abond contract
export const abondAddress = {
  84532: "0xCF9F6335dF0055cf66DafD8CD63FbCC974A60767",
  11155420: "0xC86FFf9d2e53a551777807Bd40548b23EC1817A6",
} as const;

// Addresses for the native token
export const nativeTokenAddress: ChainAddresses = {
  84532: "0xB271403D5833296F1eaF4E7Cb397118ffd369aCD",
  11155420: "0xCC09162500a5E6F96f0AEF3AA6844Cf35197EAcd",
};

// Addresses for the ETH contract
export const ethAddress: ChainAddresses = {
  84532: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  11155420: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
} as const;

// Addresses for the wrsETH contract
export const wrsETHAddress: ChainAddresses = {
  84532: "0x750cF0693a94B776EEed523184277669373E739C",
  11155420: "0xe8e8b5b655Ed069755537dc79645Ad3D4e83bA0B",
} as const;

// Addresses for the weETH contract
export const weETHAddress: ChainAddresses = {
  84532: "0xE584D3e9Ca316A57557c461e0AC794AA18999e7E",
  11155420: "0x100BaFBbf6CCC7aB40e3d7Abf4A8861AFDeAB215",
} as const;

// Addresses for the rsETH contract
export const rsETHAddress: ChainAddresses = {
  84532: "0x7118Ee6D6eBeb3028FFc885b2f62Cf7264c2168F",
  11155420: "0x101ddb5026322f42E0F133352c115AD4B40B9412",
} as const;

// Addresses for the borrow assets
export const borrowAssetsAddress = {
  ETH: ethAddress,
  wrsETH: wrsETHAddress,
  weETH: weETHAddress,
  rsETH: rsETHAddress,
} as const;

// Addresses for the global contract
export const globalAddress = {
  84532: "0xa951da9E64ed59aC8ceFf4028b737Ca5Cf13F8D4",
  11155420: "0xC10348965d9425810eA4aCaC19D0f053b6CfD4b9",
} as const;

// Addresses for the mpo contract
export const mpoAddress = {
  84532: "0x68c98C664e0E8D265Db4dA7E38253Ac3856f5e9b",
  11155420: "0x6fb19C9d62D008B50f91F09315456BFAe08AEf5c",
} as const;

// Addresses for the hegicETH contract
export const hegicETHAddress = "0xEfC0eEAdC1132A12c9487d800112693bf49EcfA2";
