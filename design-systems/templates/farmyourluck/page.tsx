"use client";
import AppNavbar from "@/custom-components/AppNavbar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../styles/farmyourluckstyles.css";
import { useTheme } from "next-themes";
import { useBorrowGame } from "@/hookes/api-hooks/useGetLuck";
import { toast } from "sonner";
import ToastNotificationError from "@/custom-components/toasts/ToastNotificationError";

function FarmYourLuckTemplate() {
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

  const [gotReward, setGotReward] = useState(false);

  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const { data: luckData, mutateAsync: getLuckAsync } = useBorrowGame();

  useEffect(() => {}, [isFlipped, selectedIndexForReward]);

  useEffect(() => {
    if (buttonText === "Claim Reward" && isPayed && gotReward) {
      setRewardAmount("+0.001 ETH");
    }
  }, [buttonText]);

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

  const handleCheckLuck = async () => {
    const res = await getLuckAsync({
      numberOfBoxes: 9,
      userChosenBoxIndex: selectedIndexForReward,
    });

    if (selectedIndexForReward !== -1 && res) {
      setSupportingText("Congratulations! You have earned");
      setButtonText("Congratulations!");
      setRewardAmount("0.01 ETH");

      setIsRevealed(true);

      return;
    } else if (selectedIndexForReward !== -1 && !res) {
      setRewardAmount("Better Luck Next Time");
      setSupportingText("");
      setButtonText("Try Next Time");
      setIsRevealed(true);
    }
  };

  const handleLuckCardClick = (index: number) => {
    if (!isPayed) {
      toast.custom((t) => {
        return (
          <ToastNotificationError
            onClose={() => toast.dismiss(t)}
            title="Please Pay $5 First"
          />
        );
      });
    }
    if (isPayed && !isRevealed) {
      setIsFlipped((prev) => {
        const newFlipped = [...prev].map((value) => false);
        newFlipped[index] = !newFlipped[index];
        return newFlipped;
      });

      setSelectedIndex(index);
      if (isPayed && selectedIndexForReward === -1) {
        setSelectedIndexForReward(index);
      }
      setButtonText("Reveal Reward");
      setSupportingText("Revealed upon confirmation.");
    }
  };

  const handleReset = () => {
    setSelectedIndex(-1);
    setSelectedIndexForReward(-1);
    setIsFlipped(Array.from({ length: 9 }).fill(false));
    setIsRevealed(false);
    setGotReward(false);
    setSupportingText("Tap a card to view details");
    setRewardAmount("");
    setButtonText("Pay $5");
    setIsPayed(false);
  };

  const handleButtonClick = () => {
    setIsPayed(true);

    if (isRevealed) {
      handleReset();
    }

    if (!isPayed) {
      setButtonText("Pay $5");
    }

    if (selectedIndexForReward == -1) {
      setButtonText("Select Card");
    }

    if (isPayed && selectedIndexForReward !== -1 && !isRevealed) {
      handleCheckLuck();
    }
  };

  console.log(isPayed, selectedIndex == -1, "check");

  return (
    <div className="min-h-full lg:h-full w-full flex flex-col">
      <AppNavbar tabOptions={tabs} />
      <div className="grid grid-cols-1 lg:grid-cols-6 h-full">
        <div className="grid col-span-1 lg:col-span-4 ">
          <div className="grid grid-cols-3 gap-6 md:p-8 p-5">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                onClick={() => handleLuckCardClick(index + 1)}
                className={
                  `border-grayLight border-[1px] ${
                    selectedIndex === index + 1 ? "" : ""
                  }` +
                  "  group aspect-square lg:aspect-auto lg:h-auto lg:w-auto w-full h-full cursor-pointer"
                }
              >
                <div
                  className={`card-container ${
                    isFlipped[index + 1] ? "flipped" : ""
                  }`}
                >
                  <div className="card-front"></div>
                  <div
                    className={`  card-back text-center ${
                      selectedIndex === index + 1 &&
                      selectedIndexForReward === index + 1 &&
                      isRevealed &&
                      isPayed
                        ? "selected selected-for-reward"
                        : selectedIndex === index + 1
                        ? "selected"
                        : selectedIndexForReward === index + 1
                        ? "selected-for-reward"
                        : ""
                    }`}
                  >
                    <div
                      className={`${
                        selectedIndex === index + 1 &&
                        selectedIndexForReward === index + 1 &&
                        isPayed &&
                        isRevealed
                          ? "selected-for-reward-amount "
                          : "selected-for-reward-amount-hidden"
                      } text-[14px] sm:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[38px]  3xl:text-[42px] p-2 xl:p-8`}
                    >
                      {rewardAmount}
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
                  className="block dark:text-white text-[32px] xl:text-[42px] lg:text-left"
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
                  Pay $5 to pick a card for a chance to win $75 in option fees.
                </li>
                <li className="mb-3 text-lg">
                  Click ‘Reveal Reward’ to see if you chose correctly.
                </li>
                <li className="mb-3 text-lg">
                  Win Option Fee or Partner Fee rewards on a correct pick.
                </li>
                <li className="text-lg">Missed? Try again with another $5!</li>
              </ol>
            </div>
            <button
              disabled={isPayed && selectedIndex == -1}
              onClick={() => handleButtonClick()}
              className={`  absolute w-full  left-0 bottom-0 text-white h-[90px] font-bold text-[32px]  ${
                isPayed && selectedIndex == -1
                  ? "!bg-[#7A7A7A] !text-[#AFAFAF]"
                  : " bg-black  dark:bg-custom-gradient-to-top"
              }`}
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

export default FarmYourLuckTemplate;
