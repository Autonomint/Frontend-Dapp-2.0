"use client";
import { abondAbi } from "@/blockchain/abis/abond";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { usDaAbi } from "@/blockchain/abis/usda";
import {
  abondAddress,
  borrowingContractAddress,
  cdsAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { Button } from "@/components/ui/button";
import { GenericDropdownMenu } from "@/components/ui/DropdownCustom/GenericDropdownMenu";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/Typography";
import LoadingBox from "@/custom-components/LoadingBox";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { on } from "events";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { formatEther } from "viem";
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
    .required("Collateral amount is required"),
  outputCollateralAmount: Yup.number().positive("Value must be positive"),
  // .required("Output collateral amount is required"),
  outputCollateral: Yup.string(),
  //   .required("Output collateral is required"),
});
// Define the initial values
const initialValues = {
  inputCollateral: "",
  collateralAmount: 0,
  outputCollateral: "",
  outputCollateralAmount: 0,
};
const RedeemContainer = () => {
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
  const { data: abondbalance } = useBalance({
    address: abondAddress ? accountAddress : undefined,
    token: abondAddress
      ? abondAddress[chainId as keyof typeof abondAddress]
      : undefined,
  });

  const { data: amintbalance } = useBalance({
    address: usDaAddress ? accountAddress : undefined,
    token: usDaAddress
      ? usDaAddress[chainId as keyof typeof usDaAddress]
      : undefined,
  });
  const toastId = useRef<string | number>("");
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(200000, 0)
    .toHex()
    .toString() as `0x${string}`;
  const Eid = chainId === 11155111 ? 40245 : 40161;
  const { quoteValue: nativeFee1, quoteError } = useGetGlobalQuote(options);

  console.log(nativeFee1?.nativeFee);

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

  useEffect(() => {
    if (usdaApproveSuccess && nativeFee1) {
      setTimeout(() => {
        setUsdaApproveLocal(false);
      }, 1000);
      setRedeemFnLoadingLocal(true);
      redeemUsdt?.({
        abi: cdsAbi,
        address: cdsAddress[chainId as keyof typeof cdsAddress],
        functionName: "redeemUSDT",
        args: [
          BigInt(Number(formik.values.collateralAmount) * 10 ** 6),
          BigInt(1000000),
          BigInt(1000000),
        ],
        value: nativeFee1.nativeFee,
      });
    } else if (usdaErrorApprove) {
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
        // console.log(error.message);
        console.log("MESSAGE", error.cause);
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
    toast.error("Redeem Failed");
    handleClearLoading();
  };
  const handleSuccess = () => {
    toast.success("Redeem Successful");
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

  console.log(outputData, formik.values.collateralAmount, error, "outputData");

  useEffect(() => {
    if (
      formik.values.inputCollateral === "abond" &&
      formik.values.collateralAmount > 0
    ) {
      console.log(abondbalance?.formatted);

      if (
        formik.values.collateralAmount >
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
            Number(formatEther(outputData[0]))
          );
        }
      }
    } else if (
      formik.values.inputCollateral === "amint" &&
      formik.values.collateralAmount > 0
    ) {
      console.log(amintbalance?.formatted);
      if (
        formik.values.collateralAmount >
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
  }, [formik.values.collateralAmount, outputData]);

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
      setTimeout(() => {
        setAbondApproveLoadingLocal(false);
      }, 1000);
      setRedeemFnLoadingLocal(true);
      redeemEth?.({
        abi: borrowingContractAbi,
        address:
          borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ],
        functionName: "redeemYields",
        args: [
          accountAddress as `0x${string}`,
          BigInt(Number(formik.values.collateralAmount) * 10 ** 18),
        ],
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
        console.log(data);
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

  console.log(formik.errors, "w");

  async function handleSubmit(values: typeof initialValues) {
    debugger;
    if (values.inputCollateral === "amint") {
      setRedeemLoadingLocal(true);
      console.log("redeem usdt");
      setUsdaApproveLocal(true);
      amintApproveWrite({
        abi: usDaAbi,
        address: usDaAddress[chainId as keyof typeof usDaAddress],
        functionName: "approve",
        args: [
          cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
          BigInt(values.collateralAmount * 10 ** 6),
        ],
      });
    } else if (values.inputCollateral === "abond") {
      console.log("redeem eth");
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
          BigInt(values.collateralAmount * 10 ** 18),
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

  console.log(abondApproveLoadingLocal, "abondApproveLoadingLocal");

  return (
    <div className="flex flex-col">
      <div className="p-8 border-solid border-graylight">
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex flex-col flex-1">
            <span className="text-medium text-grayLight text-lg ">
              Input Amount
            </span>
            <Input
              type="number"
              name="collateralAmount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.collateralAmount}
              className="flex items-center h-[50px] border border-grayLight font-medium md:text-[24px] dark:text-[24px]"
            />
            <Typography size="sm" variant="regular" className="text-red-500">
              {formik.errors.collateralAmount && formik.touched.collateralAmount
                ? formik.errors.collateralAmount
                : ""}
            </Typography>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-medium text-grayLight text-lg ">
              Select Collateral
            </span>
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
            <Typography size="sm" variant="regular" className="text-red-500">
              {formik.errors.inputCollateral && formik.touched.inputCollateral
                ? formik.errors.inputCollateral
                : ""}
            </Typography>
          </div>
        </div>
        <div className="border border-solid border-grayLight-1 dark:border-grayLight p-5 mt-8">
          <div className="flex justify-between">
            <div className="text-grayLight text-lg ">Redeemable Amount</div>
          </div>
          <div className="md:text-[42px] text-[32px] text-textBlack  mt-8 font-medium dark:text-white">
            <div>
              {formik.values.inputCollateral === "amint" ? (
                <div className="text-sm text-[#004795] font-medium dark:text-[#FFFF] mt-2 flex justify-start">
                  <div className="p-1 text-2xl basis-3/5 text-bold">
                    {formik.values.collateralAmount} USDT
                  </div>
                </div>
              ) : formik.values.inputCollateral === "abond" ? (
                <div className="text-sm text-[#041A50] mt-2 font-medium dark:text-[#FFFF] flex justify-between">
                  <div className="flex justify-start items-center gap-2 mr-1 basis-2/5">
                    <div className="flex items-center p-1 text-2xl  text-bold">
                      {outputData
                        ? Number(formatEther(outputData[0])).toFixed(5)
                        : 0}{" "}
                      ETH
                    </div>
                    <div className="text-xl">+</div>
                    <div className="flex items-center p-1 text-2xl  text-bold">
                      {outputData
                        ? Number(formatEther(outputData[2])).toFixed(2)
                        : 0}{" "}
                      USDa
                    </div>
                  </div>
                  <div className="flex justify-between basis-2/5 text-bold"></div>
                </div>
              ) : (
                <div className="flex items-center pt-1 basis-3/5 text-[#00679F] dark:text-white text-2xl font-semibold">
                  Output Amount
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 mb-[178px]">
        <div className="border border-solid border-grayLight-1 dark:border-grayLight md:p-12 p-6">
          <div className="flex justify-between">
            <div className="text-grayLight md:text-lg  text-[14px]">
              Note: A withdrawal Fee of 2% will be applied.
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          {!redeemLoadingLocal && (
            <Button
              onClick={() => formik.handleSubmit()}
              className="bg-textBlack w-full text-white h-full text-white md:text-[32px] text-[24px] font-bold  py-4 md:p-0 dark:bg-custom-gradient-to-top"
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
          />
          <LoadingBox
            isLoading={abondApproveLoadingLocal}
            isFailure={abondIsError || abondApproveError}
            isSuccess={Boolean(abondApproveSuccess)}
            setSuccessLoading={() => console.log()}
            heading="Approving Abond"
          />

          <LoadingBox
            isLoading={
              redeemFnLoadingLocal && formik.values.inputCollateral === "usda"
            }
            isFailure={redeemUsdtIsError || redeemUsdtError}
            isSuccess={Boolean(redeemUsdtSuccess)}
            setSuccessLoading={() => console.log()}
            heading={"Redeeming " + formik.values.inputCollateral}
          />

          <LoadingBox
            isLoading={
              redeemFnLoadingLocal && formik.values.inputCollateral === "abond"
            }
            isFailure={redeemEthIsError || redeemEthError}
            isSuccess={Boolean(redeemEthSuccess)}
            setSuccessLoading={() => console.log()}
            heading={"Redeeming " + formik.values.inputCollateral}
          />
        </div>
      </div>
    </div>
  );
};

export default RedeemContainer;
