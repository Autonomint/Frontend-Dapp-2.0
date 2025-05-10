import { BRAND_ICON_URL, projectId, TESTNET_URL } from "@/utils/constants";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  baseSepolia,
  modeTestnet,
  optimismSepolia,
  sepolia,
} from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { defineChain, http } from "viem";
import { cookieStorage, createStorage } from "wagmi";

if (!projectId) throw new Error("Project ID is not defined");

// Chain Configurations Optimism Sepolia
export const opSepolia = defineChain({
  id: 11155420,
  name: "OP Sepolia",
  nativeCurrency: {
    name: "Sepolia ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.optimism.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "Optimism Explorer",
      url: "https://sepolia-optimism.etherscan.io",
    },
  },
  testnet: true,
});

// Metadata for the app
const metadata = {
  name: "autonomint",
  description: "Autonomint Testnet",
  url: TESTNET_URL, // origin must match your domain & subdomain
  icons: [BRAND_ICON_URL],
};

// Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks: [opSepolia, baseSepolia, sepolia, modeTestnet],
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [opSepolia.id]: http(opSepolia.rpcUrls.default.http[0]),
  },
});

// Wagmi Config
export const config = wagmiAdapter.wagmiConfig;

// AppKit Modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [opSepolia, baseSepolia, sepolia, modeTestnet],
  defaultNetwork: baseSepolia,
  metadata: metadata,
  features: {
    email: false,
    socials: false,
    analytics: false, // Optional - defaults to your Cloud configuration
  },
  debug: true,
});
