import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  baseSepolia,
  mainnet,
  sepolia,
  optimismSepolia,
} from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { projectId } from "@/utils/constants";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "autonomint",
  description: "Autonomint Testnet",
  url: "https://www.dev.testnet.app.autonomint.com/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiAdapter = new WagmiAdapter({
  networks: [sepolia, baseSepolia, optimismSepolia],
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  // metadata,
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
