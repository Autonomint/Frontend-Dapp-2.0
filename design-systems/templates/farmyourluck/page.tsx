"use client";
import { Typography } from "@/design-systems/atoms/Typography";
import LoadingBox from "@/design-systems/molecule/LoadingBox";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import WalletConnectButton from "@/design-systems/molecule/WalletConnectButton";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import { useFarmLuckDetails } from "@/hookes/api-hooks/useFarmyourLuckDetails";
import { useBorrowGame } from "@/hookes/api-hooks/useGetLuck";
import useVerifyGamePay from "@/hookes/api-hooks/useVerifyGamePay";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import { FarmYourLuckWalletAddress } from "@/utils/constants";
import {
  calculateEthAmount,
  calculateRemainingTimeDate,
} from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import "../../../styles/farmyourluckstyles.css";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import { DownArrowIcon } from "@/design-systems/atoms/SvgIcons";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [isPaymentConformed, setPaymentConformed] = useState(false);

  const [isShowRewardDetails, setIsShowRewardDetails] = useState(false);

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
    sendTransactionAsync,
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
      // res = 3;
      res = await getLuckAsync({
        numberOfBoxes: 9,
        userChosenBoxIndex: selectedIndexForReward,
        address,
        chainId,
      });
    }
    if (selectedIndexForReward !== -1 && (res || 0) > 0) {
      setSupportingText("Congratulations!");
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
    setPayLoading(false);
    if ((farmLuckDetails?.totalLuck || 0) > 0) {
      setIsPayed(true);
      setButtonText("Select Card");
    } else {
      setButtonText("Pay $5");
      setIsPayed(false);
    }
  };

  // useEffect(() => {
  //   setPayment(hash);
  // }, [result]);

  const setPayment = async (hash?: string) => {
    try {
      const verifyData = await verifyGamePayment({
        address: address,
        chainId: chainId,
        txHash: hash,
      });

      if (verifyData) {
        setPaymentConformed(true);

        if (!isPayed) setButtonText("Select Card");
        resetSendTransaction();
        await refetchFarmLuckDetails();
        setIsPayed(true);

        setTimeout(() => {
          setPayLoading(false);
        }, 400);
        toast.custom((t) => (
          <ToastNotification
            message=""
            title="Payment successful"
            onClose={() => toast.dismiss(t)}
          />
        ));
      } else if (!verifyData) {
        setTimeout(() => {
          setPayLoading(false);
        }, 400);
        setIsPayed(false);
        refetchFarmLuckDetails();
        handleReset();
        toast.custom((t) => (
          <ToastNotificationError
            title="Payment failed, Please try again"
            onClose={() => toast.dismiss(t)}
          />
        ));
      }
    } catch (error) {
      setTimeout(() => {
        setPayLoading(false);
      }, 400);
      setIsPayed(false);
      refetchFarmLuckDetails();
      handleReset();
      toast.custom((t) => (
        <ToastNotificationError
          title="Payment failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    }
  };
  console.log(ethPrice, "ethPrice");

  const handleButtonClick = async () => {
    if ((farmLuckDetails?.totalLuck || 0) === 0 && !isPayed) {
      setPayLoading(true);
      const amountToPay = calculateEthAmount(
        Number(ethPrice || 0) / 100,
        5.00001
      );

      const txHash = await sendTransactionAsync({
        to: FarmYourLuckWalletAddress,
        value: parseEther(amountToPay.toFixed(9)),
      });
      setTimeout(() => {
        setPayment(txHash);
      }, 5000);
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
    <div className="min-h-fit xl:min-h-[calc(100vh-160px)] 3xl:min-h-[calc(100vh-268px)]xl:min-h-[calc(100vh-160px)] w-full flex flex-col">
      <AppNavbar tabOptions={tabs} />
      <div className="grid grid-cols-1 lg:grid-cols-6  border-b xl:min-h-[calc(100vh-160px)] border-grayLight">
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
        <div className="grid pb-[112px] lg:pb-[112px] col-span-1 lg:col-span-2 lg:p-6 border border-grayLight relative">
          <div
            className={`pb-0 lg:pb-[25px]  xl:pb-0 flex flex-col  justify-between border border-solid border-grayLight lg:border-0 p-5 lg:p-0 2xl:gap-0 lg:gap-0`}
          >
            <span className="text-grayLight font-medium lg:text-[28px] text-[24px] lg:text-left">
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
                  {supportingText === "Congratulations!" && (
                    <div className="text-[#7A7A7A] text-lg font-normal">
                      You have earned
                    </div>
                  )}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.span
                  key={rewardAmount}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={rewardAmountVariants}
                  className="block text-[#111111] lg:h-[30px] xl:h-[80px] h-[80px] 2xl:h-[100px] xl:my-2 dark:text-white text-[24px]  2xl:text-[42px] lg:text-left"
                >
                  {rewardAmount && <div className="">{rewardAmount}</div>}
                </motion.span>
              </AnimatePresence>
            </span>
            <div>
              <div className="border border-grayLight flex rounded-xl  my-6">
                <div className="p-4 flex justify-center items-center gap-3 w-full">
                  <Typography variant="regular" size="h4">
                    {farmLuckDetails?.totalLuck || 0}
                  </Typography>
                  <Typography className="text-grayLight  " size="lg">
                    Luck
                  </Typography>
                </div>
              </div>
              <div className="md:h-[261px] h-[267px] xl:h-[284px] hxl:h-[250px] 2xl:h-[260px]">
                <div
                  className={`flex overflow-hidden transition-all delay-150 duration-300 ease-in-out flex-col text-left   ${
                    isShowRewardDetails
                      ? "h-[0px]  mb-0 "
                      : "h-[180px] lg:h-[205px] xl:h-[220px] md:h-[166px] hxl:h-[175px] 2xl:h-[201px] 3xl:h-[211px] mb-2  2xl:mb-0 "
                  }`}
                >
                  <div className="text-textBlack lg:text-[28px] 2xl:text-3xl text-[20px] font-medium dark:text-white">
                    How it works?
                  </div>
                  <ol className="list-decimal list-inside mt-2 text-grayLight">
                    <li className="mb-2 text-sm md:text-md 2xl:text-lg">
                      Pick a card for $5 and you could win $75 in option fees.
                    </li>
                    <li className="mb-2 text-sm md:text-md 2xl:text-lg">
                      Click ‘Reveal Reward’ to see if you chose correctly.
                    </li>
                    <li className="mb-2 text-sm md:text-md 2xl:text-lg">
                      Win Option Fee or Partner Fee rewards on a correct pick.
                    </li>
                    <li className="2xl:text-lg md:text-md text-sm">
                      Missed? Try again with another $5!
                    </li>
                  </ol>
                </div>
                <div
                  className={` border bg-[#E5F3FF] overflow-hidden dark:bg-[#171B21] border-grayLight text-lg font-medium flex flex-col mb-4 rounded-[10px]  transition-all delay-150 duration-300 ease-in-out  ${
                    isShowRewardDetails
                      ? "h-[224px] md:h-[228px] lg:h-[272px] xl:h-[233px] mb-20"
                      : "h-[59px]"
                  } `}
                >
                  <div
                    onClick={() => setIsShowRewardDetails(!isShowRewardDetails)}
                    className={`cursor-pointer px-4 py-4 bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top border-grayLight  border-b flex  flex-row justify-between `}
                  >
                    <div>Reward Details</div>
                    <div>
                      {isShowRewardDetails ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>
                  <div>
                    <table className="w-full ">
                      <tbody>
                        <tr className="border-b text-[#7A7A7A] text-[14px] md:text-base text-left border-grayLight ">
                          <th className="py-2 px-2 md:py-2 md:px-4">Type</th>
                          <th className="py-2 px-2 md:py-2 md:px-4">Details</th>
                        </tr>
                        <tr className="border-b border-grayLight text-[14px] md:text-base ">
                          <td className="py-2 px-2 md:py-2 md:px-4 ">Reward</td>
                          <td className="py-2 px-2 md:py-2 md:px-4">
                            ${farmLuckDetails?.fixed50Dollar || 0}
                          </td>
                        </tr>
                        <tr className="border-b border-grayLight  text-[14px] md:text-base">
                          <td className="py-2 px-2 md:py-2 md:px-4">
                            5x Point
                          </td>
                          <td className="py-2 px-2 md:py-2 md:px-4">
                            {
                              calculateRemainingTimeDate(
                                farmLuckDetails?.deadLine5xTimestamp || ""
                              ).formattedTime
                            }
                          </td>
                        </tr>
                        <tr className=" text-[14px] md:text-base ">
                          <td className="py-2 px-2 md:py-2 md:px-4">
                            10x Point
                          </td>
                          <td className="py-2 px-2 md:py-2 md:px-4">
                            {
                              calculateRemainingTimeDate(
                                farmLuckDetails?.deadLine10xTimestamp || ""
                              ).formattedTime
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
    </div>
  );
}

export default WithPrivateRoute(FarmYourLuckTemplate);
