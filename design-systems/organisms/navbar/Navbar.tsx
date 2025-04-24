"use client";
import autonomintTxtImage from "@/app/assets/brand-logo-white.svg";
import autonomintTxtImageDark from "@/app/assets/brand-logo-white-pink.svg";
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
import { useEffect, useMemo, useState } from "react";
import { useAccount, useAccountEffect } from "wagmi";
import NotificationPopup from "../../molecule/popups/NotificationPopUp";
import ReferPopup from "../../molecule/popups/ReferPopUp";
import ReferPopupMobile from "../../molecule/popups/ReferPopUpMobile";
import WalletPopup from "../../molecule/popups/WalletPopUp";
import twitter from "@/app/assets/x-social-media-black-icon.svg";

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

  function shareOnTwitter(
    text: string,
    url?: string,
    hashtags?: string,
    via?: string
  ): void {
    // Construct the base Twitter intent URL
    let shareUrl = "https://twitter.com/intent/tweet?";

    // Add the text parameter
    shareUrl += `text=${encodeURIComponent(text)}`;

    // Add the URL parameter if provided
    if (url) {
      shareUrl += `&url=${encodeURIComponent(url)}`;
    }

    // Add the hashtags parameter if provided
    if (hashtags) {
      shareUrl += `&hashtags=${encodeURIComponent(hashtags)}`;
    }

    // Add the via parameter if provided
    if (via) {
      shareUrl += `&via=${encodeURIComponent(via)}`;
    }

    // Open the Twitter share URL in a new window
    window.open(shareUrl, "_blank");
  }

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
            {/* <div className="w-[3rem] h-[3rem]">
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
            </div> */}
            <div className="text-xl hidden lg:block w-[16rem] tracking-tighter text-[#020202]">
              <div
                className=" dark:block hidden w-full  shrink-0"

                // style={{ filter: "brightness(0) invert(1)" }}
              >
                <svg
                  viewBox="0 0 414 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 74.75C19.0842 74.75 38.0171 74.75 57.1069 74.75L32.5688 22.6993H24.6124L0 74.75Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M88.7261 57.0199V33.7303H99.9748V74.2891H89.175V66.9219H88.7525C87.8371 69.2984 86.3144 71.2084 84.1844 72.6519C82.0719 74.0954 79.493 74.8172 76.4476 74.8172C73.7366 74.8172 71.3513 74.201 69.2917 72.9688C67.232 71.7365 65.6213 69.985 64.4595 67.7141C63.3152 65.4432 62.7343 62.7235 62.7167 59.5548V33.7303H73.9654V57.548C73.983 59.9421 74.6256 61.8345 75.893 63.2252C77.1605 64.6159 78.8593 65.3112 80.9893 65.3112C82.3448 65.3112 83.6122 65.0031 84.7917 64.387C85.9711 63.7533 86.9217 62.8203 87.6435 61.588C88.3828 60.3558 88.7437 58.8331 88.7261 57.0199Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M129.86 33.7303V42.18H105.435V33.7303H129.86ZM110.98 24.0131H122.228V61.8257C122.228 62.8643 122.387 63.6741 122.704 64.255C123.021 64.8183 123.461 65.2144 124.024 65.4432C124.605 65.6721 125.274 65.7865 126.031 65.7865C126.559 65.7865 127.087 65.7425 127.615 65.6545C128.143 65.5489 128.548 65.4696 128.83 65.4168L130.599 73.7874C130.036 73.9634 129.243 74.1658 128.222 74.3947C127.201 74.6411 125.96 74.7908 124.499 74.8436C121.788 74.9492 119.412 74.5883 117.37 73.761C115.345 72.9336 113.77 71.6485 112.643 69.9058C111.517 68.163 110.962 65.9625 110.98 63.3044V24.0131Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M153.827 75.0812C149.725 75.0812 146.178 74.2098 143.186 72.4671C140.211 70.7067 137.913 68.2598 136.294 65.1264C134.674 61.9753 133.864 58.3226 133.864 54.1681C133.864 49.9784 134.674 46.3169 136.294 43.1834C137.913 40.0324 140.211 37.5855 143.186 35.8427C146.178 34.0823 149.725 33.2022 153.827 33.2022C157.929 33.2022 161.467 34.0823 164.442 35.8427C167.435 37.5855 169.741 40.0324 171.36 43.1834C172.98 46.3169 173.79 49.9784 173.79 54.1681C173.79 58.3226 172.98 61.9753 171.36 65.1264C169.741 68.2598 167.435 70.7067 164.442 72.4671C161.467 74.2098 157.929 75.0812 153.827 75.0812ZM153.88 66.3674C155.746 66.3674 157.304 65.8393 158.554 64.7831C159.803 63.7093 160.745 62.2482 161.379 60.3998C162.03 58.5514 162.356 56.4478 162.356 54.0889C162.356 51.73 162.03 49.6264 161.379 47.778C160.745 45.9296 159.803 44.4685 158.554 43.3947C157.304 42.3208 155.746 41.7839 153.88 41.7839C151.996 41.7839 150.412 42.3208 149.127 43.3947C147.859 44.4685 146.9 45.9296 146.249 47.778C145.615 49.6264 145.298 51.73 145.298 54.0889C145.298 56.4478 145.615 58.5514 146.249 60.3998C146.9 62.2482 147.859 63.7093 149.127 64.7831C150.412 65.8393 151.996 66.3674 153.88 66.3674Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M190.421 50.841V74.2891H179.173V33.7303H189.893V40.8861H190.368C191.266 38.5273 192.771 36.6613 194.884 35.2882C196.996 33.8975 199.558 33.2022 202.568 33.2022C205.384 33.2022 207.84 33.8183 209.935 35.0505C212.03 36.2828 213.658 38.0432 214.82 40.3316C215.982 42.6025 216.563 45.3135 216.563 48.4645V74.2891H205.314V50.4713C205.332 47.9892 204.698 46.0528 203.413 44.6621C202.128 43.2538 200.359 42.5497 198.105 42.5497C196.591 42.5497 195.253 42.8754 194.092 43.5267C192.947 44.178 192.05 45.1286 191.398 46.3785C190.765 47.6107 190.439 49.0982 190.421 50.841Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M241.802 75.0812C237.7 75.0812 234.153 74.2098 231.16 72.4671C228.185 70.7067 225.888 68.2598 224.268 65.1264C222.649 61.9753 221.839 58.3226 221.839 54.1681C221.839 49.9784 222.649 46.3169 224.268 43.1834C225.888 40.0324 228.185 37.5855 231.16 35.8427C234.153 34.0823 237.7 33.2022 241.802 33.2022C245.903 33.2022 249.442 34.0823 252.417 35.8427C255.409 37.5855 257.715 40.0324 259.335 43.1834C260.954 46.3169 261.764 49.9784 261.764 54.1681C261.764 58.3226 260.954 61.9753 259.335 65.1264C257.715 68.2598 255.409 70.7067 252.417 72.4671C249.442 74.2098 245.903 75.0812 241.802 75.0812ZM241.854 66.3674C243.72 66.3674 245.278 65.8393 246.528 64.7831C247.778 63.7093 248.72 62.2482 249.354 60.3998C250.005 58.5514 250.331 56.4478 250.331 54.0889C250.331 51.73 250.005 49.6264 249.354 47.778C248.72 45.9296 247.778 44.4685 246.528 43.3947C245.278 42.3208 243.72 41.7839 241.854 41.7839C239.971 41.7839 238.387 42.3208 237.101 43.3947C235.834 44.4685 234.875 45.9296 234.223 47.778C233.59 49.6264 233.273 51.73 233.273 54.0889C233.273 56.4478 233.59 58.5514 234.223 60.3998C234.875 62.2482 235.834 63.7093 237.101 64.7831C238.387 65.8393 239.971 66.3674 241.854 66.3674Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M267.147 74.2891V33.7303H277.868V40.8861H278.343C279.188 38.5097 280.596 36.6349 282.568 35.2618C284.54 33.8887 286.898 33.2022 289.645 33.2022C292.426 33.2022 294.794 33.8975 296.748 35.2882C298.702 36.6613 300.004 38.5273 300.656 40.8861H301.078C301.906 38.5625 303.402 36.7053 305.567 35.3146C307.75 33.9063 310.329 33.2022 313.304 33.2022C317.089 33.2022 320.161 34.408 322.519 36.8197C324.896 39.2138 326.084 42.6113 326.084 47.0122V74.2891H314.862V49.2303C314.862 46.977 314.263 45.2871 313.066 44.1604C311.869 43.0338 310.373 42.4705 308.577 42.4705C306.535 42.4705 304.942 43.1218 303.798 44.4245C302.654 45.7095 302.082 47.4083 302.082 49.5207V74.2891H291.176V48.9926C291.176 47.0034 290.604 45.4191 289.46 44.2396C288.333 43.0602 286.846 42.4705 284.997 42.4705C283.747 42.4705 282.621 42.7873 281.617 43.4211C280.632 44.0372 279.848 44.9086 279.267 46.0352C278.686 47.1442 278.396 48.4469 278.396 49.9432V74.2891H267.147Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M332.337 74.2891V33.7303H343.586V74.2891H332.337ZM337.988 28.502C336.315 28.502 334.881 27.9475 333.684 26.8384C332.504 25.7118 331.915 24.3651 331.915 22.7984C331.915 21.2493 332.504 19.9202 333.684 18.8112C334.881 17.6845 336.315 17.1212 337.988 17.1212C339.66 17.1212 341.086 17.6845 342.266 18.8112C343.463 19.9202 344.061 21.2493 344.061 22.7984C344.061 24.3651 343.463 25.7118 342.266 26.8384C341.086 27.9475 339.66 28.502 337.988 28.502Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M358.143 50.841V74.2891H346.894V33.7303H357.615V40.8861H358.09C358.988 38.5273 360.493 36.6613 362.605 35.2882C364.718 33.8975 367.279 33.2022 370.289 33.2022C373.106 33.2022 375.561 33.8183 377.656 35.0505C379.751 36.2828 381.38 38.0432 382.541 40.3316C383.703 42.6025 384.284 45.3135 384.284 48.4645V74.2891H373.035V50.4713C373.053 47.9892 372.419 46.0528 371.134 44.6621C369.849 43.2538 368.08 42.5497 365.827 42.5497C364.313 42.5497 362.975 42.8754 361.813 43.5267C360.669 44.178 359.771 45.1286 359.12 46.3785C358.486 47.6107 358.16 49.0982 358.143 50.841Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M412.138 33.7303V42.18H387.713V33.7303H412.138ZM393.258 24.0131H404.507V61.8257C404.507 62.8643 404.665 63.6741 404.982 64.255C405.299 64.8183 405.739 65.2144 406.303 65.4432C406.883 65.6721 407.552 65.7865 408.309 65.7865C408.837 65.7865 409.366 65.7425 409.894 65.6545C410.422 65.5489 410.827 65.4696 411.108 65.4168L412.877 73.7874C412.314 73.9634 411.522 74.1658 410.501 74.3947C409.48 74.6411 408.239 74.7908 406.778 74.8436C404.067 74.9492 401.69 74.5883 399.648 73.761C397.624 72.9336 396.048 71.6485 394.922 69.9058C393.795 68.163 393.241 65.9625 393.258 63.3044V24.0131Z"
                    fill="#A1FFCE"
                  />
                  <path
                    className="fill-white dark:fill-black"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M27.8555 82.8594L10.5098 74.3359L28.0551 46.6715L45.3509 74.3855L27.8555 82.8594Z"
                  />
                  <path
                    d="M27.6128 83.3573L9.71094 74.5598L28.0589 45.6308L46.1476 74.6161C40.0493 77.5677 33.9502 80.5178 27.8553 83.4766L27.6128 83.3573ZM11.3087 74.1126L27.8563 82.2445L44.5543 74.1564L28.0522 47.7136L11.3087 74.1126Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M27.3499 82.8594V46.9169H28.4605V82.8594H27.3499Z"
                    fill="#A1FFCE"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.0854 79.5519L27.9048 100.391L44.7749 80.403L27.9048 88.1569L11.0854 79.5519Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M10.2759 73.8413L27.6713 65.6632L28.14 66.6656L10.7445 74.8438L10.2759 73.8413Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M45.0664 74.8438L27.6707 66.6656L28.1394 65.6632L45.5351 73.8413L45.0664 74.8438Z"
                    fill="#A1FFCE"
                  />
                </svg>
              </div>

              <Image
                className=" dark:hidden w-full flex shrink-0"
                src={autonomintTxtImage}
                alt="light-mode-image"
              />
            </div>
            <div className="mt-4 ml-[-8px] text-lg  font-medium">BETA</div>
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
          {/* <ReferPopup wrapperClassName={"hidden lg:block"} /> */}

          <Button
            onClick={() => shareOnTwitter("")}
            variant={"shadowOutline"}
            className=" h-fit text-[18px] font-normal  w-full p-[8px] "
          >
            <svg
              className="stroke-black dark:stroke-white"
              width="14"
              height="14"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 19.5L8.5484 11.9516M8.5484 11.9516L1 1.5H6L11.4516 9.0484M8.5484 11.9516L14 19.5H19L11.4516 9.0484M19 1.5L11.4516 9.0484"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
            Share
          </Button>
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
          {/* <ReferPopupMobile /> */}
          {/* <Button
            onClick={() => shareOnTwitter("")}
            variant={"shadowOutline"}
            className="border-[#041A50]  h-fit text-[18px] font-normal  w-full p-[8px] dark:bg-custom-gradient-to-bottom"
          >
            <Image width={24} height={24} alt="twitter" src={twitter} /> Share
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
