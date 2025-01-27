"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Spinner from "../assets/Spinner@1x-1.0s-200px-200px (2).svg";

import { GenericDropdownMenu } from "@/components/ui/DropdownCustom/GenericDropdownMenu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AppNavbar from "@/custom-components/AppNavbar";
import { ChevronDownIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { toast, Toaster } from "sonner";
import dcdsDark from "../assets/Frame 350 (1).svg";
import dcdsFrame from "../assets/Frame 350.png";
import centerImage1 from "../assets/Vector (1).svg";
import tokenImage from "../assets/Vector (6).png";
import add from "../assets/add-01.png";
import centerImage2 from "../assets/cryptocurrency-color_usdt.svg";
import minus from "../assets/minus-sign.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import useGetUsdtAmountDepositedTillNow from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import useApproveUsda from "@/hookes/contract-hooks/useApproveUsda";
import { cdsAddress } from "@/blockchain/contracts";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import useUsdtApprove from "@/hookes/contract-hooks/useApproveUsdt";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import useDcdsDeposit from "@/hookes/contract-hooks/useDepositDcds";
import { USDT_DEPOSIT_LIMIT_IN_DCDS } from "@/utils/constants";
import useGetBalance from "@/hookes/contract-hooks/useGetBalance";
import LoadingBox from "@/custom-components/LoadingBox";
import { Typography } from "@/components/ui/Typography";
import { useScroll } from "@/contexts/scroll";
import { usePortfolioTab } from "@/contexts/portfolio-tab";
import { useRouter } from "next/navigation";
function TokenTvlDetails({
  tokenName,
  tvl,
}: {
  tokenName: string;
  tvl: string;
}) {
  return (
    <div className="bg-gradient-to-b from-[#E5F3FF] to-[#E5F3FF] p-8 flex justify-between border border-solid border-grayLight border-b-0 dark:bg-none">
      <div className="flex flex-col gap-8">
        <Image src={tokenImage} alt="token" width={32} height={32} />
        <span className="text-[24px] text-textBlack dark:text-white">
          {tokenName}
        </span>
      </div>
      <div className="flex flex-col gap-8">
        <span className="text-[18px] font-normal text-right text-grayLight dark:text-white">
          TVL
        </span>
        <span className="text-[24px] font-medium text-textBlack dark:text-white">
          {tvl}
        </span>
      </div>
    </div>
  );
}

function AdditionalDCDSMetrics({
  apy,
  depositing,
}: {
  apy: string;
  depositing: string;
}) {
  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex justify-between">
        <span className="text-grayLight text-[18px] font-medium">APY</span>
        <span className="text-black dark:text-white text-[18px] font-medium">
          {apy}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-grayLight text-[18px] font-medium">
          Depositing
        </span>
        <span className="text-black text-[18px] dark:text-white font-medium">
          {depositing}
        </span>
      </div>
    </div>
  );
}

