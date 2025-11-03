import { usDaAbi } from "@/blockchain/abis/usda";
import {
  borrowAssetsAddress,
  nativeTokenAddress,
  testusdtAbiAddress,
  treasuryAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import { Label } from "@/design-systems/atoms/label";
import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Typography } from "@/design-systems/atoms/Typography";
import { TransactionParams } from "@/design-systems/templates/bridge/interfaces";
import useCalculateWithdrawAmount from "@/hookes/api-hooks/useCalculateBackendWithdraw";
import useGetAPY from "@/hookes/api-hooks/useGetAPY";
import useGetDcdsWithdrawSignedData from "@/hookes/api-hooks/useGetDcdsWithdrawSignedData";
import useInterestGain from "@/hookes/api-hooks/useInterateGain";
import useCdsPause from "@/hookes/contract-hooks/useCdsPause";
import useDcdsWithdraw from "@/hookes/contract-hooks/useDcdsWithdraw";
import useDcdsWithdrawGain from "@/hookes/contract-hooks/useDcdsWithdrawGain";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useLastCumulativeRate from "@/hookes/contract-hooks/useGetLastCumulativeRate";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import useTokenDetails from "@/hookes/contract-hooks/useTokenDetails";
import { eId, NetworkId } from "@/utils/constants";
import {
  calculateTimeDifference,
  hasDaysPassed,
  toPositiveDecimalString,
} from "@/utils/helpers";
import { dcdsDepositDetails } from "@/utils/interface";
import { BACKEND_API_URL, scanUrls } from "@/utils/urls";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CornerDownRight, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import LoadingBox from "../LoadingBox";
import ToastNotification from "../toasts/ToastNotification";
import ToastNotificationError from "../toasts/ToastNotificationError";
import Image from "next/image";
import opIconNew from "@/app/assets/op.svg";
import baseIconNew from "@/app/assets/op-blue.svg";
import { useLayerZeroMessages } from "@/hookes/contract-hooks/useLayerZeroMessages";
import { padHex } from "viem";

