import {
  borrowAssetsAddress,
  borrowingContractAddress,
  borrowingWithdrawContractAddress,
  cdsAddress,
  testusdtAbiAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import useGetBorrowWithdrawSignedData from "@/hookes/api-hooks/useGetBorrowWithdrawSignedData";
import useInterestGain from "@/hookes/api-hooks/useInterateGain";
import useApproveUsda from "@/hookes/contract-hooks/useApproveUsda";
import useCalculateInterest from "@/hookes/contract-hooks/useCalculateInterest";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useLastCumulativeRate from "@/hookes/contract-hooks/useGetLastCumulativeRate";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import { useWithdrawUsda } from "@/hookes/contract-hooks/useWithdrawUsda";
import { BorrowStatus, NetworkId } from "@/utils/constants";
import displayNumberWithPrecision, {
  calculateRemainingDays,
  getDownsideProtectionTillNow,
  getMinutesPassed,
  hasFiveMinutesPassed,
  isFifteenDaysCompleted,
} from "@/utils/helpers";
import { PositionData } from "@/utils/interface";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import LoadingBox from "../LoadingBox";
import PopupDropdown from "../PopupDropdown";
import ToastNotification from "../toasts/ToastNotification";
import ToastNotificationError from "../toasts/ToastNotificationError";
import { usePayableOptionFees } from "@/hookes/contract-hooks/usePayableOptionFees";
import useBorrowRenew from "@/hookes/contract-hooks/useBorrowRenew";
import { formatUnits, zeroAddress } from "viem";
import useGetBalance from "@/hookes/contract-hooks/useGetBalance";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import useBorrowPause from "@/hookes/contract-hooks/useBorrowPause";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Network } from "ethers";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { InfoIcon } from "lucide-react";
import { usDaAbi } from "@/blockchain/abis/usda";
import PageLoader from "../page-loader";
import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_API_URL, scanUrls } from "@/utils/urls";
import { useLayerZeroMessages } from "@/hookes/contract-hooks/useLayerZeroMessages";
import Spinner from "@/design-systems/atoms/Spinner";
import useMasterPriceOracle from "@/hookes/contract-hooks/useMasterPriceOracle";
import useUsdtApprove from "@/hookes/contract-hooks/useApproveUsdt";
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
  console.log(indexPoint, "indexPoint");
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
      headline: "Liquidated?",
      value: "No",
      tooltip: false,
      tooltipText: "",
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

  const [depositData, setDepositData] = useState(depositDetails);

  const { isLastCumulativeRatePending, lastCumulativeRate } =
    useLastCumulativeRate();

  // interest gain from backend
  const { interestGained, isInterestGainedPending } = useInterestGain(
    position.index
  );

  const { usdValue: ethPrice, isUsdValuePending } = useGetUsdValue(
    borrowAssetsAddress["ETH" as keyof typeof borrowAssetsAddress]
  );
  console.log(ethPrice, "ethPrice");

  const [amountProtected, setAmountProtected] = useState<number>(0);
  const [amountView, setAmountView] = useState(false);
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
  const [repayLoading, setRepayLoading] = useState<boolean>(false);
  const { balanceString: usdaBalance, balance } = useGetBalance("USDa");

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
  });

  // if position withdrawn using withdrawn time eth price as current eth price else using
  // current eth price
  const currentEthPrice =
    position.status == BorrowStatus.DEPOSITED
      ? ethPrice || 0
      : position.ethPriceAtWithdraw || 0;

  // if current eth price is greater than deposit time eth price dp will be zero
  const downsideProtection =
    position.status == BorrowStatus.LIQUIDATED || calculateRemainingDays(
      Number(position.validTill)
    ) <= 0
      ? 0
      : (currentEthPrice || 0) < (position?.ethPrice || 0)
      ? Number(formatUnits(BigInt(position?.ethPrice || 0), 2)) *
          Number(position?.depositedAmountInETH) -
        Number(formatUnits(BigInt(currentEthPrice), 2)) *
          Number(position?.depositedAmountInETH)
      : 0;

  // fetching allowance of usda for repay
  const { data: allowance, isLoading: isAllowancePending } = useReadContract({
    abi: usDaAbi,
    address: usDaAddress[chainId as keyof typeof usDaAddress],
    functionName: "allowance",
    args: [
      address || zeroAddress,
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    ],
  }) as { data: number | undefined; isLoading: boolean };
  // usda amount multiply by cumulative rate
  const totalUsdaAmntWithCumulativeRate =
    lastCumulativeRate === undefined
      ? BigInt(Number(position?.normalizedAmount || 0) * 10 ** 6)
      : BigInt(
          BigInt(
            Math.round(
              position.normalizedAmount
                ? Number(position?.normalizedAmount || 0) * 10 ** 6
                : 0
            )
          ) * lastCumulativeRate
        ) / BigInt(10 ** 27);

  // updating repay amount according to status
  const repayAmount =
    position.status == BorrowStatus.DEPOSITED
      ? Number(totalUsdaAmntWithCumulativeRate) / 1e6 -
        Number(downsideProtection)
      : // Number(position?.optionFees)
        Number(position.totalDebtAmount) - Number(downsideProtection);
  // Number(position?.optionFees);

  // getting current APR value
  const { data: currentAPR, isLoading: isCurrentAPRPending } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getAPR",
  });

  function handleDepositData() {
    setIsDataUpdating(true);
    // Calculate the totalUsdaAmntWithCumulativeRate
    if (position && lastCumulativeRate) {
      // If details are available, update each value in the depositData array
      const updatedData = [...depositData];
      updatedData[0].headline = `${position.collateralType} Deposited`;
      // set deposited amount
      updatedData[0].value = `${Number(position.depositedAmount).toFixed(4)} ${
        position.collateralType
      }`;
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
      // check is position is liquidated or not
      updatedData[9].value = position.status === "LIQUIDATED" ? "Yes" : "No";
      // set interest gain
      updatedData[10].value =
        interestGained != undefined && position.status == BorrowStatus.WITHDREW
          ? `$${Number(interestGained || 0).toFixed(2)}`
          : "-";
      updatedData[11].value = position.noOfAbondMinted
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
      updatedData[11].value = "-";

      setDepositData(updatedData);
    }
  }

  // repay amount details for showing in popup
  const repayAmountDetails = [
    {
      headline: "USDA+ Amount Minted",
      value: `${Number(position.noOfUSDaMinted).toFixed(2)} USDA+`,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Total Interest",
      value: `$${
        Number(totalUsdaAmntWithCumulativeRate) / 10 ** 6 <
        Number(position.noOfUSDaMinted) || position.status === BorrowStatus.LIQUIDATED
          ? 0
          : position.status === BorrowStatus.DEPOSITED
          ? // if position withdrawn using totalDebtAmount else total usda with cumulative
            (
              Number(totalUsdaAmntWithCumulativeRate) / 10 ** 6 -
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
      headline: "Downside Protection till now",
      value: `$${downsideProtection.toFixed(2)}`,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Repay amount",
      value: `$${repayAmount.toFixed(2)}`,
      tooltip: false,
      tooltipText: "",
    },
  ];

  console.log(repayAmountDetails, "repayMountDetails");

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
  } = useGetGlobalQuote(options, 3, 1);

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

  console.log(
    lastCumulativeRate,
    position.normalizedAmount,
    "lastCumulativeRate"
  );

  const handleRepay = async () => {
    if (balance < repayAmount) {
      toast.error("You don't have enough USDa to repay");
      return;
    }
    setRepayLoading(true);
    setOpenConfirmNotice(false);
    // cumulativeReset?.();
    approveReset?.();
    borrowReset?.();
    const approveRepayAmount = BigInt(Math.round((repayAmount + 0.001) * 1e6));
    if (
      position.status === "DEPOSITED"
      // BigInt(allowance || 0) < approveRepayAmount
    ) {
      setIsApproveLoadingLocal(true);
      approveUsda(approveRepayAmount);
    }
    // else {
    //   callRepayInContract();
    // }
  };

  const callRepayInContract = async () => {
    setIsApproveLoadingLocal(false);
    setTimeout(() => {
      setWithdrawLoadingLocal(true);
    }, 800);

    const borrowSignedData = await refetchBorrowWithDrawSignedData();

    withdrawUsda(
      position.index,
      nativeFee?.nativeFee || BigInt(0n),
      borrowSignedData?.odosAssembledData,
      borrowSignedData?.usdtFromOdos,
      BigInt(borrowSignedData?.nonce || 0),
      BigInt(borrowSignedData?.deadline || 0),
      (borrowSignedData?.signature || "") as `0x${string}`
    );
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
      setTimeout(() => {
        setRenewLoading(false);
      }, 800);
      setRenewApproveLoading(false);
      setRenewLoadingSM(false);
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

          const borrowSignedData = await refetchBorrowWithDrawSignedData();

          withdrawUsda(
            position.index,
            nativeFee?.nativeFee || BigInt(0n),
            borrowSignedData?.odosAssembledData,
            borrowSignedData?.usdtFromOdos,
            BigInt(borrowSignedData?.nonce || 0),
            BigInt(borrowSignedData?.deadline || 0),
            (borrowSignedData?.signature || "") as `0x${string}`
          );
        }
        if (toggleView == "renew") {
          setRenewApproveLoading(false);
          setTimeout(() => {
            setRenewLoadingSM(true);
          }, 800);

          renewBorrow(
            BigInt(position.index),
            nativeFee?.nativeFee || BigInt(0n)
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
    } else if (renewReceiptError) {
      setRenewLoading(false);
      setRenewApproveLoading(false);
      setRenewLoadingSM(false);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
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
  };

  const { payableOptionFees } = usePayableOptionFees(position.index);

  const { getOraclePrice } = useMasterPriceOracle(
    testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
  );



  const handleRenew = () => {
    setRenewLoading(true);

    resetUsdtApprove?.();
    resetBorrowRenew?.();

    const renewAmount = BigInt(
      Number(
        Number(payableOptionFees || 0) /
          Number(BigInt(getOraclePrice[0]) / BigInt(1e18)) || 0
      ) + 1e6
    );

    if ((allowance || 0) < renewAmount) {
      setRenewApproveLoading(true);
      handleUsdtApprove([
        borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
        ] as `0x${string}`,
        renewAmount,
      ]);
    } else {
      callRenewInContract();
    }
  };

  const callRenewInContract = () => {
    setRenewApproveLoading(false);
    setTimeout(() => {
      setRenewLoadingSM(true);
    }, 800);

    renewBorrow(BigInt(position.index), nativeFee?.nativeFee || BigInt(0n));
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

  // fetching layer zero transaction data to add loading state to user to initiate transaction
  const { readyForNewTx } = useLayerZeroMessages();

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
              <div className="space-y-3 mt-2  h-[350px] overflow-auto no-scrollbar">
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
                className={` h-[50px] ${
                  position.status == BorrowStatus.WITHDREW
                    ? "md:h-[150px]"
                    : "md:h-[70px]"
                } mt-4 md:mt-4`}
              >
                {position.status == BorrowStatus.WITHDREW && (
                  <div className="text-sm text-wrap text-center  dark:!text-[#ABFFDE] !text-[#30ad62] font-bold">
                    You can use your ABOND tokens to redeem your remaining 1/2
                    collateral. They are earning AAVE lending yields and
                    internal liquidation gains since your USDA+ mint.
                  </div>
                )}
                {!repayLoading && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className=" mt-4">
                        <Button
                          disabled={
                            position.status == BorrowStatus.WITHDREW ||
                            isFunctionPausedBorrow_Withdraw ||
                            !hasFiveMinutesPassed(position?.depositedTime) ||
                            position.status == BorrowStatus.LIQUIDATED ||
                            !readyForNewTx
                          }
                          onClick={handleRepay}
                          className={`w-full  gap-0 flex flex-col justify-center  py-6 md:p-12 bg-black text-white text-[18px] md:text-[24px] ${
                            position.status == BorrowStatus.WITHDREW
                              ? "md:p-12"
                              : "md:p-8"
                          }`}
                        >
                          <div>
                            {repayLoading ||
                            (!readyForNewTx &&
                              position.status !== BorrowStatus.WITHDREW &&
                              position.status !== BorrowStatus.LIQUIDATED) ? (
                              <div className="flex flex-col items-center gap-2">
                                <Spinner color="#fff" />
                                {!readyForNewTx && (
                                  <p className="text-[14px]">
                                    Updating data on other chain
                                  </p>
                                )}
                              </div>
                            ) : position.status == BorrowStatus.DEPOSITED ? (
                              `Repay amount ${repayAmount.toFixed(2)} USDA+`
                            ) : position.status == BorrowStatus.LIQUIDATED ? (
                              `Liquidated ${parseFloat(
                                Number(position.depositedAmount).toFixed(6)
                              )} ${position.collateralType}`
                            ) : (
                              `Withdrawn ${parseFloat(
                                (Number(position.depositedAmount) / 2).toFixed(
                                  6
                                )
                              )} ${position.collateralType}`
                            )}{" "}
                          </div>
                          {position.status == BorrowStatus.WITHDREW && (
                            <div className="text-sm text-wrap">
                              (Final ETH amount may be lower due to option fees,
                              5% price upside share, and conversion based on
                              current ETH/USD value){" "}
                            </div>
                          )}
                          {!hasFiveMinutesPassed(position?.depositedTime) && (
                            <div className="text-sm">
                              {`(Repay will active in ${
                                5 - getMinutesPassed(position?.depositedTime)
                              } min)`}{" "}
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
                            isFifteenDaysCompleted(
                              position.validTill,
                              Number(optionsFeesTimeLimits?.[0]) / 86400
                            )
                              ? calculateRemainingDays(
                                  Number(position.validTill)
                                )
                              : 15
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
                          value:
                            Number(
                              calculateRemainingDays(position.validTill) || 0
                            ) - 15,
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
                            30 -
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
                      isFifteenDaysCompleted(
                        position.validTill,
                        Number(optionsFeesTimeLimits?.[0]) / 86400
                      )
                        ? calculateRemainingDays(Number(position.validTill))
                        : 15
                    ),

                    color: "#05a552",
                  },
                  {
                    label: "repay",
                    value:
                      Number(calculateRemainingDays(position.validTill) || 0) -
                      15,
                    color: !isFifteenDaysCompleted(
                      position.validTill,
                      Number(optionsFeesTimeLimits?.[0]) / 86400
                    )
                      ? "#2563eb"
                      : "#05a552",
                  },
                  {
                    label: "maturity",
                    value:
                      30 - calculateRemainingDays(Number(position.validTill)), // 28 ,
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
                {calculateRemainingDays(Number(position.validTill)) > 15 && (
                  <div className="flex mt-2 items-center gap-2 text-[14px] text-grayLight font-medium">
                    <span className="block w-3 h-3 bg-blue-600"></span>
                    {calculateRemainingDays(Number(position.validTill)) -
                      15}{" "}
                    Days remaining to activate renew
                  </div>
                )}
              </div>
              <div className="max-h-[280px] overflow-auto no-scrollbar">
                <div className="space-y-2 mt-4">
                  {[
                    {
                      heading: "ETH price at deposit",
                      value: `$${Number(
                        formatUnits(BigInt(position?.ethPrice || 0), 2)
                      )}`,
                    },
                    {
                      heading: "Current ETH price",
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
                    { label: "Time Period", value: "30 days" },
                    {
                      label: "Option Fees",
                      //  value: isFifteenDaysCompleted(position.validTill)
                      //     ? `${formatUnits(
                      //     BigInt(payableOptionFees || 0),
                      //     6
                      //   )}`
                      //    : "-",
                      value: `${formatUnits(
                        BigInt(payableOptionFees || 0),
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
              <div className=" h-[50px] md:h-[70px] mt-4 md:mt-6 ">
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
                            !isFifteenDaysCompleted(
                              position.validTill,
                              Number(optionsFeesTimeLimits?.[0]) / 86400
                            ) ||
                            !readyForNewTx
                          }
                          onClick={handleRenew}
                          className="w-full   p-8 bg-black text-white text-[32px]"
                        >
                          {position.status !== BorrowStatus.WITHDREW &&
                          position.status !== BorrowStatus.LIQUIDATED &&
                          !readyForNewTx ? (
                            <div className="flex flex-col items-center gap-2">
                              <Spinner color="#fff" />
                              {readyForNewTx && (
                                <p className="text-[14px]">
                                  Updating data on other chain
                                </p>
                              )}
                            </div>
                          ) : (
                            "Renew"
                          )}{" "}
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
