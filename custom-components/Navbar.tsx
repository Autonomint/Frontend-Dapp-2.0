"use client";
import autonomintTxtImage from "@/app/assets/autonomint.svg";
import autonomintTxtImageDark from "@/app/assets/Company Name (1).svg";
import logo from "@/app/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/SvgIcons";
import { Typography } from "@/components/ui/Typography";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NotificationPopup from "./popups/NotificationPopUp";
import ReferPopup from "./popups/ReferPopUp";
import WalletPopup from "./popups/WalletPopUp";
function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center h-[95px] py-8   bg-[#FFFFFF] dark:bg-[#0D0D0D]  z-10 border border-solid border-[#7A7A7A] border-t-0 border-r-0 border-l-0">
      <div className="ml-4 flex-row flex gap-2">
        <div
          onClick={toggleMenu}
          className="w-[44px] h-[44px]  lg:hidden cursor-pointer flex justify-center items-center border-[1px] dark:border-white border-solid border-black"
        >
          <MenuIcon className="dark:stroke-white stroke-black" />
        </div>

        <Link href="/">
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

      <div className="flex md:gap-6 sm:gap-2 mr-4">
        <WalletPopup />
        <Button
          variant={"shadowOutline"}
          className="border-[#041A50] hidden lg:block h-fit p-[10px] dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <Moon style={{ width: "24px", height: "24px" }} />
        </Button>

        <NotificationPopup wrapperClassName={"hidden lg:block"} />
        <ReferPopup wrapperClassName={"hidden lg:block"} />
      </div>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 top-[94px]  bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}

      {/* Menu Links */}
      <div
        className={`w-[70%]  lg:hidden p-4 border-grayLight border-[1px] border-x  border-y  fixed lg:static  flex items-center  bg-white dark:bg-black  z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ top: 94, left: 0, height: "100vh" }}
      >
        <ul className=" px-[20%] py-[5%] flex w-full h-full  justify-start   items-start gap-4 flex-col ">
          {/* <li>
            <Button
              variant={"shadowOutline"}
              className="border-[#041A50] h-fit p-[10px] dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
              onClick={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              <Moon style={{ width: "24px", height: "24px" }} />
            </Button>
          </li>
          <li>
            <NotificationPopupMobile wrapperClassName="" />
          </li>
          <li>
            <ReferPopupMobile wrapperClassName="" />
          </li> */}
          <li>
            <Link onClick={closeMenu} href="/mintusdalist">
              <Typography className="text-[24px]" variant="regular">
                Mint USDa
              </Typography>
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} href="/dcds">
              <Typography className="text-[24px]" variant="regular">
                dCDS
              </Typography>
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} href="/bridge">
              <Typography className="text-[24px]" variant="regular">
                Bridge
              </Typography>
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} href="/farmyourluck">
              <Typography className="text-[24px]" variant="regular">
                Farm You Luck
              </Typography>
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} href="/dashboard/portfolio">
              <Typography className="text-[24px]" variant="regular">
                Dashboard
              </Typography>
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} href="/redeem">
              <Typography className="text-[24px]" variant="regular">
                Redeem
              </Typography>
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} href="/buy">
              <Typography className="text-[24px]" variant="regular">
                Buy
              </Typography>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
