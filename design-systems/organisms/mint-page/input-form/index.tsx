import { Button } from "@/design-systems/atoms/button";
import { Input } from "@/design-systems/atoms/input";
import { Typography } from "@/design-systems/atoms/Typography";
import { usePortfolioTab } from "@/contexts/portfolio-tab";
import { useScroll } from "@/contexts/scroll";
import LoadingBox from "@/design-systems/molecule/LoadingBox";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import useDepositTokens from "@/hookes/contract-hooks/useMintUsds";
import displayNumberWithPrecision, {
  getStrikePercent,
  handleWheel,
} from "@/utils/helpers";
import { BACKEND_API_URL } from "@/utils/urls";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { parseEther, parseUnits } from "viem";
import useGetTvl from "@/hookes/contract-hooks/useGetLtv";

import * as Yup from "yup";

import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import InputMetics from "../Input-metrics";
import useFetchOptionFees from "@/hookes/api-hooks/useOptionFee";
import WalletConnectButton from "@/design-systems/molecule/WalletConnectButton";
import { BorrowAssetsEnum, NetworkId, scanUrls } from "@/utils/constants";
import {
  borrowAssetsAddress,
  borrowingContractAddress,
  borrowingDepositContractAddress,
} from "@/blockchain/contracts";
import useGetBorroowSignedData from "@/hookes/api-hooks/useGetBorrowSignedData";
import useGetBorrowSignedData from "@/hookes/api-hooks/useGetBorrowSignedData";
import useApproveWrapEth from "@/hookes/contract-hooks/useApproveWrapEth";
import useBorrowPause from "@/hookes/contract-hooks/useBorrowPause";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Network } from "ethers";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { wrsETHABI } from "@/blockchain/abis/wrsETH";
import { useFarmLuckDetails } from "@/hookes/api-hooks/useFarmyourLuckDetails";
import { calculateRemainingTimeDate } from "@/utils/helpers";
import { useTrackUserData } from "@/hookes/api-hooks/useTrackUser";
import { HoverCard } from "@/design-systems/atoms/hover-card";
import { Info } from "lucide-react";
import { usePoint } from "@/hookes/api-hooks/usePoint";

/**
 * Yup validation schema for the input form
 */
const formSchema = Yup.object({
  collateral: Yup.string().required("Collateral is required"),
  collateralAmount: Yup.number()
    .max(Yup.ref("balance"), `Amount must be less than or equal to balance`)
    .required("Collateral amount is required"),
  strikePricePercent: Yup.number()
    .min(5, "Minimum is 5")
    .max(25, "Maximum is 25")
    .required("Strike price is required"),
  balance: Yup.number(),
});

/**
 * InputForm component
 * @param {Object} props - Component props
 * @param {string} props.currency - The currency to display in the chart (default: "eth") value is coming from the url
 * @returns {JSX.Element} The InputForm component
 */
