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

// Stock asset names for covered call options (uses prefix to avoid duplication with AssetName)
export enum StockAssetName {
  DUMMY,
  USDC,
  NVDA,
  TSLA,
  SMR,
  PLTR,
  COIN,
  MSTR,
  AAPL,
  LAB,
  ETH_CALL,
  ETH_PUT,
  BTC_CALL,
  BTC_PUT,
  LIGHTER_CALL,
}

/**
 * Maps frontend display ticker symbols to the StockAssetName enum **key** strings
 * expected by the backend API (spot-price, expiries, option-bids endpoints).
 *
 * Only entries that differ from the raw display ticker are listed here.
 * Everything else falls back to the ticker string itself via getApiAssetName.
 *
 * All tickers pass through unchanged (ticker === API name).
 */
export const tickerToApiAssetName: Record<string, string> = {
  NVDA: "NVDA",
  TSLA: "TSLA",
  SMR: "SMR",
  PLTR: "PLTR",
  COIN: "COIN",
  MSTR: "MSTR",
  AAPL: "AAPL",
  LAB: "LAB",
  // Crypto option enum keys — pass-through so portfolio collateralType values round-trip correctly
  ETH_CALL: "ETH_CALL",
  ETH_PUT: "ETH_PUT",
  BTC_CALL: "BTC_CALL",
  BTC_PUT: "BTC_PUT",
  LIGHTER_CALL: "LIGHTER_CALL",
};

/**
 * Maps crypto tickers to their API asset name based on option type (call/put).
 * Used when the ticker alone isn't enough — we need the option side to pick the right enum key.
 */
const cryptoTickerOptionMap: Record<string, Partial<Record<"call" | "put", string>>> = {
  ETH: { call: "ETH_CALL", put: "ETH_PUT" },
  BTC: { call: "BTC_CALL", put: "BTC_PUT" },
  LIT: { call: "LIGHTER_CALL" },
};

/**
 * Returns the API asset name for a given display ticker.
 *
 * @param ticker     - The display ticker (e.g. "ETH", "TSLA", "LIT")
 * @param optionType - Optional option side ("call" | "put"). Required for crypto tickers
 *                     (ETH, BTC, LIT) to resolve to the correct enum key.
 * @returns The asset name the backend expects (e.g. "ETH_CALL", "TSLA", "NVDA")
 */
export const getApiAssetName = (
  ticker: string,
  optionType?: "call" | "put",
): string => {
  // For crypto tickers with option variants, use the option type to pick the enum key
  if (optionType && cryptoTickerOptionMap[ticker]) {
    return cryptoTickerOptionMap[ticker][optionType] ?? tickerToApiAssetName[ticker] ?? ticker;
  }
  return tickerToApiAssetName[ticker] ?? ticker;
};

// Mapping from ticker symbol to StockAssetName enum
export const tickerToStockAssetName: Record<string, StockAssetName> = {
  NVDA: StockAssetName.NVDA,
  TSLA: StockAssetName.TSLA,
  SMR: StockAssetName.SMR,
  PLTR: StockAssetName.PLTR,
  COIN: StockAssetName.COIN,
  MSTR: StockAssetName.MSTR,
  AAPL: StockAssetName.AAPL,
  LAB: StockAssetName.LAB,
  ETH_CALL: StockAssetName.ETH_CALL,
  ETH_PUT: StockAssetName.ETH_PUT,
  BTC_CALL: StockAssetName.BTC_CALL,
  BTC_PUT: StockAssetName.BTC_PUT,
  LIGHTER_CALL: StockAssetName.LIGHTER_CALL,
};

export interface StockOptionMapping {
  call: StockAssetName;
  put?: StockAssetName;
}

