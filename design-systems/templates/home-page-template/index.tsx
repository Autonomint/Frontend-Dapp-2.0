"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import darkboat from "@/app/assets/home-banner-dark.svg";
import boat from "@/app/assets/home-banner.svg";
import bannerMobileImage from "@/app/assets/mobile banner background Image.svg";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoMdInformationCircleOutline } from "react-icons/io";
import PriceComparison from "@/custom-components/PriceComparison";
import PriceGraph from "@/app/assets/Chart.png";
import DCDSHover from "@/app/assets/Chart.svg";
import LTVDark from "@/app/assets/LTV Details.svg";
import LTV from "@/app/assets/LTV-range-image.svg";
import arrow from "@/app/assets/arrow-right-02.png";
import ModeImage from "@/app/assets/mode.png";
import OptimismImage from "@/app/assets/optimism.png";

import {
  DotIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@/components/ui/SvgIcons";
import { Typography } from "@/components/ui/Typography";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useFetchOptionFees from "@/hookes/api-hooks/useOptionFee";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import { useTheme } from "next-themes";
import infinityImage from "@/app/assets/infinity.svg";
import useDeviceType from "@/hookes/useDeviceType";

function TransferBetweeHoverElement() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/bridge");
      }}
      className="flex  border-[1px] border-top border-grayLight flex-col  gap-4 lg:gap-8 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-2 lg:p-8 relative  dark:bg-custom-gradient-to-top"
    >
      <div className=" text-textBlack text-[24px] lg:text-[38px] font-medium dark:text-white bg-none">
        Transfer Between
      </div>
      <div className="flex-col gap-6 lg:gap-0 flex xl:flex-row justify-between items-start lg:items-start xl:items-end bg-none">
        <div className="flex gap-3 bg-none">
          <div className="flex flex-col bg-none">
            <Image
              src={ModeImage}
              alt="Price Graph"
              className=" w-[65px] h-[65px] lg:w-[100px] lg:h-[100px]  xl:w-[130px] xl:h-[130px]"
              style={{
                backgroundColor: theme == "dark" ? "unset !important" : "",
              }}
            />
            <div className=" text-grayLight text-center text-[18px] lg:text-[32px] font-light bg-none dark:text-white">
              From
            </div>
          </div>
          <div className="flex items-center pb-6 lg:pb-9  justify-center gap-3 bg-none">
            <RightArrowIcon className="w-7 h-7" />

            <DotIcon className="w-2  h-2" />
            <LeftArrowIcon
              className="w-7 h-7"
              style={{
                backgroundColor: theme == "dark" ? "unset !important" : "",
              }}
            />
          </div>
          <div className="flex flex-col bg-none">
            <Image
              className=" w-[65px] h-[65px] lg:w-[100px] lg:h-[100px]  xl:w-[130px] xl:h-[130px]"
              src={OptimismImage}
              alt="Price Graph"
              style={{
                backgroundColor: theme == "dark" ? "unset !important" : "",
              }}
            />
            <div className=" text-center text-grayLight text-[18px] lg:text-[32px] font-light bg-none dark:text-white">
              To
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3 items-center bg-none">
          <Image
            className="mb-3"
            src={infinityImage}
            alt="alt"
            style={{
              backgroundColor: theme == "dark" ? "unset !important" : "",
            }}
          />
          <Typography
            variant="regular"
            size="subtitle"
            className="text-center mb-3  text-grayLight  font-light bg-none"
          >
            Layer Zero Integration
          </Typography>
        </div>
      </div>
      <Button className="absolute bottom-0 lg:px-6 px-3  left-0 w-full mt-13 bg-textBlack text-white text-[24px] lg:text-[32px] flex justify-between h-[60px] lg:h-[102px] hover:bg-textBlack dark:bg-home-btn-bg">
        Bridge
        <Image
          src={arrow}
          width={42}
          height={42}
          alt="arrow"
          className="bg-none"
        />
      </Button>
    </div>
  );
}

