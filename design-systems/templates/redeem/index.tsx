"use client";
import { abondAbi } from "@/blockchain/abis/abond";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { usDaAbi } from "@/blockchain/abis/usda";
import {
  abondAddress,
  borrowingContractAddress,
  cdsAddress,
  sUSDAddress,
  testusdtAbiAddress,
  usDaAddress,
  usdcAddress,
} from "@/blockchain/contracts";
import { Button } from "@/design-systems/atoms/button";
import { GenericDropdownMenu } from "@/design-systems/atoms/DropdownCustom/GenericDropdownMenu";
import { Input } from "@/design-systems/atoms/input";
import { Typography } from "@/design-systems/atoms/Typography";
import LoadingBox from "@/design-systems/molecule/LoadingBox";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import { NetworkId, scanUrls } from "@/utils/constants";
import { handleWheel } from "@/utils/helpers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useFormik } from "formik";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { formatEther, zeroAddress } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import * as Yup from "yup";

// Define the validation schema using Yup
const formSchema = Yup.object({
  inputCollateral: Yup.string().required("Input collateral is required"),
  collateralAmount: Yup.number()
    .positive("Value must be positive")
    .min(0.02, "Value must be at least 0.02")
    .max(Yup.ref("usdaBalance"), "Collateral amount cannot exceed balance")
    .required("Collateral amount is required")
    .nullable(),
  // outputCollateralAmount: Yup.number().positive("Value must be positive"),
  outputCollateral: Yup.string(),
  redeemTokenName: Yup.string(),
  usdaBalance: Yup.number(),
});

// Define the initial values
const initialValues = {
  inputCollateral: "",
  collateralAmount: undefined,
  outputCollateral: "",
  outputCollateralAmount: 0,
  usdaBalance: 0,
  redeemTokenName: "USDT",
};

