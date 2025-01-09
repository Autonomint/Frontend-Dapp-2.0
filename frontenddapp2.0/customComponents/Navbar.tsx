"use client";
import autonomintTxtImage from "@/app/assets/autonomint.svg";
import logo from "@/app/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import Image from "next/image";
import NotificationPopup from "./popups/NotificationPopUp";
import ReferPopup from "./popups/ReferPopUp";
import WalletPopup from "./popups/WalletPopUp";
function Navbar() {
  return (
    <div className="flex justify-between items-center h-[108px] py-8   bg-[#FFFFFF] dark:bg-[#0D0D0D]  z-10 border border-solid border-[#7A7A7A]">
      <div className="flex items-center ml-4 gap-4">
        <div className="w-[3rem] h-[3rem]">
          <Image
            src={logo}
            alt="autonomint-dapp"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="text-xl    tracking-tighter text-[#020202] dark:text-[#EEEEEE]">
          <Image
            src={autonomintTxtImage}
            alt="autonomint-dapp"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <div className="flex md:gap-6 sm:gap-2 mr-4">
        <WalletPopup />
        <Button
          variant={"shadowOutline"}
          className="border-[#041A50] h-fit p-[10px]"
        >
          <Moon style={{ width: "24px", height: "24px" }} />
        </Button>
        <NotificationPopup />
        <ReferPopup />
      </div>
    </div>
  );
}

export default Navbar;
