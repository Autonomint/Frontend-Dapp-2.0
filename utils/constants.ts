export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export enum NetworkId {
  EthereumSepolia = (process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA || 0) as number,
  BaseSepolia = (process.env.NEXT_PUBLIC_BASE_SEPOLIA || 0) as number,
}

export const DEFAULT_TOAST_POSITION = "top-right";
