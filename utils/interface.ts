export type ChartFilter = "allTime" | "365" | "183" | "30" | "10";

export interface dcdsDepositDetails {
  id: string;
  address: string;
  collateralType: string;
  chainId: number;
  index: number;
  depositedAmint: string;
  depositedUsdt: string;
  totalDepositedAmount: string;
  depositedTime: string;
  ethPriceAtDeposit: string;
  aprAtDeposit: string;
  lockingPeriod: string;
  ethPriceAtWithdraw: string | null;
  initialLiquidationAmount: string;
  liquidationAmount: string;
  liquidationIndex: string | null;
  optedForLiquidation: boolean;
  depositVal: string;
  withdrawTime: string | null;
  withdrawAmount: string | null;
  withdrawEthAmount: string | null;
  withdrawWeEthAmount: string | null;
  withdrawRsEthAmount: string | null;
  fees: string | null;
  status: string;
  usdcPriceAtDeposit: string;
  wmUSDPriceAtDeposit: string;
  depositedAmounts: {
    usda: string;
    usdt: string;
    nativeToken: string;
    boldToken: string;
    usdc: string;
    wmUSD: string;
    wblt: string;
  };
  wbltPriceAtDeposit: number;
  nativeTokenPriceAtDeposit: number;
  usdtPriceAtDeposit: number;
  boldPriceAtDeposit: number;
  liquidationPrice: number;
  apys: CdsWithdrawAPYs;
  liquidatedAmount: string | number;
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
  totalDepositedAmint: string;
  totalDepositedUsdt: string;
  totalDepositedAmount: string;
  totalFees: string | null;
  totalFeesWithdrawn: string | null;
  points: string | null;
  totalYields: string | null;
  deposits: dcdsDepositDetails[];
}

export interface PositionData {
  lastOptedValidity: number;
  totalOptionFees: number;
  ethPriceAtWithdraw: number;
  depositedAmountInETH?: string;
  exchangeRateAtDeposit?: string | number;
  noOfUSDaMinted: number;
  validTill: number;
  id: string;
  address: string;
  index: number;
  collateralType: string;
  depositedAmount: string;
  depositedTime: number;
  ethPriceDeposit: number;
  downsideProtectionStatus: boolean;
  ethPrice: number;
  noOfAmintMinted: string;
  strikePrice: number;
  strikePricePercent: string;
  downsideProtectionPercentage: number;
  aprAtDeposit: number;
  optionFees: number;
  withdrawTime1: string;
  withdrawTime2: string;
  withdrawAmount1: string;
  withdrawAmount2: string;
  normalizedAmount: string;
  amountYetToWithdraw: string;
  noOfAbondMinted: string;
  status: "DEPOSITED" | "WITHDREW" | "LIQUIDATED" | "STAKED" | "UNSTAKED";
  totalDebtAmount: string;
  liquidationEthPrice: number;
  hedgeValidity: number;
  totalInterest: string;
  stakedTime: string;
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