function FarmYourLuckHoverElement() {
  return (
    <div className="flex flex-col border-x border-y border-[1px] border-grayLight overflow-y-hidden animateDCDS gap-8 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-2 lg:p-8 relative dark:bg-custom-gradient-to-top">
      <div className="text-textBlack text-[26px] sm:text-[32px] lg:text-[38px] font-medium dark:text-white bg-none">
        Explore incentives from our partners
      </div>
      <div className="lg:text-[24px] text-[20px] text-grayLight font-medium bg-none">
        Claim back 100% of your Option fees
      </div>
      <Button className="absolute lg:px-6 px-3 bottom-0 left-0 w-full mt-13 bg-textBlack text-white  text-[24px] lg:text-[32px] flex justify-between h-[60px] lg:h-[108px] hover:bg-textBlack dark:bg-home-btn-bg">
        Farm your luck
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

function DCDSHoverElement() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/dcds");
      }}
      className="flex flex-col border-x border-y border-[1px]   border-grayLight overflow-y-hidden animateDCDS 2xl:gap-8 gap-2 lg:gap-10 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-3 lg:p-8 relative  dark:bg-custom-gradient-to-top"
    >
      <div className=" text-textBlack text-[20px] lg:text-[32px] 2xl:text-[38px] font-medium dark:text-white">
        Earn high yields by offering dCDS protection
      </div>
      <Image
        src={PriceGraph}
        alt="Price Graph"
        className="2xl:w-[900px] w-[900px] object-fit block dark:hidden"
      />
      <Image
        src={DCDSHover}
        alt="Price Graph"
        className="2xl:w-[900px] w-[900px] object-fit hidden dark:block"
      />
      <div className=" text-textBlack text-[18px] lg:text-[32px] 2xl:text-[38px] 2xl:pb-12 pb-8 font-medium dark:text-white flex items-center gap-4">
        Get up to 200% APY
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <IoMdInformationCircleOutline
                height={32}
                width={32}
                className="cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Exposed to volatility risk</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button className="absolute lg:px-6 px-2 bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[24px]  lg:text-[32px] flex justify-between h-[60px] lg:h-[108px] hover:bg-textBlack dark:gradient-to-bottom   dark:bg-home-btn-bg">
        Earn
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}
interface FeeDetail {
  orgName: string;
  amount: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  textColor: string;
  borderColor: string;
}
function MintUSDAHoverElement({ feesList }: { feesList: FeeDetail[] }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/mintusdalist");
      }}
      className="flex flex-col animateMint border-x border-y border-[1px] overflow-y-hidden  border-grayLight gap-2 lg:gap-4 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top p-3 lg:p-6 relative"
    >
      <div className="text-textBlack text-[28px] lg:text-[38px] font-medium dark:text-white bg-none">
        100% Synthetic LTV
      </div>
      <div>
        <Image
          className="hidden dark:block w-full"
          src={LTVDark}
          alt="dark-mode-image"
        />
        <Image
          className="block dark:hidden w-full"
          src={LTV}
          alt="light-mode-image"
        />
      </div>
      <div className="flex justify-between bg-none">
        <span className=" font-medium text-sm lg:text-lg text-grayLight bg-none">
          80% Stablecoin
        </span>
        <span className=" font-medium text-sm lg:text-lg text-grayLight bg-none">
          20% Downside Protection
        </span>
      </div>
      <div className=" hidden xl:block text-[20px] lg:text-[32px] text-textBlack font-medium dark:text-white bg-none">
        Fee Comparison
      </div>
      <div className="  xl:hidden text-[20px] lg:text-[32px] text-textBlack font-medium dark:text-white bg-none">
        Fee
      </div>
      <div className=" hidden xl:flex  lg:flex-wrap gap-2 sm:gap-3 lg:gap-3 lg:justify-around  2xl:gap-8 xl:ml-6  xl:mb-20 bg-none">
        {feesList.map((feeCom, idx) => {
          return (
            <PriceComparison
              key={idx}
              orgName={feeCom.orgName}
              tag={feeCom.tag}
              amount={feeCom.amount}
              tagColor={feeCom.tagColor}
              textColor={feeCom.textColor}
              tagBg={feeCom.tagBg}
              borderColor={feeCom.borderColor}
            />
          );
        })}
      </div>
      <div className="  xl:hidden gap-6 2xl:gap-8 lg:ml-6 mb-20 bg-none">
        <PriceComparison
          orgName={feesList[0].orgName}
          tag={""}
          amount={feesList[0].amount}
          tagColor={feesList[0].tagColor}
          textColor={feesList[0].textColor}
          tagBg={feesList[0].tagBg}
          borderColor={feesList[0].borderColor}
        />
      </div>
      <Button className="absolute px-2 lg:px-6 bottom-0 left-0 w-full lg:mt-13 bg-textBlack text-white text-[20px] lg:text-[32px] flex justify-between  h-[60px] lg:h-[102px] hover:bg-textBlack dark:bg-home-btn-bg">
        Mint USDa
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}
export default function HomeTemplate() {
  const items = [
    { title: "Mint USDA", subtitle: "TVL - $100,000" },
    { title: "dCDS", subtitle: "TVL - $100,000" },
    { title: "Bridge", subtitle: "TVL - $100,000" },
    { title: "Farm Your Luck", subtitle: "Earn Option Fee" },
    { title: "Redeem ABOND", subtitle: "" },
    { title: "Buy", subtitle: "" },
  ];

  const router = useRouter();
  const { theme } = useTheme();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const { usdValue: ethPrice } = useGetUsdValue();

  const { optionFees: oneEthOptionFees } = useFetchOptionFees(
    1,
    (ethPrice || 0) as number,
    0
  );

  const feesList = [
    {
      orgName: "Autonomint",
      amount: `$${oneEthOptionFees.toFixed(2)}`,
      tag: "Lowest Fee",
      tagColor: "#05A552",
      tagBg: "#05A552",
      textColor: "white",
      borderColor: "borderGreen",
    },
    {
      orgName: "Deribit",
      amount: "$280",
      tag: "Lowest Fee",
      tagColor: "#D6A100",
      tagBg: "#FFF7E0",
      textColor: "#D6A100",
      borderColor: "borderYellow",
    },
    {
      orgName: "Hegic",
      amount: "$272",
      tag: "Lowest Fee",
      tagColor: "#b42e2e",
      tagBg: "#FEE2E2",
      textColor: "#AA0001",
      borderColor: "borderRed",
    },
  ];

  const pairs = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  const deviceType = useDeviceType();

  useEffect(() => {
    const animateMint = document.querySelector(".animateMint");
    const animateDCDS = document.querySelector(".animateDCDS");
    const animateTransfer = document.querySelector(".animateTransfer");

    const closeAnimateDCDS = document.querySelector(".closeAnimateDCDS");
    const closeAnimateMint = document.querySelector(".closeAnimateMint");
    const closeAnimateTop = document.querySelector(".closeAnimateTop");
    const closeAnimateButtom = document.querySelector(".closeAnimateButtom");

    animateMint?.classList.remove("animatingLeftOpen");
    closeAnimateDCDS?.classList.remove("animatingRightClose");
    animateDCDS?.classList.remove("animatingRightOpen");
    closeAnimateMint?.classList.remove("animatingLeftClose");
    animateTransfer?.classList.remove("animatingButtonOpen");
    closeAnimateTop?.classList.remove("animatingTopClose");
    closeAnimateButtom?.classList.remove("animatingButtomClose");

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

  return (
    <div className="w-full">
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

      <div className="border-[1px] overflow-hidden  border-t-grayLight ">
        {/* 1st row */}
        <div className={`flex-col lg:flex lg:flex-row closeAnimateTop  `}>
          <div
            className={`relative  closeAnimateMint cursor-pointer  ${
              hoveredIndex === 0
                ? "w-full lg:w-[80%] sm:h-[350px]  lg:!h-[550px]"
                : hoveredIndex === 1
                ? "lg:w-[40%] lg:!h-[550px]"
                : "w-full lg:w-[50%]"
            } h-[300px] lg:h-[400px] ${
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
                    <p className="text-[24px] lg:text-[32px] text-gray-600">
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
                ? "w-full lg:w-[60%]  sm:h-[350px]   lg:!h-[550px]"
                : hoveredIndex === 0
                ? " w-full lg:w-[30%] lg:!h-[550px]"
                : "w-full lg:w-[50%]"
            } h-[300px]  lg:h-[400px] ${
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
                    <p className="text-gray-600 text-[24px] lg:text-[32px]">
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
              hoveredIndex === 3 ? "w-full lg:w-[40%]" : "w-full lg:w-[80%]"
            } ${
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
                    <p className="text-gray-600 text-[24px]  lg:text-[32px]">
                      {items[2].subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className={`relative cursor-pointer ${
              hoveredIndex === 3 ? "w-full lg:w-[60%]" : "w-full lg:w-[40%]"
            } ${
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
              // router.push("/farmyourluck");
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
                    <p className="text text-[24px] lg:text-[32px]">
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

        <div>
          <div
            className={`flex flex-col lg:flex-row mt-[-2px] animateTransfer closeAnimateButtom w-full  `}
          >
            <div
              className={`relative lg:hidden cursor-pointer group hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]   h-[80px] lg:h-[118px] w-full lg:w-[50%] border-t border-x border-y border-[1px]  border-grayLight dark:hover:bg-custom-gradient-to-top`}
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
            </div>{" "}
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
        </div>
      </div>
    </div>
  );
}
