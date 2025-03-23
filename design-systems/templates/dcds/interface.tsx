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
  modeFlag: boolean;
  opFlag: boolean;
  usdaAmount: string | number | null;
  usdtAmount: string | number | null;
  modeAmount: string | number | null;
  opAmount: string | number | null;
  lockInPeriod: string | null;
  liquidationGains: boolean;
}
