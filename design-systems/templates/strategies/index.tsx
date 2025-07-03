"use client";
import cryptoEth from "@/app/assets/eth.png";
import { getIconMapping } from "@/utils/token-config";
import { Calendar, Scale, TrendingDown, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { strategies } from "./data";
import { Button } from "@/design-systems/atoms/button";
import Link from "next/link";
import { GenericDropdownMenu } from "@/design-systems/atoms/DropdownCustom/GenericDropdownMenu";
import { useState } from "react";
import bg from "@/app/assets/4880206.jpg";
const riskColor = {
  "very low risk strategy": "bg-green-500 border-green-600",
  "low risk strategy": "bg-emerald-500 border-emerald-600",
  "medium risk strategy": "bg-orange-400 border-orange-500",
  "high risk strategy": "bg-red-500 border-red-600",
};

export default function StrategiesTemplate() {
  const { theme } = useTheme();
  console.log(theme, "theme");

  const [selectedStrategy, setSelectedStrategy] = useState({
    label: "Strategy - All",
    value: "All",
  });
  const [selectedRisk, setSelectedRisk] = useState({
    label: "Risk - All",
    value: "All",
  });

  const strategiesFilterOption = [
    {
      label: "Strategy - All",
      value: "All",
      onClick: () =>
        setSelectedStrategy({ label: "Strategy - All", value: "All" }),
    },

    {
      label: "Earn with USDA+ minting",
      value: "borrow",
      onClick: () =>
        setSelectedStrategy({
          label: "Earn with USDA+ minting",
          value: "borrow",
        }),
    },
    {
      label: "Earn with dCDS",
      value: "dcds",
      onClick: () =>
        setSelectedStrategy({ label: "Earn with dCDS", value: "dcds" }),
    },
    {
      label: "Earn through 'Option Fee Farming'",
      value: "option",
      onClick: () =>
        setSelectedStrategy({
          label: "Earn through 'Option Fee Farming'",
          value: "option",
        }),
    },
  ];
  const riskFilterOption = [
    {
      label: "Risk - All",
      value: "All",
      onClick: () => setSelectedRisk({ label: "Risk - All", value: "All" }),
    },
    {
      label: "Very Low Risk ",
      value: "veryLow",
      onClick: () =>
        setSelectedRisk({ label: "Very Low Risk ", value: "veryLow" }),
    },

    {
      label: "Low Risk ",
      value: "low",
      onClick: () => setSelectedRisk({ label: "Low Risk ", value: "low" }),
    },
    {
      label: "Medium Risk ",
      value: "medium",
      onClick: () =>
        setSelectedRisk({ label: "Medium Risk ", value: "medium" }),
    },
    // {
    //   label: "High Risk Strategies",
    //   value: "high",
    //   onClick: () => setSelectedStrategy("high"),
    // },
  ];

  const filteredStrategies = strategies.filter((strategy) => {
    if (selectedStrategy.value === "All") {
      return true;
    }
    if (selectedRisk.value === "All") {
      return strategy.strategy === selectedStrategy.value;
    }
    return (
      strategy.strategy === selectedStrategy.value &&
      strategy.risk === selectedRisk.value
    );
  });

  return (
    <div>
      <div className="w-full md:h-[300px] h-[200px] rounded-[32px] rounded-t-none  overflow-hidden mb-6 relative">
        <Image src={bg} alt="" className="bg-cover relative w-full h-full " />
        <div className="flex  w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col gap-2  mb-24 items-center justify-between md:px-40 px-4">
          <div className="md:text-[32px] md:leading-[38px] xl:text-[48px] xl:leading-[55px] font-bold mx-auto font-plex-grotesk text-center text-textBlack ">
            Simple strategies to earn yields and get very low-cost downside
            protection on your assets
          </div>
          <div className="text-grayLight md:text-base text-sm xl:text-[18px] text-center md:mt-4 font-plex-grotesk">
            Pick a strategy and start earning & hedging in one click. It&apos;s
            something you won’t find anywhere else in DeFi
          </div>
        </div>
      </div>
      <div className="p-2 sm:p-4  md:p-8 font-plex-grotesk">
        <div className="w-full flex flex-col md:flex-row justify-end gap-4 my-6">
          <div className="w-full sm:w-[300px]">
            <GenericDropdownMenu
              buttonText={selectedStrategy.label}
              items={strategiesFilterOption}
              className=" w-full text-[20px] 2xl:text-[20px] border border-grayLight h-[44px]"
              iconWrapBg="bg-white dark:bg-black"
            />
          </div>
          <div className="w-full sm:w-[300px]">
            <GenericDropdownMenu
              buttonText={selectedRisk.label}
              items={riskFilterOption}
              className=" w-full text-[20px] 2xl:text-[20px] border border-grayLight h-[44px]"
              iconWrapBg="bg-white dark:bg-black"
            />
          </div>
        </div>
        <div>
          <div className="grid lg:grid-cols-2 xl:gap-6 lg:gap-4 gap-10 grid-cols-1">
            {/* Strategy card */}
            {filteredStrategies.map((strategy) => (
              <div
                key={strategy.id}
                className="border-[1px] flex flex-col justify-between border-gray-200 rounded-[12px] bg-gray-100 dark:border-[#333333] dark:bg-[#121212] shadow-md"
              >
                <div>
                  {/* Strategy card header */}
                  <div>
                    <div className="p-4 px-6 flex flex-col sm:flex-row  justify-center sm:justify-between">
                      {/* right */}
                      <div className="flex gap-3 items-center">
                        <div>
                          <Scale size={32} />
                        </div>
                        <div>
                          {/* Strategy name */}
                          <div className="md:text-[20px] xl:text-[24px] font-semibold font-plex-grotesk">
                            {strategy.name}
                          </div>
                          {/* Strategy description */}
                          <div className="text-grayLight md:text-[12px] xl:text-[16px] font-plex-grotesk">
                            {strategy.description}
                          </div>
                          {/* Strategy rewards */}
                          {/* <div className="flex gap-2 justify-start mt-2 flex-wrap">
                        {strategy.rewards.map((reward) => (
                          <div
                            key={reward.token}
                            className="text-sm flex gap-1 items-center justify-center font-medium font-plex-grotesk text-center w-fit text-black border-[1px] bg-white border-indigo-600 rounded-[12px] "
                          >
                            <Image
                              className="pl-[2px]"
                              src={
                                reward.token === "ABOND"
                                  ? getIconMapping(
                                      theme === "systemTheme"
                                        ? "dark"
                                        : theme || "dark",
                                      "usda"
                                    )
                                  : reward.icon
                              }
                              alt=""
                              width={reward.token === "ABOND" ? 14 : 20}
                              height={reward.token === "ABOND" ? 14 : 20}
                            />{" "}
                            <span className="text-indigo-600 px-1 pl-[2px] py-[2px]">
                              {reward.value}
                            </span>
                          </div>
                        ))}
                      </div> */}
                        </div>
                      </div>
                      {/* left */}
                      <div className="flex sm:flex-col flex-wrap   items-center justify-start sm:justify-end gap-2 sm:items-end">
                        <div className="text-xs xl:text-sm font-medium font-plex-grotesk text-center  text-grayLight">
                          Max Return Upto
                        </div>
                        <div className="xl:text-4xl md:text-2xl font-semibold font-plex-grotesk text-textBlack dark:text-white">
                          {strategy.maxReturn.value}
                        </div>
                        <div className="text-xs xl:text-sm flex gap-1 items-center justify-center font-medium font-plex-grotesk text-center w-fit text-black border-[1px] bg-[#ABFFDE] border-black rounded-[8px] p-1 md:px-2 md:py-1">
                          <Calendar width={16} height={16} />{" "}
                          <span>{strategy.maxReturn.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-[1px]  border-gray-200 dark:border-[#333333] w-[98%] mx-auto" />

                  {/* Strategy card body 1 */}
                  <div className="flex flex-col gap-2 p-4 px-6">
                    <div className="flex sm:flex-col flex-wrap gap-2">
                      {/* left */}
                      {strategy.strategyDetails.map((detail, index) => (
                        <div key={index}>
                          <div className="text-lg font-semibold font-plex-grotesk">
                            {detail.heading}
                          </div>
                          <ul>
                            {detail.subHeading.map((subHeading, index) => (
                              <li
                                key={index}
                                className="text-grayLight text-[12px] flex gap-2  font-plex-grotesk list-disc list-inside"
                              >
                                <span className="text-lg">*</span> {subHeading}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* right */}
                      <div></div>
                    </div>
                  </div>
                  <div className="border-t-[1px]  border-gray-200 dark:border-[#333333] w-[98%] mx-auto" />
                  {/* Strategy card body 2 cost */}
                  <div className="p-4 px-6">
                    <div className="text-lg font-semibold font-plex-grotesk mb-2">
                      Costs
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-start sm:items-center">
                      {/* Cost card */}
                      {strategy.costs.map((cost, index) => {
                        return cost.platform == "$0" ? (
                          <div>$0</div>
                        ) : (
                          <div
                            key={index}
                            className="flex flex-col gap-2 p-3 border-[1px] border-gray-300 dark:border-[#333333] shadow-md rounded-[12px] bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top"
                          >
                            <div className="text-base font-bold font-plex-grotesk">
                              {cost.platform}
                            </div>
                            <div className="text-grayLight text-[12px] xl:text-[14px] font-plex-grotesk">
                              <div className="flex gap-2 justify-between items-center">
                                <div className="text-grayLight">
                                  Monthly borrowing fee
                                </div>
                                <div className="text-textBlack dark:text-white">
                                  {cost.monthlyBorrowingFee}
                                </div>
                              </div>
                              <div className="flex gap-2 justify-between items-center">
                                <div className="text-grayLight">Option Fee</div>
                                <div className="text-textBlack dark:text-white">
                                  {cost.optionFee}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {strategy.monthlyYield.length > 0 && (
                    <div className="border-t-[1px]  border-gray-200 dark:border-[#333333] w-[98%] mx-auto" />
                  )}

                  {/* Monthly Yield */}
                  {strategy.monthlyYield.length > 0 && (
                    <div className="p-4 px-6">
                      <div className="text-lg font-semibold font-plex-grotesk mb-2">
                        Monthly Yield
                      </div>
                      <div>
                        <div className="flex gap-2 flex-wrap">
                          {strategy.monthlyYield.map((yieldData, index) => (
                            <div
                              key={index}
                              className="text-sm flex gap-1 items-center justify-center font-medium font-plex-grotesk text-center w-fit text-black border-[1px] bg-white border-gray-00 rounded-[16px] px-1 py-1"
                            >
                              <Image
                                src={cryptoEth}
                                alt="percent"
                                width={24}
                                height={24}
                              />
                              <div className="flex gap-1 items-center">
                                ETH{" "}
                                {yieldData.up ? (
                                  <TrendingUp
                                    className="text-green-500"
                                    size={24}
                                  />
                                ) : (
                                  <TrendingDown
                                    className="text-red-500"
                                    size={24}
                                  />
                                )}
                                {yieldData.amount}{" "}
                                <span className="text-green-500 font-bold ml-1">
                                  {yieldData.percentage}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-yellow-600 mt-2 font-plex-grotesk">
                          Note - ETH Price upside always stays with the user so
                          it isn&apos;t considered in above returns
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t-[1px]  border-gray-200 dark:border-[#333333] w-[98%] mx-auto" />
                  <div className="p-4 px-6">
                    <div className="text-lg font-semibold font-plex-grotesk mb-2">
                      Rewards
                    </div>
                    <div className="flex gap-2 justify-start mt-2 flex-wrap">
                      {strategy.rewards.map((reward) => (
                        <div
                          key={reward.token}
                          className="text-sm flex gap-1 items-center justify-center font-medium font-plex-grotesk text-center w-fit text-black border-[1px] bg-white border-indigo-600 rounded-[12px] "
                        >
                          <Image
                            className="pl-[2px]"
                            src={
                              reward.token === "ABOND"
                                ? getIconMapping("light", "usda")
                                : reward.icon
                            }
                            alt=""
                            width={reward.token === "ABOND" ? 14 : 20}
                            height={reward.token === "ABOND" ? 14 : 20}
                          />{" "}
                          <span className="text-indigo-600 px-1 pl-[2px] py-[2px]">
                            {reward.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t-[1px] dark:border-[#333333] border-gray-200 w-[98%] mx-auto" />
                  {/* Strategy card body 3 */}
                  {/* Risks */}
                  <div className="p-4 px-6">
                    <div className="flex gap-2 items-center mb-2">
                      <div className="text-lg font-semibold font-plex-grotesk">
                        Risks -
                      </div>
                      <div
                        className={`text-sm px-[8px] py-[2px] border-[1px] font-plex-grotesk text-white rounded-[12px] ${
                          riskColor[
                            strategy.risks.level.toLowerCase() as keyof typeof riskColor
                          ]
                        }`}
                      >
                        {strategy.risks.level}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-start flex-wrap items-center">
                      {strategy.risks.factors.map((factor, index) => (
                        <div
                          key={index}
                          className="text-sm flex gap-1 items-center justify-center font-medium font-plex-grotesk text-center w-fit text-black border-[1px] bg-[#ABFFDE] border-black rounded-[8px] px-2 py-1"
                        >
                          {factor.icon}
                          <span>{factor.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border-t-[1px]  border-gray-200 dark:border-[#333333] w-[98%] mx-auto" />

                  <div className="my-4 flex justify-end it w-full  px-6">
                    <button className=" text-[18px]  h-fit font-normal flex  px-3 py-1 rounded-3xl bg-neutral-800 border-[2px] border-neutral-500 text-white ">
                      <Link href={`/${strategy.route}`}>Open</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
