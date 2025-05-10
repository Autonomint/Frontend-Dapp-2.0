"use client";
import { ReactNode } from "react";
import { Config, cookieToInitialState, WagmiProvider } from "wagmi";
import { wagmiAdapter } from "@/blockchain/WalletConfigs/iindex";

/**
 * This component is used to provide a wallet provider to the app
 * @param {PropsWithChildren} children - The children of the component
 * @returns {React.ReactNode} The wallet provider
 */ 
const WalletProvider = ({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) => {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      {children}
    </WagmiProvider>
  );
};

export default WalletProvider;
