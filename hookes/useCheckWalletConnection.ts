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
/**
 * This hook is used to check if the user is connected to the wallet and if the address is verified
 * @returns {Object}
 * @returns {string} address
 * @returns {boolean} isConnected
 * @returns {number} chainId
 * @returns {function} openWalletPopup
 */
const useCheckWalletConnection = () => {
  const { address, isConnected, chainId } = useAccount();
  const pathName = usePathname();
  const { open: openWalletPopup, close: closeWalletPopup } = useAppKit();

  useEffect(() => {
    // checking if the user is connected and the address is verified
    const isVerified = localStorage.getItem("verified");
    if (!isConnected && !address && isVerified) {
      // if the user is not connected and the address is not verified and the path is in the list of popup routes, open the wallet popup
      if (PopUpRouteList.includes(pathName)) {
        openWalletPopup({
          view: "Connect",
        });
      }
    } else {
      // if the user is connected and the address is verified, close the wallet popup
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
