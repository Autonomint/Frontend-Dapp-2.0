export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

export enum NetworkId {
  EthereumSepolia = 1,
  BaseSepolia = 8453,
  Optimism = 10,
  Mode = 34443,
}

export const BorrowStatus = {
  DEPOSITED: "DEPOSITED",
  WITHDREW: "WITHDREW",
  LIQUIDATED: "LIQUIDATED",
} as const;

export const DEFAULT_TOAST_POSITION_VALUE =
  process.env.NEXT_PUBLIC_DEFAULT_TOAST_POSITION;

export const DAPP_ADDRESS_NOTIFI_VALUE =
  process.env.NEXT_PUBLIC_DAPP_ADDRESS_NOTIFI || "";

export const CARD_ID_NOTIFI_VALUE =
  process.env.NEXT_PUBLIC_CARD_ID_NOTIFI || "";

export const CARD_ID_NOTIFI_ENV = process.env.NEXT_PUBLIC_NOTIFI_ENV || "";

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

// urls
export const TESTNET_URL = "https://www.dev.testnet.app.autonomint.com/";
export const BRAND_ICON_URL =
  "https://avatars.githubusercontent.com/u/37784886";

export const scanUrls = {
  919: "https://explorer.mode.network/",
  10: "https://optimistic.etherscan.io/",
  1: `https://etherscan.io/`,
  8453: `https://basescan.org/`,
} as Record<number, string>;

export const eidOpSepolia = 30111; // Optimism Mainnet
export const eidModeSepolia = 30260; // Mode Mainnet
export const eidSepolia = 30101; // Ethereum Mainnet
export const eidBaseSepolia = 30184; // Base Mainnet

export const eId = {
  OP: eidOpSepolia,
  Mode: eidModeSepolia,
  Sepolia: eidSepolia,
  Base: eidBaseSepolia,
};

// enum for control cds and borrow pause unpause
export enum Functions {
  Borrow_Deposit,
  Borrow_Withdraw,
  Borrow_Liq,
  Borrow_Renew,
  Borrow_Redeem,
  CDS_Deposit,
  CDS_Withdraw,
  CDS_WithdrawGains,
  CDS_Liq,
  CDS_Redeem,
}

// enum for asset pause
export enum AssetStatus {
  DUMMY,
  DEPOSIT_PAUSED,
  WITHDRAW_PAUSED,
  BOTH_PAUSED,
  BOTH_UNPAUSED,
}
export interface AssetDetails {
  status: AssetStatus;
  LTV: BigInt;
  tokenDecimals: BigInt;
  priceDecimals: BigInt;
}

// Footer Social & Documentation Links
export const NEXT_PUBLIC_LINK_DOCS =
  "https://docs.autonomint.com/autonomint/autonomint-1";
export const NEXT_PUBLIC_LINK_DISCORD = "https://discord.com/invite/4QFaUTwjkU";
export const NEXT_PUBLIC_LINK_TWITTER = "https://x.com/autonomint";
export const NEXT_PUBLIC_LINK_TELEGRAM = "https://t.me/+lBgFePSf6982ZDA9";
