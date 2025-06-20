"use client";
import darkboat from "@/app/assets/home-banner-dark.svg";
import boat from "@/app/assets/home-banner.svg";
import {
  nativeTokenAddress,
  testusdtAbiAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { LeftArrowIcon } from "@/design-systems/atoms/SvgIcons";
import ScrollDownArrow from "@/design-systems/molecule/scroll-down-button";
import DCDSHoverElement from "@/design-systems/organisms/home-page/DCDSHoverElement";
import FarmYourLuckHoverElement from "@/design-systems/organisms/home-page/FarmYourLuckHoverElement";
import MintUSDAHoverElement from "@/design-systems/organisms/home-page/MintUSDAHoverElement";
import TransferBetweeHoverElement from "@/design-systems/organisms/home-page/TransferBetweeHoverElement/TransferBetweeHoverElement";
import useFetchOptionFees from "@/hookes/api-hooks/useOptionFee";
import { useTrackUserData } from "@/hookes/api-hooks/useTrackUser";
import useGetTVL from "@/hookes/contract-hooks/useGetTVL";
import useGetTVLUSDA from "@/hookes/contract-hooks/useGetTVLUSDA";
import useGetUsdtAmountDepositedTillNow from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import useMasterPriceOracle from "@/hookes/contract-hooks/useMasterPriceOracle";
import useDeviceType from "@/hookes/useDeviceType";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zeroAddress } from "viem";
import { useAccount } from "wagmi";

