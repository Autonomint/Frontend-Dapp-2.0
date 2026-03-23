export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

// network id reference for app
export enum NetworkId {
  Ethereum = 1,
  BaseSepolia = 8453,
  Optimism = 10,
  Mode = 34443,
  Rise = 4153,
  Hyperliquid = 999,
}

// borrow status
export const BorrowStatus = {
  DEPOSITED: "DEPOSITED",
  WITHDREW: "WITHDREW",
  LIQUIDATED: "LIQUIDATED",
  STAKED: "STAKED",
  UNSTAKED: "UNSTAKED",
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
  KRWQ,
  EURC,
  HYPE
}

export const BorrowAssetsEnum = {
  ETH: AssetName.ETH,
  weETH: AssetName.WeETH,
  wrsETH: AssetName.WrsETH,
  rsETH: AssetName.rsETH,
  wsuperOETHb: AssetName.WSUPER_OETH,
  cbBTC: AssetName.cbBTC,
  KRWQ: AssetName.KRWQ,
  krwq: AssetName.KRWQ,
  EURC: AssetName.EURC,
  eurc: AssetName.EURC,
  HYPE: AssetName.HYPE,
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
  Rise: 0, // Placeholder - Rise not supported for LayerZero bridging
  Hyperliquid: 0, // Placeholder - Hyperliquid not supported for LayerZero bridging
};
export const eIdWithChainId = {
  [NetworkId.Optimism]: eidOpSepolia,
  [NetworkId.Mode]: eidModeSepolia,
  [NetworkId.Ethereum]: eidSepolia,
  [NetworkId.BaseSepolia]: eidBaseSepolia,
  [NetworkId.Hyperliquid]: 0, // Placeholder - Hyperliquid not supported for LayerZero bridging
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
  HYPE: "HYPE",
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


export const blockAddressAndIndex = [

  // {
  //   address: '0x9fD72C31862E91a39325b277483BFcca64C9aE87',
  //   index: [1],
  //   chainId: NetworkId.BaseSepolia
  // },
  {
    address: '0x7fc80CEBf818aacaC76163fB2c1837145d5ADDf7',
    index: [1, 2],
    chainId: NetworkId.Optimism
  },
  // {
  //   address: '0x5b54b6EA0b682BD484b5A580BaeCcF1B85A6A73C',
  //   index: [1, 2, 3, 4, 5],
  //   chainId: NetworkId.BaseSepolia

  // },
  {
    address: '0x82738b0EBc1d667765cB9CDEB4A2a96dA6e6A77A',
    index: [1, 2],
    chainId: NetworkId.BaseSepolia
  }
]

export const hideYieldsAddressAndIndex = [
  {
    address: '0x51bC3dd10a9ee4946F961038CF5D50057E49eb77',
    index: [15],
    chainId: NetworkId.BaseSepolia
  },
]