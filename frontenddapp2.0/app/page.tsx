"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import boat from "./assets/boat.png";
import { Button } from "@/components/ui/button";
import PriceGraph from "./assets/Chart.png";
import ModeImage from "./assets/mode.png";
import OptimismImage from "./assets/optimism.png";
import arrow from "./assets/arrow-right-02.png";
import PriceComparison from "../customComponents/PriceComparison";
import { useRouter } from "next/navigation";

function TransferBetweeHoverElement() {
  return (
    <div className="flex animateTransfer flex-col justify-between h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative">
      <div className=" text-textBlack text-[38px] font-medium">
        Transfer Between
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <Image src={ModeImage} alt="Price Graph" className="w-full" />
          <div className=" text-grayLight text-[32px] font-normal">Mode</div>
        </div>
        <div className="flex flex-col">
          <Image src={OptimismImage} alt="Price Graph" className="w-full" />
          <div className=" text-grayLight text-[32px] font-normal">
            Optimism
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          //router.push("/mintusdalist");
        }}
        className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[70px] hover:bg-textBlack"
      >
        Bridge
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

function DCDSHoverElement() {
  return (
    <div className="flex flex-col border-x border-y border-[1px]  border-grayLight animateDCDS justify-between h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative">
      <div className=" text-textBlack text-[38px] font-medium">
        $1,000 Invested would have become $3,000
      </div>
      <Image src={PriceGraph} alt="Price Graph" className="w-full" />
      <div className=" text-textBlack text-[38px] font-medium">
        Get up to 200% APY
      </div>
      <Button
        onClick={() => {
          //router.push("/mintusdalist");
        }}
        className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[70px] hover:bg-textBlack"
      >
        Earn
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

function MintUSDAHoverElement() {
  return (
    <div className="flex flex-col animateMint border-x border-y border-[1px]  border-grayLight justify-between h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative">
      <div className=" tetx-textBlack text-[38px] font-medium">
        100% Synthetic LTV
      </div>
      <div className="flex justify-between">
        <span className=" font-medium text-lg text-grayLight">
          80% Stablecoin
        </span>
        <span className=" font-medium text-lg text-grayLight">
          20% Downside Protection
        </span>
      </div>
      <div className="text-[32px] text-textBlack font-medium mb-10">
        Fee Comparison
      </div>
      <div className="flex mb-20">
        {[
          {
            orgName: "Autonomint",
            amount: "$0.02",
            tag: "Lowest Fee",
            tagColor: "#06C160",
            textColor: "white",
          },
          {
            orgName: "Athermint",
            amount: "$0.02",
            tag: "Lowest Fee",
            tagColor: "#FFF7E0",
            textColor: "#D6A100",
          },
          {
            orgName: "AthermintXYZ",
            amount: "$0.02",
            tag: "Lowest Fee",
            tagColor: "#FEE2E2",
            textColor: "#AA0001",
          },
        ].map((feeCom) => {
          return (
            <PriceComparison
              orgName={feeCom.orgName}
              tag={feeCom.tag}
              amount={feeCom.amount}
              tagColor={feeCom.tagColor}
              textColor={feeCom.textColor}
            />
          );
        })}
      </div>
      <Button
        onClick={() => {
          //router.push("/mintusdalist");
        }}
        className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[70px] hover:bg-textBlack"
      >
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
  }, [hoveredIndex]);

  return (
    <div className="w-full">
      <div className="w-full md:block">
        <Image src={boat} alt="crypto-eth" className="w-full object-cover" />
      </div>
      <div className="border-[1px]  border-t-grayLight">
        <div className={`flex closeAnimateTop  `}>
          <div
            className={`relative  closeAnimateMint bg-white cursor-pointer  ${
              hoveredIndex === 0
                ? "w-[80%] !h-[450px]"
                : hoveredIndex === 1
                ? "w-[40%] !h-[450px]"
                : "w-[50%]"
            } h-[300px] ${
              hoveredIndex === null || hoveredIndex === 2
                ? " border-x border-y border-[1px]  border-grayLight"
                : " border-b-[1px] border-r-0 border-[1px]  border-grayLight"
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
                //{renderHoverElementBasedonIndex(index)}

                <MintUSDAHoverElement />
              ) : (
                <div className="p-4">
                  <h3 className="font-medium text-[42px]  mb-2">
                    {items[0].title}
                  </h3>
                  {items[0].subtitle && (
                    <p className="text-gray-600">{items[0].subtitle}</p>
                  )}
                </div>
              )}
            </div>
          </div>{" "}
          <div
            className={`relative closeAnimateDCDS  bg-white cursor-pointer  ${
              hoveredIndex === 1
                ? "w-[60%]  !h-[450px]"
                : hoveredIndex === 0
                ? "w-[30%] !h-[450px]"
                : "w-[50%]"
            } h-[300px] ${
              hoveredIndex === null
                ? "border-x border-y border-[1px]  border-grayLight"
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
                //{renderHoverElementBasedonIndex(index)}

                <DCDSHoverElement />
              ) : (
                <div className={"p-4 h-full flex flex-col justify-between"}>
                  <h3 className="font-medium text-[42px]  mb-2">
                    {items[1].title}
                  </h3>
                  {items[1].subtitle && (
                    <p className="text-gray-600">{items[1].subtitle}</p>
                  )}
                </div>
              )}
            </div>
          </div>{" "}
        </div>

        <div
          className={`flex closeAnimateButtom w-full border-b-grayLight  border-t-grayLight border-[1px] `}
        >
          <div
            className={`relative bg-white cursor-pointer  ${
              hoveredIndex === 2 ? " !h-[450px]" : ""
            } h-[300px] w-[80%] ${
              hoveredIndex === null
                ? "border-x border-y border-[1px]  border-grayLight"
                : " border-b-[1px] border-l-0 border-[1px]  border-grayLight"
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
            <div className={" h-full flex flex-col justify-between"}>
              {hoveredIndex === 2 ? (
                <TransferBetweeHoverElement />
              ) : (
                <div
                  className={
                    `${hoveredIndex === 0 ? "p-0" : "p-4"}` +
                    " h-full flex flex-col justify-between"
                  }
                >
                  <h3 className="font-medium text-[42px]  mb-2">
                    {items[2].title}
                  </h3>
                  {items[2].subtitle && (
                    <p className="text-gray-600">{items[2].subtitle}</p>
                  )}
                </div>
              )}
            </div>
          </div>{" "}
          <div
            className={`relative bg-white cursor-pointer  ${
              hoveredIndex === 2 ? " !h-[450px]" : hoveredIndex === 1 ? "" : ""
            } h-[300px] w-[20%] ${
              hoveredIndex === null
                ? "border-x border-y border-[1px]  border-grayLight"
                : ""
            }`}
            // onMouseEnter={() => {
            //   setHoveredIndex(3);
            //   setCurrentIndex(2);
            // }}
            // onMouseLeave={() => {
            //   setHoveredIndex(null);
            //   setCurrentIndex(null);
            // }}
            style={{
              transition: "width 0.3s ease-in, height 0.3s ease-in",
            }}
          >
            <div className={"p-4 h-full flex flex-col justify-between"}>
              <>
                <h3 className="font-medium text-[42px]  mb-2">
                  {items[3].title}
                </h3>
                {items[3].subtitle && (
                  <p className="text-gray-600">{items[3].subtitle}</p>
                )}
              </>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
