"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { parseUnits } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import useUsdtApprove from "@/hookes/useApproveUsdt";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import useDcdsDeposit from "@/hookes/contract-hooks/useDepositDcds";
import { USDT_DEPOSIT_LIMIT_IN_DCDS } from "@/utils/constants";
import useGetBalance from "@/hookes/contract-hooks/useGetBalance";
import LoadingBox from "@/custom-components/LoadingBox";
function TokenTvlDetails() {
  return (
    <div className="bg-gradient-to-b from-[#E5F3FF] to-[#E5F3FF] p-8 flex justify-between border border-solid border-grayLight border-b-0 dark:bg-none">
      <div className="flex flex-col gap-8">
        <Image src={tokenImage} alt="token" width={32} height={32} />
        <span className="text-[24px] text-textBlack dark:text-white">USDc</span>
      </div>
      <div className="flex flex-col gap-8">
        <span className="text-[18px] font-normal text-right text-grayLight dark:text-white">
          TVL
        </span>
        <span className="text-[24px] font-medium text-textBlack dark:text-white">
          $100,000,000
        </span>
      </div>
    </div>
  );
}

function AdditionalDCDSMetrics() {
  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex justify-between">
        <span className="text-grayLight text-[18px] font-medium">APY</span>
        <span className="text-grayLight text-[18px] font-medium">--</span>
      </div>
      <div className="flex justify-between">
        <span className="text-grayLight text-[18px] font-medium">
          Depositing
        </span>
        <span className="text-grayLight text-[18px] font-medium">--</span>
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
}: {
  tokenDetails: TokenDetails;
  setSelectedTokens: React.Dispatch<React.SetStateAction<TokenDetails[]>>;
  selectedTokens: { tokenImage: any; tokenName: string }[];
}) {
  const isSelected = selectedTokens.some(
    (token) => token.tokenName === tokenDetails.tokenName
  );

  const toggleToken = () => {
    setSelectedTokens((prev: TokenDetails[]) => {
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
    <div className="border border-solid border-grayLight p-5 relative">
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
  usdaAmount: string | number;
  usdtAmount: string | number;
  usdcAmount: string | number;
  usdeAmount: string | number;
  lockInPeriod: string;
  liquidationGains: boolean;
}

interface TokenDetails {
  tokenImage: any;
  tokenName: string;
  minTokenAmount: number;
  balanceAvailable: number | string;
}

// Yup validation schema
const formSchema = Yup.object().shape({
  // usdaAmount: Yup.mixed()
  //   .test(
  //     "is-valid-number",
  //     "Value must be greater than 0",
  //     (value) => Number(value) >= 0
  //   )
  //   .nullable(),
  // usdtAmount: Yup.mixed()
  //   .test(
  //     "is-valid-number",
  //     "Value must be greater than 0",
  //     (value) => Number(value) >= 0
  //   )
  //   .nullable(),
  // usdcAmount: Yup.mixed()
  //   .test(
  //     "is-valid-number",
  //     "Value must be greater than 0",
  //     (value) => Number(value) >= 0
  //   )
  //   .nullable(),
  // usdeAmount: Yup.mixed()
  //   .test(
  //     "is-valid-number",
  //     "Value must be greater than 0",
  //     (value) => Number(value) >= 0
  //   )
  //   .nullable(),
  lockInPeriod: Yup.string().required("Lock-in period is required"),
  liquidationGains: Yup.boolean().required(
    "Liquidation gains must be specified"
  ),
});

function page() {
  const { theme } = useTheme();
  const [selectedTokens, setSelectedTokens] = useState<TokenDetails[]>([]);

  const [dcdsLoadingLocal, setDcdsLoadingLocal] = useState<boolean>(false);
  const [usdtApproveLoadingLocal, setUsdtApproveLoadingLocal] =
    useState<boolean>(false);
  const [usdcApproveLoadingLocal, setUsdcApproveLoadingLocal] =
    useState<boolean>(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      usdaAmount: "",
      usdtAmount: "",
      usdcAmount: "",
      usdeAmount: "",
      lockInPeriod: "30",
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
      onClick: () => formik.setFieldValue("lockInPeriod", "120 days"),
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

  const tokenList: TokenDetails[] = [
    {
      tokenImage: centerImage1,
      tokenName: "USDc",
      minTokenAmount: 500,
      balanceAvailable: 0,
    },
    ...(GlobalContractData?.usdtAmountDepositedTillNow ||
    0 >= USDT_DEPOSIT_LIMIT_IN_DCDS
      ? [
          {
            tokenImage: centerImage2,
            tokenName: "USDa",

            balanceAvailable: Number(usdaBalance).toFixed(2),
            minTokenAmount: 500,
          },
        ]
      : []),
    ,
    {
      tokenImage: centerImage1,
      tokenName: "USDT",
      minTokenAmount: 500,
      balanceAvailable: usdtBalance,
    },
    {
      tokenImage: centerImage2,
      tokenName: "USDe",
      minTokenAmount: 500,
      balanceAvailable: 0,
    },
  ] as TokenDetails[];

  console.log(GlobalContractData, "usdtAmountDepositedTillNow");
  const {
    approveUsda,
    approveUsdaDynamic,
    approveReset,
    usdaApproveHash,
    usdaApproveLoading,
    usdaApproveError,
  } = useApproveUsda({
    onError: () => {},
  });

  // get the confirmed txn receipt
  const {
    isLoading: isLoadingUsdaApproveReceipt,
    isSuccess: usdaApprovalSuccessReceipt,
    isError: usdaApprovalErrorReceipt,
    data: usdaApprovalReceiptReceipt,
  } = useWaitForTransactionReceipt({
    hash: usdaApproveHash,
  });

  const {
    dcdsDepositHash,
    dcdsDepositIsPending,
    dcdsDepositeError,
    handleDcdsDeposit,
  } = useDcdsDeposit();

  // get the confirmed txn receipt
  const {
    isLoading: isCdsConfirmationLoading,
    isSuccess: cdsDepositSuccess,
    isError: cdsDepositError,
    data: DepositdataReceipt,
  } = useWaitForTransactionReceipt({
    hash: dcdsDepositHash,
    confirmations: 2,
  });

  // useEffect to check the status of the cds deposit transaction
  useEffect(() => {
    if (cdsDepositError) {
    }
    if (cdsDepositSuccess) {
    }
  }, [DepositdataReceipt]);

  // useEffect to check the status of the amint approval transaction
  useEffect(() => {
    if (usdaApprovalSuccessReceipt) {
      if (
        Number(formik.values.usdtAmount) &&
        (Number(formik.values.usdaAmount) ?? 0) > 0
      ) {
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

  const { chainId } = useAccount();

  const {
    handleUsdtApprove,
    isSuccessUsdtApprove,
    isPendingUsdtApprove,
    usdtApprovedHash,
  } = useUsdtApprove();

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

  console.log(formik.errors, "formik errors");

  const handleDeposit = () => {
    debugger;
    setDcdsLoadingLocal(true);
    if (
      (GlobalContractData?.usdtAmountDepositedTillNow ?? 0n) <=
      USDT_DEPOSIT_LIMIT_IN_DCDS
    ) {
      if (
        formik.values.usdaAmount == undefined ||
        formik.values.usdaAmount == 0
      ) {
        return;
      } else {
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

  return (
    <div>
      <AppNavbar activeBack={false} />
      <div className="grid lg:grid-cols-4 grid-cols-1">
        <div className="col-span-1 flex flex-col p-5 gap-8 border border-t-0 border-grayLight border-solid">
          {tokenList.map((token: TokenDetails, key: number) => (
            <AddToken
              key={key}
              tokenDetails={token}
              setSelectedTokens={setSelectedTokens}
              selectedTokens={selectedTokens}
            />
          ))}
        </div>

        <div className="hidden lg:flex col-span-2 flex-col items-center justify-center relative">
          <div className="relative h-full  flex items-center justify-center w-full">
            <div className="w-[65%] h-[65%] flex items-center justify-center relative">
              <Image
                className="hidden dark:block w-full"
                src={dcdsDark}
                alt="dark-mode-image"
              />
              <Image
                className="block  dark:hidden w-full"
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
        </div>

        <div className="col-span-1 border border-solid border-grayLight border-t-0 flex flex-col justify-between">
          <div className="p-5">
            <span className="text-textBlack text-[24px] font-medium dark:text-white">
              Deposit Funds
            </span>
            <div className="max-h-[200px] overflow-y-auto no-scrollbar">
              {selectedTokens.map((token, key) => (
                <div key={key} className="mt-4">
                  <Label
                    htmlFor={`token-${key}`}
                    className="text-grayLight text-lg font-medium"
                  >
                    {token.tokenName}
                  </Label>
                  <Input
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
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="px-5">
              <GenericDropdownMenu
                buttonText={`${formik.values.lockInPeriod} Days`}
                items={dropdownItems}
                className="w-full text-[24px] border border-grayLight"
              />
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
            <AdditionalDCDSMetrics />
            <Button
              type="submit"
              onClick={() => formik.handleSubmit()}
              className="bg-black text-white text-[24px] min-h-20 w-full dark:bg-custom-gradient-to-bottom cursor-pointer"
            >
              Deposit
            </Button>
            <LoadingBox
              isLoading={usdtApproveLoadingLocal}
              isFailure={UsdtApprovalErrorReceipt || isSuccessUsdtApprove}
              isSuccess={Boolean(isSuccessUsdtApprove || UsdtApprovalReceipt)}
              setSuccessLoading={() => console.log(true)}
              heading="Approving USDT"
            />
          </div>
        </div>
      </div>
      <TokenTvlDetails />
      <TokenTvlDetails />
      <TokenTvlDetails />
    </div>
  );
}

export default page;
