import { projectId } from "@/utils/constants";
import { AUTONOMINT_DAPP_URL, BRAND_ICON_URL } from "@/utils/urls";
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

// Chain Configuration Rise Mainnet
export const riseMainnet = defineChain({
  id: 4153,
  name: "RISE Mainnet",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.risechain.com?apikey=Autonomint-qA8Z7P9"],
    },
  },
  blockExplorers: {
    default: {
      name: "RISE Explorer",
      url: "https://explorer.risechain.com/",
    },
  },
  testnet: false,
});

const chainList: AppKitNetwork[] = [base, optimism, mainnet, mode, riseMainnet];

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
  name: "NONDOLLAR",
  description: "NONDOLLAR Mainnet",
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
  transports: {
    [opSepolia.id]: http(opSepolia.rpcUrls.default.http[0]),
    [riseMainnet.id]: http(riseMainnet.rpcUrls.default.http[0]),
  },
});

// Wagmi Config
export const config = wagmiAdapter.wagmiConfig;

// AppKit Modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [base, optimism, mainnet, mode, riseMainnet],
  defaultNetwork: base,
  metadata: metadata,
  features: {
    email: false,
    socials: false,
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  debug: false,
});
