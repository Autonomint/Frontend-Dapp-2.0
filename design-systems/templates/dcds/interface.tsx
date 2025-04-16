export interface TokenDetails {
  errorMessage?: string;
  active?: boolean;
  tokenImage: any;
  isLoading: boolean;
  tokenName: string;
  minTokenAmount: number;
  balanceAvailable: string;
  tokenCount?: number;
  isTokenPause: boolean;
  tokenPauseMessage: string;
  tokenPrice: string | Number;
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
}
