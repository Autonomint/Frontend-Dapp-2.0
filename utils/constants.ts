export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

export enum NetworkId {
  EthereumSepolia = Number(
    process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA || 11155111
  ),
  BaseSepolia = Number(process.env.NEXT_PUBLIC_BASE_SEPOLIA || 84532),
  Optimism = Number(process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIA || 11155420),
  Mode = Number(process.env.NEXT_PUBLIC_MODE || 919),
}

export const BorrowStatus = {
  DEPOSITED: "DEPOSITED",
  WITHDREW: "WITHDREW",
  LIQUIDATED: "LIQUIDATED",
} as const;

export const DEFAULT_TOAST_POSITION_VALUE =
  process.env.NEXT_PUBLIC_DEFAULT_TOAST_POSITION;

export const DAPP_ADDRESS_NOTIFI_VALUE =
  process.env.NEXT_PUBLIC_DAPP_ADDRESS_NOTIFI;

export const CARD_ID_NOTIFI_VALUE = process.env.NEXT_PUBLIC_CARD_ID_NOTIFI;

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
export const TESTNET_URL = process.env.NEXT_PUBLIC_TESTNET_URL || "";
export const BRAND_ICON_URL = process.env.NEXT_PUBLIC_BRAND_ICON_URL || "";

// Updated scanUrls using environment variables and NetworkId enum
export const scanUrls = {
  [NetworkId.Mode]:
    process.env.NEXT_PUBLIC_MODE_SEPOLIA_SCAN_URL ||
    "https://sepolia.explorer.mode.network/", // Fallback
  [NetworkId.Optimism]:
    process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_SCAN_URL ||
    "https://sepolia-optimism.etherscan.io/", // Fallback
  [NetworkId.EthereumSepolia]:
    process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_SCAN_URL ||
    `https://sepolia.etherscan.io/`, // Fallback
  [NetworkId.BaseSepolia]:
    process.env.NEXT_PUBLIC_BASE_SEPOLIA_SCAN_URL ||
    `https://sepolia.basescan.org/`, // Fallback
} as Record<number, string>;

// LayerZero Endpoint IDs (eIDs) from environment variables
export const eidOpSepolia = Number(
  process.env.NEXT_PUBLIC_EID_OP_SEPOLIA || 40232 // Fallback
);
export const eidModeSepolia = Number(
  process.env.NEXT_PUBLIC_EID_MODE_SEPOLIA || 40260 // Fallback
);
export const eidSepolia = Number(
  process.env.NEXT_PUBLIC_EID_SEPOLIA || 40161 // Fallback
);
export const eidBaseSepolia = Number(
  process.env.NEXT_PUBLIC_EID_BASE_SEPOLIA || 40245 // Fallback
);

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
