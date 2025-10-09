export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// network id reference for app
export enum NetworkId {
  Ethereum = 11155111,
  BaseSepolia = 84532,
  Optimism = 11155420,
  Mode = 919,
}

// borrow status
export const BorrowStatus = {
  DEPOSITED: "DEPOSITED",
  WITHDREW: "WITHDREW",
  LIQUIDATED: "LIQUIDATED",
} as const;

// toast position
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
}

export const BorrowAssetsEnum = {
  ETH: AssetName.ETH,
  weETH: AssetName.WeETH,
  wrsETH: AssetName.WrsETH,
  rsETH: AssetName.rsETH,
  wsuperOETHb: AssetName.WSUPER_OETH,
};

export const RedeemAssets = {
  usda: AssetName.USDa,
  abond: AssetName.ABOND,
  tusdt: AssetName.USDT,
};
export const FarmYourLuckWalletAddress =
  "0x555c74B09A29e083EA6F661c2dD78617d8Fd906E";

// AWS secret manager
export const aws_secret_name = "testingSecret";
export const sm_accessKeyId = "AKIAQLVQQPQX6XEGOPMA";
export const sm_secretAccessKey = "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";

export const alchemyApiKeys = "-LFCh4425MjVeCkrD8u9MRAXLDz0_Ycg";

export const LOCAL_STORAGE_KEY = "userTrackingData";

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

export const assetNameForRewardDataBorrow = {
  ETH: "ETH",
  wrsETH: "WrsETH",
  weETH: "WeETH",
  wsuperOETHb: "WSuperOethB",
};

// enum for borrow contract data 
export enum BorrowData {
  APR,
  ratePerSec,
  LTV,
  bondRatio,
  lastCumulativeRate,
  collateralRemainingInWithdraw,
  collateralValueRemainingInWithdraw,
  pendingUSDaToBurn,
  debtCeilingTimeLimit,
  debtCeilingMintLimit,
  minInterval,
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

export enum WithdrawType {
  FULL_WITHDRAW, WITHDRAW_YIELDS
}