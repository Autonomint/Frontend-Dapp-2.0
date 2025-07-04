import { NetworkId } from "./constants";

export const BACKEND_API_URL = "https://3.7.222.91";

export const STRATEGY_LINK = "/strategies";

export const rpcUrls = {
  [NetworkId.BaseSepolia]: "https://base-sepolia.g.alchemy.com/v2",
  [NetworkId.Optimism]: "https://opt-sepolia.g.alchemy.com/v2",
};

// Dapp urls
export const TESTNET_URL = "https://www.dev.testnet.app.autonomint.com/";

export const BRAND_ICON_URL =
  "https://avatars.githubusercontent.com/u/37784886";

export const scanUrls = {
  919: "https://sepolia.explorer.mode.network/",
  11155420: "https://sepolia-optimism.etherscan.io/",
  11155111: `https://sepolia.etherscan.io/`,
  84532: `https://sepolia.basescan.org/`,
} as Record<number, string>;

export const meetUrl = "https://meet.brevo.com/aks-autonomint";
