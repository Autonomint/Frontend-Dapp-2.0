"use client";
import React, { useState } from "react";
import Image from "next/image";
import boat from "./assets/boat.png";
import { Button } from "@/components/ui/button";
import PriceGraph from "./assets/Chart.png";
import ModeImage from "./assets/mode.png";
import OptimismImage from "./assets/optimism.png";
import arrow from "./assets/arrow-right-02.png";
import PriceComparison from "../customComponents/PriceComparison";
import { useRouter } from "next/navigation";

// function TransferBetweeHoverElement() {
//   return (
//     <div className="flex flex-col justify-between h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative">
//       <div className=" text-textBlack text-[38px] font-medium">
//         Transfer Between
//       </div>
//       <div className="flex">
//         <div className="flex flex-col">
//           <Image src={ModeImage} alt="Price Graph" className="w-full" />
//           <div className=" text-grayLight text-[32px] font-normal">
//             Mode
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <Image src={OptimismImage} alt="Price Graph" className="w-full" />
//           <div className=" text-grayLight text-[32px] font-normal">
//             Optimism
//           </div>
//         </div>
//       </div>
//       <Button
//         onClick={() => {
//           //router.push("/mintusdalist");
//         }}
//         className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[70px] hover:bg-textBlack"
//       >
//         Bridge
//         <Image src={arrow} width={42} height={42} alt="arrow" />
//       </Button>
//     </div>
//   );
// }

// function DCDSHoverElement() {
//   return (
//     <div className="flex flex-col justify-between h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative">
//       <div className=" text-textBlack text-[38px] font-medium">
//         $1,000 Invested would have become $3,000
//       </div>
//       <Image src={PriceGraph} alt="Price Graph" className="w-full" />
//       <div className=" text-textBlack text-[38px] font-medium">
//         Get up to 200% APY
//       </div>
//       <Button
//         onClick={() => {
//           //router.push("/mintusdalist");
//         }}
//         className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[70px] hover:bg-textBlack"
//       >
//         Earn
//         <Image src={arrow} width={42} height={42} alt="arrow" />
//       </Button>
//     </div>
//   );
// }

// function MintUSDAHoverElement() {
//   return (
//     <div className="flex flex-col justify-between h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative">
//       <div className=" tetx-textBlack text-[38px] font-medium">
//         100% Synthetic LTV
//       </div>
//       <div className="flex justify-between">
//         <span className=" font-medium text-lg text-grayLight">
//           80% Stablecoin
//         </span>
//         <span className=" font-medium text-lg text-grayLight">
//           20% Downside Protection
//         </span>
//       </div>
//       <div className="text-[32px] text-textBlack font-medium mb-10">
//         Fee Comparison
//       </div>
//       <div className="flex mb-20">
//         {[
//           {
//             orgName: "Autonomint",
//             amount: "$0.02",
//             tag: "Lowest Fee",
//             tagColor: "#06C160",
//             textColor: "white",
//           },
//           {
//             orgName: "Athermint",
//             amount: "$0.02",
//             tag: "Lowest Fee",
//             tagColor: "#FFF7E0",
//             textColor: "#D6A100",
//           },
//           {
//             orgName: "AthermintXYZ",
//             amount: "$0.02",
//             tag: "Lowest Fee",
//             tagColor: "#FEE2E2",
//             textColor: "#AA0001",
//           },
//         ].map((feeCom) => {
//           return (
//             <PriceComparison
//               orgName={feeCom.orgName}
//               tag={feeCom.tag}
//               amount={feeCom.amount}
//               tagColor={feeCom.tagColor}
//               textColor={feeCom.textColor}
//             />
//           );
//         })}
//       </div>
//       <Button
//         onClick={() => {
//           //router.push("/mintusdalist");
//         }}
//         className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[70px] hover:bg-textBlack"
//       >
//         Mint USDa
//         <Image src={arrow} width={42} height={42} alt="arrow" />
//       </Button>
//     </div>
//   );
// }

export default function Home() {
  // const items = [
  //   { title: "Mint USDA", subtitle: "TVL - $100,000" },
  //   { title: "dCDS", subtitle: "TVL - $100,000" },
  //   { title: "Bridge", subtitle: "TVL - $100,000" },
  //   { title: "Farm Your Luck", subtitle: "Earn Option Fee" },
  //   { title: "Redeem ABOND", subtitle: "" },
  //   { title: "Buy", subtitle: "" },
  // ];

  // const router = useRouter();

  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // const pairs = [];
  // for (let i = 0; i < items.length; i += 2) {
  //   pairs.push(items.slice(i, i + 2));
  // }

  return (
    <div className="w-full">
      <div className="w-full md:block mb-6">
        <Image src={boat} alt="crypto-eth" className="w-full object-cover" />
      </div>
      {/* <div className="-mt-16">
        {pairs.map((pair, rowIdx) => (
          <div key={rowIdx} className="flex w-full transition-all">
            {pair.map((item, colIdx) => {
              const index = rowIdx * 2 + colIdx;
              let widthClass = "w-[50%]";
              if (hoveredIndex === index) {
                widthClass = "w-[60%]";
              } else if (
                hoveredIndex !== null &&
                Math.floor(hoveredIndex / 2) === rowIdx
              ) {
                widthClass = "w-[40%]";
              }

              let heightClass = "h-[300px]";
              if (hoveredIndex === index) {
                heightClass = "h-[450px]";
              } else if (
                hoveredIndex !== null &&
                Math.floor(hoveredIndex / 2) === rowIdx
              ) {
                heightClass = "h-[450px]";
              }

              return (
                <div
                  key={index}
                  className={`relative bg-white shadow-md border cursor-pointer overflow-hidden ${widthClass} ${heightClass}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ transition: "width 0.3s ease-in" }}
                >
                  <div
                    className={
                      `${hoveredIndex === index ? "p-0" : "p-4"}` +
                      " h-full flex flex-col justify-between"
                    }
                  >
                    {hoveredIndex === index ? (
                      //{renderHoverElementBasedonIndex(index)}
                      (() => {
                        switch (index) {
                          case 0:
                            return (
                              <div>
                                <MintUSDAHoverElement />
                              </div>
                            );
                          case 1:
                            return (
                              <div>
                                <DCDSHoverElement />
                              </div>
                            );
                          case 2:
                            return (
                              <div>
                                <TransferBetweeHoverElement />
                              </div>
                            );
                          default:
                            return (
                              <div>
                                <DCDSHoverElement />
                              </div>
                            );
                        }
                      })()
                    ) : (
                      <>
                        <h3 className="font-medium text-[42px]  mb-2">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-gray-600">{item.subtitle}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div> */}
    </div>
  );
}
