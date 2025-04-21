import { BRAND_ICON_URL, projectId, TESTNET_URL } from "@/utils/constants";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  baseSepolia,
  modeTestnet,
  optimismSepolia,
  sepolia,
} from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { cookieStorage, createStorage } from "wagmi";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "autonomint",
  description: "Autonomint Testnet",
  url: TESTNET_URL, // origin must match your domain & subdomain
  icons: [BRAND_ICON_URL],
};

export const wagmiAdapter = new WagmiAdapter({
  networks: [optimismSepolia, baseSepolia, sepolia],
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const config = wagmiAdapter.wagmiConfig;

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [optimismSepolia, baseSepolia, sepolia],
  defaultNetwork: baseSepolia,
  metadata: metadata,
  features: {
    email: false,
    socials: false,
    analytics: false, // Optional - defaults to your Cloud configuration
  },
  debug: true,
});