export default function HomeTemplate() {
  const router = useRouter();
  const { theme } = useTheme();
  const { chainId, isConnected, address } = useAccount();
  // scroll down btn state
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);

  // state for current hover box of navigation
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // getting omni chain data from blockchain
  const { omniChainData: GlobalContractData, isOmniChainDataPending } =
    useGetUsdtAmountDepositedTillNow();

  // token address based in chain id
  const nativeTokenAdds = nativeTokenAddress[chainId || 0] || zeroAddress;
  // getting price from oracle blockchain
  const { getOraclePrice, getOraclePriceRefetch } =
    useMasterPriceOracle(nativeTokenAdds);

  // getting TVL for USDA USDT Native Token
  const { isTVLPending, tvlValue: tvlValueNative } = useGetTVL(
    nativeTokenAddress[chainId as keyof typeof usDaAddress]
  );
  const { isTVLPending: isTVLPendingUsd, tvlValue: tvlValueUSDa } =
    useGetTVLUSDA(usDaAddress[chainId as keyof typeof usDaAddress]);

  const { isTVLPending: isTVLPendingUsdt, tvlValue: tvlValueUSDT } =
    useGetTVLUSDA(
      testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
    );

  // box option list for navigation
  const items = [
    {
      title: "Mint USDA+",
      subtitle: `TVL - $${(
        Number(GlobalContractData?.totalVolumeOfBorrowersAmountinUSD || 0) /
        1e20
      ).toFixed(2)}`,
    },
    {
      title: "Earn With dCDS",
      subtitle: `TVL - $${(
        Number(GlobalContractData?.totalCdsDepositedAmount ?? 0n) /
        10 ** 6
      ).toFixed(2)}`,
    },
    { title: "Bridge", subtitle: "" },
    { title: "Farm Your Luck", subtitle: "Win Option Fee And Rewards" },
    { title: "Redeem", subtitle: "" },
    { title: "Buy", subtitle: "" },
  ];

  // getting eth price from blockchain
  const { usdValue: ethPrice } = useGetUsdValue();
  console.log(ethPrice, "ethPrice");

  // getting option fee for one ETH
  const { optionFees: oneEthOptionFees } = useFetchOptionFees(
    1,
    (ethPrice || 0) as number,
    5
  );

  // fee list for showing in borrow hover box
  const feesList = [
    {
      orgName: "Autonomint",
      amount: (
        <div className="flex gap-2 items-baseline">
          {oneEthOptionFees.toFixed(2)}
          <span className="text-[14px]">per month</span>
        </div>
      ),
      tag: "Lowest Fee",
      tagColor: "#05A552",
      tagBg: "#a6ffd0",
      textColor: "#05A552",
      borderColor: "borderGreen",
    },
    // {
    //   orgName: "Deribit",
    //   amount: "$220",
    //   tag: "Fee",
    //   tagColor: "#D6A100",
    //   tagBg: "#FFF7E0",
    //   textColor: "#D6A100",
    //   borderColor: "borderYellow",
    // },
    // {
    //   orgName: "Hegic",
    //   amount: "$221",
    //   tag: "Fee",
    //   tagColor: "#b42e2e",
    //   tagBg: "#FEE2E2",
    //   textColor: "#AA0001",
    //   borderColor: "borderRed",
    // },
  ];

  const pairs = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }

  // Custom hook to detect device type
  const deviceType = useDeviceType();

  useEffect(() => {
    // Select DOM elements for animation control
    const animateMint = document.querySelector(".animateMint");
    const animateDCDS = document.querySelector(".animateDCDS");
    const animateTransfer = document.querySelector(".animateTransfer");

    // Select DOM elements for closing animations
    const closeAnimateDCDS = document.querySelector(".closeAnimateDCDS");
    const closeAnimateMint = document.querySelector(".closeAnimateMint");
    const closeAnimateTop = document.querySelector(".closeAnimateTop");
    const closeAnimateButtom = document.querySelector(".closeAnimateButtom");

    // Remove all animation classes
    animateMint?.classList.remove("animatingLeftOpen");
    closeAnimateDCDS?.classList.remove("animatingRightClose");
    animateDCDS?.classList.remove("animatingRightOpen");
    closeAnimateMint?.classList.remove("animatingLeftClose");
    animateTransfer?.classList.remove("animatingButtonOpen");
    closeAnimateTop?.classList.remove("animatingTopClose");
    closeAnimateButtom?.classList.remove("animatingButtomClose");

    // Add animation classes based on hoveredIndex
    if (hoveredIndex === 0) {
      animateMint?.classList.add("animatingLeftOpen");
      closeAnimateDCDS?.classList.add("animatingRightClose");
      closeAnimateButtom?.classList.add("animatingButtomClose");
    }
    if (hoveredIndex === 1) {
      animateDCDS?.classList.add("animatingRightOpen");
      if (deviceType !== "mobile" && deviceType !== "tablet") {
        closeAnimateMint?.classList.add("animatingLeftClose");
      }
      closeAnimateButtom?.classList.add("animatingButtomClose");
    }
    if (hoveredIndex === 2) {
      animateTransfer?.classList.add("animatingButtonOpen");
      closeAnimateTop?.classList.add("animatingTopClose");
    }
    if (hoveredIndex === 3) {
      animateTransfer?.classList.add("animatingButtonOpen");
      closeAnimateTop?.classList.add("animatingTopClose");
    }
  }, [hoveredIndex]);

  // Handle scroll to for center btn of home page
  const handleScroll = () => {
    const bodyElement = document.getElementById("body-scroll-container");

    // Check if the element exists and call scrollIntoView()
    if (bodyElement) {
      bodyElement.scroll({
        behavior: "smooth", // Optional: Add smooth scrolling effect
        top: bodyElement.scrollHeight,
      });
    }
  };

  // Check if the user has scrolled to the bottom
  useEffect(() => {
    const bodyElement = document.getElementById("body-scroll-container");
    bodyElement?.addEventListener("scroll", checkScrollBottom);
  }, []);

  // Check if the user has scrolled to the bottom handler
  const checkScrollBottom = () => {
    const bodyElement = document.getElementById("body-scroll-container");

    if (bodyElement) {
      // Calculate if the user has scrolled to the bottom
      const isAtBottom =
        bodyElement.scrollTop + bodyElement.clientHeight >=
        bodyElement.scrollHeight;

      if (isAtBottom) {
        console.log("User has scrolled to the bottom");
        setIsScrollBottom(true);
        // Perform any action you want when the user reaches the bottom
      } else {
        setIsScrollBottom(false);
        console.log("User has NOT scrolled to the bottom yet");
      }
    }
  };

  // get user tracking data and setter function
  const {
    userTrackingData,
    setUserTrackLocalStorageData,
    getUserTrackLocalStorageData,
  } = useTrackUserData();

  // update user tracking data
  useEffect(() => {
    const data = getUserTrackLocalStorageData();
    setUserTrackLocalStorageData({
      ...data,
      homePage: {
        count: (data?.homePage?.count || 0) + 1,
        visited: true,
        enterTimestamp: data?.homePage?.count
          ? data?.homePage?.enterTimestamp
          : new Date().toISOString(),
        exitTimestamp: new Date().toISOString(),
      },
    });
  }, []);

  // update user tracking data
  useEffect(() => {
    const data = getUserTrackLocalStorageData();
    setUserTrackLocalStorageData({
      ...data,
      address,
      chainId,
    });
  }, [isConnected]);

  return (
    <div className="w-full">
      <div className="w-full h-[40px] bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top flex justify-center items-center">
        <p className="text-[15px] font-medium dark:text-white  text-black">
          Note: This dApp is in beta. While it has been audited, features are
          still evolving. Use at your own risk.
        </p>
      </div>
      <Image
        className=" hidden h-full  dark:lg:block w-full"
        src={darkboat}
        alt="dark-mode-image"
      />
      <Image
        className="lg:block  full hidden dark:hidden w-full"
        src={boat}
        alt="light-mode-image"
      />
      <div
        className={`block  w-full h-[137px] sm:h-[200px] full lg:hidden ${
          theme == "light"
            ? "home-banner-container"
            : "home-banner-dark-container"
        }`}
      ></div>

      <div className="border-[1px] overflow-hidden  border-t-grayLight">
        {/* 1st row */}
        <div className={`flex-col lg:flex lg:flex-row closeAnimateTop    `}>
          <div
            className={`relative  closeAnimateMint cursor-pointer  ${
              hoveredIndex === 0
                ? "w-full lg:w-[80%] sm:h-[360px] md:h-[400px] lg:!h-[490px]  xl:!h-[560px] 3xl:!h-[630px]"
                : // height and width style based on hoveredIndex
                hoveredIndex === 1
                ? "lg:w-[40%]  lg:!h-[490px] md:h-[400px]  xl:!h-[560px]  3xl:!h-[630px]"
                : "w-full lg:w-[50%]"
            } h-[300px] lg:h-[400px] ${
              // Border style based on hoveredIndex
              hoveredIndex === null || hoveredIndex === 2
                ? " border-x border-y lg:border-x lg:border-y-0 border-[1px]  border-grayLight"
                : " border-x border-y lg:border-b-0 lg:border-r-0 border-[1px]  border-grayLight lg:border-y-0"
            }`}
            onMouseEnter={() => {
              setHoveredIndex(0);
              setCurrentIndex(1);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setCurrentIndex(null);
            }}
            style={{
              transition: "width 0.3s ease-in, height 0.3s ease-in",
            }}
          >
            <div className={" h-full flex flex-col justify-between"}>
              {hoveredIndex === 0 ? (
                <MintUSDAHoverElement feesList={feesList} />
              ) : (
                <div className="h-full flex flex-col justify-between items-start  p-4">
                  <h3 className="font-medium  text-[32px] lg:text-[42px]  mb-2">
                    {items[0].title}
                  </h3>
                  {items[0].subtitle && (
                    <p className="text-[24px] lg:text-[32px] text-grayLight">
                      {items[0].subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className={`relative closeAnimateDCDS cursor-pointer  ${
              hoveredIndex === 1
                ? // height and width style based on hoveredIndex
                  "w-full lg:w-[60%]  sm:h-[360px] md:h-[400px] lg:!h-[490px]  xl:!h-[560px]  3xl:!h-[630px]"
                : hoveredIndex === 0
                ? // height and width style based on hoveredIndex
                  " w-full lg:w-[30%] lg:!h-[490px] md:h-[400px]  xl:!h-[560px]  3xl:!h-[630px]"
                : "w-full lg:w-[50%]"
            } h-[300px]  lg:h-[400px] ${
              // Border style based on hoveredIndex
              hoveredIndex === null
                ? "border-x border-y lg:border-x lg:border-y-0  border-[1px]  border-grayLight"
                : hoveredIndex === 3
                ? " border-x border-y lg:border-y-0 border-[1px]  border-grayLight"
                : ""
            }`}
            onMouseEnter={() => {
              setHoveredIndex(1);
              setCurrentIndex(1);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setCurrentIndex(null);
            }}
            style={{
              transition: "width 0.3s ease-in, height 0.3s ease-in",
            }}
          >
            <div className={" h-full flex flex-col justify-between"}>
              {hoveredIndex === 1 ? (
                <DCDSHoverElement />
              ) : (
                <div className={"p-4 h-full flex flex-col justify-between"}>
                  <h3 className="font-medium text-[32px]  lg:text-[42px]  mb-2">
                    {items[1].title}
                  </h3>
                  {items[1].subtitle && (
                    <p className="text-grayLight text-[24px] lg:text-[32px]">
                      {items[1].subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>{" "}
        </div>

        {/* 2nd row */}
        <div
          className={`flex lg:flex-row flex-col animateTransfer closeAnimateButtom w-full border-b-grayLight border-t-grayLight border-[1px]`}
        >
          {/* Bridge Section */}
          <div
            className={`relative cursor-pointer ${
              // height and width style based on hoveredIndex
              hoveredIndex === 3 ? "w-full lg:w-[40%]" : "w-full lg:w-[80%]"
            } ${
              // Border style based on hoveredIndex
              hoveredIndex === null
                ? "border-x border-y border-[1px] border-grayLight"
                : " border-x border-y lg:border-b-[1px] lg:border-l border-[1px] border-grayLight"
            } h-[300px] lg:h-[400px]  ${
              hoveredIndex === 2 || hoveredIndex === 3 ? "  lg:!h-[450px]" : ""
            }`}
            onMouseEnter={() => {
              setHoveredIndex(2);
              setCurrentIndex(2);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setCurrentIndex(null);
            }}
            style={{
              transition: "width 0.3s ease-in, height 0.3s ease-in",
            }}
          >
            <div className={"h-full flex flex-col justify-between"}>
              {hoveredIndex === 2 ? (
                <TransferBetweeHoverElement />
              ) : (
                <div className={"p-4 h-full flex flex-col justify-between"}>
                  <h3 className="font-medium text-[32px] lg:text-[42px] mb-2">
                    {items[2].title}
                  </h3>
                  {items[2].subtitle && (
                    <p className="text-grayLight text-[24px]  lg:text-[32px]">
                      {items[2].subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className={`relative cursor-pointer ${
              // height and width style based on hoveredIndex
              hoveredIndex === 3 ? "w-full lg:w-[60%]" : "w-full lg:w-[40%]"
            } ${
              // Border style based on hoveredIndex
              hoveredIndex === null
                ? "border-x border-y border-[1px] border-grayLight"
                : "border-x border-y border-[1px] border-grayLight lg:border-0 "
            } h-[300px] lg:h-[400px] ${
              hoveredIndex === 2 || hoveredIndex === 3 ? "lg:!h-[450px] " : ""
            }`}
            onMouseEnter={() => {
              setHoveredIndex(3);
              setCurrentIndex(2);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setCurrentIndex(null);
            }}
            onClick={() => {
              router.push("/farmyourluck");
            }}
            style={{
              transition: "width 0.3s ease-in, height 0.3s ease-in",
            }}
          >
            <div className={"p-0 h-full flex flex-col justify-between"}>
              {hoveredIndex === 3 ? (
                <FarmYourLuckHoverElement />
              ) : (
                <div className={"p-4 h-full flex flex-col justify-between"}>
                  <h3 className="font-medium text-[32px] lg:text-[42px] mb-2">
                    {items[3].title}
                  </h3>
                  {items[3].subtitle && (
                    <p className="text-grayLight text-[24px] lg:text-[32px]">
                      {items[3].subtitle}
                    </p>
                  )}
                </div>
              )}

              {/* {hoveredIndex === 3 && (
                <Button className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[108px] hover:bg-textBlack dark:bg-custom-gradient-to-bottom">
                  Reward
                  <Image src={arrow} width={42} height={42} alt="arrow" />
                </Button>
              )} */}
            </div>
          </div>
        </div>

        {/* 3nd row */}
        <div>
          <div
            className={`flex flex-col lg:flex-row mt-[-2px] animateTransfer closeAnimateButtom w-full  `}
          >
            {/* Dashboard Section  for mobile and tablet*/}{" "}
            <div
              className={`relative cursor-pointer group hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]   h-[80px] lg:h-[118px] w-full lg:w-[50%] border-t border-x border-y border-[1px]  border-grayLight dark:hover:bg-custom-gradient-to-top`}
              onClick={() => {
                router.push("/redeem");
              }}
              style={{
                transition: "width 0.3s ease-in, height 0.3s ease-in",
              }}
            >
              <div
                className={
                  "p-4 h-full flex flex-row  justify-between items-center"
                }
              >
                <h3 className="font-medium text-[32px] lg:text-[42px]">
                  {items[4].title}
                </h3>
                <div className="hidden group-hover:flex items-center">
                  <LeftArrowIcon width={42} height={42} />
                </div>
              </div>
            </div>{" "}
            <div
              className={`relative cursor-pointer group hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]  h-[80px] lg:h-[118px] w-full lg:w-[50%] 
                 border-t border-l-0 border-x border-y border-[1px]  border-grayLight dark:hover:bg-custom-gradient-to-top
                `}
              style={{
                transition: "width 0.3s ease-in, height 0.3s ease-in",
              }}
            >
              <div
                className={
                  "p-4 h-full flex flex-row  justify-between items-center"
                }
              >
                <h3 className="font-medium text-[32px] lg:text-[42px]  ">
                  {items[5].title}
                </h3>
                <div className="hidden group-hover:flex items-center">
                  <LeftArrowIcon width={42} height={42} />
                </div>
              </div>
            </div>{" "}
          </div>
          <div
            className={`relative  cursor-pointer group hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]   h-[80px] lg:h-[118px] w-full  border-t border-x border-y border-[1px]  border-grayLight dark:hover:bg-custom-gradient-to-top`}
            onClick={() => {
              router.push("/dashboard/portfolio");
            }}
            style={{
              transition: "width 0.3s ease-in, height 0.3s ease-in",
            }}
          >
            <div
              className={
                "p-4 h-full flex flex-row  justify-between items-center"
              }
            >
              <h3 className="font-medium text-[32px] lg:text-[42px]  ">
                Dashboard
              </h3>
              <div className="hidden group-hover:flex items-center">
                <LeftArrowIcon width={42} height={42} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll down arrow button  */}
      {!isScrollBottom && (
        <ScrollDownArrow
          handleClick={() => handleScroll()}
          classNames="bottom-10 right-[unset] top-[unset] w-[42px] left-[44%] xl:left-[48.8%] transform -translate-x-1/2  z-9  dark:bg-black bg-white shadow-xl rounded-full dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] border-grayLight border"
        />
      )}
    </div>
  );
}
