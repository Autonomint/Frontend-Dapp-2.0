"use client";
import AppNavbar from "@/custom-components/AppNavbar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "../../styles/farmyourluckstyles.css";
import { useTheme } from "next-themes";

function Page() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexForReward, setSelectedIndexForReward] = useState(-1);
  const [isFlipped, setIsFlipped] = useState(Array.from({ length: 9 }).fill(0));
  const [supportingText, setSupportingText] = useState(
    "Tap a card to view details"
  );
  const [rewardAmount, setRewardAmount] = useState("");
  const [buttonText, setButtonText] = useState("Pay $5");
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isPayed, setIsPayed] = useState(false);

  useEffect(() => {
    if (selectedIndexForReward !== -1) {
      setSupportingText("Congratulations! You have earned");
      setButtonText("Claim Reward");
      return;
    }
    if (isFlipped.some((flipped) => flipped)) {
      setButtonText("Reveal Reward");
      setSupportingText("Revealed upon confirmation.");
    } else {
      setButtonText("Pay $5");
    }
  }, [isFlipped, selectedIndexForReward]);

  useEffect(() => {
    if (buttonText === "Claim Reward") {
      setRewardAmount("+0.001 ETH");
    }
  }, [buttonText]);

  const handleClick = (index: number) => {
    debugger;
    if (isPayed && selectedIndex == -1) {
      setIsFlipped((prev) => {
        const newFlipped = [...prev];
        newFlipped[index] = !newFlipped[index];
        return newFlipped;
      });
      setSelectedIndex(index);
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  const textVariantsButtonCliked = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: +50, transition: { duration: 0.3 } },
  };

  const supportingTextVariants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 0, y: 0, transition: { duration: 0.3 } },
  };

  const rewardAmountVariants = {
    hidden: { opacity: 0, x: 0, y: +50 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 0, y: -100, transition: { duration: 0.3 } },
  };

  const tabs = [
    {
      nameA: "Farm Your Luck",
      path: "/farmyourluck",
      isActive: pathname === "",
    },
  ];
  return (
    <div className="h-full w-full flex flex-col">
      <AppNavbar tabOptions={tabs} />
      <div className="grid grid-cols-1 lg:grid-cols-6 h-full">
        <div className="grid col-span-1 lg:col-span-4">
          <div className="grid grid-cols-3 gap-6 md:p-8 p-5">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={
                  `${selectedIndex === index ? "" : ""}` +
                  "  group aspect-square lg:aspect-auto lg:h-auto lg:w-auto w-full h-full cursor-pointer"
                }
              >
                <div
                  className={`card-container ${
                    isFlipped[index] ? "flipped" : ""
                  }`}
                >
                  <div className="card-front"></div>
                  <div
                    className={`card-back ${
                      selectedIndex === index &&
                      selectedIndexForReward === index
                        ? "selected selected-for-reward"
                        : selectedIndex === index
                        ? "selected"
                        : selectedIndexForReward === index
                        ? "selected-for-reward"
                        : ""
                    }`}
                  >
                    <div
                      className={`${
                        selectedIndex === index &&
                        selectedIndexForReward === index
                          ? "selected-for-reward-amount"
                          : "selected-for-reward-amount-hidden"
                      }`}
                    >
                      + 0.001 ETH
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid col-span-1 lg:col-span-2 lg:p-6 border border-grayLight relative">
          <div className="flex flex-col md:justify-between md:max-h-[calc(100%-80px)] border border-solid border-grayLight lg:border-0 p-5 lg:p-0 gap-20 lg:gap-0">
            <span className="text-grayLight font-medium lg:text-[32px] text-[24px] lg:text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={buttonText}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={supportingTextVariants}
                  className="block"
                >
                  {supportingText}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.span
                  key={rewardAmount}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={rewardAmountVariants}
                  className="block dark:text-white text-[42px] lg:text-left"
                >
                  {rewardAmount}
                </motion.span>
              </AnimatePresence>
            </span>
            <div className="flex flex-col text-left mb-28 lg:mb-0">
              <div className="text-textBlack lg:text-3xl text-[20px] font-medium dark:text-white">
                How it works?
              </div>
              <ol className="list-decimal list-inside mt-3 text-grayLight">
                <li className="mb-3 text-lg">
                  Select cards to view potential rewards.
                </li>
                <li className="mb-3 text-lg">
                  Confirm your selection to reveal rewards.
                </li>
                <li className="mb-3 text-lg">
                  Earn prizes or reclaim your option fees!
                </li>
                <li className="text-lg">
                  Earn prizes or reclaim your option fees!
                </li>
              </ol>
            </div>
            <button
              onClick={() => {
                setIsPayed(true);
                setButtonText("Select Card");

                if (isPayed) {
                  setSelectedIndexForReward(selectedIndex);
                }
              }}
              className="absolute bg-black w-full left-0 bottom-0 text-white h-[90px] font-bold text-[32px] dark:bg-custom-gradient-to-top"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={buttonText}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={
                    selectedIndexForReward !== -1
                      ? textVariantsButtonCliked
                      : textVariants
                  }
                  className="block h-full flex items-center justify-center"
                >
                  {buttonText}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
