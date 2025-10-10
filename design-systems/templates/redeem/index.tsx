"use client";
import { abondAbi } from "@/blockchain/abis/abond";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { mpoABI } from "@/blockchain/abis/mpo";
import { usDaAbi } from "@/blockchain/abis/usda";
import {
  abondAddress,
  borrowAssetsAddress,
  borrowingContractAddress,
  cdsAddress,
  mpoAddress,
  sUSDAddress,
  testusdtAbiAddress,
  usDaAddress,
  usdcAddress,
} from "@/blockchain/contracts";
import { Button } from "@/design-systems/atoms/button";
import { GenericDropdownMenu } from "@/design-systems/atoms/DropdownCustom/GenericDropdownMenu";
import { Input } from "@/design-systems/atoms/input";
import Spinner from "@/design-systems/atoms/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Typography } from "@/design-systems/atoms/Typography";
import LoadingBox from "@/design-systems/molecule/LoadingBox";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import useBorrowPause from "@/hookes/contract-hooks/useBorrowPause";
import useCdsPause from "@/hookes/contract-hooks/useCdsPause";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import { useLayerZeroMessages } from "@/hookes/contract-hooks/useLayerZeroMessages";
import { NetworkId } from "@/utils/constants";
import { handleWheel } from "@/utils/helpers";
import { scanUrls } from "@/utils/urls";
import { useFormik } from "formik";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { formatEther, formatUnits, parseUnits, zeroAddress } from "viem";
import {
  useAccount,
  useBalance,
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
  const { address: accountAddress } = useAccount();

  const { address, chainId } = useAccount();

  // loading state for the redeem process
  const [redeemLoadingLocal, setRedeemLoadingLocal] = useState<boolean>(false);
  const [redeemFnLoadingLocal, setRedeemFnLoadingLocal] =
    useState<boolean>(false);
  const [usdaApproveLoadingLocal, setUsdaApproveLocal] =
    useState<boolean>(false);
  const [abondApproveLoadingLocal, setAbondApproveLoadingLocal] =
    useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // getting value for borrow redeem pause
  const { isFunctionPausedBorrow_Redeem } = useBorrowPause();
  // getting cds pause data
  const { isFunctionPausedCDS_Redeem } = useCdsPause();

  // fetching allowance USDA
  const { data: allowanceUSDa } = useReadContract({
    abi: usDaAbi,
    address: usDaAddress[chainId as keyof typeof usDaAddress],
    functionName: "allowance",
    args: [
      address || zeroAddress,
      cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
    ],
    query: {
      enabled: !!address,
    },
  }) as { data: number | undefined };

  // fetching allowance ABond
  const { data: allowanceABond } = useReadContract({
    abi: usDaAbi,
    address: usDaAddress[chainId as keyof typeof usDaAddress],
    functionName: "allowance",
    args: [
      address || zeroAddress,

      borrowingContractAddress[
      chainId as keyof typeof borrowingContractAddress
      ] as `0x${string}`,
    ],
  }) as { data: number | undefined };

  // fetching the abond balance
  const { data: abondbalance, refetch: refetchBlAbond } = useBalance({
    address: abondAddress ? accountAddress : undefined,
    token: abondAddress
      ? abondAddress[chainId as keyof typeof abondAddress]
      : undefined,
  });

  // fetching the usda balance
  const { data: usdabalance, refetch: refetchBlAmint } = useBalance({
    address: usDaAddress ? accountAddress : undefined,
    token: usDaAddress
      ? usDaAddress[chainId as keyof typeof usDaAddress]
      : undefined,
  });

  // setting the usda , abond balance for the formik based on the input collateral
  useEffect(() => {
    if (formik.values.inputCollateral == "abond") {
      formik.setFieldValue("usdaBalance", Number(abondbalance?.formatted));
    } else if (formik.values.inputCollateral == "amint") {
      formik.setFieldValue("usdaBalance", Number(usdabalance?.formatted));
    }
  }, [abondbalance, usdabalance, formik.values.inputCollateral]);

  // usda approve function
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
      onSuccess: (data) => { },
    },
  });

  // fetching the usda approve transaction receipt
  const {
    data: amintTransactionAllowed,
    isLoading: isAmintTransactionLoading,
    isError: usdaErrorApprove,
    isSuccess: usdaApproveSuccess,
  } = useWaitForTransactionReceipt({
    hash: amintApproveData,
  });

  // calling the redeem usda in contract if the transaction is successful
  useEffect(() => {
    if (usdaApproveSuccess) {
      callRedeemUSDaInContract();
    } else if (usdaErrorApprove) {
      handleFail();
    }
  }, [amintTransactionAllowed]);

  // redeem usdt function hook
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
      onSuccess: (data) => { },
    },
  });

  // fetching the redeem usdt transaction receipt
  const {
    data: redeemdataUsdt,
    isLoading: isRedeemUsdtTransactionLoading,
    isError: redeemUsdtError,
    isSuccess: redeemUsdtSuccess,
    error: redeemError,
  } = useWaitForTransactionReceipt({
    hash: redeemUsdtData,
  });

  // calling the redeem usdt in contract if the transaction is successful
  useEffect(() => {
    if (redeemUsdtSuccess) {
      handleSuccess();
    } else if (redeemUsdtError) {
      handleFail();
    }
  }, [redeemdataUsdt]);

  // function to handle the fail case
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
  // function to handle the success case
  const handleSuccess = () => {
    toast.custom((t) => {
      const link = `${scanUrls[chainId as keyof typeof scanUrls]}tx/${redeemdataEth?.transactionHash
        } `;
      return (
        <ToastNotification
          title="Redeem Successful"
          message=""
          linkText={
            Number(chainId) === NetworkId.BaseSepolia
              ? "View On Basescan"
              : "View On Optimismscan"
          }
          linkUrl={link}
          onClose={() => toast.dismiss(t)}
        />
      );
    });
    // resetting the page data
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
  // clearing the loading state
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
  //  fetching the redeem values that user will get after redeeming
  const { data: outputData, error } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
      chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getAbondYields",
    args: [
      accountAddress as `0x${string}`,
      parseUnits((formik.values.collateralAmount || 0).toString(), 18),
    ],
  }) as { data: [bigint, bigint, bigint, bigint, bigint, bigint] | undefined; error: Error | null };


  useEffect(() => {
    // checking if the input collateral is abond and the collateral amount is greater than 0
    if (
      formik.values.inputCollateral === "abond" &&
      (formik.values.collateralAmount || 0) > 0
    ) {
      // checking if the collateral amount is greater than the abond balance
      if (
        (formik.values.collateralAmount || 0) > Number(abondbalance?.formatted)
      ) {
        formik.setErrors({
          collateralAmount: "Insufficient Balance",
        });
      } else {
        // clearing the error
        formik.setErrors({
          collateralAmount: "",
        });
        // checking if the output data is available
        if (outputData) {
          // setting the output collateral amount
          formik.setFieldValue(
            "outputCollateralAmount",
            Number(formatEther(outputData?.[0] || 0n) || 1)
          );
        }
      }
    } else if (
      // checking if the input collateral is amint and the collateral amount is greater than 0
      formik.values.inputCollateral === "amint" &&
      (formik.values.collateralAmount || 0) > 0
    ) {
      // checking if the collateral amount is greater than the usda balance
      if (
        (formik.values.collateralAmount || 0) > Number(usdabalance?.formatted)
      ) {
        formik.setErrors({ collateralAmount: "Insufficient Balance" });
      } else {
        // clearing the error
        formik.setErrors({ collateralAmount: "" });
        // setting the output collateral amount
        formik.setFieldValue(
          "outputCollateralAmount",
          Number(formik.values.collateralAmount)
        );
      }
    } else {
      formik.setFieldValue("outputCollateralAmount", 0);
    }
  }, [formik.values, outputData]);

  // abond approve function
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

  // fetching the abond approve transaction receipt
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

  // calling the redeem abond in contract if the transaction is successful
  useEffect(() => {
    if (abondApproveSuccess) {
      callRedeemABondInContract();
    }
    if (abondApproveError) {
    }
  }, [abondTransactionAllowed]);

  // redeem eth function hook
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

  // fetching the redeem eth transaction receipt
  const {
    data: redeemdataEth,
    isLoading: isRedeemEthTransactionLoading,
    isError: redeemEthError,
    isSuccess: redeemEthSuccess,
    error: redeemEthErorrdata,
  } = useWaitForTransactionReceipt({
    hash: redeemEthData,
  });

  // calling the redeem abond in contract if the transaction is successful
  useEffect(() => {
    if (redeemEthSuccess) {
      handleSuccess();
    } else if (redeemEthError) {
      handleFail();
    }
  }, [redeemdataEth]);

  // function to handle the redeem process
  async function handleSubmit(values: typeof initialValues) {
    if (values.inputCollateral === "amint") {
      setRedeemLoadingLocal(true);
      const redeemAmountUSDa = BigInt(
        parseUnits(String(values.collateralAmount) || "0", 6)
      );
      // checking if the allowance is less than the redeem amount
      if ((allowanceUSDa || 0) < redeemAmountUSDa) {
        setUsdaApproveLocal(true);
        amintApproveWrite({
          abi: usDaAbi,
          address: usDaAddress[chainId as keyof typeof usDaAddress],
          functionName: "approve",
          args: [
            cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
            redeemAmountUSDa,
          ],
        });
      } else {
        // calling the redeem usda in contract
        callRedeemUSDaInContract();
      }
    } else if (values.inputCollateral === "abond") {
      setRedeemLoadingLocal(true);
      // checking if the input collateral is abond
      const redeemAmountABond = BigInt(
        parseUnits(String(values.collateralAmount) || "0", 18)
      );
      // checking if the allowance is less than the redeem amount
      if ((allowanceABond || 0) < redeemAmountABond) {
        setAbondApproveLoadingLocal(true);
        abondApproveWrite({
          abi: abondAbi,
          address: abondAddress[chainId as keyof typeof abondAddress],
          functionName: "approve",
          args: [
            borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
            ] as `0x${string}`,
            redeemAmountABond,
          ],
        });
      } else {
        // calling the redeem abond in contract
        callRedeemABondInContract();
      }
    }
  }

  // function to call the redeem abond in contract
  const callRedeemABondInContract = () => {
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
      args: [parseUnits(String(formik.values.collateralAmount) || "0", 18)],
    });
  };

  // function to call the redeem usda in contract
  const callRedeemUSDaInContract = () => {
    setUsdaApproveLocal(false);
    setTimeout(() => {
      setRedeemFnLoadingLocal(true);
    }, 1000);
    redeemUsdt?.({
      abi: cdsAbi,
      address: cdsAddress[chainId as keyof typeof cdsAddress],
      functionName: "redeemAssets",
      args: [
        BigInt(parseUnits(String(formik.values.collateralAmount) || "0", 6)),
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
  };
  // dropdown items for the input collateral
  const dropdownItems = [
    {
      label: "USDA+",
      onClick: () => {
        formik.setFieldValue("inputCollateral", "amint");
        formik.setFieldValue("collateralAmount", 0);
      },
    },
    {
      label: "ABond",
      onClick: () => {
        formik.setFieldValue("inputCollateral", "abond");
        formik.setFieldValue("collateralAmount", 0);
      },
    },
  ];
  // dropdown items for the redeem token
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
    // if (chainId === NetworkId.BaseSepolia) {
    //   options.push({
    //     label: "sUSD",
    //     onClick: () => formik.setFieldValue("redeemTokenName", "sUSD"),
    //   });
    // }
    return options;
  }, [chainId]);

  const pathname = usePathname();

  // Custom hook to fetch the Price of the selected asset
  const { assetPrice: rsEthPrice } = useGetUsdValue(
    borrowAssetsAddress["wrsETH" as keyof typeof borrowAssetsAddress]
  );

  const { assetPrice: wSuperEthPrice } = useGetUsdValue(
    borrowAssetsAddress["wsuperOETHb" as keyof typeof borrowAssetsAddress]
  );
  // fetching the price of the weETH
  const { assetPrice: weEthPrice } = useGetUsdValue(
    borrowAssetsAddress["weETH" as keyof typeof borrowAssetsAddress]
  );
  // fetching the price of the eth
  const { assetPrice: ethPrice } = useGetUsdValue(
    borrowAssetsAddress["ETH" as keyof typeof borrowAssetsAddress]
  );

  // fetching the usda+ prices
  const { data: usdaPrice, isPending: isLoadingUsdaPrice } = useReadContract({
    address: mpoAddress[chainId as keyof typeof mpoAddress],
    abi: mpoABI,
    functionName: "price",
    args: [usDaAddress[chainId as keyof typeof usDaAddress]],
    query: {
      select: (data: any) => {
        return Number(formatUnits(BigInt(data[0] || 0n), 18));
      },
      placeholderData: 0,
    },
  }) as { data: number; isPending: boolean };

  // fetching the yield percentage
  const yieldPercentage = useMemo(() => {
    // dollar value of the all redeemable assets
    const redeemableEthDollarValue =
      Number(formatEther(outputData?.[4] || 0n)) *
      Number(formatUnits(BigInt(ethPrice || 0n), 2));
    const redeemableWeEthDollarValue =
      Number(formatEther(outputData?.[1] || 0n)) *
      Number(formatUnits(BigInt(weEthPrice || 0n), 2));
    const redeemableRsEthDollarValue =
      Number(formatEther(outputData?.[2] || 0n)) *
      Number(formatUnits(BigInt(rsEthPrice || 0n), 2));

    const redeemablewSuperEthBEthDollarValue =
      Number(formatEther(outputData?.[3] || 0n)) *
      Number(formatUnits(BigInt(wSuperEthPrice || 0n), 2));

    const redeemableUsdaDollarValue =
      Number(formatUnits(outputData?.[5] || 0n, 6)) * usdaPrice;

    // calculating the yield percentage
    const x =
      (Number(formatEther(outputData?.[4] || 0n)) -
        Number(formatEther(outputData?.[0] || 0n))) *
      Number(formatUnits(BigInt(ethPrice || 0n), 2)) +
      redeemableUsdaDollarValue;

    const y =
      redeemableEthDollarValue +
      redeemableWeEthDollarValue +
      redeemableRsEthDollarValue +
      redeemablewSuperEthBEthDollarValue;

    const yieldValue = (x / y) * 100 || 0;

    return yieldValue;
  }, [outputData, ethPrice, weEthPrice, rsEthPrice, usdaPrice, wSuperEthPrice]);

  //  fetching the redeem values that user will get after redeeming
  const { data: allABondYields } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
      chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getAbondYields",
    args: [accountAddress as `0x${string}`, BigInt(abondbalance?.value || 0)],
    query: {
      placeholderData: [0n, 0n, 0n, 0n, 0n, 0n],
    },
  });

  const ABondPrice = useMemo(() => {
    // dollar value of the all redeemable assets
    const redeemableEthDollarValue =
      Number(formatEther(outputData?.[4] || 0n)) *
      Number(formatUnits(BigInt(ethPrice || 0n), 2));
    const redeemableWeEthDollarValue =
      Number(formatEther(outputData?.[1] || 0n)) *
      Number(formatUnits(BigInt(weEthPrice || 0n), 2));
    const redeemableRsEthDollarValue =
      Number(formatEther(outputData?.[2] || 0n)) *
      Number(formatUnits(BigInt(rsEthPrice || 0n), 2));

    const redeemablewSuperEthBEthDollarValue =
      Number(formatEther(outputData?.[3] || 0n)) *
      Number(formatUnits(BigInt(wSuperEthPrice || 0n), 2));

    const redeemableUsdaDollarValue =
      Number(formatUnits(outputData?.[5] || 0n, 6)) * usdaPrice;

    // calculating the abond price
    const value =
      redeemableEthDollarValue +
      redeemableWeEthDollarValue +
      redeemableRsEthDollarValue +
      redeemableUsdaDollarValue +
      redeemablewSuperEthBEthDollarValue / Number(abondbalance?.formatted || 0);

    return value;
  }, [outputData, ethPrice, weEthPrice, rsEthPrice, usdaPrice, wSuperEthPrice]);

  // fetching layer zero transaction data to add loading state to user to initiate transaction
  const { readyForNewTx } = useLayerZeroMessages();
  console.log(abondbalance, "abondbalance");
  return (
    <div className="flex flex-col min-h-[calc(100vh-185px)] ">
      <AppNavbar
        activeBack={true}
        tabOptions={[
          {
            nameA: "Redeem",
            path: "/redeem",
            isActive: pathname === "/redeem",
            InActiveHeading: "",
            isFeatureActive: true,
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
              <div className="flex justify-start ">
                <Input
                  placeholder="Enter amount here"
                  onWheel={handleWheel}
                  type="number"
                  name="collateralAmount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.collateralAmount}
                  className="flex  items-center h-[50px] border border-grayLight font-medium md:text-[24px] border-r-0 dark:text-[24px]"
                />
                <div
                  onClick={() => {
                    if (!formik.values.inputCollateral) {
                      return toast.error("Please select collateral type");
                    }
                    formik.setFieldValue(
                      "collateralAmount",
                      formik.values.inputCollateral == "amint"
                        ? usdabalance?.formatted || 0
                        : abondbalance?.formatted || 0
                    );
                  }}
                  className="flex text-[20px] justify-center cursor-pointer font-semibold px-2 items-center  border border-grayLight"
                >
                  MAX
                </div>
              </div>
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
                      ? `${formik.values.inputCollateral === "amint"
                        ? "USDA+"
                        : "ABond"
                      }`
                      : "Select"
                  }
                  items={dropdownItems}
                  className="w-full text-[24px] border border-grayLight"
                />
              </div>
              <div className="text-black flex justify-between dark:text-white md:text-lg text-right mb-4 text-[14px]">
                {formik.errors.inputCollateral ? (
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
                ) : formik.values.inputCollateral === "abond" ? (
                  <div className="text-grayLight">
                    ABond Price:{" "}
                    <span className="dark:text-white text-black">
                      ${ABondPrice.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="text-grayLight">
                    USDA+ Price:{" "}
                    <span className="dark:text-white text-black">
                      ${usdaPrice.toFixed(2)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="text-grayLight">
                    Balance{" "}
                    <span className="dark:text-white text-black">
                      {formik.values.inputCollateral == "amint"
                        ? `${usdabalance?.formatted || 0} USDA+`
                        : `${formatUnits(BigInt(abondbalance?.value || 0), 18) ||
                        0
                        }  ABond`}
                    </span>
                  </div>
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
                  <div className="text-sm  justify-center lg:justify-between text-black mt-2 font-medium dark:text-[#FFFF] flex ">
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-2 mr-1 ">
                      {chainId === NetworkId.Ethereum ? (
                        <>
                          <div className="flex items-center p-1 text-xl  text-bold">
                            {outputData
                              ? Number(
                                formatEther(outputData?.[2] || 0n)
                              ).toFixed(5)
                              : 0}{" "}
                            ETH
                          </div>
                          <div className="text-xl">+</div>

                          <div className="flex items-center p-1 text-xl  text-bold">
                            {outputData
                              ? Number(
                                formatEther(outputData?.[1] || 0n)
                              ).toFixed(5)
                              : 0}{" "}
                            weETH
                          </div>
                          <div className="text-xl">+</div>
                          <div className="flex items-center p-1 text-xl  text-bold">
                            {outputData
                              ? Number(
                                formatUnits(outputData?.[3] || 0n, 6)
                              ).toFixed(2)
                              : 0}{" "}
                            USDA+
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className="flex items-center p-1 text-xl  text-bold">
                            {outputData
                              ? Number(
                                formatEther(outputData?.[4] || 0n)
                              ).toFixed(5)
                              : 0}{" "}
                            ETH
                          </div>
                          <div className="text-xl">+</div>
                          <div className="flex items-center p-1 text-xl  text-bold">
                            {outputData
                              ? Number(
                                formatEther(outputData?.[1] || 0n)
                              ).toFixed(5)
                              : 0}{" "}
                            weETH
                          </div>
                          <div className="text-xl">+</div>
                          <div className="flex items-center p-1 text-xl  text-bold">
                            {outputData
                              ? Number(
                                formatEther(outputData?.[2] || 0n)
                              ).toFixed(5)
                              : 0}{" "}
                            wrsETH
                          </div>
                          <div className="text-xl">+</div>
                          <div className="flex items-center p-1 text-xl  text-bold">
                            {outputData
                              ? Number(
                                formatEther(outputData?.[3] || 0n)
                              ).toFixed(5)
                              : 0}{" "}
                            wsuperOETHb
                          </div>
                          <div className="text-xl">+</div>
                          <div className="flex items-center p-1 text-xl  text-bold">
                            {outputData
                              ? Number(
                                formatUnits(outputData?.[5] || 0n, 6)
                              ).toFixed(2)
                              : 0}{" "}
                            USDA+
                          </div>
                        </>
                      )}
                    </div>

                    {/* <div>
                      <div className="flex items-center p-1 text-xl  text-grayLight text-bold">
                        Yield Percentage: {yieldPercentage.toFixed(4)}%
                      </div>
                    </div> */}
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
        <div className="text-grayLight md:text-lg text-center lg:mb-2 py-8 lg:py-0 lg:border-0 border-t border-solid border-grayLight text-[14px]">
          Note: 0% Withdrawal Fee will be applied.
        </div>
        {isFunctionPausedBorrow_Redeem &&
          formik.values.inputCollateral === "abond" && (
            <div className="text-red-600 text-center lg:mb-2  ">
              {"ABond redeem is paused now"}
            </div>
          )}
        {isFunctionPausedCDS_Redeem &&
          formik.values.inputCollateral === "amint" && (
            <div className="text-red-600 text-center lg:mb-2  ">
              {"USDA+ redeem is paused now"}
            </div>
          )}
        <div className="flex justify-center items-center overflow-hidden lg:mb-20">
          <div className=" w-full lg:w-[45%] h-[80px] lg:h-[120px]">
            {!redeemLoadingLocal && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-full">
                    <Button
                      disabled={
                        (isFunctionPausedBorrow_Redeem &&
                          formik.values.inputCollateral === "abond") ||
                        (isFunctionPausedCDS_Redeem &&
                          formik.values.inputCollateral === "amint") ||
                        !readyForNewTx
                      }
                      onClick={() => formik.handleSubmit()}
                      className="bg-textBlack w-full text-white h-full  md:text-[32px] text-[24px] font-bold  py-4 md:p-0 dark:bg-custom-gradient-to-top"
                    >
                      {!readyForNewTx ? (
                        <div className="flex flex-col items-center gap-2">
                          <Spinner color="#fff" />
                          {!readyForNewTx && (
                            <p className="text-[14px]">
                              Updating data on other chain
                            </p>
                          )}
                        </div>
                      ) : (
                        "Redeem"
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                {((isFunctionPausedBorrow_Redeem &&
                  formik.values.inputCollateral === "abond") ||
                  (isFunctionPausedCDS_Redeem &&
                    formik.values.inputCollateral)) && (
                    <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                      <p>
                        {formik.values.inputCollateral === "abond"
                          ? "ABond redeem is pause now"
                          : "USDa redeem is paused now"}
                      </p>
                    </TooltipContent>
                  )}
              </Tooltip>
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
              heading="Approving ABond"
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
              heading={
                "Redeeming " +
                (formik.values.inputCollateral === "abond"
                  ? "ABond"
                  : formik.values.inputCollateral)
              }
              loadingCount="2/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithPrivateRoute(RedeemContainer);
