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
  depositedAmounts: {
    usda: string;
    usdt: string;
    nativeToken: string;
  };
  nativeTokenPriceAtDeposit: number;
  liquidationPrice: number;
  apys: CdsWithdrawAPYs;
}

export interface CdsWithdrawAPYs {
  APY: number | Number;
  amountAccured: number | Number;
  priceChangePL: number | Number;
  liquidatedCollateralInETH: number | Number;
  liquidatedETHValue: number | Number;
  currentTimeAPYTillNow: number | Number;
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
  status: "DEPOSITED" | "WITHDREW" | "LIQUIDATED";
  totalDebtAmount: string;
}

export interface LeaderboardDetails {
  rank: string;
  address: string;
  totalDepositedAmount?: string;
  cdsdeposit?: number;
  totalAmint?: string;
  totalUSDa?: string;
  points: string;
  totalLTV?: number;
  yield: number;
  chainId: number;
}
