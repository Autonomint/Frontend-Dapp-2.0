"use client";
import { ReactNode } from "react";
import { Config, cookieToInitialState, WagmiProvider } from "wagmi";
import { wagmiAdapter } from "@/blockchain/WalletConfigs/iindex";

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
