import {  projectId } from "@/utils/constants";
import { AUTONOMINT_DAPP_URL, BRAND_ICON_URL, TESTNET_URL } from "@/utils/urls";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  baseSepolia,
  modeTestnet,
  optimismSepolia,
  sepolia,
  mainnet,
  base,
  optimism,
  mode,
  AppKitNetwork,
} from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { defineChain, http } from "viem";
import { cookieStorage, createStorage } from "wagmi";

if (!projectId) throw new Error("Project ID is not defined");

const chainList: AppKitNetwork[] = [mainnet, base, optimism, mode];

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
  url: AUTONOMINT_DAPP_URL, // origin must match your domain & subdomain
  icons: [BRAND_ICON_URL],
};

// Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks: chainList,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

// Wagmi Config
export const config = wagmiAdapter.wagmiConfig;

// AppKit Modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, base, optimism, mode],
  metadata: metadata,
  features: {
    email: false,
    socials: false,
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  debug: false,
});
