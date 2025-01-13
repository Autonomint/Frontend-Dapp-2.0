"use client";
import { Button } from "@/components/ui/button";
import DCDSHoverElement from "@/design-systems/organisms/hover-cards/dcds";
import MintUSDAHoverElement from "@/design-systems/organisms/hover-cards/mint-usda";
import TransferBetweeHoverElement from "@/design-systems/organisms/hover-cards/transfer-between";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import arrow from "./assets/arrow-right-02.png";
import boat from "./assets/boat.png";
import { items } from "./utils";
import MintUSDAHoverWrapper from "@/design-systems/organisms/hover-cards/mint-usda";

export default function HomePageTemplate() {
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
    if (hoveredIndex === 3) {
      animateTransfer?.classList.add("animatingButtonOpen");
      closeAnimateTop?.classList.add("animatingTopClose");
    }
  }, [hoveredIndex]);

  return (
    <div className="w-full">
      <div className="w-full h-[300px] md:block border-[1px] border-x border-grayLight">
        <Image
          src={boat}
          alt="crypto-eth"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="border-[1px] overflow-hidden  border-t-grayLight">
        {/* 1st row */}
        <div className={`flex closeAnimateTop  `}>
          <MintUSDAHoverWrapper
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            setCurrentIndex={setCurrentIndex}
            item={items[0]}
          />
          
        </div>

        {/* 2nd row */}
        <div
          className={`flex animateTransfer closeAnimateButtom w-full border-b-grayLight   border-t-grayLight border-[1px] `}
        >
          <div
            className={`relative bg-white cursor-pointer  ${
              hoveredIndex === 2
                ? " !h-[450px]"
                : hoveredIndex === 3
                ? "!h-[450px]"
                : ""
            } h-[400px] w-[80%] ${
              hoveredIndex === null
                ? "border-x border-y border-[1px]  border-grayLight"
                : " border-b-[1px] border-l  border-[1px]  border-grayLight"
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
                    <p className="text-gray-600 text-[32px]">
                      {items[2].subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              router.push("/farmyourluck");
            }}
            className={`relative bg-white cursor-pointer hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]  ${
              hoveredIndex === 2
                ? " !h-[450px]"
                : hoveredIndex === 3
                ? "!h-[450px]"
                : ""
            } h-[400px] w-[20%] ${
              hoveredIndex === null
                ? "border-x border-y border-[1px]  border-grayLight"
                : ""
            }`}
            style={{
              transition: "width 0.3s ease-in, height 0.3s ease-in",
            }}
            onMouseEnter={() => {
              setHoveredIndex(3);
              setCurrentIndex(2);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setCurrentIndex(null);
            }}
          >
            <div className={"p-4 h-full flex flex-col justify-between"}>
              <>
                <h3 className="font-medium text-[42px]  mb-2">
                  {items[3].title}
                </h3>
                {items[3].subtitle && (
                  <p className="text-gray-600 text-[32px]">
                    {items[3].subtitle}
                  </p>
                )}
              </>
              {hoveredIndex === 3 && (
                <Button className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[108px] hover:bg-textBlack">
                  Reward
                  <Image src={arrow} width={42} height={42} alt="arrow" />
                </Button>
              )}
            </div>
          </div>{" "}
        </div>

        {/* 3rd row */}
        <div>
          <div
            className={`flex mt-[-2px] animateTransfer closeAnimateButtom w-full  `}
          >
            <div
              className={`relative bg-white cursor-pointer   h-[118px] w-[50%] border-t border-x border-y border-[1px]  border-grayLight `}
              style={{
                transition: "width 0.3s ease-in, height 0.3s ease-in",
              }}
            >
              <div className={"p-4 h-full flex flex-col justify-center"}>
                <h3 className="font-medium text-[42px]  mb-2">
                  {items[4].title}
                </h3>
              </div>
            </div>{" "}
            <div
              className={`relative bg-white cursor-pointer   h-[118px] w-[50%] 
                 border-t border-l-0 border-x border-y border-[1px]  border-grayLight
                `}
              style={{
                transition: "width 0.3s ease-in, height 0.3s ease-in",
              }}
            >
              <div className={"p-4 h-full flex flex-col justify-center"}>
                <h3 className="font-medium text-[42px]  mb-2">
                  {items[5].title}
                </h3>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
