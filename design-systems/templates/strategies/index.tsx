"use client";
import cryptoEth from "@/app/assets/eth.png";
import { getIconMapping } from "@/utils/token-config";
import { Calendar, Scale, TrendingDown, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { strategies } from "./data";
import { Button } from "@/design-systems/atoms/button";
import Link from "next/link";

const riskColor = {
  "very low risk strategy": "bg-green-500 border-green-600",
  "low risk strategy": "bg-emerald-500 border-emerald-600",
  "medium risk strategy": "bg-orange-400 border-orange-500",
  "high risk strategy": "bg-red-500 border-red-600",
};

export default function StrategiesTemplate() {
  const { theme } = useTheme();
  console.log(theme, "theme");
  return (
    <div className="p-8 font-plex-grotesk">
      <div className="flex flex-col gap-2 my-8 items-center justify-between">
        <div className="text-6xl font-bold mx-auto font-plex-grotesk text-center text-textBlack dark:text-white">
          Autonomint
        </div>
        <div className="text-grayLight text-[14px] font-plex-grotesk">
          Potential strategies for Liquidity Providers & users
        </div>
      </div>
      <div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 grid-cols-1">
          {/* Strategy card */}
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="border-[1px] flex flex-col justify-between border-gray-200 rounded-[12px] bg-gray-100 dark:border-[#333333] dark:bg-[#121212] shadow-md"
            >
              <div>
                {/* Strategy card header */}
                <div>
                  <div className="p-4 px-6 flex justify-between">
                    {/* right */}
                    <div className="flex gap-3 items-center">
                      <div>
                        <Scale size={32} />
                      </div>
                      <div>
                        {/* Strategy name */}
                        <div className="text-[24px] font-semibold font-plex-grotesk">
                          {strategy.name}
                        </div>
                        {/* Strategy description */}
                        <div className="text-grayLight text-[14px] font-plex-grotesk">
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
                    <div className="flex flex-col justify-end gap-2 items-end">
                      <div className="text-sm font-medium font-plex-grotesk text-center  text-grayLight">
                        Max Return Upto
                      </div>
                      <div className="text-4xl font-semibold font-plex-grotesk text-textBlack dark:text-white">
                        {strategy.maxReturn.value}
                      </div>
                      <div className="text-sm flex gap-1 items-center justify-center font-medium font-plex-grotesk text-center w-fit text-black border-[1px] bg-[#ABFFDE] border-black rounded-[8px] px-2 py-1">
                        <Calendar width={16} height={16} />{" "}
                        <span>{strategy.maxReturn.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t-[1px]  border-gray-200 dark:border-[#333333] w-[98%] mx-auto" />

                {/* Strategy card body 1 */}
                <div className="flex flex-col gap-2 p-4 px-6">
                  <div className="flex gap-2">
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
                  <div className="flex gap-4 justify-start items-center">
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
                          <div className="text-grayLight text-[14px] font-plex-grotesk">
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
                        Note - ETH Price upside isn’t included in returns
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

                  <div className="flex gap-2 justify-start items-center">
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
  );
}