const RedeemContainer = () => {
  const { isConnected: isWalletConnected } = useCheckWalletConnection();

  const [redeemLoadingLocal, setRedeemLoadingLocal] = useState<boolean>(false);
  const [redeemFnLoadingLocal, setRedeemFnLoadingLocal] =
    useState<boolean>(false);
  const [usdaApproveLoadingLocal, setUsdaApproveLocal] =
    useState<boolean>(false);
  const [abondApproveLoadingLocal, setAbondApproveLoadingLocal] =
    useState<boolean>(false);

  const { address: accountAddress } = useAccount();
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const chainId = useChainId();

  const { data: abondbalance, refetch: refetchBlAbond } = useBalance({
    address: abondAddress ? accountAddress : undefined,
    token: abondAddress
      ? abondAddress[chainId as keyof typeof abondAddress]
      : undefined,
  });

  const { data: amintbalance, refetch: refetchBlAmint } = useBalance({
    address: usDaAddress ? accountAddress : undefined,
    token: usDaAddress
      ? usDaAddress[chainId as keyof typeof usDaAddress]
      : undefined,
  });

  useEffect(() => {
    if (formik.values.inputCollateral == "abond") {
      formik.setFieldValue("usdaBalance", Number(abondbalance?.formatted));
    } else if (formik.values.inputCollateral == "amint") {
      formik.setFieldValue("usdaBalance", Number(amintbalance?.formatted));
    }
  }, [abondbalance, amintbalance, formik.values.inputCollateral]);

  const options = Options.newOptions()
    .addExecutorLzReceiveOption(200000, 0)
    .toHex()
    .toString() as `0x${string}`;
  const Eid = chainId === 11155111 ? 40245 : 40161;
  // const { quoteValue: nativeFee1, quoteError } = useGetGlobalQuote(options);

  const {
    isPending: amintApproveLoading,
    data: amintApproveData,
    writeContract: amintApproveWrite,
    isSuccess: amintApproved,
    isError: usdaErrorApproveTs,
  } = useWriteContract({
    mutation: {
      onError(error: any) {
        handleFail();
      },

      // Handle success and show a custom toast notification
      onSuccess: (data) => {},
    },
  });

  const {
    data: amintTransactionAllowed,
    isLoading: isAmintTransactionLoading,
    isError: usdaErrorApprove,
    isSuccess: usdaApproveSuccess,
  } = useWaitForTransactionReceipt({
    hash: amintApproveData,
  });

  console.log(
    formik.values.redeemTokenName === "USDT"
      ? testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
      : formik.values.redeemTokenName === "USDC"
      ? usdcAddress[chainId as keyof typeof usdcAddress]
      : formik.values.redeemTokenName === "sUSD"
      ? sUSDAddress[chainId as keyof typeof sUSDAddress]
      : zeroAddress,
    "usd"
  );

  useEffect(() => {
    if (usdaApproveSuccess) {
      setUsdaApproveLocal(false);
      setTimeout(() => {
        setRedeemFnLoadingLocal(true);
      }, 1000);
      redeemUsdt?.({
        abi: cdsAbi,
        address: cdsAddress[chainId as keyof typeof cdsAddress],
        functionName: "redeemAssets",
        args: [
          BigInt(Number(formik.values.collateralAmount) * 10 ** 6),
          formik.values.redeemTokenName === "USDT"
            ? testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
            : formik.values.redeemTokenName === "USDC"
            ? usdcAddress[chainId as keyof typeof usdcAddress]
            : formik.values.redeemTokenName === "sUSD"
            ? sUSDAddress[chainId as keyof typeof sUSDAddress]
            : zeroAddress,
        ],
        // value: nativeFee1.nativeFee,
      });
    } else if (usdaErrorApprove) {
      handleFail();
    }
  }, [amintTransactionAllowed]);

  const {
    writeContract: redeemUsdt,
    data: redeemUsdtData,
    reset: resetUsdt,
    isPending: isRedeemUsdt,
    isError: redeemUsdtIsError,
  } = useWriteContract({
    // Handle errors during the process
    mutation: {
      onError: (error: any) => {
        handleFail();
        // Show a custom toast notification for the error
      },
      onSuccess: (data) => {},
    },
  });

  const {
    data: redeemdataUsdt,
    isLoading: isRedeemUsdtTransactionLoading,
    isError: redeemUsdtError,
    isSuccess: redeemUsdtSuccess,
    error: redeemError,
  } = useWaitForTransactionReceipt({
    hash: redeemUsdtData,
  });

  useEffect(() => {
    if (redeemUsdtSuccess) {
      handleSuccess();
    } else if (redeemUsdtError) {
      handleFail();
    }
  }, [redeemdataUsdt]);

  const handleFail = () => {
    toast.custom((t) => (
      <ToastNotificationError
        title="Transaction failed, Please try again"
        onClose={() => toast.dismiss(t)}
      />
    ));
    handleClearLoading();
    refetchBlAbond();
    refetchBlAmint();
  };
  const handleSuccess = () => {
    toast.custom((t) => {
      const link = `${scanUrls[chainId as keyof typeof scanUrls]}${
        redeemdataEth?.transactionHash
      } `;
      return (
        <ToastNotification
          title="Redeem Successful"
          message=""
          linkText={
            chainId === 84532 ? "View On Basescan" : "View On Etherscan"
          }
          linkUrl={link}
          onClose={() => toast.dismiss(t)}
        />
      );
    });
    refetchBlAbond();
    refetchBlAmint();
    handleClearLoading();
    formik.setValues(initialValues);
    formik.setTouched({
      collateralAmount: false,
      inputCollateral: false,
      outputCollateralAmount: false,
    });
  };
  const handleClearLoading = () => {
    setTimeout(() => {
      setRedeemLoadingLocal(false);
    }, 1000);
    setRedeemFnLoadingLocal(false);
    setAbondApproveLoadingLocal(false);
    setUsdaApproveLocal(false);
    setAbondApproveLoadingLocal(false);
    setUsdaApproveLocal(false);
  };

  const { data: outputData, error } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getAbondYields",
    args: [
      accountAddress as `0x${string}`,
      BigInt(Number(formik.values.collateralAmount || 0) * 10 ** 18),
    ],
  });

  console.log(
    outputData,
    error,
    formik.errors,
    formik.values,
    "outputData",
    BigInt(Number(formik.values.collateralAmount || 0) * 10 ** 18)
  );

  useEffect(() => {
    if (
      formik.values.inputCollateral === "abond" &&
      (formik.values.collateralAmount || 0) > 0
    ) {
      if (
        (formik.values.collateralAmount || 0) >
        Number(abondbalance?.formatted.slice(0, 8))
      ) {
        formik.setErrors({
          collateralAmount: "Insufficient Balance",
        });
      } else {
        formik.setErrors({
          collateralAmount: "",
        });
        if (outputData) {
          formik.setFieldValue(
            "outputCollateralAmount",
            Number(formatEther(outputData[0]) || 1)
          );
        }
      }
    } else if (
      formik.values.inputCollateral === "amint" &&
      (formik.values.collateralAmount || 0) > 0
    ) {
      if (
        (formik.values.collateralAmount || 0) >
        Number(amintbalance?.formatted.slice(0, 9))
      ) {
        formik.setErrors({ collateralAmount: "Insufficient Balance" });
      } else {
        formik.setErrors({ collateralAmount: "" });
        formik.setFieldValue(
          "outputCollateralAmount",
          Number(formik.values.collateralAmount)
        );
      }
    } else {
      formik.setFieldValue("outputCollateralAmount", 0);
    }
  }, [formik.values, outputData]);

  const {
    isPending: abondApproveLoading,
    data: abondApproveData,
    writeContract: abondApproveWrite,
    isSuccess: abondApproved,
    isError: abondIsError,
  } = useWriteContract({
    // Handle error and show a custom toast notification
    mutation: {
      onError(error: any) {
        // setOpen(false);
        handleFail();
      },

      // Handle success and show a custom toast notification
      onSuccess: (data) => {
        //closing sheet so that user can click on the links from the toast
        // setOpen(false);
      },
    },
  });

  const {
    data: abondTransactionAllowed,
    isLoading: isAbondTransactionLoading,
    isError: abondApproveError,
    isSuccess: abondApproveSuccess,
    error: AbondError,
  } = useWaitForTransactionReceipt({
    // look for approval transaction hash
    hash: abondApproveData,
    // Display a custom toast notification
  });

  useEffect(() => {
    if (abondApproveSuccess) {
      setAbondApproveLoadingLocal(false);
      setTimeout(() => {
        setRedeemFnLoadingLocal(true);
      }, 1000);
      redeemEth?.({
        abi: borrowingContractAbi,
        address:
          borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ],
        functionName: "redeemYields",
        args: [BigInt(Number(formik.values.collateralAmount) * 10 ** 18)],
      });
    }
    if (abondApproveError) {
    }
  }, [abondTransactionAllowed]);

  const {
    writeContract: redeemEth,
    data: redeemEthData,
    reset: resetEth,
    isPending: isRedeemEthLoading,
    isError: redeemEthIsError,
  } = useWriteContract({
    // Handle errors during the CDS deposit process
    mutation: {
      onError: (error: any) => {
        // console.log(error.message);
        console.log("MESSAGE", error.cause);
        handleFail();
        // Show a custom toast notification for the error

        // Dismiss the toast notification after 5 seconds
      },
      // Handle the successful completion of the CDS deposit process
      onSuccess: (data) => {
        // Show a custom toast notification for the successful transaction
      },
    },
  });

  const {
    data: redeemdataEth,
    isLoading: isRedeemEthTransactionLoading,
    isError: redeemEthError,
    isSuccess: redeemEthSuccess,
    error: redeemEthErorrdata,
  } = useWaitForTransactionReceipt({
    hash: redeemEthData,
  });

  useEffect(() => {
    if (redeemEthSuccess) {
      handleSuccess();
    } else if (redeemEthError) {
      handleFail();
    }
  }, [redeemdataEth]);

  async function handleSubmit(values: typeof initialValues) {
    if (values.inputCollateral === "amint") {
      setRedeemLoadingLocal(true);
      setUsdaApproveLocal(true);
      amintApproveWrite({
        abi: usDaAbi,
        address: usDaAddress[chainId as keyof typeof usDaAddress],
        functionName: "approve",
        args: [
          cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
          BigInt((values.collateralAmount || 0) * 10 ** 6),
        ],
      });
    } else if (values.inputCollateral === "abond") {
      setRedeemLoadingLocal(true);
      setAbondApproveLoadingLocal(true);
      abondApproveWrite({
        abi: abondAbi,
        address: abondAddress[chainId as keyof typeof abondAddress],
        functionName: "approve",
        args: [
          borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ] as `0x${string}`,
          BigInt((values.collateralAmount || 0) * 10 ** 18),
        ],
      });
    }
  }

  const dropdownItems = [
    {
      label: "USDa",
      onClick: () => formik.setFieldValue("inputCollateral", "amint"),
    },
    {
      label: "Abond",
      onClick: () => formik.setFieldValue("inputCollateral", "abond"),
    },
  ];

  const RedeemTokenDropdownItems = useMemo(() => {
    const options = [
      {
        label: "USDT",
        onClick: () => formik.setFieldValue("redeemTokenName", "USDT"),
      },
      {
        label: "USDC",
        onClick: () => formik.setFieldValue("redeemTokenName", "USDC"),
      },
    ];
    if (chainId === NetworkId.Mode) {
      options.push({
        label: "sUSD",
        onClick: () => formik.setFieldValue("redeemTokenName", "sUSD"),
      });
    }
    return options;
  }, [chainId]);

  console.log(RedeemTokenDropdownItems, "RedeemTokenDropdownItems");

  const pathname = usePathname();

  const handleChange = (event: any) => {
    formik.setFieldValue("redeemTokenName", event.target.value);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-185px)] ">
      <AppNavbar
        activeBack={true}
        tabOptions={[
          {
            nameA: "Redeem",
            path: "/redeem",
            isActive: pathname === "/redeem",
          },
        ]}
      />
      <div className="w-full h-full flex flex-col flex-1 justify-center">
        <div className="lg:py-8 py-5 px-5 lg:px-[15%] border-solid border-graylight">
          <div className="flex gap-8 flex-col md:flex-row">
            <div className="flex flex-col gap-2 flex-1">
              <span className="text-medium text-grayLight text-lg ">
                Input Amount
              </span>
              <Input
                placeholder="Enter amount here"
                onWheel={handleWheel}
                type="number"
                name="collateralAmount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.collateralAmount}
                className="flex  items-center h-[50px] border border-grayLight font-medium md:text-[24px] dark:text-[24px]"
              />
              <Typography size="sm" variant="regular" className="text-red-500">
                {formik.errors.collateralAmount &&
                formik.touched.collateralAmount
                  ? formik.errors.collateralAmount
                  : ""}
              </Typography>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="text-medium text-grayLight text-lg ">
                Select Collateral
              </span>
              <div className="flex gap-4">
                <GenericDropdownMenu
                  buttonText={
                    formik.values.inputCollateral
                      ? `${
                          formik.values.inputCollateral === "amint"
                            ? "USDa"
                            : "Abond"
                        }`
                      : "Select"
                  }
                  items={dropdownItems}
                  className="w-full text-[24px] border border-grayLight"
                />
              </div>
              <div className="text-black flex justify-between dark:text-white md:text-lg text-right mb-4 text-[14px]">
                <Typography
                  size="sm"
                  variant="regular"
                  className="text-red-500"
                >
                  {formik.errors.inputCollateral &&
                  formik.touched.inputCollateral
                    ? formik.errors.inputCollateral
                    : ""}
                </Typography>
                <div>
                  Balance{" "}
                  <span className="text-grayLight">
                    {formik.values.inputCollateral == "amint"
                      ? `${amintbalance?.formatted || 0} USDa`
                      : `${abondbalance?.formatted || 0}  Abond`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-solid border-grayLight dark:border-grayLight p-5 mt-2 lg:mt-8">
            <div className="flex justify-between">
              <div className="text-grayLight text-lg ">Redeemable Amount</div>
            </div>
            <div className="md:text-[42px] text-[32px] text-textBlack  mt-8 font-medium dark:text-white">
              <div>
                {formik.values.inputCollateral === "amint" ? (
                  <div className="text-sm text-black font-medium dark:text-[#FFFF] mt-2 flex justify-start">
                    <div className="p-1 flex justify-start gap-3 items-center text-2xl basis-3/5 text-bold">
                      {formik.values.collateralAmount || 0}{" "}
                      {formik.values.inputCollateral === "amint" && (
                        <GenericDropdownMenu
                          buttonText={
                            formik.values.redeemTokenName
                              ? `${formik.values.redeemTokenName}`
                              : "Select"
                          }
                          items={RedeemTokenDropdownItems}
                          className="w-[110px] text-[24px] p-0 border-0"
                          iconWrapBg="!border-0"
                          contentWrapClass="!w-[120px] "
                        />
                      )}
                    </div>
                  </div>
                ) : formik.values.inputCollateral === "abond" ? (
                  <div className="text-sm text-black mt-2 font-medium dark:text-[#FFFF] flex ">
                    <div className="flex justify-start items-center gap-2 mr-1 ">
                      <div className="flex items-center p-1 text-2xl  text-bold">
                        {outputData
                          ? Number(formatEther(outputData[3])).toFixed(5)
                          : 0}{" "}
                        ETH
                      </div>
                      <div className="text-xl">+</div>

                      <div className="flex items-center p-1 text-2xl  text-bold">
                        {outputData
                          ? Number(formatEther(outputData[1])).toFixed(5)
                          : 0}{" "}
                        WeETH
                      </div>
                      <div className="text-xl">+</div>
                      <div className="flex items-center p-1 text-2xl  text-bold">
                        {outputData
                          ? Number(formatEther(outputData[2])).toFixed(5)
                          : 0}{" "}
                        WrsETH
                      </div>

                      <div className="text-xl">+</div>
                      <div className="flex items-center p-1 text-2xl  text-bold">
                        {outputData
                          ? Number(formatEther(outputData[4])).toFixed(2)
                          : 0}{" "}
                        USDa
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center pt-1 basis-3/5 text-black dark:text-white text-2xl font-semibold">
                    0 Output Amount
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-grayLight md:text-lg text-center lg:mb-4 py-8 lg:py-0 lg:border-0 border-t border-solid border-grayLight text-[14px]">
          Note: 0% Withdrawal Fee will be applied.
        </div>
        <div className="flex justify-center items-center overflow-hidden lg:mb-20">
          <div className=" w-full lg:w-[45%] h-[80px] lg:h-[120px]">
            {!redeemLoadingLocal && (
              <Button
                onClick={() => formik.handleSubmit()}
                className="bg-textBlack w-full text-white h-full  md:text-[32px] text-[24px] font-bold  py-4 md:p-0 dark:bg-custom-gradient-to-top"
              >
                Redeem
              </Button>
            )}
            <LoadingBox
              isLoading={usdaApproveLoadingLocal}
              isFailure={usdaErrorApproveTs || usdaErrorApprove}
              isSuccess={Boolean(usdaApproveSuccess)}
              setSuccessLoading={() => console.log()}
              heading="Approving USDa"
              loadingCount="1/2"
            />
            <LoadingBox
              isLoading={abondApproveLoadingLocal}
              isFailure={abondIsError || abondApproveError}
              isSuccess={Boolean(abondApproveSuccess)}
              setSuccessLoading={() => console.log()}
              heading="Approving Abond"
              loadingCount="1/2"
            />
            <LoadingBox
              isLoading={
                redeemFnLoadingLocal &&
                formik.values.inputCollateral === "amint"
              }
              isFailure={redeemUsdtIsError || redeemUsdtError}
              isSuccess={Boolean(redeemUsdtSuccess)}
              setSuccessLoading={() => console.log()}
              heading={"Redeeming " + formik.values.redeemTokenName}
              loadingCount="2/2"
            />

            <LoadingBox
              isLoading={
                redeemFnLoadingLocal &&
                formik.values.inputCollateral === "abond"
              }
              isFailure={redeemEthIsError || redeemEthError}
              isSuccess={Boolean(redeemEthSuccess)}
              setSuccessLoading={() => console.log()}
              heading={"Redeeming " + formik.values.inputCollateral}
              loadingCount="2/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithPrivateRoute(RedeemContainer);
