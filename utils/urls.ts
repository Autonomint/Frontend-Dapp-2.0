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
  11155931: "https://explorer.testnet.riselabs.xyz/",
} as Record<number, string>;

export const meetUrl = "https://meet.brevo.com/aks-autonomint";

export const krwqUrl = "https://aerodrome.finance/deposit?token0=0x370923d39f139c64813f173a1bf0b4f9ba36a24f&token1=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&type=10&chain0=8453&chain1=8453&factory=0x5e7BB104d84c7CB9B682AaC2F3d509f5F406809A"
