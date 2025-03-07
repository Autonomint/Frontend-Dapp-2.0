export interface TokenDetails {
  errorMessage?: string;
  active?: boolean;
  tokenImage: any;
  isLoading: boolean;
  tokenName: string;
  minTokenAmount: number;
  balanceAvailable: string;
}

export interface FormValues {
  usdaFlag: boolean;
  usdtFlag: boolean;
  usdcFlag: boolean;
  usdeFlag: boolean;
  usdaAmount: string | number | null;
  usdtAmount: string | number | null;
  usdcAmount: string | number | null;
  usdeAmount: string | number | null;
  lockInPeriod: string | null;
  liquidationGains: boolean;
}
