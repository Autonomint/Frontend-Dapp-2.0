import { number } from "yup";

export interface TokenDetails {
  errorMessage?: string;
  active?: boolean;
  tokenImage: any;
  isLoading: boolean;
  tokenName: string;
  minTokenAmount: number;
  balanceAvailable: string;
  tokenCount?: number;
  tvl?: number;
  tokenAddress?: string;
  tokenDecimals?: number;
  isTokenPause: boolean;
  tokenPauseMessage: string;
  tokenPrice: string | Number;
  tokenLabel: string;
  allowance?: string | number | bigint;
  tokenDetails?: Record<number, string | number>;
  tokenPauseState?: boolean;
  pointToGiven: number;
  pointBoaster: number;
}

export interface FormValues {
  usdaFlag: boolean;
  usdtFlag: boolean;
  aeroFlag: boolean;
  opFlag: boolean;
  usdaAmount: string | number | null;
  usdtAmount: string | number | null;
  aeroAmount: string | number | null;
  opAmount: string | number | null;
  lockInPeriod: string | null;
  liquidationGains: boolean;
  usdaBalance: string | number | null;
  usdtBalance: string | number | null;
  nativeBalance: string | number | null;
}
