import { NetworkId } from "./constants";

export const BACKEND_API_URL = "https://43.204.73.16";

export const STRATEGY_LINK =
  "https://drive.google.com/file/d/1YSKqZ00DvdINitz-6KGEPssIn3kpuMLE/view";

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
  919: "https://sepolia.explorer.mode.network/",
  11155420: "https://sepolia-optimism.etherscan.io/",
  11155111: `https://sepolia.etherscan.io/`,
  84532: `https://sepolia.basescan.org/`,
} as Record<number, string>;

// urls
export const AUTONOMINT_DAPP_URL = "https://app.autonomint.com/";
