"use client";
import autonomintTxtImage from "@/app/assets/autonomint.svg";
import autonomintTxtImageDark from "@/app/assets/Company Name (1).svg";
import logo from "@/app/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import Image from "next/image";
import NotificationPopup from "./popups/NotificationPopUp";
import ReferPopup from "./popups/ReferPopUp";
import WalletPopup from "./popups/WalletPopUp";
import { useTheme } from "next-themes";
function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  return (
    <div className="flex justify-between items-center h-[108px] py-8   bg-[#FFFFFF] dark:bg-[#0D0D0D]  z-10 border border-solid border-[#7A7A7A]">
      <div className="flex items-center ml-4 gap-4">
        <div className="w-[3rem] h-[3rem]">
          <Image
            src={logo}
            alt="autonomint-dapp"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexShrink: 0,
            }}
          />
        </div>
        <div className="text-xl tracking-tighter text-[#020202]">
          <Image
            className="hidden dark:block w-full flex shrink-0"
            src={autonomintTxtImageDark}
            alt="dark-mode-image"
          />
          <Image
            className="block dark:hidden w-full flex shrink-0"
            src={autonomintTxtImage}
            alt="light-mode-image"
          />
        </div>
      </div>
      <div className="flex md:gap-6 sm:gap-2 mr-4">
        <WalletPopup />
        <Button
          variant={"shadowOutline"}
          className="border-[#041A50] h-fit p-[10px]"
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
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
