export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

// network id reference for app
export enum NetworkId {
  Ethereum = 1,
  BaseSepolia = 8453,
  Optimism = 10,
  Mode = 34443,
}

// borrow status
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

export enum AssetName {
  DUMMY,
  ETH,
  WeETH,
  WrsETH,
  rsETH,
  USDa,
  ABOND,
  USDT,
  NativeToken,
  USDC,
  sUSD,
  WSUPER_OETH,
  cbBTC,
  KRWQ
}

export const BorrowAssetsEnum = {
  ETH: AssetName.ETH,
  weETH: AssetName.WeETH,
  WeETH: AssetName.WeETH,
  wrsETH: AssetName.WrsETH,
  WrsETH: AssetName.WrsETH,
  rsETH: AssetName.rsETH,
  wsuperOETHb: AssetName.WSUPER_OETH,
  cbBTC: AssetName.cbBTC,
  KRWQ: AssetName.KRWQ,
  krwq: AssetName.KRWQ,
};

export const RedeemAssets = {
  usda: AssetName.USDa,
  abond: AssetName.ABOND,
  tusdt: AssetName.USDT,
};
// WfZVOiAVMU-JQu__2JHJs_R8HjIsBcKE
export const alchemyApiKeys = "db13973dc7f54cbab913af8ebc58e376";

export const LOCAL_STORAGE_KEY = "userTrackingData";

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
export const eIdWithChainId = {
  [NetworkId.Optimism]: eidOpSepolia,
  [NetworkId.Mode]: eidModeSepolia,
  [NetworkId.Ethereum]: eidSepolia,
  [NetworkId.BaseSepolia]: eidBaseSepolia,
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
  LTV: bigint;
  tokenDecimals: bigint;
  priceDecimals: bigint;
}

// Footer Social & Documentation Links
export const NEXT_PUBLIC_LINK_DOCS =
  "https://docs.autonomint.com/autonomint/autonomint-1";
export const NEXT_PUBLIC_LINK_DISCORD = "https://discord.com/invite/4QFaUTwjkU";
export const NEXT_PUBLIC_LINK_TWITTER = "https://x.com/autonomint";
export const NEXT_PUBLIC_LINK_TELEGRAM = "https://t.me/+lBgFePSf6982ZDA9";

export const assetNameForRewardDataBorrow = {
  ETH: "ETH",
  wrsETH: "WrsETH",
  weETH: "WeETH",
  wsuperOETHb: "WSuperOethB",
};

// enum for borrow contract data 
export enum BorrowData {
  ratePerSec,
  lastCumulativeRate,
  collateralRemainingInWithdraw,
  collateralValueRemainingInWithdraw,
  pendingUSDaToBurn,
  totalNormalizedAmount
}

// enum for cds contract data 
export enum CdsData {
  cdsCount,
  totalCdsDepositedAmount,
  totalCdsDepositedAmountWithOptionFees,
  totalAvailableLiquidationAmount,
  downsideProtected,
  withdrawTimeLimit,
  usdaLimit,
  usdtLimit
}

// Token format decimal
export const tokenFormatDecimal = {
  Eth: 4,
  ETH: 4,
  WeETH: 4,
  WrsETH: 4,
  rsETH: 4,
  wsuperOETHb: 4,
  cbBTC: 6,
}
export enum WithdrawType {
  FULL_WITHDRAW, WITHDRAW_YIELDS
}
