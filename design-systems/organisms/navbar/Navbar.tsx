"use client";
import autonomintTxtImage from "@/app/assets/autonomint.svg";
import autonomintTxtImageDark from "@/app/assets/Company Name (1).svg";
import logo from "@/app/assets/logo.svg";
import { config } from "@/blockchain/WalletConfigs/iindex";
import { Button } from "@/design-systems/atoms/button";
import { CloseIcon, MenuIcon } from "@/design-systems/atoms/SvgIcons";
import { Typography } from "@/design-systems/atoms/Typography";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import { useDisconnect } from "@reown/appkit/react";
import { watchAccount } from "@wagmi/core";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useAccountEffect } from "wagmi";
import NotificationPopup from "../../molecule/popups/NotificationPopUp";
import ReferPopup from "../../molecule/popups/ReferPopUp";
import ReferPopupMobile from "../../molecule/popups/ReferPopUpMobile";
import WalletPopup from "../../molecule/popups/WalletPopUp";

function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isConnected } = useCheckWalletConnection();
  const { disconnect } = useDisconnect();

  const [systemThemeDark, setSystemThemeDark] = useState<boolean>();

  const { address } = useAccount();

  // Use this code snippet in your app.
  // If you need more information about configurations or implementing the sample code, visit the AWS docs:
  // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

  useAccountEffect({
    onConnect(data) {
      localStorage.setItem("currentAddress", data.address as string);
    },
    onDisconnect() {
      localStorage.removeItem("currentAddress");
    },
  });

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setSystemThemeDark(prefersDarkMode);
    const unwatch = watchAccount(config, {
      onChange(data) {
        const currentAddress = localStorage.getItem("currentAddress");
        if (
          data.address &&
          currentAddress != null &&
          currentAddress?.toLocaleLowerCase() !=
            data.address.toLocaleLowerCase()
        ) {
          localStorage.removeItem("verified");
          disconnect();
        }
        console.log(data, ">>>>");
      },
    });

    // unwatch();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const pathName = usePathname();

  const isPolicyPage = pathName == "/terms-policy";

  return (
    <div className="flex justify-between items-center h-[95px] py-6  lg:py-8    bg-[#FFFFFF] dark:bg-[#0D0D0D]  z-10 border border-solid border-[#7A7A7A] border-t-0 border-r-0 border-l-0">
      <div className="ml-4 flex-row flex gap-2">
        <div
          onClick={toggleMenu}
          className="w-[44px] h-[44px]  lg:hidden cursor-pointer flex justify-center items-center border-[1px] dark:border-white border-solid border-black"
        >
          {isOpen ? (
            <CloseIcon className="dark:stroke-white stroke-black" />
          ) : (
            <MenuIcon className="dark:stroke-white stroke-black" />
          )}
        </div>

        <Link onClick={closeMenu} href="/">
          <div className="flex justify-start  items-center  gap-4">
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
            <div className="text-xl hidden lg:block  tracking-tighter text-[#020202]">
              <Image
                className=" dark:block hidden w-full  shrink-0"
                src={autonomintTxtImageDark}
                alt="dark-mode-image"
              />
              <Image
                className=" dark:hidden w-full flex shrink-0"
                src={autonomintTxtImage}
                alt="light-mode-image"
              />
            </div>
          </div>
        </Link>
      </div>

      {!isPolicyPage && isClient && (
        <div className="flex md:gap-6 sm:gap-2 mr-4">
          <WalletPopup />
          <Button
            variant={"shadowOutline"}
            className="border-[#041A50] hidden lg:block h-fit p-[10px] dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
            onClick={() =>
              theme == "dark"
                ? setTheme("light")
                : theme == "light"
                ? setTheme("dark")
                : systemThemeDark
                ? setTheme("light")
                : setTheme("dark")
            }
          >
            {theme == "dark" ? (
              <Sun style={{ width: "24px", height: "24px" }} />
            ) : theme == "light" ? (
              <Moon style={{ width: "24px", height: "24px" }} />
            ) : systemThemeDark ? (
              <Sun style={{ width: "24px", height: "24px" }} />
            ) : (
              <Moon style={{ width: "24px", height: "24px" }} />
            )}
          </Button>

          <NotificationPopup wrapperClassName={"hidden lg:block"} />
          <ReferPopup wrapperClassName={"hidden lg:block"} />
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 top-[94px]  bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}

      {/* Menu Links */}
      <div
        className={`w-[100%]      h-[calc(100vh-95px)]  lg:hidden  border-grayLight border-[1px] border-x  border-y  fixed lg:static  flex flex-col items-center  bg-white dark:bg-black  z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ top: 94, left: 0 }}
      >
        <ul className="  flex w-full overflow-y-scroll no-scrollbar    min-h-[calc(100%-73px)] justify-start   items-start flex-col  ">
          <li className="py-5 px-6 border-b border-[1px] border-grayLight w-full border-y-0 border-r-0 border-l-0">
            <Link onClick={closeMenu} href="/mintusdalist">
              <Typography
                className="text-[32px] font-medium "
                variant="regular"
              >
                Mint USDa
              </Typography>
            </Link>
          </li>
          <li className="py-5 px-6 border-b border-[1px] border-grayLight w-full border-y-0 border-r-0 border-l-0">
            <Link onClick={closeMenu} href="/dcds">
              <Typography
                className="text-[32px] font-medium "
                variant="regular"
              >
                dCDS
              </Typography>
            </Link>
          </li>
          <li className="py-5 px-6 border-b border-[1px] border-grayLight w-full border-y-0 border-r-0 border-l-0">
            <Link onClick={closeMenu} href="/bridge">
              <Typography
                className="text-[32px] font-medium "
                variant="regular"
              >
                Bridge
              </Typography>
            </Link>
          </li>
          <li className="py-5 px-6 border-b border-[1px] border-grayLight w-full border-y-0 border-r-0 border-l-0">
            <Link onClick={closeMenu} href="/farmyourluck">
              <Typography
                className="text-[32px] font-medium "
                variant="regular"
              >
                Farm You Luck
              </Typography>
            </Link>
          </li>
          <li className="py-5 px-6 border-b border-[1px] border-grayLight w-full border-y-0 border-r-0 border-l-0">
            <Link onClick={closeMenu} href="/dashboard/portfolio">
              <Typography
                className="text-[32px] font-medium "
                variant="regular"
              >
                Dashboard
              </Typography>
            </Link>
          </li>
          <li className="py-5 px-6 border-b border-[1px] border-grayLight w-full border-y-0 border-r-0 border-l-0">
            <Link onClick={closeMenu} href="/redeem">
              <Typography
                className="text-[32px] font-medium "
                variant="regular"
              >
                Redeem ABOND
              </Typography>
            </Link>
          </li>
          <li className="py-5 px-6 border-b border-[1px] border-grayLight  w-full border-y-0 border-r-0 border-l-0">
            <Link onClick={closeMenu} href="/buy">
              <Typography
                className="text-[32px] font-medium "
                variant="regular"
              >
                Buy
              </Typography>
            </Link>
          </li>
        </ul>

        <div className=" gap-6 p-3 w-full border-t flex-row flex justify-center items-center border-grayLight border-[1px]">
          {isClient && (
            <Button
              variant={"shadowOutline"}
              className="border-[#041A50]  lg:hidden h-fit p-[10px] dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
              onClick={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              {theme == "dark" ? (
                <Sun style={{ width: "24px", height: "24px" }} />
              ) : (
                <Moon style={{ width: "24px", height: "24px" }} />
              )}
            </Button>
          )}
          <ReferPopupMobile />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
