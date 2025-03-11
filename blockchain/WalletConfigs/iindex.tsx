import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  baseSepolia,
  mainnet,
  sepolia,
  optimismSepolia,
} from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { BRAND_ICON_URL, projectId, TESTNET_URL } from "@/utils/constants";

if (!projectId) throw new Error("Project ID is not defined");

console.log(projectId, "projectId");

const metadata = {
  name: "autonomint",
  description: "Autonomint Testnet",
  url: TESTNET_URL, // origin must match your domain & subdomain
  icons: [BRAND_ICON_URL],
};

export const wagmiAdapter = new WagmiAdapter({
  networks: [sepolia, baseSepolia, optimismSepolia],
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
  networks: [sepolia, baseSepolia],
  defaultNetwork: baseSepolia,
  metadata: metadata,
  features: {
    email: false,
    socials: false,
    analytics: false, // Optional - defaults to your Cloud configuration
  },
  debug: true,
});
