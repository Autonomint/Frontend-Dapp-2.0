import { NetworkId } from "./constants";

export const BACKEND_API_URL = "https://43.204.73.16";

export const STRATEGY_LINK = "/strategies";

export const rpcUrls = {
  [NetworkId.BaseSepolia]: "https://base-mainnet.g.alchemy.com/v2",
  [NetworkId.Optimism]: "https://opt-mainnet.g.alchemy.com/v2",
};

export const LayerZeroUrl = "https://scan.layerzero-api.com/v1";

// Dapp urls
export const TESTNET_URL = "https://www.dev.testnet.app.autonomint.com/";

export const BRAND_ICON_URL =
  "https://avatars.githubusercontent.com/u/37784886";

export const scanUrls = {
  919: "https://explorer.mode.network/",
  10: "https://optimistic.etherscan.io/",
  1: `https://etherscan.io/`,
  8453: `https://basescan.org/`,
} as Record<number, string>;

// urls
export const AUTONOMINT_DAPP_URL = "https://app.autonomint.com/";
export const meetUrl = "https://meet.brevo.com/aks-autonomint";
