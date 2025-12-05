import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { usDaAbi } from "@/blockchain/abis/usda";
import {
  borrowAssetsAddress,
  borrowCoreAddress,
  borrowingContractAddress,
  borrowWithdrawCoreAddress,
  testusdtAbiAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import useGetBorrowWithdrawSignedData from "@/hookes/api-hooks/useGetBorrowWithdrawSignedData";
import useInterestGain from "@/hookes/api-hooks/useInterateGain";
import useApproveUsda from "@/hookes/contract-hooks/useApproveUsda";
import useUsdtApprove from "@/hookes/contract-hooks/useApproveUsdt";
import useBorrowPause from "@/hookes/contract-hooks/useBorrowPause";
import useBorrowRenew from "@/hookes/contract-hooks/useBorrowRenew";
import useGetBalance from "@/hookes/contract-hooks/useGetBalance";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useLastCumulativeRate from "@/hookes/contract-hooks/useGetLastCumulativeRate";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import useMasterPriceOracle from "@/hookes/contract-hooks/useMasterPriceOracle";
import { usePayableOptionFees } from "@/hookes/contract-hooks/usePayableOptionFees";
import { useWithdrawUsda } from "@/hookes/contract-hooks/useWithdrawUsda";
import { useFormik } from "formik";
import {
  AssetName,
  BorrowAssetsEnum,
  BorrowData,
  BorrowStatus,
  NetworkId,
} from "@/utils/constants";
import displayNumberWithPrecision, {
  calculateRemainingDays,
  getMinutesPassed,
  hasFiveMinutesPassed,
  isRenewActiveDaysCompleted,
  truncateDecimals,
} from "@/utils/helpers";
import { AssetDetailsInterface, PositionData } from "@/utils/interface";
import { BACKEND_API_URL, scanUrls } from "@/utils/urls";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import LoadingBox from "../LoadingBox";
import ToastNotification from "../toasts/ToastNotification";
import ToastNotificationError from "../toasts/ToastNotificationError";
import { testusdtAbiAbi } from "@/blockchain/abis/usdt";
import useGetTVL from "@/hookes/contract-hooks/useGetTVL";
import useGetLtv from "@/hookes/contract-hooks/useGetLtv";
import { useLayerZeroMessages } from "@/hookes/contract-hooks/useLayerZeroMessages";
import Spinner from "@/design-systems/atoms/Spinner";
export function WithdrawFund({
  position,
  isDialogOpen,
  setIsDialogOpen,
  positionListRefetech,
  setSelectedPosition,
}: {
  positionListRefetech: () => void;
  position: PositionData;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  setSelectedPosition: (position: PositionData) => void;
}) {
  const [toggleView, setToggleView] = useState("repay");

  // getting value for borrow withdraw and renew pause
  const { isFunctionPausedBorrow_Renew, isFunctionPausedBorrow_Withdraw } =
    useBorrowPause();

  const [isDataUpdating, setIsDataUpdating] = useState(false);

  const [spinner, setSpinner] = useState(false);

  const { address, chainId } = useAccount();

  const { data: indexPoint, isLoading: isIndexPointLoading } = useQuery({
    queryKey: ["getPointEarned", address, chainId, position.index],
    queryFn: async () => {
      const response = await axios.post(`${BACKEND_API_URL}/borrows/deposit`, {
        chainId,
        address,
        index: position.index,
      });
      return response.data;
    },
    enabled: !!address && !!chainId && !!position.index,
  });

  const depositDetails = [
    {
      headline: "ETH Deposited",
      value: "0",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "ETH Price at Deposit",
      value: "0",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Points accrued till now",
      value: indexPoint?.[1] || "0",
      tooltip: false,
      tooltipText: "",
      titleColor: "!text-[#69a28c] dark:!text-[#afffdfb5]",
      valueColor: "!text-[#49d69f] dark:!text-[#ABFFDE]",
    },
    {
      headline: "Deposit Time APR",
      value: "0%",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Current APR",
      value: "0%",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Deposited Time",
      value: "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Downside Percentage At Deposit",
      value: "0%",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Collateral Upside At Deposit",
      value: "0%",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Collateral Upside till now",
      value: "0%",
      tooltip: true,
      tooltipText:
        "The final upside value might be slightly different due to slippage",
    },
    {
      headline: "Interest Rate Gained",
      value: "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "ABond Minted",
      value: "-",
      tooltip: false,
      tooltipText: "",
    },
  ];

  // fetching layer zero transaction data to add loading state to user to initiate transaction
  const { readyForNewTx } = useLayerZeroMessages();

  const [depositData, setDepositData] = useState(depositDetails);

  const { isLastCumulativeRatePending, lastCumulativeRate } =
    useLastCumulativeRate(position.collateralType) as {
      isLastCumulativeRatePending: boolean;
      lastCumulativeRate: number | undefined;
    };

  // interest gain from backend
  const { interestGained, isInterestGainedPending } = useInterestGain(
    position.index
  );

  const { usdValue: ethPrice, isUsdValuePending } = useGetUsdValue(
    borrowAssetsAddress[
      position.collateralType as keyof typeof borrowAssetsAddress
    ]
  );

  const [amountProtected, setAmountProtected] = useState<number>(0);
  const formik = useFormik({
    initialValues: {
      withdrawAmount: "",
    },
    validate: (values) => {
      const errors: { withdrawAmount?: string } = {};
      if (!values.withdrawAmount) {
        errors.withdrawAmount = "Amount is required";
      } else if (
        isNaN(Number(values.withdrawAmount)) ||
        Number(values.withdrawAmount) <= 0
      ) {
        errors.withdrawAmount = "Please enter a valid positive number";
      } else if (
        position &&
        Number(values.withdrawAmount) > Number(position?.amountYetToWithdraw)
      ) {
        errors.withdrawAmount = `Amount exceeds available balance (Max: ${position.amountYetToWithdraw})`;
      } else if (Number(values.withdrawAmount) < 0) {
        errors.withdrawAmount = "Negative numbers are not allowed";
      }
      return errors;
    },
    onSubmit: (values) => {
      // Handle form submission if needed
      handleRepay(values.withdrawAmount);
    },
  });

  const [amountView, setAmountView] = useState(false);
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
  const [repayLoading, setRepayLoading] = useState<boolean>(false);
  const { balanceString: usdaBalance, balance } = useGetBalance("USDa");
  const {
    balanceString: USDTBalance,
    balance: USDTBalanceFormatted,
    balanceUnformatted,
  } = useGetBalance("USDT");
  console.log(
    USDTBalance,
    USDTBalanceFormatted,
    balanceUnformatted,
    "USDTBalanceFormatted"
  );
  // loadings for transaction
  const [isLoadingCumulativeLocal, setIsLoadingCumulativeLocal] =
    useState<boolean>(false);
  const [isApproveLoadingLocal, setIsApproveLoadingLocal] =
    useState<boolean>(false);
  const [withdrawLoadingLocal, setWithdrawLoadingLocal] =
    useState<boolean>(false);

  // fetching renew enable time
  const {
    data: optionsFeesTimeLimits,
    isLoading: isOptionsFeesTimeLimitsPending,
  } = useReadContract({
    functionName: "optionsFeesTimeLimits",
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    abi: borrowingContractAbi,
  }) as { data: number[]; isLoading: boolean };

  // // getting renew time limit in days
  // const { data: currentOptionFeeTimeLimit } = useReadContract({
  //   abi: borrowingContractAbi,
  //   address:
  //     borrowingContractAddress[
  //       chainId as keyof typeof borrowingContractAddress
  //     ],
  //   functionName: "optionsFeesTimeLimits",

  //   query: {
  //     placeholderData: [0n, 0n],
  //     select: (data: any) => {
  //       return {
  //         minTimeLimit: Number(data[0] || 0) / (24 * 60 * 60),
  //         maxTimeLimit: Number(data[1] || 0) / (24 * 60 * 60),
  //       };
  //     },
  //   },
  // });

  // const { tvlValue: assetDetails } = useGetLtv(
  //   position.collateralType === "cbBTC" ? AssetName.cbBTC : undefined
  // );

  const contract =
    position.collateralType === "cbBTC"
      ? borrowCoreAddress
      : borrowingContractAddress;
  // getting token details
  const { data: assetDetails, refetch: refetchCurrentData } = useReadContract({
    abi: borrowingContractAbi,
    address: contract[chainId as keyof typeof contract] as `0x${string}`,
    args: [
      BorrowAssetsEnum[
        position?.collateralType as keyof typeof BorrowAssetsEnum
      ],
    ],
    functionName: "getAssetDetails",
  }) as { data: any; refetch: () => void };

  console.log(assetDetails, "assetDetails");
  // if position withdrawn using withdrawn time eth price as current eth price else using
  // current eth price
  const currentEthPrice =
    position.status == BorrowStatus.DEPOSITED
      ? ethPrice || 0
      : position.ethPriceAtWithdraw || 0;

  // if current eth price is greater than deposit time eth price dp will be zero
  const downsideProtection =
    position.status == BorrowStatus.LIQUIDATED ||
    calculateRemainingDays(Number(position.validTill)) <= 0
      ? 0
      : (currentEthPrice || 0) < (position?.ethPrice || 0)
      ? Number(formatUnits(BigInt(position?.ethPrice || 0), 2)) *
          Number(position?.depositedAmountInETH) -
        Number(formatUnits(BigInt(currentEthPrice), 2)) *
          Number(position?.depositedAmountInETH)
      : 0;

  // fetching allowance of usda for repay
  const {
    data: allowance,
    isLoading: isAllowancePending,
    refetch: refetchAllowance,
  } = useReadContract({
    abi: usDaAbi,
    address: usDaAddress[chainId as keyof typeof usDaAddress],
    functionName: "allowance",
    args: [
      address || zeroAddress,
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    ],
  }) as { data: number | undefined; isLoading: boolean; refetch: () => void };

  // fetching allowance of usda for repay
  const {
    data: allowanceUSDT,
    isLoading: isAllowancePendingUSDT,
    refetch: refetchAllowanceUSDT,
  } = useReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
    functionName: "allowance",
    args: [
      address || zeroAddress,
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    ],
  }) as { data: number | undefined; isLoading: boolean; refetch: () => void };
  // usda amount multiply by cumulative rate
  // const totalUsdaAmntWithCumulativeRate =
  //   lastCumulativeRate === undefined
  //     ? parseUnits((position?.normalizedAmount?.toString() || "0"), 6)
  //     : BigInt(
  //       BigInt(
  //         Math.round(
  //           position.normalizedAmount
  //             ? Number(parseUnits(position?.normalizedAmount?.toString() || "0", 6))
  //             : 0
  //         )
  //       ) * BigInt(lastCumulativeRate || 0)
  //     ) / BigInt(10 ** 27);

  const totalUsdaAmntWithCumulativeRate = BigInt(
    position.normalizedAmount
      ? Number(parseUnits(position?.normalizedAmount?.toString() || "0", 6))
      : 0
  );

  // updating repay amount according to status
  const repayAmount =
    position.status == BorrowStatus.DEPOSITED
      ? Number(formatUnits(BigInt(totalUsdaAmntWithCumulativeRate), 6)) -
        (Number(downsideProtection) + Number(position?.optionFees))
      : Number(position.totalDebtAmount) -
        (Number(downsideProtection) + Number(position?.optionFees));

  // getting current APR value
  const { data: currentAPR, isLoading: isCurrentAPRPending } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    args: [BorrowData.APR],
    functionName: "getBorrowData",
  }) as { data: number[] | undefined; isLoading: boolean };

  function handleDepositData() {
    setIsDataUpdating(true);
    // Calculate the totalUsdaAmntWithCumulativeRate
    if (position && lastCumulativeRate) {
      // If details are available, update each value in the depositData array
      const updatedData = [...depositData];
      updatedData[0].headline = `${position.collateralType} Deposited`;
      // set deposited amount
      updatedData[0].value = `${
        position.collateralType === "cbBTC"
          ? Number(position.depositedAmount).toFixed(5)
          : Number(position.depositedAmount).toFixed(4)
      } ${position.collateralType}`;
      updatedData[1].headline = `${position.collateralType} Price at Deposit`;
      // set eth price at deposit
      const ethPriceAtDep =
        (Number(position.ethPrice) *
          Number(position.exchangeRateAtDeposit || 0)) /
        100;
      updatedData[1].value = `$${ethPriceAtDep.toFixed(2)}`;
      // set points earned till now
      updatedData[2].headline = "Points earned till now";
      updatedData[2].value = `${indexPoint?.[1]?.toFixed(0) || 0}` || "-";
      // set apr at deposit
      updatedData[3].value = `${position.aprAtDeposit}%`;
      // set current apr
      updatedData[4].value = `${Number(currentAPR || 0) / 10}%`;
      updatedData[5].value = new Date(
        // set deposited time
        position.depositedTime * 1000
      ).toLocaleString();
      // downside protection percentage
      updatedData[6].value = `${position.downsideProtectionPercentage}%`;

      // current price of eth
      const currentPrice =
        position.status == BorrowStatus.DEPOSITED
          ? ethPrice
          : position.ethPriceAtWithdraw;

      // calculate upside at deposit time
      const upsideAt =
        (Number(position.depositedAmountInETH) * Number(ethPriceAtDep) * 5) /
        100;

      // calculate price difference
      const priceDef =
        // check if eth price at deposit time is less then current price
        // if yes then calculate the difference
        // else set 0
        Number(ethPriceAtDep) < Number(currentPrice) / 100
          ? Number(position.depositedAmountInETH) *
              (Number(currentPrice) / 100) -
            Number(position.depositedAmountInETH) * Number(ethPriceAtDep)
          : 0;

      // if upside is more than 5% so showing 5% max upside or else showing calculated amount that
      // is less that 5%
      const curtUpside = upsideAt < priceDef ? upsideAt : priceDef;
      // set collateral upside at deposit
      updatedData[7].value = `${upsideAt.toFixed(2)}`;
      // set collateral upside till now
      updatedData[8].value =
        // check if eth price at deposit time is less then current price
        // if yes then set curtUpside
        // else set -
        Number(ethPriceAtDep) < Number(currentPrice) / 100
          ? `${curtUpside.toFixed(2)}`
          : "-";
      // set interest gain
      updatedData[9].value =
        interestGained != undefined && position.status == BorrowStatus.WITHDREW
          ? `$${Number(interestGained || 0).toFixed(2)}`
          : "-";
      updatedData[10].value = position.noOfAbondMinted
        ? `${position.noOfAbondMinted}`
        : "-";
      setDepositData(updatedData);
      setIsDataUpdating(false);
    } else {
      // if position and lastCumulativeRate is not available then set -
      // If details are not available, set each value in the depositData array to '-'
      const updatedData = [...depositData];
      updatedData[0].value = "-";
      updatedData[1].value = "-";
      updatedData[2].value = "-";
      updatedData[3].value = "-";
      updatedData[4].value = "-";
      updatedData[5].value = "-";
      updatedData[6].value = "-";
      updatedData[7].value = "-";
      updatedData[8].value = "-";
      updatedData[9].value = "-";
      updatedData[10].value = "-";

      setDepositData(updatedData);
    }
  }

  // repay amount details for showing in popup
  const repayAmountDetails = [
    {
      headline: "Hedge Asset",
      value: `${position.collateralType}`,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "USDA+ Amount Minted",
      value: `${Number(position.noOfUSDaMinted).toFixed(2)} USDA+`,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Total Interest",
      value: `$${
        Number(formatUnits(BigInt(totalUsdaAmntWithCumulativeRate), 6)) <
          Number(position.noOfUSDaMinted) ||
        position.status === BorrowStatus.LIQUIDATED
          ? 0
          : position.status === BorrowStatus.DEPOSITED
          ? // if position withdrawn using totalDebtAmount else total usda with cumulative
            (
              Number(formatUnits(BigInt(totalUsdaAmntWithCumulativeRate), 6)) -
              Number(position.noOfUSDaMinted)
            ).toFixed(4)
          : (
              Number(position.totalDebtAmount) - Number(position.noOfUSDaMinted)
            ).toFixed(4)
      }`,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Downside Protection Till Now",
      value: `$${downsideProtection.toFixed(2)}`,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Repay Amount",
      value: `$${repayAmount.toFixed(2)}`,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Liquidation Price",
      // value: `$${Number((position?.liquidationEthPrice || 0) / 100)?.toFixed(
      //   2
      // )}`,
      value: position?.downsideProtectionStatus
        ? (
            Number(position?.ethPrice || 0) *
            Number(position?.exchangeRateAtDeposit || 0) *
            (Number(assetDetails?.LTV || 0) / 1e4)
          ).toFixed(2)
        : (
            Number(position?.ethPrice || 0) *
            Number(position?.exchangeRateAtDeposit || 0) *
            (Number(assetDetails?.optionsExpiredLTV || 0) / 1e4)
          ).toFixed(2),

      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Liquidated?",
      value: position.status === "LIQUIDATED" ? "Yes" : "No",
      tooltip: false,
      tooltipText: "",
    },
  ];

  const handleAmountProtected = () => {
    //check if we have current ethPrice available or not
    if (ethPrice) {
      //if current ethPrice > deposited time ethPrice
      if (parseFloat(ethPrice.toString()) > position.ethPrice) {
        setAmountProtected(0);
      }
      //if current ethPrice < depositedethPrice
      else if (parseFloat(ethPrice.toString()) < position.ethPrice) {
        const amountProt =
          parseFloat(position.depositedAmount) *
          (position.ethPrice - parseFloat(ethPrice.toString()));
        const amountProtPrecision = parseFloat(
          displayNumberWithPrecision((amountProt / 100).toFixed(2))
        );
        setAmountProtected(amountProtPrecision);
      }
      //if current ethprice < 0.8 of depositedethPrice
      else if (parseFloat(ethPrice.toString()) <= 0.8 * position.ethPrice) {
        //
        const amountProt =
          0.2 * parseFloat(position.depositedAmount) * position.ethPrice;
        const amountProtPrecision = parseFloat(
          displayNumberWithPrecision((amountProt / 100).toFixed(2))
        );
        setAmountProtected(amountProtPrecision);
      }
      setAmountView(!amountView);
    } else {
      setAmountView(!amountView);
      setAmountProtected(0);
    }
  };

  useEffect(() => {
    setSpinner(true);
    handleDepositData();
    handleAmountProtected();
    setOpenConfirmNotice(true);
    setSpinner(false);
  }, [position, lastCumulativeRate, interestGained, indexPoint]);

  // Create the options for the contract
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(400000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const {
    quoteValue: nativeFee,
    quoteError,
    isUsdValuePending: isQuotePending,
  } = useGetGlobalQuote(options, 3, 1) as {
    quoteValue: { nativeFee: bigint };
    quoteError: any;
    isUsdValuePending: boolean;
  };

  const {
    usdtApprovedHash,
    isPendingUsdtApprove,
    isSuccessUsdtApprove,
    usdtApproveWrite,
    usdtApproveError,
    resetUsdtApprove,
    handleUsdtApprove,
  } = useUsdtApprove({
    onError: () => {
      setIsLoadingCumulativeLocal(false);
      setIsApproveLoadingLocal(false);
      setWithdrawLoadingLocal(false);
      setRenewApproveLoading(false);
      setTimeout(() => {
        setRenewLoading(false);
        setRepayLoading(false);
      }, 1000);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    },
  });

  const {
    data: usdtHashData,
    isSuccess: usdtHashSucces,
    isError: usdtHashError,
    isLoading: usdtHashLoading,
  } = useWaitForTransactionReceipt({
    hash: usdtApprovedHash,
    query: {
      enabled: !!usdtApprovedHash,
    },
  });

  const {
    approveUsda,
    approveReset,
    usdaApproveHash,
    usdaApproveLoading,
    usdaApproveError,
    approveUsdaDynamic,
    usdaApproveSuccess,
  } = useApproveUsda({
    onError: () => {
      setIsLoadingCumulativeLocal(false);
      setIsApproveLoadingLocal(false);
      setWithdrawLoadingLocal(false);
      setRenewApproveLoading(false);
      setTimeout(() => {
        setRenewLoading(false);
        setRepayLoading(false);
      }, 1000);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    },
  });

  const {
    data: usdaHashData,
    isSuccess: usdaHashSucces,
    isError: usdaHashError,
    isLoading: usdaHashLoading,
  } = useWaitForTransactionReceipt({
    hash: usdaApproveHash,
    query: {
      enabled: !!usdaApproveHash,
    },
  });

  const {
    withdrawUsda,
    borrowReset,
    isPendingBorrowWithdraw,
    borrowWithdrawData,
    borrowWithdrawError,
  } = useWithdrawUsda({
    onError: () => {
      setIsLoadingCumulativeLocal(false);
      setIsApproveLoadingLocal(false);
      setWithdrawLoadingLocal(false);
      setTimeout(() => {
        setRepayLoading(false);
      }, 1000);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    },
  });

  const {
    isLoading: isLoadingWithdrawReceipt,
    isSuccess: isSuccessWithdrawReceipt,
    data: withdrawReceipt,
    isError: withdrawErrorReceipt,
    error: withdrawError,
  } = useWaitForTransactionReceipt({
    hash: (borrowWithdrawData || undefined) as `0x${string}`, // Transaction hash to wait for
    confirmations: 1, // Number of confirmations required
  });

  useEffect(() => {
    if (isSuccessWithdrawReceipt) {
      setSelectedPosition({ ...position, status: BorrowStatus.WITHDREW });
      toast.custom((t) => {
        const link = `${scanUrls[chainId as keyof typeof scanUrls]}tx/${
          withdrawReceipt.transactionHash
        } `;
        return (
          <ToastNotification
            title="Repay Successful"
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
      setTimeout(() => {
        positionListRefetech();
      }, 3000);
      setWithdrawLoadingLocal(false);
      setTimeout(() => {
        setRepayLoading(false);
      }, 1000);
    } else if (withdrawErrorReceipt) {
      toast.custom((t) => (
        <ToastNotificationError
          title={"Transaction failed, Please try again"}
          onClose={() => toast.dismiss(t)}
        />
      ));
      setIsLoadingCumulativeLocal(false);
      setIsApproveLoadingLocal(false);
      setWithdrawLoadingLocal(false);
      setTimeout(() => {
        setRepayLoading(false);
      }, 1000);
    }
  }, [isSuccessWithdrawReceipt, withdrawReceipt, withdrawErrorReceipt]);

  const handleRepay = async (withdrawAmount: string) => {
    const repayAmountFormated = Number(
      truncateDecimals(Number(withdrawAmount || 0) + 0.001, 6)
    );
    // check if repay amount is greater than or equal to repay amount
    if (repayAmountFormated > repayAmount) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Value should be less than or equal to repay amount"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }

    // check if balance is greater than or equal to repay amount
    if (balance < repayAmountFormated) {
      toast.custom((t) => (
        <ToastNotificationError
          title="You don't have enough USDA+ to repay"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }

    setRepayLoading(true);
    setOpenConfirmNotice(false);
    // cumulativeReset?.();
    approveReset?.();
    borrowReset?.();
    const approveRepayAmount = BigInt(
      Math.round(Number(parseUnits((repayAmountFormated + 0.5).toString(), 6)))
    );
    if (
      position.status === "DEPOSITED"
      // BigInt(allowance || 0) < approveRepayAmount
    ) {
      setIsApproveLoadingLocal(true);
      approveUsda(approveRepayAmount, position.collateralType);
    }
    // else {
    //   callRepayInContract();
    // }
  };

  const [renewLoading, setRenewLoading] = useState<boolean>(false);
  const [renewApproveLoading, setRenewApproveLoading] =
    useState<boolean>(false);
  const [renewLoadingSM, setRenewLoadingSM] = useState<boolean>(false);

  const { refetchBorrowWithDrawSignedData } = useGetBorrowWithdrawSignedData(
    position.index
  );
  const {
    renewBorrow,
    isRenewBorrowLoading,
    renewBorrowHash,
    resetBorrowRenew,
    renewError: renewErrorSm,
  } = useBorrowRenew({
    onError: () => {
      refetchAllowanceUSDT();
      setTimeout(() => {
        setRenewLoading(false);
      }, 800);
      setRenewApproveLoading(false);
      setRenewLoadingSM(false);
      refetchAllowance();
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    },
  });

  useEffect(() => {
    (async () => {
      if (
        (usdaHashData && usdaHashSucces) ||
        (usdtHashData && usdtHashSucces)
      ) {
        if (toggleView == "repay") {
          setIsApproveLoadingLocal(false);
          setTimeout(() => {
            setWithdrawLoadingLocal(true);
          }, 800);
          const token = position.collateralType === "cbBTC" ? "cbBTC" : "ETH";
          const borrowSignedData = await refetchBorrowWithDrawSignedData(token);

          withdrawUsda(
            position.index,
            position.collateralType === "cbBTC"
              ? undefined
              : nativeFee?.nativeFee || BigInt(0n),
            borrowSignedData?.odosAssembledData,
            // BigInt(borrowSignedData?.nonce || 0),
            BigInt(borrowSignedData?.deadline || 0),
            (borrowSignedData?.signature || "") as `0x${string}`,
            BigInt(borrowSignedData?.expiredETHAmount || 0),
            BigInt(borrowSignedData?.plFromExpired || 0),
            position.collateralType
          );
        }
        if (toggleView == "renew") {
          setRenewApproveLoading(false);
          setTimeout(() => {
            setRenewLoadingSM(true);
          }, 800);

          renewBorrow(
            BigInt(position.index),
            position.collateralType === "cbBTC"
              ? undefined
              : nativeFee?.nativeFee || BigInt(0n),
            position.collateralType
          );
        }
      } else if (usdaHashError || usdtHashError) {
        toast.custom((t) => (
          <ToastNotificationError
            title="Transaction failed, Please try again"
            onClose={() => toast.dismiss(t)}
          />
        ));
      }
    })();
  }, [usdaHashData, usdtHashData, usdaHashError, usdtHashError]);

  const {
    isLoading: isLoadingRenewReceipt,
    isSuccess: isSuccessRenewReceipt,
    data: renewReceipt,
    isError: renewReceiptError,
    error: renewError,
  } = useWaitForTransactionReceipt({
    hash: (renewBorrowHash || undefined) as `0x${string}`, // Transaction hash to wait for
    confirmations: 1, // Number of confirmations required
  });

  useEffect(() => {
    if (isSuccessRenewReceipt) {
      const link = `${scanUrls[chainId as keyof typeof scanUrls]}tx/${
        renewReceipt.transactionHash
      } `;

      toast.custom((t) => (
        <ToastNotification
          title="Renew Successful"
          message=""
          linkText={
            Number(chainId) === NetworkId.BaseSepolia
              ? "View On Basescan"
              : "View On Optimismscan"
          }
          linkUrl={link}
          onClose={() => toast.dismiss(t)}
        />
      ));
      setRenewApproveLoading(false);
      setRenewLoadingSM(false);
      setTimeout(() => {
        setRenewLoading(false);
      }, 800);
      setTimeout(() => {
        positionListRefetech();
      }, 3000);
      refetchAllowanceUSDT();
    } else if (renewReceiptError) {
      setRenewLoading(false);
      setRenewApproveLoading(false);
      setRenewLoadingSM(false);
      refetchAllowance();
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
      refetchAllowanceUSDT();
    }
  }, [renewReceipt, renewReceiptError, isSuccessRenewReceipt]);

  const handleCloseDialog = (value: boolean) => {
    approveReset?.();
    resetUsdtApprove?.();
    borrowReset?.();
    setIsLoadingCumulativeLocal(false);
    setIsApproveLoadingLocal(false);
    setWithdrawLoadingLocal(false);
    setIsDialogOpen(value);
    formik.resetForm();
  };

  const { payableOptionFees } = usePayableOptionFees(
    position.index,
    position.collateralType
  ) as {
    payableOptionFees: bigint | undefined;
  };

  const { getOraclePrice } = useMasterPriceOracle(
    testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
  );

  const handleRenew = () => {
    if (Number(payableOptionFees || 0) < 0) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Option fees not found"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }

    if (Number(payableOptionFees || 0) < 0) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Price not found"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }
    // calculate renew amount
    const renewAmount = BigInt(
      Math.round(
        Number(
          Number(payableOptionFees || 0) /
            Number(formatUnits(BigInt(getOraclePrice[0] || 0), 18)) || 0
        )
      ) + 1e6
    );

    // check if renew amount is greater than 0
    if (balanceUnformatted < renewAmount) {
      toast.custom((t) => (
        <ToastNotificationError
          title="You don't have enough USDT to renew"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }

    // start loading and reset states
    setRenewLoading(true);
    resetUsdtApprove?.();
    resetBorrowRenew?.();

    // check if allowance is less than renew amount
    if ((allowanceUSDT || 0) < renewAmount) {
      setRenewApproveLoading(true);
      const contract =
        position.collateralType === "cbBTC"
          ? borrowCoreAddress[chainId as keyof typeof borrowWithdrawCoreAddress]
          : borrowingContractAddress[
              chainId as keyof typeof borrowingContractAddress
            ];
      handleUsdtApprove([contract as `0x${string}`, renewAmount]);
      refetchAllowance();
    } else {
      callRenewInContract();
    }
  };

  const callRenewInContract = () => {
    setRenewApproveLoading(false);
    setTimeout(() => {
      setRenewLoadingSM(true);
    }, 800);

    renewBorrow(
      BigInt(position.index),
      position.collateralType === "cbBTC"
        ? undefined
        : nativeFee?.nativeFee || BigInt(0n),
      position.collateralType
    );
  };

  const isPopupLoading =
    isLastCumulativeRatePending ||
    isInterestGainedPending ||
    isUsdValuePending ||
    isDataUpdating ||
    isOptionsFeesTimeLimitsPending ||
    isAllowancePending ||
    isCurrentAPRPending ||
    isQuotePending ||
    isIndexPointLoading;

  const isRenewActive = !(
    Number(
      Number(assetDetails?.optionsFeesTimeLimits?.minimumLimit || 0) /
        (24 * 60 * 60) -
        (Number(assetDetails?.optionsFeesTimeLimits?.maximumLimit || 0) /
          (24 * 60 * 60) -
          (calculateRemainingDays(position.validTill) + 1 || 0))
    ) > 0
  );

  // // getting renew time limit in days
  // const { data: currentOptionFeeTimeLimit } = useReadContract({
  //   abi: borrowingContractAbi,
  //   address:
  //     borrowingContractAddress[
  //       chainId as keyof typeof borrowingContractAddress
  //     ],
  //   functionName: "optionsFeesTimeLimits",

  //   query: {
  //     placeholderData: [0n, 0n],
  //     select: (data: any) => {
  //       return {
  //         minTimeLimit: Number(data[0] || 0) / (24 * 60 * 60),
  //         maxTimeLimit: Number(data[1] || 0) / (24 * 60 * 60),
  //       };
  //     },
  //   },
  // });

  const currentOptionFeeTimeLimit = {
    minTimeLimit:
      Number(assetDetails?.optionsFeesTimeLimits?.minimumLimit || 0) /
      (24 * 60 * 60),
    maxTimeLimit:
      Number(assetDetails?.optionsFeesTimeLimits?.maximumLimit || 0 || 0) /
      (24 * 60 * 60),
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className=" max-w-[98%] sm:max-w-[610px] dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0">
          <div className="flex gap-4 justify-start items-center mb-4">
            <div className="text-2xl font-semibold ">Borrow Details</div>
            <div className="text-grayLight">Balance: {balance} USDA+</div>
          </div>

          <div className="flex">
            <div
              onClick={() => setToggleView("repay")}
              className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700"
            >
              <div className="inline-flex items-center">
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="repay"
                >
                  <input
                    name="repay"
                    type="radio"
                    checked={toggleView === "repay"}
                    className="peer h-4 w-4  md:h-6 md:w-6 cursor-pointer appearance-none rounded-full  border-[3px] md:border-[4px] dark:border-white  border-black dark:checked:border-white checked:border-black transition-all"
                    id="repay"
                  />
                  <span className="absolute dark:bg-white bg-black w-2 h-2 md:w-3 md:h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
              </div>
              <label
                htmlFor="bordered-radio-1"
                className="w-full py-2 ms-2 text-[20px]  sm:text-2xl md:text-[32px] font-medium text-textBlack  dark:text-white"
              >
                Repay
              </label>
            </div>

            <div
              onClick={() => setToggleView("renew")}
              className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700"
            >
              <div className="inline-flex items-center">
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="renew"
                >
                  <input
                    name="renew"
                    type="radio"
                    onChange={() => setToggleView("renew")}
                    checked={toggleView === "renew"}
                    className="peer h-4 w-4  md:h-6 md:w-6 cursor-pointer appearance-none rounded-full  border-[3px] md:border-[4px] dark:border-white  border-black dark:checked:border-white checked:border-black transition-all"
                    id="renew"
                  />
                  <span className="absolute dark:bg-white bg-black w-2 h-2 md:w-3 md:h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
              </div>
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-2 ms-2 text-[20px]  sm:text-2xl md:text-[32px]  text-textBlack font-medium  dark:text-white "
              >
                Renew
              </label>
            </div>
          </div>
          {isPopupLoading && (
            <div className="h-[470px] flex justify-center items-center">
              <RingLoadingIcon
                width={80}
                height={80}
                className="fill-black dark:fill-white w-8 h-8 "
              />
            </div>
          )}
          {toggleView === "repay" && !isPopupLoading && (
            <>
              <div className="w-full h-[67px]">
                {
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex w-full h-[60px] mb-2">
                      {[
                        {
                          label: "Maturity",
                          value: Number(
                            calculateRemainingDays(Number(position.validTill))
                          ),
                          days: Number(
                            calculateRemainingDays(Number(position.validTill))
                          ),
                          gradient:
                            "linear-gradient(to right, #08c8646e,#627EEA00)",
                          gradientText: "#0ea658",
                          percentLeftPx: "0px",
                          borderLeftPx: "0px",
                        },

                        {
                          label: "",
                          value:
                            (currentOptionFeeTimeLimit?.maxTimeLimit || 0) -
                            Number(
                              calculateRemainingDays(position.validTill) || 0
                            ),
                          gradient:
                            "linear-gradient(to right, #7a7a7a94, #FF527000)",
                          gradientText: "#7a7a7a",
                          percentLeftPx: "8px",
                          borderLeftPx: "0px",
                        },
                      ].map((metric, index, arr) => {
                        const total = 30;
                        const percentage = (metric.value / total) * 100 || 0;

                        return (
                          <div
                            key={index}
                            style={{
                              width: `${percentage}%`,
                            }}
                            className={` ${
                              index == 1 && "mr-1"
                            } relative h-full flex flex-col justify-end truncate`}
                          >
                            {index == 1 && (
                              <div
                                style={{
                                  height: "80%",
                                  background: metric.gradient,
                                }}
                              />
                            )}
                            <div
                              className="mx-[5px] truncate"
                              style={{
                                position: "absolute",
                                backgroundColor: "transparent",
                                color: metric.gradientText,
                                left: metric.percentLeftPx,
                              }}
                            >
                              {metric.days || metric.value} Days{" "}
                              {metric.label ? `(${metric.label})` : ""}
                            </div>

                            <div
                              style={{
                                position: "absolute",
                                height: "48px",
                                width: "2px",
                                backgroundColor: metric.gradientText,
                                left: metric.borderLeftPx,
                              }}
                            />

                            {index !== 1 && (
                              <div
                                style={{
                                  height: "80%",
                                  background: metric.gradient,
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                }
              </div>
              <div className="w-full  h-2 relative bg-gray-200 dark:bg-[#0D0D0D] rounded-none  flex overflow-hidden">
                {[
                  {
                    label: "days",
                    value: Number(
                      calculateRemainingDays(Number(position.validTill))
                    ),

                    color: "#05a552",
                  },

                  {
                    label: "maturity",
                    value:
                      (currentOptionFeeTimeLimit?.maxTimeLimit || 0) -
                      calculateRemainingDays(Number(position.validTill)),
                    color: "gray",
                  },
                ].map((metric, index, arr) => {
                  const total = arr.reduce((acc, item) => acc + item.value, 0);
                  const percentage = (metric.value / total) * 100;

                  return (
                    <div
                      key={index}
                      style={{
                        width: `${percentage}%`,
                        background: metric.color,
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between mb-3">
                <div className="flex mt-2 items-center gap-2 text-[14px] text-grayLight font-medium">
                  <span className="block w-3 h-3 bg-[#05A552]"></span>
                  {calculateRemainingDays(Number(position.validTill))} Days days
                  left until the hedge ends.
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon
                        className="w-5 text-lg h-5  "
                        width={24}
                        height={24}
                      />
                    </TooltipTrigger>
                    {
                      <TooltipContent className="bg-white w-[300px] text-black dark:text-white dark:bg-black">
                        <p>
                          Once the hedge ends, your position loses downside
                          protection. During the hedge, we cover only up to a
                          20% price drop. If the position isn’t closed within
                          the - 20% price range and the price drops to 20% or
                          reaches 100% LTV, it will be liquidated.
                        </p>
                      </TooltipContent>
                    }
                  </Tooltip>
                </div>
                <div className="flex mt-2 items-center gap-2 text-[14px] text-grayLight font-medium">
                  Hedge end at{" "}
                  {new Date(Number(position.validTill * 1000)).toLocaleString()}
                </div>
              </div>
              <div
                className={` space-y-3 mt-2  ${
                  position.status == BorrowStatus.WITHDREW
                    ? "h-[265px]"
                    : "h-[350px]"
                } overflow-auto no-scrollbar`}
              >
                {depositData.map((item) => (
                  <div
                    key={item.headline}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span
                      className={`text-grayLight items-center flex gap-1 text-[16px] md:text-[20px] font-medium ${item.titleColor}`}
                    >
                      {item.headline}
                      {item.tooltip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon
                              className="w-5 text-lg h-5  "
                              width={24}
                              height={24}
                            />
                          </TooltipTrigger>
                          {
                            <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                              <p>{item.tooltipText}</p>
                            </TooltipContent>
                          }
                        </Tooltip>
                      )}
                    </span>
                    <span
                      className={`text-textBlack font-medium text-[16px]  dark:text-white md:text-[20px] ${item.valueColor}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
                {repayAmountDetails.map((item) => (
                  <div
                    key={item.headline}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span className="text-grayLight text-[16px] md:text-[20px] font-medium">
                      {item.headline}
                    </span>
                    <span className="text-textBlack font-medium text-[16px]  dark:text-white md:text-[20px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className={`  ${
                  position.status == BorrowStatus.WITHDREW
                    ? position.status == BorrowStatus.WITHDREW &&
                      position.collateralType === "cbBTC"
                      ? "h-[130px]"
                      : "h-[150px]"
                    : "md:h-[70px] sm:h-[50px] h-[80px]"
                } mt-4 md:mt-4`}
              >
                {position.status == BorrowStatus.WITHDREW &&
                  position.collateralType !== "cbBTC" && (
                    <div className="sm:text-sm text-[10px] text-wrap text-center  dark:!text-[#ABFFDE] !text-[#30ad62] font-bold">
                      You can use your ABOND tokens to redeem your remaining 1/2
                      collateral. They are earning AAVE lending yields and
                      internal liquidation gains since your USDA+ mint.
                    </div>
                  )}
                {!repayLoading && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`flex items-center justify-center  gap-2 w-full  ${
                          position.status == BorrowStatus.WITHDREW
                            ? "mt-4"
                            : "h-full"
                        }`}
                      >
                        {position.status !== BorrowStatus.WITHDREW && (
                          <div className="w-[70%] relative">
                            <div className="h-[50px]">
                              <input
                                id="withdrawAmount"
                                name="withdrawAmount"
                                type="number"
                                min="0"
                                step="any"
                                className={`flex h-full w-full rounded-md border ${
                                  formik.touched.withdrawAmount &&
                                  formik.errors.withdrawAmount
                                    ? "border-red-500"
                                    : "border-grayLight"
                                } bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-grayLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                                placeholder="Enter amount"
                                value={formik.values.withdrawAmount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.touched.withdrawAmount &&
                            formik.errors.withdrawAmount ? (
                              <div className="absolute left-0 text-red-500 text-xs mt-1">
                                {formik.errors.withdrawAmount}
                              </div>
                            ) : null}
                          </div>
                        )}
                        <Button
                          disabled={
                            position.status == BorrowStatus.WITHDREW ||
                            isFunctionPausedBorrow_Withdraw ||
                            !hasFiveMinutesPassed(position?.depositedTime) ||
                            position.status == BorrowStatus.LIQUIDATED ||
                            !readyForNewTx
                          }
                          onClick={() => formik.handleSubmit()}
                          className={`  gap-0 flex flex-col justify-center  py-6 md:p-12 bg-black text-white text-[18px] md:text-[24px]  ${
                            position.status == BorrowStatus.WITHDREW
                              ? "md:p-4 h-auto w-full"
                              : "md:p-4 h-[50px] w-[30%]"
                          }`}
                        >
                          {repayLoading? (
                            <div className="flex flex-col items-center gap-2">
                              <Spinner color="#fff" />
                              
                            </div>
                          ) : position.status == BorrowStatus.DEPOSITED ? (
                            `Repay`
                          ) : position.status == BorrowStatus.LIQUIDATED ? (
                            `Liquidated ${parseFloat(
                              Number(position.depositedAmount).toFixed(6)
                            )} ${position.collateralType}`
                          ) : (
                            `Withdrawn ${parseFloat(
                              (
                                Number(position.depositedAmount) /
                                (position.collateralType === "cbBTC" ? 1 : 2)
                              ).toFixed(6)
                            )} ${position.collateralType}`
                          )}
                          {position.status == BorrowStatus.WITHDREW && (
                            <div className="sm:text-sm text-[10px] text-wrap">
                              (Final{" "}
                              {position.collateralType === "cbBTC"
                                ? "cbBTC"
                                : "ETH"}{" "}
                              amount may be lower due to option fees, 5% price
                              upside share, and conversion based on current{" "}
                              {position.collateralType === "cbBTC"
                                ? "cbBTC"
                                : "ETH"}
                              /USD value)
                            </div>
                          )}
                          {!hasFiveMinutesPassed(position?.depositedTime) && (
                            <div className="text-sm">
                              {`(Repay will active in ${
                                5 - getMinutesPassed(position?.depositedTime)
                              } min)`}
                            </div>
                          )}
                          <span className="text-base">
                            {isFunctionPausedBorrow_Withdraw && "(Paused)"}
                          </span>
                        </Button>
                      </div>
                    </TooltipTrigger>
                    {isFunctionPausedBorrow_Withdraw && (
                      <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                        <p>{"Repay is paused now"}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}
                {/* <LoadingBox
                  isLoading={isLoadingCumulativeLocal}
                  isFailure={cumulativeRateError || cumulativeRateErrorReceipt}
                  isSuccess={cumulativeRateReciptSuccess}
                  setSuccessLoading={() => console.log()}
                  heading="Calculating Interest "
                  loadingCount="1/3"
                /> */}
                <LoadingBox
                  isLoading={isApproveLoadingLocal}
                  isFailure={usdaApproveError || usdaHashError}
                  isSuccess={usdaHashSucces}
                  setSuccessLoading={() => console.log()}
                  heading="Approving USDA+"
                  loadingCount="1/2"
                />
                <LoadingBox
                  isLoading={withdrawLoadingLocal}
                  isFailure={borrowWithdrawError || withdrawErrorReceipt}
                  isSuccess={isSuccessWithdrawReceipt}
                  setSuccessLoading={() => console.log()}
                  heading="Withdrawing"
                  loadingCount="2/2"
                />
              </div>
            </>
          )}

          {/* Renew selection */}
          {toggleView === "renew" && !isPopupLoading && (
            <>
              <div className="w-full h-[67px]">
                {
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex w-full h-[60px] mb-2">
                      {[
                        {
                          label: "Maturity",
                          value: Number(
                            isRenewActive
                              ? calculateRemainingDays(
                                  Number(position.validTill)
                                )
                              : (currentOptionFeeTimeLimit?.maxTimeLimit || 0) -
                                  (currentOptionFeeTimeLimit?.minTimeLimit || 0)
                          ),
                          days: Number(
                            calculateRemainingDays(Number(position.validTill))
                          ),
                          gradient:
                            "linear-gradient(to right, #08c8646e,#627EEA00)",
                          gradientText: "#0ea658",
                          percentLeftPx: "0px",
                          borderLeftPx: "0px",
                        },
                        {
                          label: "Renew",
                          value: Number(
                            Number(
                              currentOptionFeeTimeLimit?.minTimeLimit || 0
                            ) -
                              (Number(
                                currentOptionFeeTimeLimit?.maxTimeLimit || 0
                              ) -
                                (calculateRemainingDays(position.validTill) +
                                  1 || 0))
                          ),
                          gradient:
                            "linear-gradient(to right, #386fe86e,#FF527000)",
                          gradientText: "#2563eb",
                          percentLeftPx: "0px",
                          borderLeftPx: "",
                          borderRightPx: "",
                        },

                        {
                          label: "",
                          value:
                            Number(
                              currentOptionFeeTimeLimit?.maxTimeLimit || 0
                            ) -
                            Number(
                              calculateRemainingDays(position.validTill) || 0
                            ),
                          gradient:
                            "linear-gradient(to right, #7a7a7a94, #FF527000)",
                          gradientText: "#7a7a7a",
                          percentLeftPx: "8px",
                          borderLeftPx: "0px",
                        },
                      ].map((metric, index, arr) => {
                        const total = 30;
                        const percentage = (metric.value / total) * 100 || 0;

                        return (
                          <div
                            key={index}
                            style={{
                              width: `${percentage}%`,
                            }}
                            className={` ${
                              index == 1 && "mr-1"
                            } relative h-full flex flex-col justify-end truncate`}
                          >
                            {index == 1 && (
                              <div
                                style={{
                                  height: "80%",
                                  background: metric.gradient,
                                }}
                              />
                            )}
                            <div
                              className="mx-[5px] truncate"
                              style={{
                                position: "absolute",
                                backgroundColor: "transparent",
                                color: metric.gradientText,
                                left: metric.percentLeftPx,
                                right: metric.borderRightPx,
                              }}
                            >
                              {metric.days || metric.value} Days{" "}
                              {metric.label ? `(${metric.label})` : ""}
                            </div>

                            <div
                              style={{
                                position: "absolute",
                                height: "48px",
                                width: "2px",
                                backgroundColor: metric.gradientText,
                                left: metric.borderLeftPx,
                                right: metric.borderRightPx,
                              }}
                            />

                            {index !== 1 && (
                              <div
                                style={{
                                  height: "80%",
                                  background: metric.gradient,
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                }
              </div>
              <div className="w-full  h-2 relative bg-gray-200 dark:bg-[#0D0D0D] rounded-none  flex overflow-hidden">
                {[
                  {
                    label: "days",
                    value: Number(
                      isRenewActive
                        ? calculateRemainingDays(Number(position.validTill))
                        : (currentOptionFeeTimeLimit?.maxTimeLimit || 0) -
                            (currentOptionFeeTimeLimit?.minTimeLimit || 0)
                    ),

                    color: "#05a552",
                  },
                  {
                    label: "repay",
                    value: Number(
                      Number(currentOptionFeeTimeLimit?.minTimeLimit || 0) -
                        (Number(currentOptionFeeTimeLimit?.maxTimeLimit || 0) -
                          (calculateRemainingDays(position.validTill) + 1 || 0))
                    ),
                    color: isRenewActive ? "#2563eb" : "#05a552",
                  },
                  {
                    label: "maturity",
                    value:
                      Number(currentOptionFeeTimeLimit?.maxTimeLimit || 0) -
                      calculateRemainingDays(Number(position.validTill)), // 28 ,
                    color: "gray",
                  },
                ].map((metric, index, arr) => {
                  const total = arr.reduce((acc, item) => acc + item.value, 0);
                  const percentage = (metric.value / total) * 100;

                  return (
                    <div
                      key={index}
                      style={{
                        width: `${percentage}%`,
                        background: metric.color,
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex gap-8 mb-3">
                <div className="flex mt-2 items-center gap-2 text-[14px] text-grayLight font-medium">
                  <span className="block w-3 h-3 bg-[#05A552]"></span>
                  {calculateRemainingDays(Number(position.validTill))} Days
                  remaining till maturity
                </div>
                {Number(
                  Number(currentOptionFeeTimeLimit?.minTimeLimit || 0) -
                    (Number(currentOptionFeeTimeLimit?.maxTimeLimit || 0) -
                      (calculateRemainingDays(position.validTill) + 1 || 0))
                ) > 0 && (
                  <div className="flex mt-2 items-center gap-2 text-[14px] text-grayLight font-medium">
                    <span className="block w-3 h-3 bg-blue-600"></span>
                    {Number(
                      Number(currentOptionFeeTimeLimit?.minTimeLimit || 0) -
                        (Number(currentOptionFeeTimeLimit?.maxTimeLimit || 0) -
                          (calculateRemainingDays(position.validTill) + 1 || 0))
                    )}{" "}
                    Days remaining to activate renew
                  </div>
                )}
              </div>
              <div className="max-h-[280px] overflow-auto no-scrollbar">
                <div className="space-y-2 mt-4">
                  {[
                    {
                      heading: `${
                        position?.collateralType === "cbBTC" ? "cbBTC" : "ETH"
                      } price at deposit`,
                      value: `$${Number(
                        formatUnits(BigInt(position?.ethPrice || 0), 2)
                      )}`,
                    },
                    {
                      heading: `Current ${
                        position?.collateralType === "cbBTC" ? "cbBTC" : "ETH"
                      } price`,
                      value: `$${formatUnits(BigInt(ethPrice), 2)}`,
                    },
                    {
                      heading: "Downside Protection till now",

                      value: "$" + downsideProtection.toFixed(2),
                    },
                    {
                      heading: "Option Fees paid",
                      value: `$${Number(position?.optionFees).toFixed(2)}`,
                    },
                  ].map((item) => (
                    <div
                      key={item.heading}
                      className="flex justify-between font-medium"
                    >
                      <span className="text-grayLight text-[20px]">
                        {item.heading}
                      </span>
                      <span className="text-textBlack dark:text-white text-[20px]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="font-semibold dark:text-white text-textBlack text-[28px]">
                    For Renewed
                  </div>

                  {[
                    {
                      label: "Time Period",
                      value: `${
                        currentOptionFeeTimeLimit?.maxTimeLimit || 0
                      } Days`,
                    },
                    {
                      label: "Option Fees",
                      //  value: isRenewActiveDaysCompleted(position.validTill)
                      //     ? `${formatUnits(
                      //     BigInt(payableOptionFees || 0),
                      //     6
                      //   )}`
                      //    : "-",
                      value: `$${formatUnits(
                        BigInt((Number(payableOptionFees) as number) || 0),
                        6
                      )}`,
                    },
                    {
                      label: "Downside Protection",
                      value: `Up to $${(
                        (Number(formatUnits(BigInt(position.ethPrice), 2)) *
                          Number(position?.depositedAmountInETH) *
                          20) /
                        100
                      ).toFixed(2)} (20%)`,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between font-medium "
                    >
                      <span className="text-[20px] text-grayLight">
                        {item.label}
                      </span>
                      <span className="text-textBlack dark:text-white text-[20px]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" h-[50px] md:h-[70px] mt-4 md:mt-6 overflow-hidden ">
                {!renewLoading && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="h-full">
                        <Button
                          disabled={
                            position.status == BorrowStatus.WITHDREW ||
                            position.status == BorrowStatus.LIQUIDATED ||
                            isFunctionPausedBorrow_Renew ||
                            calculateRemainingDays(
                              Number(position.validTill)
                            ) <= 0 ||
                            !isRenewActive ||
                            !readyForNewTx
                          }
                          onClick={handleRenew}
                          className="w-full   p-8 bg-black text-white text-[32px]"
                        >
                          {"Renew"}{" "}
                          <span className="text-base mt-1">
                            {isFunctionPausedBorrow_Renew && "(Paused)"}
                          </span>
                        </Button>
                      </div>
                    </TooltipTrigger>
                    {isFunctionPausedBorrow_Renew && (
                      <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                        <p>{"Renew is paused now"}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}

                <LoadingBox
                  isLoading={renewApproveLoading}
                  isFailure={usdtApproveError || usdtHashError}
                  isSuccess={usdtHashSucces}
                  setSuccessLoading={() => console.log()}
                  heading="Approving USDT"
                  loadingCount="1/2"
                />

                <LoadingBox
                  isLoading={renewLoadingSM}
                  isFailure={renewReceiptError || renewErrorSm}
                  isSuccess={isSuccessRenewReceipt}
                  setSuccessLoading={() => console.log()}
                  heading="Renewing"
                  loadingCount="2/2"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
