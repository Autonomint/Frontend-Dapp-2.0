export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export enum NetworkId {
  EthereumSepolia = (process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA || 0) as number,
  BaseSepolia = (process.env.NEXT_PUBLIC_BASE_SEPOLIA || 0) as number,
  OptimismSepolia = (process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIAs || 0) as number,
}

export const globalAddress = {
  84532: "0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b",
  11155111: "0xA687412e7De672a5F945B15Db24c50F91512A19C",
} as const;

export const BorrowStatus = {
  DEPOSITED: "DEPOSITED",
  WITHDREW: "WITHDREW",
  LIQUIDATED: "LIQUIDATED",
} as const;

export const DEFAULT_TOAST_POSITION = "top-right";

export const USDT_DEPOSIT_LIMIT_IN_DCDS = 20000000000n;
