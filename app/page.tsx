"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import boat from "./assets/home-banner.svg";
import darkboat from "./assets/home-banner-dark.svg";

import { Button } from "@/components/ui/button";
import PriceGraph from "./assets/Chart.png";
import ModeImage from "./assets/mode.png";
import OptimismImage from "./assets/optimism.png";
import arrow from "./assets/arrow-right-02.png";
import PriceComparison from "../custom-components/PriceComparison";
import { useRouter } from "next/navigation";
import LTV from "./assets/LTV-range-image.svg";
import { IoMdInformationCircleOutline } from "react-icons/io";

import {
  DotIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@/components/ui/SvgIcons";
import { Typography } from "@/components/ui/Typography";
import infinityImage from "./assets/infinity.svg";
import { useTheme } from "next-themes";
function TransferBetweeHoverElement() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/bridge");
      }}
      className="flex  border-[1px] border-top border-grayLight flex-col gap-8 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative bg-none dark:bg-custom-gradient-to-top"
    >
      <div className=" text-textBlack text-[38px] font-medium dark:text-white bg-none">
        Transfer Between
      </div>
      <div className="flex justify-between items-end bg-none">
        <div className="flex gap-3 bg-none">
          <div className="flex flex-col bg-none">
            <Image
              width={130}
              height={130}
              src={ModeImage}
              alt="Price Graph"
              style={{
                backgroundColor: theme == "dark" ? "unset !important" : "",
              }}
            />
            <div className=" text-grayLight text-center text-[32px] font-light bg-none dark:text-white">
              Mode
            </div>
          </div>
          <div className="flex items-center pb-9  justify-center gap-3 bg-none">
            <RightArrowIcon />

            <DotIcon />
            <LeftArrowIcon
              style={{
                backgroundColor: theme == "dark" ? "unset !important" : "",
              }}
            />
          </div>
          <div className="flex flex-col bg-none">
            <Image
              width={130}
              height={130}
              src={OptimismImage}
              alt="Price Graph"
              style={{
                backgroundColor: theme == "dark" ? "unset !important" : "",
              }}
            />
            <div className=" text-center text-grayLight text-[32px] font-light bg-none dark:text-white">
              Optimism
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center bg-none">
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
      <Button className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[102px] hover:bg-textBlack dark:bg-custom-gradient-to-bottom">
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
    <div className="flex flex-col border-x border-y border-[1px] border-grayLight overflow-y-hidden animateDCDS gap-8 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative dark:bg-custom-gradient-to-top">
      <div className="text-textBlack text-[38px] font-medium dark:text-white bg-none">
        Explore incentives from our partners
      </div>
      <div className="text-[24px] text-grayLight font-medium bg-none">
        Claim back 100% of your Option fees
      </div>
      <Button className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[108px] hover:bg-textBlack dark:bg-custom-gradient-to-bottom">
        Reward
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
      className="flex flex-col border-x border-y border-[1px]   border-grayLight overflow-y-hidden animateDCDS gap-8 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative  dark:bg-custom-gradient-to-top"
    >
      <div className=" text-textBlack text-[38px] font-medium dark:text-white">
        $1,000 Invested would have become $3,000
      </div>
      <Image
        src={PriceGraph}
        alt="Price Graph"
        className="w-[900px] object-fit"
      />
      <div className=" text-textBlack text-[38px] pb-12 font-medium dark:text-white flex items-center gap-4">
        Get up to 200% APY
        <IoMdInformationCircleOutline height={32} width={32} />
      </div>
      <Button className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[108px] hover:bg-textBlack  dark:bg-custom-gradient-to-bottom">
        Earn
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

