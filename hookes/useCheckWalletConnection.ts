"use client";
import { NetworkId } from "@/utils/constants";
import { useAppKit } from "@reown/appkit/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";
const PopUpRouteList = [
  "/mintusdalist",
  "/bridge",
  "/dashboard/portfolio",
  "/dashboard/leaderboard",
  "/dashboard/stats",
  "/farmyourluck",
  "/redeem",
];
const useCheckWalletConnection = () => {
  const { address, isConnected, chainId } = useAccount();
  const { open: openWalletPopup, close: closeWalletPopup } = useAppKit();
  const pathName = usePathname();
  useEffect(() => {
    if (!isConnected && !address) {
      if (PopUpRouteList.includes(pathName)) {
        openWalletPopup({
          view: "Connect",
        });
      }
    } else {
      closeWalletPopup();
    }
  }, [isConnected, address]);

  return {
    address,
    isConnected,
    chainId,
    openWalletPopup,
    closeWalletPopup,
  };
};

export default useCheckWalletConnection;