function SelectToken() {
  return (
    <div className="flex flex-col mt-4">
      <Label htmlFor="network" className="text-grayLight text-lg font-medium">
        Select Token
      </Label>
      <Input
        className="rounded-none border border-grayLight font-medium"
        placeholder="Amount"
      />
      <div className="mt-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex justify-between w-full h-17 px-3 border border-grayLight rounded-md text-textBlack text-[24px] dark:text-white"
            >
              3 months
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-full border border-gray-200 rounded-md shadow-md"
          >
            <div className="flex flex-col"></div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function AddToken({
  tokenDetails,
  setSelectedTokens,
  selectedTokens,
  formik,
}: {
  formik: any;
  tokenDetails: TokenDetails;
  setSelectedTokens: any;
  selectedTokens: { tokenImage: any; tokenName: string }[];
}) {
  const isSelected = selectedTokens.some(
    (token) => token.tokenName === tokenDetails.tokenName
  );

  const toggleToken = () => {
    if (!tokenDetails.active) {
      toast.error(tokenDetails.errorMessage);
      return;
    }
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}Flag`,
      isSelected ? false : true
    );
    setSelectedTokens?.((prev: TokenDetails[]) => {
      if (isSelected) {
        return prev.filter(
          (token) => token.tokenName !== tokenDetails.tokenName
        );
      } else {
        return [...prev, tokenDetails];
      }
    });
  };

  return (
    <div className="border border-solid border-grayLight p-5 flex justify-start items-center h-full relative">
      <div className="flex flex-col gap-4">
        <Image
          src={tokenDetails.tokenImage}
          alt="token"
          width={30}
          height={30}
        />
        <span className="text-[24px] text-textBlack dark:text-white">
          {tokenDetails.tokenName}
        </span>
      </div>
      <Button
        onClick={toggleToken}
        className="bg-black absolute right-0 top-0 h-full dark:bg-custom-gradient-to-bottom"
      >
        {isSelected ? (
          <Image src={minus} alt="minus" />
        ) : (
          <Image src={add} alt="add" />
        )}
      </Button>
    </div>
  );
}

// Define the form values type using TypeScript
interface FormValues {
  usdaFlag: boolean;
  usdtFlag: boolean;
  usdcFlag: boolean;
  usdeFlag: boolean;
  usdaAmount: string | number | null;
  usdtAmount: string | number | null;
  usdcAmount: string | number | null;
  usdeAmount: string | number | null;
  lockInPeriod: string | null;
  liquidationGains: boolean;
}

interface TokenDetails {
  errorMessage?: string;
  active?: boolean;
  tokenImage: any;
  tokenName: string;
  minTokenAmount: number;
  balanceAvailable: number | string;
}

const formSchema = Yup.object().shape({
  usdaFlag: Yup.boolean(), // Flag for usdaAmount
  usdtFlag: Yup.boolean(), // Flag for usdtAmount
  usdcFlag: Yup.boolean(), // Flag for usdcAmount
  usdeFlag: Yup.boolean(), // Flag for usdeAmount

  usdaAmount: Yup.mixed()
    .test("is-required", "USDA amount is required", function (value) {
      return this.parent.usdaFlag
        ? value !== null && value !== undefined
        : true;
    })
    .test("is-valid-number", "Value must be greater than 0", (value) => {
      if (value === null || value === undefined) {
        return true; // Skip this test if the value is not present (handled by the required test)
      }
      return Number(value) >= 0; // Ensure it's a valid number
    })
    .nullable(),

  usdtAmount: Yup.mixed()
    .test("is-required", "USDT amount is required", function (value) {
      return this.parent.usdtFlag
        ? value !== null && value !== undefined
        : true;
    })
    .test("usdt-max", "usdt-max", function (value) {
      const { usdaAmount, usdaFlag } = this.parent;
      if (usdaFlag && usdaAmount) {
        const maxAllowed = Number(usdaAmount) * 0.2;
        return Number(value) <= maxAllowed;
      }
      return true; // No validation if usdaFlag is false
    })
    .test("is-valid-number", "Value must be greater than 0", (value) => {
      if (value === null || value === undefined) {
        return true; // Skip if value is not present
      }
      return Number(value) >= 0;
    })
    .nullable(),

  usdcAmount: Yup.mixed()
    .test("is-required", "USDC amount is required", function (value) {
      return this.parent.usdcFlag
        ? value !== null && value !== undefined
        : true;
    })
    .test("is-valid-number", "Value must be greater than 0", (value) => {
      if (value === null || value === undefined) {
        return true;
      }
      return Number(value) >= 0;
    })
    .nullable(),

  usdeAmount: Yup.mixed()
    .test("is-required", "USDE amount is required", function (value) {
      return this.parent.usdeFlag
        ? value !== null && value !== undefined
        : true;
    })
    .test("is-valid-number", "Value must be greater than 0", (value) => {
      if (value === null || value === undefined) {
        return true;
      }
      return Number(value) >= 0;
    })
    .nullable(),

  lockInPeriod: Yup.string().required("Lock-in period is required"),

  liquidationGains: Yup.boolean(),
});

function page() {
  const { theme } = useTheme();
  const [selectedTokens, setSelectedTokens] = useState<TokenDetails[]>([]);
  const router = useRouter();
  const [dcdsLoadingLocal, setDcdsLoadingLocal] = useState<boolean>(false);
  const [usdtApproveLoadingLocal, setUsdtApproveLoadingLocal] =
    useState<boolean>(false);
  const [usdaApproveLoadingLocal, setUsdaApproveLoadingLocal] =
    useState<boolean>(false);
  const [dcdsDepositLoadingLocal, setDcdsDepositLoadingLocal] =
    useState<boolean>(false);

  const { chainId } = useAccount();

  const formik = useFormik<FormValues>({
    initialValues: {
      usdaFlag: false,
      usdtFlag: false,
      usdcFlag: false,
      usdeFlag: false,
      usdaAmount: null,
      usdtAmount: null,
      usdcAmount: null,
      usdeAmount: null,
      lockInPeriod: null,
      liquidationGains: false,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      handleDeposit();
    },
  });

  console.log(formik.values, "formik");

  const dropdownItems = [
    {
      label: "30 Days",
      onClick: () => formik.setFieldValue("lockInPeriod", "30"),
    },
    {
      label: "60 Days",
      onClick: () => formik.setFieldValue("lockInPeriod", "60"),
    },
    {
      label: "120 days",
      onClick: () => formik.setFieldValue("lockInPeriod", "120"),
    },
    {
      label: "180 days",
      onClick: () => formik.setFieldValue("lockInPeriod", "180"),
      disabled: false,
    },
  ];

  const showNormal = () => {
    const customLoaderId = toast.loading(
      <div className="flex justify-between items-center w-full">
        <span style={{ marginLeft: "8px" }}>Transaction #1</span>
        <Image src={Spinner} alt="token" width={30} height={30} />
      </div>,
      { position: "top-right", duration: Infinity }
    );

    const promise = new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Transaction #1" }), 2000)
    );

    promise
      .then((data: any) => {
        toast.dismiss(customLoaderId);
        toast.success(`${data.name}`, {
          position: "top-right",
          className: "dark:bg-custom-gradient-to-top",
        });
      })
      .catch(() => {
        toast.dismiss(customLoaderId);
        toast.error("An error occurred!", { position: "top-right" });
      });
  };

  // get usdt limit from CDS contract and store it in usdtLimit and setting default value to 0n

  // Define the initial state for the options variable
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(250000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(options);

  const { GlobalContractData, isGlobalContractDataPending } =
    useGetUsdtAmountDepositedTillNow();

  const usdtBalance = useGetBalance("TUSDT");
  const usdaBalance = useGetBalance("USDa");

  const tokenList: TokenDetails[] = useMemo(() => {
    return [
      {
        tokenImage: centerImage2,
        tokenName: "USDa",
        active:
          (GlobalContractData?.usdtAmountDepositedTillNow ?? 0n) >=
          USDT_DEPOSIT_LIMIT_IN_DCDS,
        errorMessage: "USDa not active now",
        balanceAvailable: usdaBalance,
        minTokenAmount: 500,
      },
      {
        tokenImage: centerImage1,
        tokenName: "USDT",
        minTokenAmount: 500,
        active: true,
        balanceAvailable: usdtBalance,
      },
      {
        tokenImage: centerImage1,
        tokenName: "USDc",
        minTokenAmount: 500,
        active: true,
        balanceAvailable: 0,
      },
      {
        tokenImage: centerImage2,
        tokenName: "USDe",
        minTokenAmount: 500,
        balanceAvailable: 0,
        active: true,
      },
    ] as TokenDetails[];
  }, [
    GlobalContractData?.usdtAmountDepositedTillNow,
    usdtBalance,
    usdaBalance,
  ]);
  console.log(usdtBalance, usdaBalance, tokenList, "usdtBalance");

  console.log(GlobalContractData, "usdtAmountDepositedTillNow");
  const {
    approveUsda,
    approveUsdaDynamic,
    approveReset,
    usdaApproveHash,
    usdaApproveLoading,
    usdaApproveError,
    usdaApproveSuccess,
  } = useApproveUsda({
    onError: () => {
      handleDepositFailure();
    },
  });

  // get the confirmed txn receipt
  const {
    isLoading: isLoadingUsdaApproveReceipt,
    isSuccess: usdaApprovalSuccessReceipt,
    isError: usdaApprovalErrorReceipt,
    data: usdaApprovalReceiptReceipt,
  } = useWaitForTransactionReceipt({
    hash: usdaApproveHash,
    confirmations: 2,
    query: {},
  });

  const {
    handleUsdtApprove,
    isSuccessUsdtApprove,
    isPendingUsdtApprove,
    usdtApprovedHash,
    usdtApproveError,
    resetUsdtApprove,
  } = useUsdtApprove({
    onError: () => {
      handleDepositFailure();
    },
  });

  const {
    isLoading: UsdtApprovalLoadingReceipt,
    isSuccess: UsdtApprovalSuccessReceipt,
    isError: UsdtApprovalErrorReceipt,
    data: UsdtApprovalReceipt,
  } = useWaitForTransactionReceipt({
    hash: usdtApprovedHash,
    confirmations: 2,
    query: {},
  });

  // useEffect to check the status of the usdt approval transaction
  const usdtAmountLocal = formik.values.usdtAmount;
  const usdaAmountLocal = formik.values.usdaAmount;
  const liquidationGains = formik.values.liquidationGains;
  const lockInPeriodLocal = formik.values.lockInPeriod;

  useEffect(() => {
    if (UsdtApprovalSuccessReceipt) {
      setUsdtApproveLoadingLocal(false);
      setTimeout(() => {
        setDcdsDepositLoadingLocal(true);
      }, 600);

      const liqAmnt =
        ((Number(usdaAmountLocal ? usdaAmountLocal : 0) +
          Number(usdtAmountLocal ? usdtAmountLocal : 0)) *
          80) /
        100;
      if (nativeFee) {
        handleDcdsDeposit?.(
          [
            BigInt(
              usdtAmountLocal ? parseUnits(usdtAmountLocal.toString(), 6) : 0
            ),
            BigInt(
              usdaAmountLocal ? parseUnits(usdaAmountLocal.toString(), 6) : 0
            ),
            liquidationGains,
            liquidationGains ? parseUnits(liqAmnt.toString(), 6) : 0n,
            BigInt(Number(lockInPeriodLocal || 0) * 86400000),
          ],
          nativeFee.nativeFee
        );
      }
    }
  }, [UsdtApprovalSuccessReceipt]);

  const {
    dcdsDepositHash,
    dcdsDepositIsPending,
    dcdsDepositeError,
    handleDcdsDeposit,
  } = useDcdsDeposit({
    onError: () => {
      handleDepositFailure();
    },
  });

  // get the confirmed txn receipt
  const {
    isLoading: isCdsConfirmationLoadingReceipt,
    isSuccess: cdsDepositSuccessReceipt,
    isError: cdsDepositErrorReceipt,
    data: DepositdataReceipt,
  } = useWaitForTransactionReceipt({
    hash: dcdsDepositHash,
    confirmations: 2,
  });

  // useEffect to check the status of the cds deposit transaction
  useEffect(() => {
    if (cdsDepositErrorReceipt) {
    }
    if (cdsDepositSuccessReceipt) {
      handleDepositSuccess();
    }
  }, [DepositdataReceipt]);

  // useEffect to check the status of the amint approval transaction
  useEffect(() => {
    if (usdaApprovalSuccessReceipt) {
      setUsdaApproveLoadingLocal(false);
      if (
        Number(formik.values.usdtAmount) &&
        (Number(formik.values.usdaAmount) ?? 0) > 0
      ) {
        setTimeout(() => {
          setUsdtApproveLoadingLocal(true);
        }, 600);
        handleUsdtApprove([
          cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
          BigInt(
            formik.values.usdtAmount
              ? parseUnits(formik.values.usdtAmount.toString(), 6)
              : 0
          ),
        ]);
      } else {
        const liqAmnt =
          ((Number(formik.values.usdaAmount ? formik.values.usdaAmount : 0) +
            Number(formik.values.usdtAmount ? formik.values.usdtAmount : 0)) *
            80) /
          100;
        if (nativeFee?.nativeFee) {
          handleDcdsDeposit?.(
            [
              BigInt(
                formik.values.usdtAmount
                  ? parseUnits(formik.values.usdtAmount.toString(), 6)
                  : 0
              ),
              BigInt(
                formik.values.usdaAmount
                  ? parseUnits(formik.values.usdaAmount.toString(), 6)
                  : 0
              ),
              formik.values.liquidationGains,
              formik.values.liquidationGains
                ? parseUnits(liqAmnt.toString(), 6)
                : 0n,
              BigInt(Number(formik.values.lockInPeriod) * 86400000),
            ],
            nativeFee.nativeFee
          );
        }
      }

      // );
      // showCustomToast(toastId, 1, "Approved USDa", "success", amintApproveData);
    }
  }, [usdaApprovalReceiptReceipt]);

  console.log(formik.errors, "formik errors");

  const handleDeposit = () => {
    if (selectedTokens.length === 0) {
      toast.error("Please select token");
      return;
    }
    resetFunctionState();
    setDcdsLoadingLocal(true);
    if (
      (GlobalContractData?.usdtAmountDepositedTillNow ?? 0n) >=
      USDT_DEPOSIT_LIMIT_IN_DCDS
    ) {
      if (
        formik.values.usdaAmount == undefined ||
        formik.values.usdaAmount == 0
      ) {
        return;
      } else {
        setUsdaApproveLoadingLocal(true);
        approveUsdaDynamic(
          BigInt(
            formik.values.usdaAmount
              ? parseUnits(formik.values.usdaAmount.toString(), 6)
              : 0
          ),
          cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`
        );
      }
    } else {
      setUsdtApproveLoadingLocal(true);
      handleUsdtApprove([
        cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
        BigInt(
          formik.values.usdtAmount
            ? parseUnits(formik.values.usdtAmount.toString(), 6)
            : 0
        ),
      ]);
    }
  };

  const resetFunctionState = () => {
    resetUsdtApprove();
  };

  const { isScroll, setIsScroll } = useScroll();
  const { portfolioTab, setPortfolioTab } = usePortfolioTab();

  const handleDepositSuccess = () => {
    setIsScroll(true);
    setPortfolioTab("Deposited");
    resetLoadings();
    toast.success("Deposit Successful");
    router.push("/dashboard/portfolio");
  };

  const handleDepositFailure = () => {
    resetLoadings();
    toast.error("Deposit Failed");
  };

  const resetLoadings = () => {
    console.log("resetting loadings");
    setTimeout(() => {
      setDcdsLoadingLocal(false);
    }, 1000);
    setUsdtApproveLoadingLocal(false);
    setUsdaApproveLoadingLocal(false);
    setDcdsDepositLoadingLocal(false);
  };

  return (
    <div>
      <AppNavbar activeBack={false} />
      <div className="grid h-[97%] lg:grid-cols-4 grid-cols-1">
        <div className="col-span-1 flex flex-col p-5 gap-8 border border-t-0 border-grayLight border-solid">
          {tokenList.map((token: TokenDetails, key: number) => (
            <AddToken
              formik={formik}
              key={key}
              tokenDetails={token}
              setSelectedTokens={setSelectedTokens}
              selectedTokens={selectedTokens}
            />
          ))}
        </div>

        <div className="hidden lg:flex col-span-2 flex-col items-center justify-center relative">
          <div className="relative h-full  flex flex-col items-center justify-center w-full">
            <div className="2xl:w-[73%] 3xl:w-[55%] 3xl:h-[93%] w-[60%] 2xl:h-[93%] h-[73%] flex items-center justify-center relative">
              <Image
                className="hidden dark:block w-full h-full"
                src={dcdsDark}
                alt="dark-mode-image"
                layout="fill"
              />
              <Image
                className="block  dark:hidden w-full h-full"
                src={dcdsFrame}
                alt="light-mode-image"
              />
            </div>

            {selectedTokens.length > 0 && (
              <div className="w-[200px] h-[200px] bg-gradient-to-b dark:bg-custom-gradient-to-top from-[#E5F3FF] to-[#FFFDE4] absolute rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                {selectedTokens.slice(0, 2).map((token, index) => {
                  const totalTokens = selectedTokens.length;

                  const xOffset =
                    totalTokens === 1 ? 0 : index === 0 ? -26 : 26;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center absolute"
                      style={{
                        transform: `translate(${xOffset}px, -20px)`,
                        zIndex: totalTokens - index,
                      }}
                    >
                      <Image
                        src={token?.tokenImage}
                        alt={token?.tokenName}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  );
                })}

                <span className="text-[28px] font-medium mt-1 absolute bottom-6">
                  {selectedTokens[0].tokenName}
                  {selectedTokens.length > 1 &&
                    ` +${selectedTokens.length - 1}`}
                </span>
              </div>
            )}
          </div>
          <div className=" flex px-4 my-3 justify-center items-center w-full gap-14">
            {" "}
            <Typography
              className="text-black absolute left-[2%] bottom-[2%]  cursor-pointer text-[18px] font-medium dark:text-white underline"
              size="lg"
              variant="regular"
            >
              How it works?
            </Typography>
            <div className="bg-[#FFE0E0] dark:bg-[#380000]  ml-4 p-2">
              <Typography
                size="lg"
                className="text-[#FF0000] dark:text-[#FF1A1A] text-[18px] font-medium"
                variant="regular"
              >
                This fund will be exposed to liquidation risks
              </Typography>
            </div>
          </div>
        </div>

        <div className="col-span-1 border border-solid border-grayLight border-t-0 flex flex-col justify-between">
          <div className="p-5 ">
            <span className="text-textBlack text-[24px] font-medium dark:text-white">
              Deposit Funds
            </span>
            <div className="h-[200px] 2xl:h-[300px] overflow-y-auto no-scrollbar">
              {selectedTokens.map((token, key) => (
                <div key={key} className="mt-4">
                  <Label
                    htmlFor={`token-${key}`}
                    className="text-grayLight text-lg font-medium"
                  >
                    {token.tokenName}
                  </Label>
                  <Input
                    type="number"
                    name={`${token?.tokenName?.toLocaleLowerCase()}Amount`}
                    id={`token-${key}`}
                    className="flex items-center h-[50px] border border-grayLight font-medium md:text-[24px] dark:text-[24px]"
                    placeholder="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[
                      `${token.tokenName}Amount` as keyof FormValues
                    ]?.toString()}
                  />
                  <div className="flex justify-between">
                    <span className="text-[18px] font-medium text-grayLight">
                      Min $100
                    </span>
                    <span className="text-[18px] font-medium text-grayLight">
                      Bal {token.balanceAvailable}
                    </span>
                  </div>
                  <Typography
                    size="sm"
                    variant="regular"
                    className="text-red-500"
                  >
                    {formik.errors?.[
                      `${token.tokenName.toLocaleLowerCase()}Amount` as keyof FormValues
                    ] &&
                    formik.touched?.[
                      `${token.tokenName.toLocaleLowerCase()}Amount` as keyof FormValues
                    ]
                      ? formik.errors?.[
                          `${token.tokenName.toLocaleLowerCase()}Amount` as keyof FormValues
                        ] === "usdt-max"
                        ? `USDT Amount must be less than or equal to $${(
                            Number(formik.values.usdaAmount) * 0.2
                          ).toFixed(2)} of USDa Amount `
                        : formik.errors?.[
                            `${token.tokenName.toLocaleLowerCase()}Amount` as keyof FormValues
                          ]
                      : ""}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="px-5">
              <GenericDropdownMenu
                buttonText={
                  formik.values.lockInPeriod
                    ? `${formik.values.lockInPeriod} Days`
                    : "Select Lock-in Period"
                }
                items={dropdownItems}
                className="w-full text-[24px] border border-grayLight"
              />
              <Typography size="sm" variant="regular" className="text-red-500">
                {formik.errors.lockInPeriod && formik.touched.lockInPeriod
                  ? formik.errors.lockInPeriod
                  : ""}
              </Typography>
            </div>
            <div className="py-4 flex p-5  items-center justify-between w-full">
              <span className="text-grayLight font-normal text-[18px]">
                Opt for liquidity gains?
              </span>
              <Checkbox
                type="button"
                id="liquidationGains"
                name="liquidationGains"
                onCheckedChange={(value) =>
                  formik.setFieldValue("liquidationGains", value)
                }
                checked={formik.values.liquidationGains}
                className="h-6 w-6  cursor-pointer data-[state=checked]:bg-black data-[state=checked]:text-white dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-black"
              />
            </div>
            <div className="px-5">
              <div className="p-3 bg-[#FFF0CA] text-[12px] text-grayLight font-medium dark:text-[#D6A100] dark:bg-[#4F3800] max-w-full">
                Note: Your amount will be used to offer protection to borrowers
                & protocol in return for fixed yields.
              </div>
            </div>
            <AdditionalDCDSMetrics
              apy="Expected range 5% to 200%"
              depositing={
                formik.values.usdaAmount
                  ? `${formik.values.usdaAmount || 0} USDa + ${
                      formik.values.usdtAmount || 0
                    } USDT`
                  : "-"
              }
            />
            <div className=" h-[86px]">
              {!dcdsLoadingLocal && (
                <Button
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                  className="bg-black text-white text-[24px] h-full w-full dark:bg-custom-gradient-to-bottom cursor-pointer"
                >
                  Deposit
                </Button>
              )}

              <LoadingBox
                isLoading={usdtApproveLoadingLocal}
                isFailure={UsdtApprovalErrorReceipt || usdtApproveError}
                isSuccess={Boolean(UsdtApprovalSuccessReceipt)}
                setSuccessLoading={() => console.log(true)}
                heading="Approving USDT"
              />
              <LoadingBox
                isLoading={usdaApproveLoadingLocal}
                isFailure={usdaApprovalErrorReceipt || usdaApproveError}
                isSuccess={Boolean(usdaApprovalReceiptReceipt)}
                setSuccessLoading={() => console.log(true)}
                heading="Approving USDa"
              />
              <LoadingBox
                isLoading={dcdsDepositLoadingLocal}
                isFailure={dcdsDepositeError || cdsDepositErrorReceipt}
                isSuccess={Boolean(DepositdataReceipt)}
                setSuccessLoading={() => console.log(true)}
                heading="Depositing"
              />
            </div>
          </div>
        </div>
      </div>
      <TokenTvlDetails
        tokenName="USDT"
        tvl={`${formatUnits(
          GlobalContractData?.usdtAmountDepositedTillNow || 0n,
          6
        )}`}
      />
      <TokenTvlDetails
        tokenName="USDa"
        tvl={`${GlobalContractData?.usdaGainedFromLiquidation || 0} `}
      />
    </div>
  );
}

export default page;
