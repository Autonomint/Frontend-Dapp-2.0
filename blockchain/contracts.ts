import { zeroAddress } from "viem";

type ChainAddresses = {
  [key: number]: `0x${string}`;
};

export const usDaAddress = {
  84532: "0x85a336614eA679204d2C7853e45DD81B97Fd3dAE",
  11155111: "0xb9D0273ed143771e0e239616619586E887870438",
  919: "0xE33b26cB92e5886F8e988F4c7bd76e195A42bC18",
  11155420: "0xF0C29E75985847a99D167C56abDA706ACc88Ff21",
} as const;

export const borrowingContractAddress = {
  919: "0xD7fa2B0a68916A0d8428542b8127a607Cb830f53",
  11155420: "0xf76397659685ea0C93095cd15d4dAcF6409f513D",
} as const;

export const cdsAddress = {
  919: "0xE5EAeB017C24bBb5694754717130dea5f0F95E97",
  11155420: "0x928E079584AbD4De888381b4C9e14A6Aa6485060",
} as const;

export const testusdtAbiAddress = {
  919: "0xe16C2C9978eD7a16ebc704b704A4d92a9890069a",
  11155420: "0x6fc38878E82b7EDf83abD419C33bf1c500DdF362",
} as const;

export const usdcAddress = {
  919: "0x61e052DbdD34190F6bD851838391F45022744C19",
  11155420: "0x611FEA2a068e0EC856dc8EFcB138991C57Cb05dd",
} as const;

export const sUSDAddress = {
  11155420: "0xD7D674d80e79CF3A3b67D6a510AC1B0493dF47cF",
  919: zeroAddress,
} as const;

export const abondAddress = {
  919: "0x53c7f7D8a6EEAe62c9B1d931eB8b1487De939e70",
  11155420: "0xdd1Bcd05A9679d883D3c33c1731C8d621110c8FE",
} as const;

export const nativeTokenAddress: ChainAddresses = {
  919: "0x9B1516694Ee9eDEd8E26c3Af9A120eaE51eDB638",
  11155420: "0x748C8E124Faca8C09f18AF50472D7d5aee4fAbE5",
};

export const ethAddress: ChainAddresses = {
  919: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  11155420: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
} as const;

export const wrsETHAddress: ChainAddresses = {
  919: "0x928E079584AbD4De888381b4C9e14A6Aa6485060",
  11155420: "0x6c902ece83048d58FB9c9F98626B948dFF7544FF",
} as const;

export const weETHAddress: ChainAddresses = {
  919: "0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec",
  11155420: "0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E",
} as const;

export const rsETHAddress: ChainAddresses = {
  919: "0xaDfAcE640Adee8a6253237256194BF5A120Af0D0",
  11155420: "0x809b57518a5319A1cF348f9425eC7721bD472719",
} as const;

export const borrowAssetsAddress = {
  ETH: ethAddress,
  wrsETH: wrsETHAddress,
  weETH: weETHAddress,
  rsETH: rsETHAddress,
} as const;

export const globalAddress = {
  919: "0x3281eBE3565Eb2A383ed063fcFa8780214282bF1",
  11155420: "0x3Ae56Ae6Aa0848EFc6B865341c1C89daE6F54Bd5",
} as const;

export const mpoAddress = {
  919: "0x6f299ED86A652f91814DBe9D9d8397A1FEa39f1C",
  11155420: "0x61e052DbdD34190F6bD851838391F45022744C19",
} as const;

export const hegicETHAddress = "0xEfC0eEAdC1132A12c9487d800112693bf49EcfA2";