function InputForm({ currency }: { currency: string }) {
  const chainId = useChainId();
  const router = useRouter();
  const { address, isConnected } = useAccount();

  // Custom hook to handle the portfolio tab state
  const { portfolioTab, setPortfolioTab } = usePortfolioTab();

  // Custom hook to handle the scroll state in the portfolio tab
  const { isScroll, setIsScroll } = useScroll();

  // State variables for the amount of USDA to be minted and the downside protection amount
  const [usdaToBeMinted, setUsdaToBeMinted] = useState("0");
  const [downsideProtectionAmnt, setDownsideProtectionAmnt] = useState("0");
  const [upsideCollateral, setUpsideCollateral] = useState(0);

  // State variables for loading states
  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);

  // state variable to handle the mint button loading
  const [mintBtnLoading, setMintBtnLoading] = useState(false);

  // Custom hook to fetch the Price of the selected asset
  const {
    isUsdValuePending,
    usdValue: ethPrice,
    assetPrice,
    exchangeRate,
  } = useGetUsdValue(
    borrowAssetsAddress[currency as keyof typeof borrowAssetsAddress]
  );

  // Selected asset price
  const selectedAssetPrice =
    currency.toLocaleLowerCase() == "eth" ? ethPrice : assetPrice;

  // Custom hook to check the pause state of borrow functions
  const { isFunctionPausedBorrow_Deposit } = useBorrowPause();

  console.log(ethPrice, assetPrice, "eth");

  // Custom hook to fetch the borrow signed data
  const { refetchBorrowSignedData } = useGetBorrowSignedData();

  // Custom hook to fetch the balance of the selected asset
  const ethBalance = useBalance({
    address: address,
    token:
      currency.toLocaleLowerCase() !== "eth"
        ? borrowAssetsAddress[currency as keyof typeof borrowAssetsAddress][
            chainId
          ]
        : undefined,
  });

  // Formatted balance of the selected asset
  const formattedBalance = Number(ethBalance.data?.formatted || 0).toFixed(4);

  // fetching allowance
  const { data: allowance } = useReadContract({
    abi: wrsETHABI,
    address:
      borrowAssetsAddress[currency as keyof typeof borrowAssetsAddress][
        chainId || NetworkId.BaseSepolia
      ],
    functionName: "allowance",
    args: [
      address,
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    ],
  }) as { data: number | undefined };

  // handle mint btn click
  const handleSubmit = async (values: any) => {
    // check if the user is connected
    if (!address) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Please connect your wallet"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }
    // check if the user has entered the amount
    if (!formik.values.collateralAmount) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Please enter amount"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }
    // set the loading state to true
    setMintBtnLoading(true);

    reset();

    // parse the amount to be minted
    const approveAmount = parseEther(formik.values.collateralAmount.toString());

    if (
      ["wrsETH", "weETH", "wsuperOETHb"].includes(currency) &&
      BigInt(allowance || 0) < approveAmount
    ) {
      // check if allowance is less than approve amount
      setApproveLoading(true);
      await approveWrapETHDynamic(
        borrowingDepositContractAddress[
          chainId as keyof typeof borrowingDepositContractAddress
        ],
        parseEther(formik.values.collateralAmount.toString())
      );
      // else mining directly
    } else {
      handleMint(formik.values);
    }
  };

  // Formik form values
  const formik = useFormik({
    initialValues: {
      collateral: currency || "eth", // assets type
      collateralAmount: 0, // collateral amount
      strikePricePercent: 5, // strike price percent
      balance: 0, // balance
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  console.log(
    borrowAssetsAddress[currency as keyof typeof borrowAssetsAddress][chainId],
    ethBalance,
    formik.values.balance,
    formattedBalance,
    "bal"
  );

  useEffect(() => {
    // set the balance of the selected asset to formik values
    formik.setFieldValue("balance", formattedBalance);
  }, [formattedBalance]);

  useEffect(() => {
    // set the collateral type to formik values
    formik.setFieldValue("collateral", currency);
  }, [currency]);

  // Create the options fee for the contract
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(400000, 0)
    .toHex()
    .toString() as `0x${string}`;

  // Custom hook to fetch the native fee for the contract
  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(options, 1);

  // Custom hook to fetch the tvl for the contract
  const { isTvlPending, tvlValue: ltv } = useGetTvl();

  // Custom hook to fetch the deposit data hash for the contract
  const { depositDatahash, isDepositsLoading, mintUSDa, reset, depositError } =
    useDepositTokens({
      onError: () => {
        setMintLoading(false);
        toast.custom((t) => {
          return (
            <ToastNotificationError
              title="Transaction failed, Please try again"
              onClose={() => toast.dismiss(t)}
            />
          );
        });
      },
    });

  // Use the useWaitForTransactionReceipt hook to wait for the transaction receipt
  const {
    data: Depositdata,
    isError: depositHashError,
    error: depositErrorDetails,
    isLoading: isDepositdataLoading,
    isSuccess: isDepositSuccess,
  } = useWaitForTransactionReceipt({
    hash: depositDatahash,
    confirmations: 1,
  });

  // function to fetch the min amount for luck
  const fetchMinAmountForLuck = async (chainId?: number) => {
    const response = await axios.post(
      `${BACKEND_API_URL}/global/get-min-usda-mint-for-luck`,
      {
        chainId,
      }
    );
    return response.data;
  };

  // Custom hook to fetch the min amount for luck
  const { data: minUSDAforLuck, isLoading } = useQuery({
    queryKey: ["farmYourLuckWalletAddress", chainId],
    queryFn: () => fetchMinAmountForLuck(chainId),
    enabled: Boolean(chainId),
    refetchInterval: 0,
  });

  console.log(minUSDAforLuck, "minUSDAforLuck");

  useEffect(() => {
    if (isDepositSuccess && Depositdata) {
      // set the portfolio tab to borrowed for scroll
      setPortfolioTab("Borrowed");
      // set the scroll state to true
      setIsScroll(true);

      toast.custom((t) => {
        const link = `${scanUrls[chainId as keyof typeof scanUrls]}tx/${
          Depositdata.transactionHash
        } `;

        return (
          <ToastNotification
            title="Mint Successful"
            message="New Deposit has been created"
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
      setMintLoading(false);

      handleResetPage();

      if (minUSDAforLuck <= Number(usdaToBeMinted)) {
        // push the user to the farm your luck page if mint amount is greater than the min amount for luck
        router.push("/farmyourluck");
      } else {
        // push the user to the dashboard/portfolio page if the amount minted is less than the min amount for luck
        router.push("/dashboard/portfolio");
      }
    } else if (depositHashError) {
      setMintLoading(false);
      toast.custom((t) => {
        return (
          <ToastNotificationError
            title="Transaction failed, Please try again"
            onClose={() => toast.dismiss(t)}
          />
        );
      });
    }
  }, [Depositdata, isDepositSuccess, depositHashError]);

  const handleResetPage = () => {
    // formik.resetForm();
    reset(); // reset the form
    setApproveLoading(false);
    setMintLoading(false);
  };

  //getting option fees for selected amount
  const { optionFees, refetchOptionFee, Fees } = useFetchOptionFees(
    (Number(formik.values.collateralAmount) * exchangeRate) / 1e18,
    (ethPrice || 0) as number,
    getStrikePercent(formik.values.strikePricePercent)
  );

  // Custom hook to approve the wrap eth
  const {
    approveWrapETHDynamic,
    wrapETHApproveError,
    wrapETHApproveHash,
    wrapETHApproveLoading,
    wrapETHApproveReset,
    wrapETHApproveSuccess,
  } = useApproveWrapEth(
    {
      onError: () => {
        handleResetPage();
        toast.custom((t) => {
          return (
            <ToastNotificationError
              title="Transaction failed, Please try again"
              onClose={() => toast.dismiss(t)}
            />
          );
        });
      },
    },
    currency
  );

  const {
    data: wrapEthApprovedata,
    isError: wrapEthApproveHashError,
    error: wrapEthApproveErrorDetails,
    isLoading: iswrapEthApprovedataLoading,
    isSuccess: iswrapEthApproveSuccess,
  } = useWaitForTransactionReceipt({
    hash: wrapETHApproveHash,
    confirmations: 2,
  });

  useEffect(() => {
    // check if the wrap eth is approved and call the handle mint function
    if (iswrapEthApproveSuccess) {
      handleMint(formik.values);
    } else if (wrapEthApproveErrorDetails || wrapEthApproveHashError) {
      handleResetPage();
      toast.custom((t) => {
        return (
          <ToastNotificationError
            title="Transaction failed, Please try again"
            onClose={() => toast.dismiss(t)}
          />
        );
      });
    }
  }, [iswrapEthApproveSuccess]);

  async function handleMint(values: any) {
    // get the strike percent
    const strikePercent = getStrikePercent(values.strikePricePercent);

    // fetch the borrow signed data
    const borrowSignedData = await refetchBorrowSignedData();

    const data = optionFees;
    if (data != undefined && nativeFee != undefined) {
      setApproveLoading(false);
      setTimeout(() => {
        setMintLoading(true);
      }, 1000);
      // calling the mint usda function in the contract
      mintUSDa?.({
        strikePercent: BigInt(strikePercent),
        volatility: BigInt(borrowSignedData?.volatility || 0),
        depositingAmount: parseEther(formik.values.collateralAmount.toString()),
        assetName: BorrowAssetsEnum[currency as keyof typeof BorrowAssetsEnum],
        deadline: BigInt(borrowSignedData?.deadline || 0),
        nonce: BigInt(borrowSignedData?.nonce || 0),
        signature: borrowSignedData?.signature || ("" as `0x${string}`),
        value:
          currency.toLocaleLowerCase() == "eth"
            ? parseEther(formik.values.collateralAmount.toString()) +
              nativeFee.nativeFee
            : nativeFee.nativeFee,
      });
    }
  }

  /**
   * Handles the calculation and setting of the usda to be minted and downside protection amounts.
   */
  const CalculateAmtToBeMinted = async () => {
    try {
      // Calculate the usda to be minted
      const optionf = optionFees || 0;
      // calculate the usda to be minted
      const usdaToMint =
        (Number(formik.values.collateralAmount || 0) *
          Number(selectedAssetPrice || 0) *
          Number(ltv || 0)) /
        10000;
      // display the usda to be minted with 2 decimal places
      const udsa2Decimal = displayNumberWithPrecision(usdaToMint.toString());
      // set the usda to be minted
      setUsdaToBeMinted((Number(udsa2Decimal) - optionf).toFixed(2));

      // Calculate the downside protection amount
      const downsideProtection =
        (Number(formik.values.collateralAmount || 0) *
          Number(selectedAssetPrice || 0) *
          (100 - (ltv ? ltv : 0))) /
        10000;

      // display the downside protection amount with 2 decimal places
      const downsideProtection2Decimal = displayNumberWithPrecision(
        downsideProtection.toString()
      );

      // calculate the upside collateral
      const upsideCollateral =
        (Number(formik.values.collateralAmount || 0) *
          Number(selectedAssetPrice || 0) *
          formik.values.strikePricePercent) /
        10000;
      setUpsideCollateral(upsideCollateral);
      setDownsideProtectionAmnt(downsideProtection2Decimal);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handles the calculation and setting of the eth volatility.
   */
  useEffect(() => {
    if (formik.values.collateral == undefined) {
      formik.setErrors({
        collateralAmount: "select collateral type",
      });
    } else if (formik.values.collateralAmount == 0) {
      setUsdaToBeMinted("0");
      setDownsideProtectionAmnt("0");
      setUpsideCollateral(0);
      CalculateAmtToBeMinted();
    } else if (formik.values.collateralAmount != 0) {
      formik.setErrors({
        collateralAmount: "",
      });
      // calling function to calculate display values
      CalculateAmtToBeMinted();
    } else {
      formik.setErrors({
        collateralAmount: "",
      });
      formik.setErrors({
        collateralAmount: "value should be greater than 0.02 ETH",
      });
    }
  }, [
    formik.values.collateralAmount,
    formik.values.strikePricePercent,
    optionFees,
    ltv,
  ]);

  // function to set the max balance
  const handleSetMaxBal = () => {
    formik.setFieldValue(
      "collateralAmount",
      Number(ethBalance.data?.formatted || 0)
    );
  };

  // hook for getting the farm your luck data (current reward data) from the backend api for showing point boaster in ui
  const {
    data: farmLuckDetails,
    isLoading: isFarmLuckLoading,
    refetch: refetchFarmLuckDetails,
  } = useFarmLuckDetails(address, chainId);

  // getting current point value for eth deposit
  const { ethPoints, isLoading: isPointLoading, error } = usePoint();

  // dummy point boaster
  const tokenBoaster = 10;

  // calculate the point based on depositing amount
  const depositTokenPoint =
    ethPoints?.minAmount < Number(formik.values.collateralAmount || 0)
      ? Number(formik.values.collateralAmount / ethPoints?.minAmount || 0) *
        Number(ethPoints?.pointsToBeGiven || 0)
      : 0;

  // calculate the point based on farm luck boaster
  const luckBoasterPoint =
    depositTokenPoint *
    Number(
      (calculateRemainingTimeDate(farmLuckDetails?.deadLine10xTimestamp || "")
        .minutes > 0 &&
        10) ||
        (calculateRemainingTimeDate(farmLuckDetails?.deadLine5xTimestamp || "")
          .minutes > 0 &&
          5) ||
        0
    );
  // calculate the point based on token boaster
  const tokenBoasterPoint = depositTokenPoint * tokenBoaster;

  // calculate the total point
  const totalPoint = tokenBoasterPoint + luckBoasterPoint + depositTokenPoint;

  console.log(
    depositTokenPoint,
    luckBoasterPoint,
    tokenBoasterPoint,
    farmLuckDetails,
    "pointsToBeGivenBreakDown"
  );

  // get user tracking data and setter function
  const {
    userTrackingData,
    setUserTrackLocalStorageData,
    getUserTrackLocalStorageData,
  } = useTrackUserData();
  console.log(userTrackingData, "userTrackingData");

  // update user tracking data
  useEffect(() => {
    // get user tracking data from local storage
    const data = getUserTrackLocalStorageData();
    setUserTrackLocalStorageData({
      ...data,
      mintPage: {
        // previous mint page data
        ...data?.mintPage,

        // asset related data
        [currency]: {
          count: (data?.mintPage?.[currency]?.count || 0) + 1,
          visited: true,
          enterTimestamp: data?.mintPage?.[currency]?.count
            ? data?.mintPage?.[currency]?.enterTimestamp
            : new Date().toISOString(),
          exitTimestamp: new Date().toISOString(),
        },
        count: (data?.mintPage?.count || 0) + 1,
        visited: true,
        enterTimestamp: data?.mintPage?.count
          ? data?.mintPage?.enterTimestamp
          : new Date().toISOString(),
        exitTimestamp: new Date().toISOString(),
      },
    });
    return () => {
      // get user tracking data from local storage
      const data = getUserTrackLocalStorageData();
      // updating user exit time for selected asset
      setUserTrackLocalStorageData({
        ...data,
        mintPage: {
          [currency]: {
            ...data?.mintPage?.[currency],
            exitTimestamp: new Date().toISOString(),
          },
          ...data?.mintPage,
          exitTimestamp: new Date().toISOString(),
        },
      });
    };
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col p-6 gap-[18px] relative">
        <div className="flex justify-between items-center">
          <div className=" font-medium text-2xl">Mint USDA+</div>
          <div className="flex justify-end items-center gap-1">
            {calculateRemainingTimeDate(
              farmLuckDetails?.deadLine5xTimestamp || ""
            ).minutes > 0 &&
            calculateRemainingTimeDate(
              farmLuckDetails?.deadLine10xTimestamp || ""
            ).minutes > 0 ? (
              <div className="text-[14px] font-medium text-black bg-[#abffde] dark:border-white  border-black border px-3 py-1 rounded-[24px]">
                10x Points
              </div>
            ) : calculateRemainingTimeDate(
                farmLuckDetails?.deadLine10xTimestamp || ""
              ).minutes > 0 ? (
              <div className="text-[14px] font-medium text-black bg-[#abffde] dark:border-white  border-black border px-3 py-1 rounded-[24px]">
                10x Points
              </div>
            ) : calculateRemainingTimeDate(
                farmLuckDetails?.deadLine5xTimestamp || ""
              ).minutes > 0 ? (
              <div className="text-[14px] font-medium text-black bg-[#abffde] dark:border-white  border-black border px-3 py-1 rounded-[24px]">
                5x Points
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-[18px] ">
          <div className="flex flex-col">
            <div className="flex-col gap-1 justify-start">
              <div className="flex">
                <Input
                  disabled={!isConnected || !address}
                  onWheel={handleWheel}
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.collateralAmount}
                  name="collateralAmount"
                  className="rounded-none md:text-subtitle placeholder:text-subtitle h-12 px-4"
                />
                <Button
                  type="button"
                  onClick={handleSetMaxBal}
                  className="rounded-none md:text-subtitle h-12 px-4"
                  variant={"outline"}
                  size={"lg"}
                >
                  Max
                </Button>
              </div>
              <Typography size="sm" variant="regular" className="text-red-500">
                {formik.errors.collateralAmount &&
                formik.touched.collateralAmount
                  ? formik.errors.collateralAmount
                  : ""}
              </Typography>
            </div>

            <div className="flex justify-between">
              <span className=" font-medium text-lg text-grayLight">
                {/* Min: 0.05 ETH */}
              </span>
              <span className=" font-medium text-lg text-grayLight">
                Bal: {formattedBalance} {currency}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[18px]">
            <div className="flex">
              <div className="relative w-full">
                <Input
                  value={usdaToBeMinted}
                  readOnly
                  className="rounded-none md:text-subtitle h-12 px-4"
                />
                <Button
                  type="button"
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 md:text-subtitle font-medium px-4 text-textBlack dark:text-white"
                  variant={"ghost"}
                  size={"sm"}
                >
                  USDA+
                </Button>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className=" font-medium text-lg text-grayLight">
                  5% of collateral upside
                </span>
                <span className=" font-medium text-lg dark:text-white text-black">
                  ${upsideCollateral.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <HoverCard
                  title={
                    <span className=" flex gap-1 items-center font-medium text-lg text-grayLight">
                      Points
                      <Info
                        id="points-breakdown"
                        className="stroke-grayLight w-[18px] h-[18px]"
                      />
                    </span>
                  }
                >
                  <div>
                    <div className=" p-3 bg-[#ABFFDE] border-b-[1px] border-grayLight font-medium text-lg text-grayLight">
                      Points Breakdown
                    </div>
                    <div className="flex p-3 mt-2 flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-grayLight">
                          Deposit
                        </span>
                        <span className="font-medium text-black dark:text-white">
                          {depositTokenPoint}
                        </span>
                      </div>
                      <div className="flex  justify-between">
                        <span className="font-medium text-grayLight">
                          10x Boaster
                        </span>
                        <span className="font-medium text-black dark:text-white">
                          {tokenBoasterPoint}
                        </span>
                      </div>
                      <div className="flex  justify-between">
                        <span className="font-medium text-grayLight">
                          5x Boaster
                        </span>
                        <span className="font-medium text-black dark:text-white">
                          {luckBoasterPoint}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCard>
                <span className=" font-medium text-lg dark:text-white text-black">
                  {totalPoint}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*  displaying the input metrics */}
        <InputMetics
          deposit={(
            (Number(selectedAssetPrice || 0) / 100) *
            Number(formik.values.collateralAmount)
          ).toFixed(2)}
          optionFees={optionFees.toFixed(2)}
          usdaBorrowed={usdaToBeMinted == "0" ? "0.00" : usdaToBeMinted}
          Dp={Number(downsideProtectionAmnt).toFixed(2)}
        />
      </div>
      <div className="col-span-1 overflow-hidden h-[85px]">
        {address && isConnected ? (
          !mintBtnLoading && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-full">
                  <Button
                    disabled={isFunctionPausedBorrow_Deposit}
                    type="submit"
                    className={`
                    bg-black dark:bg-custom-gradient-to-top py-6
                    text-white  font-semibold text-[24px] w-full h-full rounded-md `}
                  >
                    {!mintBtnLoading && "Mint USDA+"}{" "}
                    <span className="text-base">
                      {isFunctionPausedBorrow_Deposit && "(Paused)"}
                    </span>
                  </Button>
                </div>
              </TooltipTrigger>
              {isFunctionPausedBorrow_Deposit && (
                <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                  <p>{"Borrow is paused now"}</p>
                </TooltipContent>
              )}
            </Tooltip>
          )
        ) : (
          // displaying the wallet connect button if the user is not connected in place of the mint button
          <WalletConnectButton />
        )}
        {/* displaying the loading box for the minting transaction */}
        <LoadingBox
          isLoading={mintLoading}
          isFailure={depositError || depositHashError}
          isSuccess={Boolean(Depositdata)}
          setSuccessLoading={setMintBtnLoading}
          heading="Minting USDA+"
          loadingCount={currency.toLocaleLowerCase() === "eth" ? "1/1" : "2/2"}
        />
        {/* displaying the loading box for the approve transaction */}
        <LoadingBox
          isLoading={approveLoading}
          isFailure={wrapETHApproveError || wrapEthApproveHashError}
          isSuccess={Boolean(iswrapEthApproveSuccess)}
          setSuccessLoading={setApproveLoading}
          heading={`Approving ${currency}`}
          loadingCount="1/2"
        />
      </div>
    </form>
  );
}

export default InputForm;
