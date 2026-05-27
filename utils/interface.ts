export type ChartFilter = "allTime" | "365" | "183" | "30" | "10";

export interface dcdsDepositDetails {
  id: string;
  address: string;
  collateralType: string;
  chainId: number;
  index: number;
  depositedAmounts: {
    usdc: string;
  };
  totalDepositedAmount: string;
  depositedTime: string;
  stockPriceAtDeposit: string;
  usdcPriceAtDeposit: string;
  lockingPeriod: string;
  stockPriceAtWithdraw: string | null;
  withdrawTime: string | null;
  withdrawAmount: string | null;
  fees: string | null;
  status: string;
  liquidatedAmount: string | null;
  excessProfitCumulativeValueAtDeposit: string;
  apys: CdsWithdrawAPYs | null;
}

export interface CdsWithdrawAPYs {
  APY: number;
  amountAccured: number;
  priceChangePL: number;
  liquidatedCollateralInETH: number;
  liquidatedETHValue: number;
  currentTimeAPYTillNow: number;
}

export interface DcdsDetailsResponse {
  id: string;
  address: string;
  chainId: number;
  totalIndex: number;
  depositedAmounts: {
    usdc: string;
  };
  totalDepositedAmount: string;
  totalFees: string | null;
  totalFeesWithdrawn: string | null;
  points: string | null;
  totalYields: string | null;
  deposits: dcdsDepositDetails[];
}

export interface PositionData {
  id: string;
  address: string;
  chainId: number;
  index: number;
  collateralType: string;
  depositedAmountInETH: string;
  depositedAmount: string;
  depositedTime: string;
  stockPrice: string;
  exchangeRateAtDeposit: string | null;
  strikePrice: string;
  optionFees: string;
  isExpired: boolean;
  validTill: string;
  stockPriceAtWithdraw: string | null;
  withdrawTime: string | null;
  profit: string | null;
  status: "DEPOSITED" | "WITHDREW" | "LIQUIDATED" | "STAKED" | "UNSTAKED";
  hedgeValidity: number;
}

export interface LeaderboardDetails {
  borrowerCount: number;
  cdsCount: number;
  leaderboard: LeaderboardDetailsList[];
}

export interface LeaderboardDetailsList {
  address: string;
  totalBorrowedAmount: number;
  totalDepositedAmount: number;
  totalPoints: number;
  hasLiquidityLandPoints: boolean;
}

export interface AssetDetailsInterface {
  status: number;
  LTV: bigint;
  tokenDecimals: bigint;
  priceDecimals: bigint;
  optionsExpiredLTV: bigint;
}