export function DcdsWithdrawModal({
  position,
  isDialogOpen,
  setIsDialogOpen,
  dcdsPositionListRefetch,
}: {
  position: dcdsDepositDetails;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  dcdsPositionListRefetch: () => void;
}) {
  const [spinner, setSpinner] = useState(false);

  const { address, chainId } = useAccount();

  const [view, setView] = useState<"withdraw" | "rebalance">("withdraw");

  const [showAPYTooltip, setShowAPYTooltip] = useState(false);

  const { data: indexPoint, isLoading: isIndexPointLoading } = useQuery({
    queryKey: ["getPointEarned", address, chainId, position.index],
    queryFn: async () => {
      const response = await axios.post(`${BACKEND_API_URL}/cds/deposit`, {
        chainId,
        address,
        index: position.index,
      });
      return response.data;
    },
    enabled: !!address && !!chainId && !!position.index,
  });

  // kept this inside because every row is going to have different state
  const depositDetails = [
    {
      headline: "USDA+ Deposited",
      value: "0",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "USDT Deposited",
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
      headline: "Deposit Time",
      value: "0",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Lock In Period",
      value: "0 days",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Days Passed Since Deposit",
      value: "0 days",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Hedge Asset",
      value: "ETH",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Yields till now",
      value: "0%",
      tooltip: false,
      tooltipText: "APY of the index",
    },
    {
      headline: "Yearly APY",
      value: "Yes",
      tooltip: true,
      tooltipText:
        "These yields are highly fluctuating based on annualized estimates derived from irregular option fees returns",
    },
    {
      headline: "Opted for liquidations",
      value: "Yes",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Liquidated Collateral Value",
      value: "Yes",
      tooltip: false,
      tooltipText: "",
    },
  ];

  // getting cds pause data
  const { isFunctionPausedCDS_Withdraw } = useCdsPause();

  // getting mode token status
  const {
    assetDetails: assetDetailsMode,
    isTokenDepositPaused: isTokenDepositPausedMode,
    isTokenDepositWithdrawPaused: isTokenDepositWithdrawPausedMode,
    isTokenDepositWithdrawUnpaused: isTokenDepositWithdrawUnpausedMode,
    isTokenWithdrawPaused: isTokenWithdrawPausedMode,
    refetchCurrentData: refetchCurrentDataMode,
  } = useTokenDetails(nativeTokenAddress[NetworkId.BaseSepolia]);

  // checking all pause variable for mode
  const isMODEPauseInAllStatus =
    (isTokenWithdrawPausedMode ||
      isTokenDepositWithdrawPausedMode ||
      isFunctionPausedCDS_Withdraw) &&
    Boolean(position.depositedAmounts?.nativeToken);

  // getting op token status
  const {
    assetDetails: assetDetailsOP,
    isTokenDepositPaused: isTokenDepositPausedOP,
    isTokenDepositWithdrawPaused: isTokenDepositWithdrawPausedOP,
    isTokenDepositWithdrawUnpaused: isTokenDepositWithdrawUnpausedOP,
    isTokenWithdrawPaused: isTokenWithdrawPausedOP,
    refetchCurrentData: refetchCurrentDataOP,
  } = useTokenDetails(nativeTokenAddress[NetworkId.BaseSepolia]);

  // checking  all pause variable for OP
  const isOPPauseInAllStatus =
    (isTokenWithdrawPausedOP ||
      isTokenDepositWithdrawPausedOP ||
      isFunctionPausedCDS_Withdraw) &&
    Boolean(position.depositedAmounts?.nativeToken);

  // getting usda token status
  const {
    assetDetails: assetDetailsUSDa,
    isTokenDepositPaused: isTokenDepositPausedUSDa,
    isTokenDepositWithdrawPaused: isTokenDepositWithdrawPausedUSDa,
    isTokenDepositWithdrawUnpaused: isTokenDepositWithdrawUnpausedUSDa,
    isTokenWithdrawPaused: isTokenWithdrawPausedUSDa,
    refetchCurrentData: refetchCurrentDataUSDa,
  } = useTokenDetails(usDaAddress[chainId as keyof typeof usDaAddress]);

  // checking all pause variable for usda
  const isUSDaPauseInAllStatus =
    (isTokenWithdrawPausedUSDa ||
      isTokenDepositWithdrawPausedUSDa ||
      isFunctionPausedCDS_Withdraw) &&
    Boolean(position.depositedAmounts?.usda);

  // getting mode token usdt
  const {
    assetDetails: assetDetailsUSDT,
    isTokenDepositPaused: isTokenDepositPausedUSDT,
    isTokenDepositWithdrawPaused: isTokenDepositWithdrawPausedUSDT,
    isTokenDepositWithdrawUnpaused: isTokenDepositWithdrawUnpausedUSDT,
    isTokenWithdrawPaused: isTokenWithdrawPausedUSDT,
    refetchCurrentData: refetchCurrentDataUSDT,
  } = useTokenDetails(
    testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
  );

  // checking all pause variable for usdt
  const isUSDTPauseInAllStatus =
    (isTokenWithdrawPausedUSDT ||
      isTokenDepositWithdrawPausedUSDT ||
      isFunctionPausedCDS_Withdraw) &&
    Boolean(position.depositedAmounts?.usda);

  // checking all asset pause or not
  const isWithdrawPause =
    isMODEPauseInAllStatus ||
    isOPPauseInAllStatus ||
    isUSDaPauseInAllStatus ||
    isUSDTPauseInAllStatus;

  // new details for withdraw modal
  const NewDetails = [
    {
      // Token deposited
      headline: `${
        Number(NetworkId.BaseSepolia) == chainId ? "AERO" : "OP"
      } Tokens deposited`,
      value: Number(position?.depositedAmounts?.nativeToken)
        ? `${Number(position?.depositedAmounts?.nativeToken).toFixed(2)} ($${(
            Number(position?.depositedAmounts?.nativeToken) *
            Number(position?.nativeTokenPriceAtDeposit)
          ).toFixed(2)})`
        : null,
      tooltip: false,
      tooltipText: "",
      comment: "Will be converted to USDT at 30% price fall",
    },
    {
      // Adjusted Deposit Value (Discounted by 30%)
      headline: `${
        Number(NetworkId.BaseSepolia) == chainId ? "AERO" : "OP"
      } Adjusted Deposit Value (Discounted by 30%)`,
      value: Number(position?.depositedAmounts?.nativeToken)
        ? `$${(
            (Number(position?.depositedAmounts?.nativeToken) *
              Number(position?.nativeTokenPriceAtDeposit) *
              70) /
            100
          ).toFixed(2)}`
        : null,
      tooltip: true,
      tooltipText:
        "After factoring in volatility, the token is deposited at 30% lower value",
    },
    {
      // Token Price at Deposit
      headline: `${
        Number(NetworkId.BaseSepolia) == chainId ? "AERO" : "OP"
      } Token Price at Deposit`,
      value: Number(position?.nativeTokenPriceAtDeposit)
        ? Number(position?.nativeTokenPriceAtDeposit).toFixed(4)
        : null,
      tooltip: false,
      tooltipText: "",
    },
    {
      // Token deposited
      headline: `Bold Tokens deposited`,
      value: Number(position?.depositedAmounts?.boldToken || 0)
        ? `${Number(position?.depositedAmounts?.boldToken || 0).toFixed(
            2
          )} ($${(
            Number(position?.depositedAmounts?.boldToken || 0) *
            Number(position?.boldPriceAtDeposit)
          ).toFixed(2)})`
        : null,
      tooltip: false,
      tooltipText: "",
      comment: "",
    },
    {
      // Token Price at Deposit
      headline: `Bold Token Price at Deposit`,
      value: Number(position?.boldPriceAtDeposit)
        ? Number(position?.boldPriceAtDeposit).toFixed(4)
        : null,
      tooltip: false,
      tooltipText: "",
    },
    {
      // Token deposited
      headline: `USDC Tokens deposited`,
      value: Number(position?.depositedAmounts?.usdc || 0)
        ? `${Number(position?.depositedAmounts?.usdc || 0).toFixed(2)} ($${(
            Number(position?.depositedAmounts?.usdc || 0) *
            Number(position?.usdcPriceAtDeposit)
          ).toFixed(2)})`
        : null,
      tooltip: false,
      tooltipText: "",
      comment: "",
    },
    // {
    //   // Token Price at Deposit
    //   headline: `USDC Token Price at Deposit`,
    //   value: Number(position?.usdcPriceAtDeposit)
    //     ? Number(position?.usdcPriceAtDeposit).toFixed(4)
    //     : null,
    //   tooltip: false,
    //   tooltipText: "",
    // },
    {
      // Token deposited
      headline: `wmUSD Tokens deposited`,
      value: Number(position?.depositedAmounts?.wmUSD || 0)
        ? `${Number(position?.depositedAmounts?.wmUSD || 0).toFixed(2)} ($${(
            Number(position?.depositedAmounts?.wmUSD || 0) *
            Number(position?.wmUSDPriceAtDeposit)
          ).toFixed(2)})`
        : null,
      tooltip: false,
      tooltipText: "",
      comment: "",
    },
    // {
    //   headline: `${
    //     Number(NetworkId.Mode) == chainId ? "Mode" : "OP"
    //   } Token Liquidation Price`,
    //   value: position?.liquidationPrice,
    //   tooltip: false,
    //   tooltipText: "",
    // },
    // {
    //   headline: `Total Extended Indexes`,
    //   value: 0,
    //   tooltip: false,
    //   tooltipText: "",
    // },
  ];

  // rebalance details for withdraw modal
  const rebalanceDetails = [
    {
      headline: `Token Deposited`,
      value: "Mode",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: `Token Price and Deposit`,
      value: 0,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: `Amount Deposited`,
      value: 0,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: `Current Value`,
      value: 0,
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: `Change in Value`,
      value: "0",
      tooltip: false,
      tooltipText: `${
        Number(NetworkId.BaseSepolia) == chainId ? "AERO" : "OP"
      } Status`,
    },
  ];

  const [depositData, setDepositData] = useState(depositDetails);

  const { isLastCumulativeRatePending, lastCumulativeRate } =
    useLastCumulativeRate(position.collateralType);

  // getting interest gained
  const { interestGained } = useInterestGain(position.index);

  // getting eth price
  const { usdValue: ethPrice } = useGetUsdValue(borrowAssetsAddress["ETH"]);

  // open confirm notice
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);

  const [dcdsFundWithdrawLoadingLocal, setDcdsFundWithdrawLoadingLocal] =
    useState<boolean>(false);
  const [withdrawMethodLoading, setWithdrawMethodLoading] =
    useState<boolean>(false);

  // withdraw gain loading
  const [withdrawGainLoading, setWithdrawGainLoading] =
    useState<boolean>(false);

  /**
   * Updates the deposit data based on the provided details.
   * If the details are available, it updates each value in the depositData array.
   * If the details are not available, it sets each value in the depositData array to '-'.
   */

  // getting apy of index
  const { apy, isLoadingAPY } = useGetAPY(position.index);
  // Post api function for calculate withdraw amount
  const { calculateBackendWithdraw, withdrawdata } =
    useCalculateWithdrawAmount();

  const [updatingData, setUpdatingData] = useState<boolean>(false);

  // handle updating deposit data to modal of selected position
  function handleDepositData() {
    setUpdatingData(true);
    if (position && apy) {
      const updatedData = [...depositData];
      updatedData[0].value =
        position.depositedAmint == "undefined" ||
        position.depositedAmint == "NaN"
          ? 0
          : position.depositedAmounts.usda;
      // Update deposited USDA+ value
      updatedData[1].value =
        position.depositedUsdt == "undefined" || position.depositedUsdt == "NaN"
          ? 0
          : position.depositedAmounts.usdt;
      // Update deposited ETH value
      updatedData[2].value = `$${Number(position.ethPriceAtDeposit) / 100}`;
      // Update points earned till now
      updatedData[3].value = `${Math.floor(indexPoint?.[1]) || "0"}`;
      // Update ethPriceAtDeposit value
      updatedData[4].value = new Date(
        Number(position.depositedTime) * 1000
      ).toLocaleString();
      // Update depositedTime value and format time in 'DD/MM/YYYY'
      updatedData[5].value = `${
        String(position.lockingPeriod).length > 8
          ? Number(position.lockingPeriod) / 86400000
          : Number(position.lockingPeriod) / 86400
      } days`;
      // Update lockingPeriod value
      updatedData[6].value = calculateTimeDifference(
        position.depositedTime + "000"
      );

      //
      updatedData[7].value = position.collateralType
        ? position.collateralType
        : "ETH";

      // Update all time APY value
      updatedData[8].value = `${Number(
        apy == undefined
          ? 0
          : position.status !== "DEPOSITED"
          ? position?.apys?.currentTimeAPYTillNow
          : apy[5]
      ).toFixed(2)}%`;
      // Update yearly APY value
      updatedData[9].value = `${Number(
        apy == undefined
          ? 0
          : position.status !== "DEPOSITED"
          ? position?.apys?.APY
          : apy[0]
      ).toFixed(2)}%`;
      // Update optedForLiquidation value
      updatedData[10].value = position.optedForLiquidation ? "Yes" : "No";
      // Update optedForLiquidation value
      updatedData[11].value = `${Number(
        apy == undefined
          ? 0
          : position.status !== "DEPOSITED"
          ? position?.apys?.liquidatedCollateralInETH
          : apy[3]
      ).toFixed(2)} ${
        position.collateralType ? position.collateralType : "ETH"
      } (${Number(
        apy == undefined
          ? 0
          : position.status !== "DEPOSITED"
          ? position?.apys?.liquidatedETHValue
          : apy[4]
      ).toFixed(2)}$)`;
      // Update optedForLiquidation value
      setDepositData(updatedData);
      // Update the depositData state with updatedData
      calculateBackendWithdraw?.({
        address: address as `0x${string}`,
        index: position.index,
        chainId: chainId as number,
        ethPrice: (Number(ethPrice ?? 0n) / 100).toFixed(2),
      });
      setUpdatingData(false);
    } else {
      const updatedData = [...depositData];
      // If details are not available, set each value in depositData to '-'
      updatedData.forEach((data) => {
        data.value = "-";
      });
      setDepositData(updatedData); // Update the depositData state with updatedData
    }
  }

  // useEffect for updating deposit data to pop up state
  useEffect(() => {
    setSpinner(true);
    handleDepositData();
    setOpenConfirmNotice(true);
    setSpinner(false);
  }, [position, lastCumulativeRate, interestGained, apy, indexPoint]);

  // Define the initial state for the options variable
  let options = Options.newOptions()
    .addExecutorLzReceiveOption(85000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const transactionParamsCDS: TransactionParams = {
    dstEid:
      chainId === NetworkId.BaseSepolia
        ? eId.Base
        : chainId === NetworkId.Optimism
        ? eId.OP
        : eId.Base,
    to: padHex(
      treasuryAddress[
        (chainId || NetworkId.BaseSepolia) as keyof typeof treasuryAddress
      ],
      {
        size: 32,
      }
    ) as `0x${string}`,
    amountLD: BigInt(0),
    minAmountLD: BigInt(0),
    extraOptions: options,
    composeMsg: `0x${"".padEnd(64, "0")}`,
    oftCmd: `0x${"".padEnd(64, "0")}`,
  };

  const {
    data: nativeFeeUSDA,
    error: UsdaQuoteError,
    refetch: refetchnativeFeeUSDA,
  } = useReadContract({
    abi: usDaAbi,
    address: usDaAddress[chainId as keyof typeof usDaAddress],
    functionName: "quoteSend",
    args: [transactionParamsCDS as any, false],
    query: {
      placeholderData: { nativeFee: 0n, lzTokenFee: 0n },
      enabled: !!chainId && !!address,
    },
  }) as any;

  options = Options.newOptions()
    .addExecutorLzReceiveOption(
      700000,
      Math.floor(Number(nativeFeeUSDA?.nativeFee) * 2.5).toString()
    )
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFeeOFT, quoteError: quoteErrorOFT } =
    useGetGlobalQuote(options, 5, 0);

  // Define the initial state for the options variable
  options = Options.newOptions()
    .addExecutorLzReceiveOption(400000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFeeWithdraw, quoteError } = useGetGlobalQuote(
    options,
    1
  );

  const nativeFeeAll =
    Number(nativeFeeWithdraw?.nativeFee) + Number(nativeFeeOFT?.nativeFee);

  const {
    dcdsFundWithdrawGainAsync,
    dcdsWithdrawGainData,
    dcdsWithdrawGainError,
    handleDcdsWithdrawGain,
    isDcdsWithdrawGainPending,
    resetDcdsWithdrawGain,
  } = useDcdsWithdrawGain({
    onError: (error: any) => {
      // setting loading to false of withdraw
      setTimeout(() => {
        setDcdsFundWithdrawLoadingLocal(false);
      }, 1000);
      setWithdrawMethodLoading(false);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    },
  });

  // getting transaction receipt
  const {
    data: cdsWithdrawGainReceipt,
    isError: cdsWithdrawGainIsErrorReceipt,
    isSuccess: cdsWithdrawGainReceiptIsSuccess,
    error: cdsWithdrawGainReceiptError,
  } = useWaitForTransactionReceipt({
    hash: dcdsWithdrawGainData || undefined, // The transaction hash to wait for
    confirmations: 2, // Number of confirmations required for success
  });

  // if withdraw gain transaction is success then set loading to false and show toast notification and update the list of deposits, page refetch
  useEffect(() => {
    if (cdsWithdrawGainReceiptIsSuccess) {
      setTimeout(() => {
        setWithdrawGainLoading(false);
      }, 800);
      toast.custom((t) => {
        const link = `${scanUrls[chainId as keyof typeof scanUrls]}tx/${
          cdsWithdrawGainReceipt.transactionHash
        } `;
        return (
          <ToastNotification
            title="Withdraw Successful"
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
        dcdsPositionListRefetch();
      }, 3000);
      dcdsPositionListRefetch();
      handleCloseDialog();
    }
    // if withdraw gain transaction is error then set loading to false and show toast notification
    if (cdsWithdrawGainIsErrorReceipt) {
      setTimeout(() => {
        setDcdsFundWithdrawLoadingLocal(false);
      }, 1000);
      setWithdrawMethodLoading(false);
      toast.custom((t) => (
        <ToastNotificationError
          title={"Transaction failed, Please try again"}
          onClose={() => toast.dismiss(t)}
        />
      ));
    }
  }, [cdsWithdrawGainReceipt, cdsWithdrawGainIsErrorReceipt]);

  // hook for withdraw (Close position) functions
  const {
    dcdsFundWithdrawData,
    dcdsFundWithdrawError,
    handleDcdsFundWithdraw,
    isDcdsFundWithdrawPending,
    resetDcdsFundWithdraw,
  } = useDcdsWithdraw({
    onError: () => {
      setTimeout(() => {
        setDcdsFundWithdrawLoadingLocal(false);
      }, 1000);
      setWithdrawMethodLoading(false);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    },
  });

  // getting transaction receipt for withdraw (Close position)
  const {
    data: cdsLogdataReceipt,
    isError: isCdserrorReceipt,
    isSuccess: isCdsSuccessReceipt,
    error: cdsLogdataReceiptError,
  } = useWaitForTransactionReceipt({
    hash: dcdsFundWithdrawData || undefined, // The transaction hash to wait for
    confirmations: 2, // Number of confirmations required for success
  });

  // useEffect for withdrawing (Close position) success and error
  useEffect(() => {
    const callEffect = async () => {
      if (isCdsSuccessReceipt) {
        setWithdrawMethodLoading(false);
        setTimeout(() => {
          setWithdrawGainLoading(true);
        }, 1000);
        dcdsPositionListRefetch();

        setTimeout(async () => {
          const token = position.collateralType === "cbBTC" ? "cbBTC" : "ETH";
          const res = await refetchBorrowWithDrawGainsSignedData(token);
          let params = [
            BigInt(position.index),
            res?.odosAssembledData,
            res?.deadline,
            res?.signature,
          ];
          if (chainId === NetworkId.Ethereum) {
            params = [
              BigInt(position.index),
              res?.odosAssembledData,
              res?.usdtFromOdos,
              res?.deadline,
              res?.signature,
            ];
          }
          // If close position is success then call withdraw gain function
          handleDcdsWithdrawGain?.(params, position.collateralType);
        }, 3000);
      } else if (isCdserrorReceipt) {
        // If close position is error then set loading to false and show toast notification
        setTimeout(() => {
          setDcdsFundWithdrawLoadingLocal(false);
        }, 1000);
        setWithdrawMethodLoading(false);
        toast.custom((t) => (
          <ToastNotificationError
            title={"Transaction failed, Please try again"}
            onClose={() => toast.dismiss(t)}
          />
        ));
      }
    };
    callEffect();
  }, [cdsLogdataReceipt, isCdserrorReceipt]);

  // getting signed data for withdraw (Close position)
  const {
    refetchBorrowWithDrawSignedData,
    refetchBorrowWithDrawGainsSignedData,
  } = useGetDcdsWithdrawSignedData(position.index);

  // handle withdrawing funds
  const handleWithdrawFund = async () => {
    try {
      setDcdsFundWithdrawLoadingLocal(true);
      // if position status is deposited then call withdraw function
      if (position.status == "DEPOSITED") {
        const token = position.collateralType === "cbBTC" ? "cbBTC" : "ETH";
        const res = await refetchBorrowWithDrawSignedData(token);
        let params: any = [
          [
            address,
            BigInt(position.index),
            res?.excessProfitCumulativeValue,
            res?.expiredETHAmount,
          ],
          res?.deadline,
          res?.signature,
        ];

        if (chainId === NetworkId?.Ethereum) {
          params = [
            BigInt(position.index),
            res?.excessProfitCumulativeValue,
            res?.expiredETHAmount,
            res?.deadline,
            res?.signature,
          ];
        }

        if (nativeFeeAll) {
          setWithdrawMethodLoading(true);
          handleDcdsFundWithdraw?.(
            params,
            position.collateralType === "cbBTC" ? undefined : nativeFeeAll
          );
        }
      } else if (position.status == "WITHDREW") {
        // if position status is withdrawn then call withdraw gain function
        setWithdrawGainLoading(true);
        const token = position.collateralType === "cbBTC" ? "cbBTC" : "ETH";
        const res = await refetchBorrowWithDrawGainsSignedData(token);
        let params = [
          BigInt(position.index),
          res?.odosAssembledData,
          res?.usdtFromOdos,
          res?.deadline,
          res?.signature,
        ];
        if (chainId === NetworkId.Ethereum) {
          params = [
            BigInt(position.index),
            res?.odosAssembledData,
            res?.usdtFromOdos,
            res?.deadline,
            res?.signature,
          ];
        }
        handleDcdsWithdrawGain?.(params, position.collateralType);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetDcdsFundWithdraw();
    setDcdsFundWithdrawLoadingLocal(false);
    setWithdrawMethodLoading(false);
  };

  const isPopupLoading = isLoadingAPY || updatingData || isIndexPointLoading;

  // fetching layer zero transaction data to add loading state to user to initiate transaction
  const { readyForNewTx } = useLayerZeroMessages();

  const variableYields = toPositiveDecimalString(
    Number(
      apy == undefined
        ? 0
        : position.status !== "DEPOSITED"
        ? (Number(
            isNaN(position?.apys?.priceChangePL)
              ? 0
              : position?.apys?.priceChangePL
          ) /
            Number(
              isNaN(Number(position?.totalDepositedAmount))
                ? 0
                : position?.totalDepositedAmount
            )) *
          100
        : (Number(isNaN(apy[2]) ? 0 : apy[2]) /
            Number(
              isNaN(Number(position?.totalDepositedAmount))
                ? 0
                : position?.totalDepositedAmount
            )) *
          100
    ).toFixed(2)
  );
  const variableYieldsCheck = isNaN(Number(variableYields))
    ? 0.0
    : variableYields;
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-[98%] sm:max-w-[610px] bg-white dark:border-[1px] dark:border-grayLight  dark:bg-[#0D0D0D] ">
        <div className="text-2xl font-semibold mb-2 dark:text-white text-textBlack">
          Deposit Details
        </div>
        {/* <div className="flex">
          <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700">
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="withdraw"
              >
                <input
                  name="withdraw"
                  type="radio"
                  checked={view === "withdraw"}
                  onChange={() => setView("withdraw")}
                  className="peer h-4 w-4  md:h-6 md:w-6 cursor-pointer appearance-none rounded-full  border-[3px] md:border-[4px] dark:border-white  border-black dark:checked:border-white checked:border-black transition-all"
                  id="withdraw"
                />
                <span className="absolute dark:bg-white bg-black w-2 h-2 md:w-3 md:h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
            </div>
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-2 ms-2 text-[20px]  sm:text-2xl md:text-[28px] font-medium text-textBlack  dark:text-white"
            >
              Withdraw
            </label>
          </div>

          <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700">
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="rebalance"
              >
                <input
                  name="rebalance"
                  type="radio"
                  onChange={() => setView("rebalance")}
                  checked={view === "rebalance"}
                  className="peer h-4 w-4  md:h-6 md:w-6 cursor-pointer appearance-none rounded-full  border-[3px] md:border-[4px] dark:border-white  border-black dark:checked:border-white checked:border-black transition-all"
                  id="rebalance"
                />
                <span className="absolute dark:bg-white bg-black w-2 h-2 md:w-3 md:h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
            </div>
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-2 ms-2 text-[20px]  sm:text-2xl md:text-[28px]  text-textBlack font-medium  dark:text-white "
            >
              Rebalance
            </label>
          </div>
        </div> */}
        {!isPopupLoading ? (
          view === "withdraw" ? (
            <div>
              <div className="h-[275px] overflow-auto no-scrollbar">
                {NewDetails.map((dcdsWidthDrawMetricsObj, idx) => {
                  return dcdsWidthDrawMetricsObj.value ? (
                    <div
                      key={idx}
                      className="flex flex-col justify-between mb-2"
                    >
                      <div className="w-full flex justify-between items-center">
                        <span className="text-[16px] md:text-[18px]  flex items-center   font-medium text-grayLight">
                          {" "}
                          {dcdsWidthDrawMetricsObj.headline}
                          {dcdsWidthDrawMetricsObj.tooltip && (
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger asChild>
                                <Info width={18} height={18} className="ml-2" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-white dark:bg-black">
                                <p>{dcdsWidthDrawMetricsObj.tooltipText}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </span>
                        <span className="text-[16px] md:text-[18px] dark:text-white font-medium text-textBlack">
                          {dcdsWidthDrawMetricsObj.value}
                        </span>
                      </div>
                      {idx === 0 && position.status === "LIQUIDATED" && (
                        <div className="flex w-full justify-end font-bold text-orange-700">
                          <p className="text-[12px]">
                            Converted to USDT: $
                            {Number(position.liquidatedAmount).toFixed(2) || 0}
                          </p>
                        </div>
                      )}
                      {dcdsWidthDrawMetricsObj?.comment && (
                        <div className="p-2 mb-2 mt-1 bg-[#FFF0CA] text-[14px]  dark:bg-[#4F3800] dark:text-[#D6A100] text-grayLight font-normal">
                          {dcdsWidthDrawMetricsObj?.comment}
                        </div>
                      )}
                    </div>
                  ) : null;
                })}
                {depositData
                  .filter((depositData) => {
                    if (
                      ["USDA+ Deposited", "USDT Deposited"].includes(
                        depositData.headline
                      ) &&
                      Number(depositData.value) <= 0
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map((dcdsWidthDrawMetricsObj, idx) => {
                    return (
                      <div
                        key={idx}
                        className="flex relative justify-between mb-2"
                      >
                        <span
                          className={`text-[16px] md:text-[18px] flex items-center  font-medium text-grayLight ${
                            dcdsWidthDrawMetricsObj?.titleColor || ""
                          }`}
                        >
                          {" "}
                          {dcdsWidthDrawMetricsObj.headline}
                          {dcdsWidthDrawMetricsObj.tooltip && (
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger asChild>
                                <Info width={18} height={18} className="ml-2" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-white dark:bg-black">
                                <p>{dcdsWidthDrawMetricsObj.tooltipText}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </span>
                        <span
                          className={`text-[16px] md:text-[18px] dark:text-white font-medium text-textBlack ${
                            dcdsWidthDrawMetricsObj?.valueColor || ""
                          } `}
                        >
                          {dcdsWidthDrawMetricsObj.value}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <div className="flex w-full mt-4  border-solid  border-[1px]  justify-between border-gray-200 rounded-[12px] bg-gray-100 dark:border-[rgb(51,51,51)] dark:bg-[#121212] flex-col sm:flex-row">
                <div className="flex-1 relative flex flex-col justify-start items-start  gap- border-r-0    py-2 px-4">
                  <div className="flex flex-col w-full  items-start justify-between">
                    <Label className=" text-[22px] font-bold  md:text-[26px] text-green-600 dark:text-green-500  ">
                      $
                      {Number(
                        apy == undefined
                          ? 0
                          : position.status !== "DEPOSITED"
                          ? position?.apys?.amountAccured || 0
                          : apy[1] || 0
                      ).toFixed(4)}
                    </Label>

                    <div className="flex gap-1">
                      <Label className="text-[14px] font-normal text-[#777777]">
                        Option Fee + Liquidation Gains
                      </Label>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Info width={18} height={18} className="ml-2" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-white dark:bg-black w-[300px]">
                          <p>
                            These are option fee yields paid by USDA+ borrowers
                            for acting as a risk underwriter and essentially
                            providing price hedge to borrowers. These are
                            upfront yields which are immediately received after
                            deductions from their USDA+ borrowed amount. If you
                            opt into liquidations, you also receive a portion of
                            the Liquidation gains from liquidated users, and
                            your will get their ETH at a discount
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="flex w-full relative items-center justify-between">
                    <CornerDownRight className="absolute left-0 top-[-1px] stroke-black dark:stroke-white" />
                    <div className="flex gap-1 ml-8">
                      <Label className=" text-[14px] font-normal text-[#777777]">
                        Fixed Yields
                      </Label>
                      {/* <div className="flex gap-1">
                        <Image
                          src={baseIconNew}
                          alt="eth"
                          width={18}
                          height={18}
                        />
                        <Image
                          src={opIconNew}
                          alt="eth"
                          width={18}
                          height={18}
                        />
                      </div> */}
                    </div>
                    <Label className="text-[18px] md:text-[20px] font-medium dark:text-white">
                      {`${Number(
                        apy == undefined
                          ? 0
                          : position.status !== "DEPOSITED"
                          ? position?.apys?.currentTimeAPYTillNow || 0
                          : apy[5] || 0
                      ).toFixed(2)}%`}
                    </Label>
                  </div>
                </div>
                <div className="flex-1 w-full flex flex-col justify-center items-start  gap-1  py-2 px-4 font-medium">
                  <div className="flex flex-col w-full items-start justify-between">
                    <Label className="text-[22px] md:text-[26px] font-medium dark:text-white">
                      $
                      {toPositiveDecimalString(
                        Number(
                          apy == undefined
                            ? 0
                            : position.status !== "DEPOSITED"
                            ? position?.apys?.priceChangePL || 0
                            : apy[2] || 0
                        ).toFixed(4)
                      )}
                    </Label>

                    <div className="flex">
                      <Label className="text-[14px]  font-normal text-[#777777]">
                        Price Gains
                      </Label>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Info width={18} height={18} className="ml-2" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-white dark:bg-black w-[300px]">
                          <p>
                            These are 3% ETH price gains taken from each USDA+
                            borrower if ETH rises after they mint. The gains are
                            shared proportionally across all dCDS users.
                            However, they’re impermanent—if ETH price drops, the
                            gains shrink and can even turn negative if ETH falls
                            below the borrower’s entry price.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex w-full relative  items-center justify-between">
                    <CornerDownRight className="absolute left-0 top-[-1px] stroke-black dark:stroke-white" />
                    <Label className="text-[14px] font-normal text-[#777777] ml-8">
                      Variable yields
                    </Label>
                    <Label className="text-[18px] md:text-[20px] font-medium dark:text-white">
                      {variableYieldsCheck}%
                    </Label>
                  </div>
                </div>
              </div>
              <Typography
                variant="regular"
                className="text-[14px] my-3 text-[#777777] "
              >
                Note: Your amount will be used to offer protection to borrowers
                & protocol in return for fixed yields
              </Typography>
              <div className="h-[50px] overflow-hidden  md:h-[86px]">
                {!dcdsFundWithdrawLoadingLocal && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="h-full">
                        <Button
                          onClick={handleWithdrawFund}
                          disabled={
                            (position.status === "WITHDREW_GAINS"
                              ? true
                              : false) ||
                            !hasDaysPassed(
                              Number(position?.depositedTime || 0),
                              Number(position?.lockingPeriod || 0)
                            ) ||
                            isWithdrawPause ||
                            !readyForNewTx
                          }
                          className="w-full p-5 py-6  md:p-8 md:py-10 bg-black text-white text-[24px] md:text-[32px]"
                        >
                          {position.status == "DEPOSITED"
                            ? "Close Position"
                            : position.status == "WITHDREW"
                            ? "Withdraw"
                            : position.status == "WITHDREW_GAINS"
                            ? "Withdrawn"
                            : "Withdrawn"}

                          <span className="text-base mt-1">
                            {isWithdrawPause && "(Paused)"}
                          </span>
                        </Button>
                      </div>
                    </TooltipTrigger>
                    {isWithdrawPause && (
                      <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                        <p>{"Withdraw is paused now"}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}
                {/* <LoadingBox
                isLoading={withdrawMethodLoading}
                isFailure={dcdsFundWithdrawError}
                isSuccess={Boolean(dcdsFundWithdrawData)}
                setSuccessLoading={() => setDcdsFundWithdrawLoadingLocal(false)}
                heading="Withdrawing Funds"
              /> */}
                <LoadingBox
                  isLoading={withdrawMethodLoading}
                  isFailure={dcdsFundWithdrawError}
                  isSuccess={Boolean(dcdsFundWithdrawData)}
                  setSuccessLoading={() => false}
                  heading="Closing Position"
                  loadingCount="1/2"
                />
                <LoadingBox
                  isLoading={withdrawGainLoading}
                  isFailure={dcdsWithdrawGainError}
                  isSuccess={Boolean(dcdsWithdrawGainData)}
                  setSuccessLoading={() =>
                    setDcdsFundWithdrawLoadingLocal(false)
                  }
                  heading="Withdrawing Gains"
                  loadingCount="2/2"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="h-[390px] overflow-auto no-scrollbar">
                <div>
                  <div className="font-semibold mb-3 dark:text-white text-textBlack text-[28px]">
                    Current Deposits
                  </div>
                  {rebalanceDetails.map((details, idx) => {
                    return (
                      <div key={idx} className="flex justify-between mb-2">
                        <span className="text-[16px] md:text-[18px]  font-medium text-grayLight">
                          {" "}
                          {details.headline}
                        </span>
                        <span className="text-[16px] md:text-[18px] dark:text-white font-medium text-textBlack">
                          {details.value}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <div className="font-semibold mb-3 dark:text-white text-textBlack text-[28px]">
                    Rebalance Eligibility
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[16px] md:text-[18px]  font-medium text-grayLight">
                      Eligible for Rebalance
                    </span>
                    <span className="text-[16px] md:text-[18px] dark:text-white font-medium text-textBlack">
                      Yes
                    </span>
                  </div>
                  <div className="p-2 mb-2  bg-[#FFF0CA] text-[14px]  dark:bg-[#4F3800] dark:text-[#D6A100] text-grayLight font-normal">
                    Rebalancing is available when price increases by more than
                    20%
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-[16px] md:text-[18px]  font-medium text-grayLight">
                      Discount Applied
                    </span>
                    <span className="text-[16px] md:text-[18px] dark:text-white font-medium text-textBlack">
                      40%
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[16px] md:text-[18px]  font-medium text-grayLight">
                      Discounted Value Added to dCDS
                    </span>
                    <span className="text-[16px] md:text-[18px] dark:text-white font-medium text-textBlack">
                      35
                    </span>
                  </div>
                  <div className="p-2 mb-2 bg-[#FFF0CA] text-[14px]  dark:bg-[#4F3800] dark:text-[#D6A100] text-grayLight font-normal">
                    Your token is added at a discounted value and earns fixed
                    yield
                  </div>
                </div>
              </div>

              <div className="h-[50px] overflow-hidden  md:h-[86px] mt-4">
                {true && (
                  <Button
                    onClick={handleWithdrawFund}
                    // disabled={
                    //   (position.status === "WITHDREW" ? true : false) ||
                    //   Number(position.lockingPeriod) * 1000 > Date.now()
                    // }
                    className="w-full p-5 py-6  md:p-8 md:py-10 bg-black text-white text-[24px] md:text-[32px]"
                  >
                    {position.status == "DEPOSITED"
                      ? "Close Position"
                      : position.status == "WITHDREW"
                      ? "Withdraw"
                      : position.status == "WITHDREW_GAINS "
                      ? "Withdrawn"
                      : position.status == "LIQUIDATED "
                      ? "Liquidated"
                      : "Withdrawn"}
                  </Button>
                )}
                <LoadingBox
                  isLoading={withdrawMethodLoading}
                  isFailure={dcdsFundWithdrawError}
                  isSuccess={Boolean(dcdsFundWithdrawData)}
                  setSuccessLoading={() =>
                    setDcdsFundWithdrawLoadingLocal(false)
                  }
                  heading="Closing Position"
                  loadingCount="1/2"
                />
                <LoadingBox
                  isLoading={withdrawGainLoading}
                  isFailure={dcdsWithdrawGainError}
                  isSuccess={Boolean(dcdsWithdrawGainData)}
                  setSuccessLoading={() =>
                    setDcdsFundWithdrawLoadingLocal(false)
                  }
                  heading="Withdrawing Gains"
                  loadingCount="2/2"
                />
              </div>
            </div>
          )
        ) : (
          <div className="h-[560px] flex justify-center items-center">
            <RingLoadingIcon
              width={80}
              height={80}
              className="fill-black dark:fill-white w-8 h-8 "
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
