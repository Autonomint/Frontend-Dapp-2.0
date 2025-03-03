import { projectId } from "@/utils/constants";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { modeTestnet, optimismSepolia } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { cookieStorage, createStorage } from "wagmi";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "autonomint",
  description: "Autonomint Testnet",
  url: "https://www.dev.testnet.app.autonomint.com/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiAdapter = new WagmiAdapter({
  networks: [optimismSepolia, modeTestnet],
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
  networks: [optimismSepolia, modeTestnet],
  defaultNetwork: modeTestnet,
  metadata: metadata,
  features: {
    email: false,
    socials: false,
    analytics: false, // Optional - defaults to your Cloud configuration
  },
  debug: true,
});
