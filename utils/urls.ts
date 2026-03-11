import { NetworkId } from "./constants";

export const BACKEND_API_URL = "https://43.204.73.16";

export const STRATEGY_LINK = "/strategies";

export const rpcUrls = {
  [NetworkId.BaseSepolia]: "https://base-mainnet.infura.io/v3",
  [NetworkId.Optimism]: "https://optimism-mainnet.infura.io/v3",
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

export const krwqUrl = "https://aerodrome.finance/swap?from=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&to=0x370923d39f139c64813f173a1bf0b4f9ba36a24f&chain0=8453&chain1=8453"
export const eurcUrl = "https://aerodrome.finance/swap?from=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&to=0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42&chain0=8453&chain1=8453"

export const AssetBuyLink = {
  KRWQ: krwqUrl,
  EURC: eurcUrl,
} as Record<string, string>
