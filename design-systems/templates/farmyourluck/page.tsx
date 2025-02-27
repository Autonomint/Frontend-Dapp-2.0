"use client";
import { Typography } from "@/design-systems/atoms/Typography";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import WalletConnectButton from "@/design-systems/molecule/WalletConnectButton";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import { useFarmLuckDetails } from "@/hookes/api-hooks/useFarmyourLuckDetails";
import { useBorrowGame } from "@/hookes/api-hooks/useGetLuck";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import "../../../styles/farmyourluckstyles.css";
import { parseEther } from "viem";
import {
  calculateEthAmount,
  calculateRemainingDays,
  calculateTimeDifference,
} from "@/utils/helpers";
import { FarmYourLuckWalletAddress } from "@/utils/constants";
import LoadingBox from "@/design-systems/molecule/LoadingBox";
import useVerifyGamePay from "@/hookes/api-hooks/useVerifyGamePay";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";

function FarmYourLuckTemplate() {
  const { isConnected: isWalletConnected } = useCheckWalletConnection();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexForReward, setSelectedIndexForReward] = useState(-1);
  const [isFlipped, setIsFlipped] = useState(Array.from({ length: 9 }).fill(0));
  const [supportingText, setSupportingText] = useState(
    "Tap a card to view details"
  );

  const { chainId, address } = useAccount();
  const [rewardAmount, setRewardAmount] = useState("");
  const [buttonText, setButtonText] = useState("Pay $5");
  const pathname = usePathname();
  const [isPayed, setIsPayed] = useState(false);

  const [gotReward, setGotReward] = useState(false);

  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const { data: luckData, mutateAsync: getLuckAsync } = useBorrowGame();
  const {
    data: farmLuckDetails,
    isLoading,
    refetch: refetchFarmLuckDetails,
  } = useFarmLuckDetails(address, chainId);

  const { data, mutateAsync: verifyGamePayment } = useVerifyGamePay();

  const [payLoading, setPayLoading] = useState(false);
  const { usdValue: ethPrice } = useGetUsdValue();
  console.log(ethPrice, "ethPrice");

  useEffect(() => {
    if ((farmLuckDetails?.totalLuck || 0) > 0 && !isRevealed) {
      setIsPayed(true);
      setButtonText("Select Card");
    }
  }, [farmLuckDetails]);

  useEffect(() => {
    if (buttonText === "Claim Reward" && isPayed && gotReward) {
      setRewardAmount("$50");
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

  const {
    sendTransaction,
    data: hash,
    isError: payHashError,
    reset: resetSendTransaction,
  } = useSendTransaction({
    mutation: {
      onError: () => {
        setTimeout(() => {
          setPayLoading(false);
        }, 400);
        setIsPayed(false);
      },
      onSuccess: async () => {},
    },
  });

  const result = useWaitForTransactionReceipt({
    hash: hash,
  });

  const handleCheckLuck = async () => {
    let res;
    if (address && chainId) {
      res = await getLuckAsync({
        numberOfBoxes: 9,
        userChosenBoxIndex: selectedIndexForReward,
        address,
        chainId,
      });
    }
    if (selectedIndexForReward !== -1 && (res || 0) > 0) {
      setSupportingText("Congratulations! You have earned");
      setButtonText("Congratulations!");
      if (res == 1) setRewardAmount("$50");
      if (res == 2) setRewardAmount("5x Reward Points");
      if (res == 3) setRewardAmount("10x Reward Points");
      setIsRevealed(true);
      refetchFarmLuckDetails();
      return;
    } else if (selectedIndexForReward !== -1 && res === 0) {
      setRewardAmount("Better Luck Next Time");
      setSupportingText("");
      setButtonText("Try Next Time");
      setIsRevealed(true);
      refetchFarmLuckDetails();
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

      if (isPayed) {
        setSelectedIndexForReward(index);
      }

      setButtonText("Reveal Reward");
      setSupportingText("Revealed upon confirmation.");
    }
  };

  const handleReset = async () => {
    await refetchFarmLuckDetails();
    resetSendTransaction();
    setSelectedIndex(-1);
    setSelectedIndexForReward(-1);
    setIsFlipped(Array.from({ length: 9 }).fill(false));
    setIsRevealed(false);
    setGotReward(false);
    setSupportingText("Tap a card to view details");
    setRewardAmount("");
    if ((farmLuckDetails?.totalLuck || 0) > 0) {
      setIsPayed(true);
      setButtonText("Select Card");
    } else {
      setButtonText("Pay $5");
      setIsPayed(false);
    }
  };

  useEffect(() => {
    setPayment();
  }, [result]);

  const setPayment = async () => {
    if (result.isSuccess && result.data) {
      await verifyGamePayment({
        address: address,
        chainId: chainId,
        txHash: hash,
      });

      if (!isPayed) setButtonText("Select Card");
      resetSendTransaction();
      await refetchFarmLuckDetails();
      setIsPayed(true);

      setTimeout(() => {
        setPayLoading(false);
      }, 400);
    } else if (result.isError) {
      setTimeout(() => {
        setPayLoading(false);
      }, 400);
      setIsPayed(false);
      refetchFarmLuckDetails();
    }
  };

  const handleButtonClick = async () => {
    if ((farmLuckDetails?.totalLuck || 0) === 0 && !isPayed) {
      setPayLoading(true);
      const amountToPay = calculateEthAmount(Number(ethPrice || 0) / 100, 0.5);
      await sendTransaction({
        to: FarmYourLuckWalletAddress,
        value: parseEther(amountToPay.toString()),
      });
    }

    if (isRevealed) {
      handleReset();
      return;
    }

    if (!isPayed) {
      setButtonText("Pay $5");
    }

    if (selectedIndexForReward == -1 && isPayed) {
      setButtonText("Select Card");
    }

    if (isPayed && selectedIndexForReward !== -1 && !isRevealed) {
      handleCheckLuck();
    }
  };

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
                  Pick a card for $5 and you could win $75 in option fees.
                </li>
                <li className="mb-3 text-lg">
                  Click ‘Reveal Reward’ to see if you chose correctly.
                </li>
                <li className="mb-3 text-lg">
                  Win Option Fee or Partner Fee rewards on a correct pick.
                </li>
                <li className="text-lg">Missed? Try again with another $5!</li>
              </ol>

              <div className="border border-grayLight flex  mt-4">
                <div className="p-4 w-1/2 border border-grayLight border-l-0 border-y-0">
                  <Typography variant="regular" size="h4">
                    ${farmLuckDetails?.fixed50Dollar || 0}
                  </Typography>
                  <Typography className="text-grayLight mt-3 " size="lg">
                    Reward
                  </Typography>
                </div>
                <div className="p-4  w-1/2">
                  <Typography variant="regular" size="h4">
                    {farmLuckDetails?.totalLuck || 0}
                  </Typography>
                  <Typography className="text-grayLight mt-3 " size="lg">
                    Luck
                  </Typography>
                </div>
              </div>

              <div className="border border-grayLight flex border-t-0">
                <div className="p-4 py-8  gap-4 w-full flex items-center">
                  <Typography variant="regular" size="h4">
                    {farmLuckDetails?.multiply10x
                      ? "10"
                      : farmLuckDetails?.multiply5x
                      ? "5"
                      : 0}
                    x Points
                  </Typography>
                  {(farmLuckDetails?.multiply10x
                    ? "10"
                    : farmLuckDetails?.multiply5x
                    ? "5"
                    : 0) !== 0 && (
                    <Typography className="text-grayLight  " size="lg">
                      {"valid till  "}
                      {calculateRemainingDays(
                        farmLuckDetails?.multiply10x
                          ? farmLuckDetails?.deadLine10xTimestamp
                          : farmLuckDetails?.multiply5x
                          ? farmLuckDetails?.deadLine5xTimestamp
                          : 0
                      )}
                    </Typography>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute w-full  overflow-hidden  left-0 bottom-0 h-[90px]">
              {isWalletConnected && address ? (
                <>
                  {!payLoading && (
                    <button
                      // disabled={isPayed && selectedIndex == -1}
                      onClick={() => handleButtonClick()}
                      className={` w-full  text-white h-[90px] font-bold text-[32px]  ${
                        false
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
                  )}

                  <LoadingBox
                    isLoading={payLoading}
                    isFailure={payHashError || result.isError}
                    isSuccess={result.isSuccess}
                    setSuccessLoading={() => console.log()}
                    heading="Transaction Pending"
                  />
                </>
              ) : (
                <WalletConnectButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmYourLuckTemplate;