function MintUSDAHoverElement() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/mintusdalist");
      }}
      className="flex flex-col animateMint border-x border-y border-[1px] overflow-y-hidden  border-grayLight gap-4 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top p-6 relative"
    >
      <div className="text-textBlack text-[38px] font-medium dark:text-white bg-none">
        100% Synthetic LTV
      </div>
      <div>
        <Image src={LTV} alt="tvl" style={{ width: "100%" }} />
      </div>
      <div className="flex justify-between bg-none">
        <span className=" font-medium text-lg text-grayLight bg-none">
          80% Stablecoin
        </span>
        <span className=" font-medium text-lg text-grayLight bg-none">
          20% Downside Protection
        </span>
      </div>
      <div className="text-[32px] text-textBlack font-medium dark:text-white bg-none">
        Fee Comparison
      </div>
      <div className="flex gap-8 ml-6 mb-20 bg-none">
        {[
          {
            orgName: "Autonomint",
            amount: "$0.02",
            tag: "Lowest Fee",
            tagColor: "#05A552",
            tagBg: "#05A552",
            textColor: "white",
            borderColor: "borderGreen",
          },
          {
            orgName: "Athermint",
            amount: "$0.02",
            tag: "Lowest Fee",
            tagColor: "#D6A100",
            tagBg: "#FFF7E0",
            textColor: "#D6A100",
            borderColor: "borderYellow",
          },
          {
            orgName: "AthermintXYZ",
            amount: "$0.02",
            tag: "Lowest Fee",
            tagColor: "#990102",
            tagBg: "#FEE2E2",
            textColor: "#AA0001",
            borderColor: "borderRed",
          },
        ].map((feeCom, idx) => {
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
      <Button className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[102px] hover:bg-textBlack dark:bg-custom-gradient-to-bottom">
        Mint USDa
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}
export default function Home() {
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

  const pairs = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }

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
      closeAnimateMint?.classList.add("animatingLeftClose");
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
        className="hidden dark:block w-full"
        src={darkboat}
        alt="dark-mode-image"
      />
      <Image
        className="block dark:hidden w-full"
        src={boat}
        alt="light-mode-image"
      />
      <div className="border-[1px] overflow-hidden  border-t-grayLight ">
        {/* 1st row */}
        <div className={`flex closeAnimateTop  `}>
          <div
            className={`relative  closeAnimateMint cursor-pointer  ${
              hoveredIndex === 0
                ? "w-[80%] !h-[550px]"
                : hoveredIndex === 1
                ? "w-[40%] !h-[550px]"
                : "w-[50%]"
            } h-[400px] ${
              hoveredIndex === null || hoveredIndex === 2
                ? " border-x border-y-0 border-[1px]  border-grayLight"
                : " border-b-0 border-r-0 border-[1px]  border-grayLight border-y-0"
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
                <MintUSDAHoverElement />
              ) : (
                <div className="h-full flex flex-col justify-between items-start  p-4">
                  <h3 className="font-medium  text-[42px]  mb-2">
                    {items[0].title}
                  </h3>
                  {items[0].subtitle && (
                    <p className="text-[32px] text-gray-600">
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
                ? "w-[60%]  !h-[550px]"
                : hoveredIndex === 0
                ? "w-[30%] !h-[550px]"
                : "w-[50%]"
            } h-[400px] ${
              hoveredIndex === null
                ? "border-x border-y-0  border-[1px]  border-grayLight"
                : hoveredIndex === 3
                ? " border-x border-y-0 border-[1px]  border-grayLight"
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
                  <h3 className="font-medium text-[42px]  mb-2">
                    {items[1].title}
                  </h3>
                  {items[1].subtitle && (
                    <p className="text-gray-600 text-[32px]">
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
          className={`flex animateTransfer closeAnimateButtom w-full border-b-grayLight border-t-grayLight border-[1px]`}
        >
          {/* Bridge Section */}
          <div
            className={`relative cursor-pointer ${
              hoveredIndex === 3 ? "w-[40%]" : "w-[80%]"
            } ${
              hoveredIndex === null
                ? "border-x border-y border-[1px] border-grayLight"
                : "border-b-[1px] border-l border-[1px] border-grayLight"
            } h-[400px] ${
              hoveredIndex === 2 || hoveredIndex === 3 ? "!h-[450px]" : ""
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
                  <h3 className="font-medium text-[42px] mb-2">
                    {items[2].title}
                  </h3>
                  {items[2].subtitle && (
                    <p className="text-gray-600 text-[32px]">
                      {items[2].subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className={`relative cursor-pointer ${
              hoveredIndex === 3 ? "w-[60%]" : "w-[40%]"
            } ${
              hoveredIndex === null
                ? "border-x border-y border-[1px] border-grayLight"
                : ""
            } h-[400px] ${
              hoveredIndex === 2 || hoveredIndex === 3 ? "!h-[450px]" : ""
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
                  <h3 className="font-medium text-[42px] mb-2">
                    {items[3].title}
                  </h3>
                  {items[3].subtitle && (
                    <p className="text text-[32px]">{items[3].subtitle}</p>
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
            className={`flex mt-[-2px] animateTransfer closeAnimateButtom w-full  `}
          >
            <div
              className={`relative cursor-pointer group hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]    h-[118px] w-[50%] border-t border-x border-y border-[1px]  border-grayLight dark:hover:bg-custom-gradient-to-top`}
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
                <h3 className="font-medium text-[42px]  mb-2">
                  {items[4].title}
                </h3>
                <div className="hidden group-hover:flex items-center">
                  <LeftArrowIcon width={42} height={42} />
                </div>
              </div>
            </div>{" "}
            <div
              className={`relative cursor-pointer group hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]   h-[118px] w-[50%] 
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
                <h3 className="font-medium text-[42px]  mb-2">
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
