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
