import { zeroAddress } from "viem";

type ChainAddresses = {
  [key: number]: `0x${string}`;
};

export const multiSignAddress = {
  8453: "0xE4cd803312bd41F719eCDC21D51c961cA57c6B0f",
  10: "0xED0d14799C80c0533a128e61705a5B64F5367F8D",
} as const;

export const usDaAddress = {
  8453: "0xD78bd3A6937977c5f89513bdF9cCf30B567F4189",
  1: "0x343f4E70e2489A566d056b12c647382f58857CC5",
  10: "0xcCc59Cabdbf6028B78DCE4Ea7d4E74DFbbC06aa6",
  34443: "0x39B54D1631205F7FD2B29454CF73Ee85fA6C5E45",
} as const;

export const borrowingContractAddress = {
  8453: "0x35645c4870CE383c745e200B44BC6a6e87c63E86",
  10: "0x10EE8dC1B68039178989fFefeeE791519069e220",
} as const;

export const cdsAddress = {
  8453: "0x5aD374eCF70fa4ab23A6B7ac2Cc2Bf11C2A30630",
  10: "0xE0828CafCa48aDa33F5353eAE2873097a0c063BF",
} as const;

export const testusdtAbiAddress = {
  8453: "0x1eBFf56C8f5d6B71bAFc607764767187018687E9",
  10: "0xDCa91575A8bb40a1EbC4C8985d0d05fbfb16D9d6",
} as const;

export const usdcAddress = {
  8453: "0x7293ec00aF71Ba1fDFff81b79BD5bF01C2a0e051",
  10: "0x58dFf3FbD0209365db39AD7801921Ffa5d637a17",
} as const;

export const sUSDAddress = {
  10: "0xD7D674d80e79CF3A3b67D6a510AC1B0493dF47cF",
  8453: zeroAddress,
} as const;

export const abondAddress = {
  8453: "0xCF9F6335dF0055cf66DafD8CD63FbCC974A60767",
  10: "0xC86FFf9d2e53a551777807Bd40548b23EC1817A6",
} as const;

export const nativeTokenAddress: ChainAddresses = {
  8453: "0xB271403D5833296F1eaF4E7Cb397118ffd369aCD",
  10: "0xCC09162500a5E6F96f0AEF3AA6844Cf35197EAcd",
};

export const ethAddress: ChainAddresses = {
  8453: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  10: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
} as const;

export const wrsETHAddress: ChainAddresses = {
  8453: "0x750cF0693a94B776EEed523184277669373E739C",
  10: "0xe8e8b5b655Ed069755537dc79645Ad3D4e83bA0B",
} as const;

export const weETHAddress: ChainAddresses = {
  8453: "0xE584D3e9Ca316A57557c461e0AC794AA18999e7E",
  10: "0x100BaFBbf6CCC7aB40e3d7Abf4A8861AFDeAB215",
} as const;

export const rsETHAddress: ChainAddresses = {
  8453: "0xaDfAcE640Adee8a6253237256194BF5A120Af0D0",
  10: "0x101ddb5026322f42E0F133352c115AD4B40B9412",
} as const;

export const borrowAssetsAddress = {
  ETH: ethAddress,
  wrsETH: wrsETHAddress,
  weETH: weETHAddress,
  rsETH: rsETHAddress,
} as const;

export const globalAddress = {
  8453: "0xa951da9E64ed59aC8ceFf4028b737Ca5Cf13F8D4",
  10: "0xC10348965d9425810eA4aCaC19D0f053b6CfD4b9",
} as const;

export const mpoAddress = {
  8453: "0x68c98C664e0E8D265Db4dA7E38253Ac3856f5e9b",
  10: "0x6fb19C9d62D008B50f91F09315456BFAe08AEf5c",
} as const;

export const hegicETHAddress = "0xEfC0eEAdC1132A12c9487d800112693bf49EcfA2";