export const tickerToOptionStockAssetName: Record<string, StockOptionMapping> = {
  NVDA: { call: StockAssetName.NVDA },
  TSLA: { call: StockAssetName.TSLA },
  SMR: { call: StockAssetName.SMR },
  PLTR: { call: StockAssetName.PLTR },
  COIN: { call: StockAssetName.COIN },
  MSTR: { call: StockAssetName.MSTR },
  AAPL: { call: StockAssetName.AAPL },
  LAB: { call: StockAssetName.LAB },
  ETH: { call: StockAssetName.ETH_CALL, put: StockAssetName.ETH_PUT },
  BTC: { call: StockAssetName.BTC_CALL, put: StockAssetName.BTC_PUT },
  LIT: { call: StockAssetName.LIGHTER_CALL },
  ETH_CALL: { call: StockAssetName.ETH_CALL },
  ETH_PUT: { call: StockAssetName.ETH_PUT },
  BTC_CALL: { call: StockAssetName.BTC_CALL },
  BTC_PUT: { call: StockAssetName.BTC_PUT },
  LIGHTER_CALL: { call: StockAssetName.LIGHTER_CALL },
};

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
  EURC: AssetName.EURC,
  eurc: AssetName.EURC,
  HYPE: AssetName.ETH,
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
export const eidHyper = 30367; // Hyperliquid Mainnet

export const eId = {
  OP: eidOpSepolia,
  Mode: eidModeSepolia,
  Sepolia: eidSepolia,
  Base: eidBaseSepolia,
  Rise: 0, // Placeholder - Rise not supported for LayerZero bridging
  Hyperliquid: eidHyper,
};
export const eIdWithChainId = {
  [NetworkId.Optimism]: eidOpSepolia,
  [NetworkId.Mode]: eidModeSepolia,
  [NetworkId.Ethereum]: eidSepolia,
  [NetworkId.BaseSepolia]: eidBaseSepolia,
  [NetworkId.Hyperliquid]: eidHyper,
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
export const NEXT_PUBLIC_LINK_TWITTER = "https://x.com/nondollar_life";
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
  HYPE: 4,
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

/**
 * Maps a collateral-type string (as stored in PositionData.collateralType) to
 * its profit-cap multiplier for the PnL calculation.
 *
 * Call options — value is the CEILING multiplier on strike price:
 *   cappedPrice = strikePrice * PROFIT_CAP_MAP[collateralType]
 *   e.g. 1.05 → profit capped at 5 % above strike
 *
 * Put options — value is the FLOOR multiplier on strike price:
 *   floorPrice = strikeInDollars * PROFIT_CAP_MAP[collateralType]
 *   e.g. 0.95 → profit capped at 5 % below strike
 *
 * Any collateral type not listed falls back to the defaults inside
 * calculatePnL (1.30) and calculatePutPnL (0.90).
 */
/**
 * Lock period configuration for covered call/put sell mode.
 *
 * Defines custom lock periods (in days) for specific tickers in sell mode.
 * Tickers not listed here fall back to the default behavior:
 *   - Put options: 60 days
 *   - Call options: 30 days
 *
 * To add a new token with a custom lock period, simply add an entry here.
 */
/**
 * Tickers that should force the first (nearest) expiry date in buy mode.
 * The expiry dropdown will be hidden and the nearest expiry is auto-selected.
 * For ETH/BTC, this represents a ~1 day expiry (the nearest available).
 */
export const BUY_FORCE_FIRST_EXPIRY: string[] = ["ETH", "BTC"];

export const SELL_LOCK_PERIOD_OVERRIDES: Record<string, number> = {
  ETH: 2,  // 2-day lock for ETH sell
  BTC: 2,  // 2-day lock for BTC sell
};

export const PROFIT_CAP_MAP: Record<string, number> = {
  // --- Call options (ceiling multiplier > 1) ---
  ETH_CALL: 1.05,     // 5 % upside cap
  BTC_CALL: 1.05,     // 5 % upside cap
  LIGHTER_CALL: 1.10, // 10 % upside cap (LIT)

  // --- Put options (floor multiplier < 1) ---
  ETH_PUT: 0.95, // 5 % downside cap
  BTC_PUT: 0.95, // 5 % downside cap
  LAB: 0.90,     // 10 % downside cap (existing behaviour, now explicit)
};