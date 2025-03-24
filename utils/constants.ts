export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export enum NetworkId {
  EthereumSepolia = (process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA || 0) as number,
  BaseSepolia = (process.env.NEXT_PUBLIC_BASE_SEPOLIA || 0) as number,
  Optimism = 11155420,
  Mode = 919,
}

export const BorrowStatus = {
  DEPOSITED: "DEPOSITED",
  WITHDREW: "WITHDREW",
  LIQUIDATED: "LIQUIDATED",
} as const;

export const DEFAULT_TOAST_POSITION = "top-right";

export const USDT_DEPOSIT_LIMIT_IN_DCDS = 20000000000n;

export const DAPP_ADDRESS_NOTIFI = "9xu0e0btkv6g71ypagwo";

export const CARD_ID_NOTIFI = "fb7bcc660ddb4d6e99703595e6eed049";

export enum StrikePrice {
  FIVE,
  TEN,
  FIFTEEN,
  TWENTY,
  TWENTY_FIVE,
}

export enum AssetNames {
  DUMMY,
  ETH,
  WeETH,
  WrsETH,
  rsETH,
  USDa,
  ABOND,
  TUSDT,
  USDC,
  sUSD,
}
export const BorrowAssetsEnum = {
  ETH: AssetNames.ETH,
  weETH: AssetNames.WeETH,
  wrsETH: AssetNames.WrsETH,
  rsETH: AssetNames.rsETH,
};

export const RedeemAssets = {
  usda: AssetNames.USDa,
  abond: AssetNames.ABOND,
  tusdt: AssetNames.TUSDT,
};
export const FarmYourLuckWalletAddress =
  "0x555c74B09A29e083EA6F661c2dD78617d8Fd906E";

// AWS secret manager
export const aws_secret_name = "testingSecret";
export const sm_accessKeyId = "AKIAQLVQQPQX6XEGOPMA";
export const sm_secretAccessKey = "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";

// urls
export const TESTNET_URL = "https://www.dev.testnet.app.autonomint.com/";
export const BRAND_ICON_URL =
  "https://avatars.githubusercontent.com/u/37784886";

export const scanUrl = {
  919: "https://explorer.mode.network/search-results?q=",
  11155420: "https: //optimism-sepolia.blockscout.com/tx/",
} as const;

export const eidOpSepolia = 40232;
export const eidModeSepolia = 40260;
export const eidSepolia = 40161;
export const eidBaseSepolia = 40245;

export const eId = {
  OP: eidOpSepolia,
  Mode: eidModeSepolia,
  Sepolia: eidSepolia,
  Base: eidBaseSepolia,
};
