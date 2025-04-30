"use client";
import { Button } from "@/design-systems/atoms/button";
import { Input } from "@/design-systems/atoms/input";
import { Label } from "@/design-systems/atoms/label";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import UsdtIcon from "@/app/assets/cryptocurrency-color_usdt.svg";
import dcdsDark from "@/app/assets/dcds-ring-dark.svg";
import dcdsFrame from "@/app/assets/dcds-ring-light.svg";
import USDaIcon from "@/app/assets/logo.svg";
import USDaIconGreen from "@/app/assets/brand-logo-small-green.svg";

import ModeIcon from "@/app/assets/mode.png";
import OPIcon from "@/app/assets/optimism.png";
import AEROIcon from "@/app/assets/aero-icon.png";
import {
  cdsAddress,
  nativeTokenAddress,
  testusdtAbiAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { Checkbox } from "@/design-systems/atoms/checkbox";
import { GenericDropdownMenu } from "@/design-systems/atoms/DropdownCustom/GenericDropdownMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Typography } from "@/design-systems/atoms/Typography";
import { usePortfolioTab } from "@/contexts/portfolio-tab";
import { useScroll } from "@/contexts/scroll";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import LoadingBox from "@/design-systems/molecule/LoadingBox";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import ScrollDownArrow from "@/design-systems/molecule/scroll-down-button";
import AddToken from "@/design-systems/organisms/dcds/add-token";
import DepositSummary from "@/design-systems/organisms/dcds/deposit-summary";
import HowItWorksPopUp from "@/design-systems/organisms/dcds/how-it-works";
import HowItWorksButton from "@/design-systems/organisms/dcds/how-it-works-button";
import TokenTvlDetails from "@/design-systems/organisms/dcds/TokenTvlDetails";
import useApproveUsda from "@/hookes/contract-hooks/useApproveUsda";
import useUsdtApprove from "@/hookes/contract-hooks/useApproveUsdt";
import useDcdsDeposit from "@/hookes/contract-hooks/useDepositDcds";
import useGetBalance from "@/hookes/contract-hooks/useGetBalance";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useGetUsdtAmountDepositedTillNow from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import useDeviceType from "@/hookes/useDeviceType";
import {
  NetworkId,
  scanUrls,
  USDT_DEPOSIT_LIMIT_IN_DCDS,
} from "@/utils/constants";
import {
  formatNumber,
  getTotalDepositingAmount,
  handleWheel,
} from "@/utils/helpers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useFormik } from "formik";
import { Info, Network } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import * as Yup from "yup";
import { FormValues, TokenDetails } from "./interface";
import PageLoader from "@/design-systems/molecule/page-loader";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import WalletConnectButton from "@/design-systems/molecule/WalletConnectButton";
import useMasterPriceOracle from "@/hookes/contract-hooks/useMasterPriceOracle";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import useApproveNativeToken from "@/hookes/contract-hooks/useApproveNativeToken";
import useGetTVL from "@/hookes/contract-hooks/useGetTVL";
import useGetTVLUSDA from "@/hookes/contract-hooks/useGetTVLUSDA";
import useCdsPause from "@/hookes/contract-hooks/useCdsPause";
import { cdsAbi } from "@/blockchain/abis/dcds";
import useTokenDetails from "@/hookes/contract-hooks/useTokenDetails";
import { get } from "http";
import { usDaAbi } from "@/blockchain/abis/usda";
import { testusdtAbiAbi } from "@/blockchain/abis/usdt";
import Spinner from "@/design-systems/atoms/Spinner";

// Form schema for the dcds template
const formSchema = Yup.object().shape({
  usdaFlag: Yup.boolean(), // Flag for usdaAmount
  usdtFlag: Yup.boolean(), // Flag for usdtAmount
  usdcFlag: Yup.boolean(), // Flag for usdcAmount
  usdeFlag: Yup.boolean(), // Flag for usdeAmount

  usdaAmount: Yup.mixed()
    .test("is-required", "USDA amount is required", function (value) {
      return this.parent.usdaFlag
        ? value !== null && value !== undefined && value !== 0
        : true;
    })
    // checking if the usda amount is greater than the usda balance
    .test("max", "max", function (value) {
      const { usdaAmount, usdaBalance } = this.parent;
      if (usdaAmount) {
        return Number(value) <= (usdaBalance || 0);
      }
      return true; // No validation if usdaFlag is false
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
        ? value !== null && value !== undefined && value !== 0
        : true;
    })
    // checking if the usdt amount is greater than the usdt balance
    .test("max", "max", function (value) {
      const { usdtAmount, usdtBalance } = this.parent;
      if (usdtAmount) {
        return Number(value) <= (usdtBalance || 0);
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

  opAmount: Yup.mixed()
    .test("is-required", "OP amount is required", function (value) {
      return this.parent.opFlag
        ? value !== null && value !== undefined && value !== 0
        : true;
    })
    // checking if the op amount is greater than the op balance
    .test("max", "max", function (value) {
      const { opAmount, nativeBalance } = this.parent;
      if (opAmount) {
        return Number(value) <= (nativeBalance || 0);
      }
      return true; // No validation if usdaFlag is false
    })
    .test("is-valid-number", "Value must be greater than 0", (value) => {
      if (value === null || value === undefined) {
        return true;
      }
      return Number(value) >= 0;
    })
    .nullable(),

  aeroAmount: Yup.mixed()
    .test("is-required", "AERO amount is required", function (value) {
      return this.parent.aeroFlag
        ? value !== null && value !== undefined && value !== 0
        : true;
    })
    // checking if the aero amount is greater than the aero balance
    .test("max", "max", function (value) {
      const { aeroAmount, nativeBalance } = this.parent;
      if (aeroAmount) {
        return Number(value) <= (nativeBalance || 0);
      }
      return true; // No validation if usdaFlag is false
    })
    .test("is-valid-number", "Value must be greater than 0", (value) => {
      if (value === null || value === undefined) {
        return true;
      }
      return Number(value) >= 0;
    })
    .nullable(),

  // lockInPeriod: Yup.string().required("Lock-in period is required"),

  // liquidationGains: Yup.boolean(),
});

function DCDSTemplate() {
  const router = useRouter();
  const { theme } = useTheme();

  // hook to open chain popup
  const { isConnected: isWalletConnected, openWalletPopup } =
    useCheckWalletConnection();

  // select token state
  const [selectedTokens, setSelectedTokens] = useState<TokenDetails[]>([]);

  // Loading states for the deposit process
  const [dcdsLoadingLocal, setDcdsLoadingLocal] = useState<boolean>(false);
  const [usdtApproveLoadingLocal, setUsdtApproveLoadingLocal] =
    useState<boolean>(false);
  const [usdaApproveLoadingLocal, setUsdaApproveLoadingLocal] =
    useState<boolean>(false);
  const [dcdsDepositLoadingLocal, setDcdsDepositLoadingLocal] =
    useState<boolean>(false);
  const [nativeTokenLoadingLocal, setNativeTokenLoadingLocal] =
    useState<boolean>(false);

  // loading state for the allowance fetching
  const [allowanceLoading, setAllowanceLoading] = useState<boolean>(false);

  // state variable to handle the how it works popup
  const [isOpenHowItWork, setIsOpenHowItWork] = useState(false);

  // hook to get the chain id, is connected and address
  const { chainId, isConnected, address } = useAccount();

  // hook to handle the scroll in portfolio tab after deposit
  const { isScroll, setIsScroll } = useScroll();
  const { portfolioTab, setPortfolioTab } = usePortfolioTab();

  // formik hook to handle the form values
  const formik = useFormik<FormValues>({
    initialValues: {
      usdaFlag: false,
      usdtFlag: false,
      aeroFlag: false,
      opFlag: false,
      usdaAmount: null,
      usdtAmount: null,
      opAmount: null,
      aeroAmount: null,
      lockInPeriod: null,
      liquidationGains: false,
      usdaBalance: null,
      usdtBalance: null,
      nativeBalance: null,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      handleDeposit();
    },
  });

  console.log(formik.values, "formik.values");

  // lock in period dropdown items
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

  useEffect(() => {
    // if the chain id changes, reset the selected tokens
    setSelectedTokens([]);
  }, [chainId]);

  const nativeTokenAdds = nativeTokenAddress[chainId || 0] || zeroAddress;
  // getting the oracle price for the native token
  const { getOraclePrice, getOraclePriceRefetch } =
    useMasterPriceOracle(nativeTokenAdds);

  // getting the oracle price for the usda token
  const {
    getOraclePrice: getOraclePriceUSDa,
    getOraclePriceRefetch: getOraclePriceRefetchUSDa,
  } = useMasterPriceOracle(usDaAddress[chainId as keyof typeof usDaAddress]);

  // getting the oracle price for the usdt token
  const {
    getOraclePrice: getOraclePriceUSDT,
    getOraclePriceRefetch: getOraclePriceRefetchUSDT,
  } = useMasterPriceOracle(
    testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
  );

  // flag for skipping allowance approve
  const [usdaAllowanceDone, setUsdaAllowanceDone] = useState<Boolean>(false);
  const [usdtAllowanceDone, setUsdtAllowanceDone] = useState<Boolean>(false);
  const [nativeAllowanceDone, setNativeAllowanceDone] =
    useState<Boolean>(false);

  // reset the allowance skip state
  const resetAllowanceDone = () => {
    setUsdaAllowanceDone(false);
    setUsdtAllowanceDone(false);
    setNativeAllowanceDone(false);
  };

  // fetching allowance usda
  const { data: allowanceUSDa, refetch: refetchAllowanceUSDa } =
    useReadContract({
      abi: usDaAbi,
      address: usDaAddress[chainId as keyof typeof usDaAddress],
      functionName: "allowance",
      args: [
        address || zeroAddress,
        cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
      ],
    }) as { data: number | undefined; refetch: any };
  // fetching allowance USDT
  const { data: allowanceUSDT, refetch: refetchAllowanceUSDT } =
    useReadContract({
      abi: testusdtAbiAbi,
      address: testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
      functionName: "allowance",
      args: [
        address || zeroAddress,
        cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
      ],
    }) as { data: number | undefined; refetch: any };

  // fetching allowance op
  const { data: allowanceOP, refetch: refetchAllowanceOP } = useReadContract({
    abi: usDaAbi,
    address: nativeTokenAddress[NetworkId.Optimism as keyof typeof usDaAddress],
    functionName: "allowance",
    args: [
      address || zeroAddress,
      cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
    ],
  }) as { data: number | undefined; refetch: any };

  // fetching allowance usda
  const { data: allowanceAERO, refetch: refetchAllowanceAERO } =
    useReadContract({
      abi: usDaAbi,
      address:
        nativeTokenAddress[NetworkId.BaseSepolia as keyof typeof usDaAddress],
      functionName: "allowance",
      args: [
        address || zeroAddress,
        cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
      ],
    }) as { data: number | undefined; refetch: any };

  const refetchAllowance = async () => {
    setAllowanceLoading(true);
    await refetchAllowanceUSDa();
    await refetchAllowanceUSDT();
    await refetchAllowanceOP();
    await refetchAllowanceAERO();
    setAllowanceLoading(false);
  };

  console.log(
    allowanceAERO,
    allowanceOP,
    allowanceUSDT,
    allowanceUSDa,
    "allowance"
  );

  // Define the initial state for the options variable
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(400000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(options, 1);

  const { omniChainData: GlobalContractData, isOmniChainDataPending } =
    useGetUsdtAmountDepositedTillNow();

  const { isTVLPending, tvlValue: tvlValueNative } = useGetTVL(
    nativeTokenAddress[chainId as keyof typeof usDaAddress]
  );

  const { isTVLPending: isTVLPendingUsd, tvlValue: tvlValueUSDa } =
    useGetTVLUSDA(usDaAddress[chainId as keyof typeof usDaAddress]);

  // console.log(omniChainData, "omniChainData");
  const { isTVLPending: isTVLPendingUsdt, tvlValue: tvlValueUSDT } =
    useGetTVLUSDA(
      testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
    );

  const { balanceString: usdtBalance } = useGetBalance("USDT");
  const { balanceString: usdaBalance } = useGetBalance("USDa");
  const { balance: opBalance } = useGetBalance("OP");
  const { balanceString: modeBalanceString, balance: modeBalance } =
    useGetBalance("AERO");

  //checking is Cds Deposit pause or not
  const { isFunctionPausedCDS_Deposit } = useCdsPause();

  // getting mode token status
  const {
    assetDetails: assetDetailsMode,
    isTokenDepositPaused: isTokenDepositPausedMode,
    isTokenDepositWithdrawPaused: isTokenDepositWithdrawPausedMode,
    isTokenDepositWithdrawUnpaused: isTokenDepositWithdrawUnpausedMode,
    isTokenWithdrawPaused: isTokenWithdrawPausedMode,
    refetchCurrentData: refetchCurrentDataMode,
  } = useTokenDetails(nativeTokenAddress[NetworkId.BaseSepolia]);

  // getting op token status
  const {
    assetDetails: assetDetailsOP,
    isTokenDepositPaused: isTokenDepositPausedOP,
    isTokenDepositWithdrawPaused: isTokenDepositWithdrawPausedOP,
    isTokenDepositWithdrawUnpaused: isTokenDepositWithdrawUnpausedOP,
    isTokenWithdrawPaused: isTokenWithdrawPausedOP,
    refetchCurrentData: refetchCurrentDataOP,
  } = useTokenDetails(nativeTokenAddress[NetworkId.Optimism]);

  // getting usda token status
  const {
    assetDetails: assetDetailsUSDa,
    isTokenDepositPaused: isTokenDepositPausedUSDa,
    isTokenDepositWithdrawPaused: isTokenDepositWithdrawPausedUSDa,
    isTokenDepositWithdrawUnpaused: isTokenDepositWithdrawUnpausedUSDa,
    isTokenWithdrawPaused: isTokenWithdrawPausedUSDa,
    refetchCurrentData: refetchCurrentDataUSDa,
  } = useTokenDetails(usDaAddress[chainId as keyof typeof testusdtAbiAddress]);

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

  console.log(
    getOraclePriceUSDa[0],
    getOraclePriceUSDT[0],
    "getOraclePriceUSDa"
  );

  // getting current LTV value
  const { data: usdtLimit, refetch: refetchCurrentData } = useReadContract({
    abi: cdsAbi,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: "usdtLimit",
  });

  const USDT_DEPOSIT_LIMIT_IN_DCDS = Number(usdtLimit || 0) / 1e6;

  useEffect(() => {
    // setting the balance values in the formik state for the initial values and validations of max amount
    formik.setFieldValue(
      "usdaBalance",
      Number(usdaBalance.replaceAll("$", ""))
    );
    formik.setFieldValue(
      "usdtBalance",
      Number(usdtBalance.replaceAll("$", ""))
    );
    formik.setFieldValue(
      "nativeBalance",
      chainId == NetworkId.Optimism ? opBalance : modeBalance
    );
  }, [usdaBalance, usdtBalance, opBalance, modeBalance]);

  // token list for the deposit
  const tokenList: TokenDetails[] = useMemo(() => {
    const tokenList = [
      {
        tokenImage: theme === "dark" ? USDaIconGreen : USDaIcon,
        tokenName: "USDa",
        tokenLabel: "USDA+",
        isLoading: false,
        //  token will be active if the deposit limit is 0 or the usdt amount deposited till now is greater than the deposit limit
        active:
          USDT_DEPOSIT_LIMIT_IN_DCDS === 0
            ? true
            : (GlobalContractData?.usdtAmountDepositedTillNow ?? 0n) >=
              USDT_DEPOSIT_LIMIT_IN_DCDS,
        // active: true,
        errorMessage: "USDa not active now",
        balanceAvailable: usdaBalance,
        // tokenCount: Number(usdaBalance),
        minTokenAmount: 500,
        // token will disabled if values is true
        isTokenPause:
          isFunctionPausedCDS_Deposit ||
          isTokenDepositPausedUSDa ||
          isTokenWithdrawPausedUSDa,
        tokenPauseMessage: "USDa Deposit is paused now",
        tokenPrice: getOraclePriceUSDa[0],
      },
      {
        tokenImage: UsdtIcon,
        tokenName: "USDT",
        tokenLabel: "USDT",
        isLoading: false,
        minTokenAmount: 500,
        active: true,
        balanceAvailable: usdtBalance,
        // tokenCount: Number(usdtBalance),
        // token will disabled if values is true
        isTokenPause:
          isFunctionPausedCDS_Deposit ||
          isTokenWithdrawPausedUSDT ||
          isTokenDepositWithdrawPausedUSDT,
        tokenPauseMessage: "USDT Deposit is paused now",
        tokenPrice: getOraclePriceUSDT[0],
      },
    ] as TokenDetails[];

    // if the chain id is optimism, add the op token to the token list
    if (chainId == Number(NetworkId.Optimism)) {
      tokenList.push({
        tokenImage: OPIcon,
        tokenName: "OP",
        tokenLabel: "OP",
        isLoading: false,
        minTokenAmount: 500,
        active:
          USDT_DEPOSIT_LIMIT_IN_DCDS === 0
            ? true
            : (GlobalContractData?.usdtAmountDepositedTillNow ?? 0n) >=
              USDT_DEPOSIT_LIMIT_IN_DCDS,
        // active: true,
        errorMessage: "OP not active now",
        balanceAvailable: String(
          `$${(
            Number(opBalance) *
            Number(formatUnits(BigInt(getOraclePrice[0]), 18))
          ).toFixed(2)}`
        ),
        tokenPrice: getOraclePrice[0],
        tokenCount: opBalance,
        // token will disabled if values is true
        isTokenPause:
          isFunctionPausedCDS_Deposit ||
          isTokenWithdrawPausedOP ||
          isTokenDepositWithdrawPausedOP,
        tokenPauseMessage: "OP Deposit is paused now",
      });
    }
    // if the chain id is base sepolia, add the aero token to the token list
    if (chainId == Number(NetworkId.BaseSepolia)) {
      tokenList.push({
        tokenImage: AEROIcon,
        tokenName: "AERO",
        tokenLabel: "AERO",
        minTokenAmount: 500,
        isLoading: false,
        active:
          USDT_DEPOSIT_LIMIT_IN_DCDS === 0
            ? true
            : (GlobalContractData?.usdtAmountDepositedTillNow ?? 0n) >=
              USDT_DEPOSIT_LIMIT_IN_DCDS,
        // active: true,
        errorMessage: "Mode not active now",
        balanceAvailable: String(
          `$${(
            Number(modeBalance) *
            Number(formatUnits(BigInt(getOraclePrice[0]), 18))
          ).toFixed(2)}`
        ),
        tokenCount: modeBalance,
        tokenPrice: getOraclePrice[0],
        // token will disabled if values is true
        isTokenPause:
          isFunctionPausedCDS_Deposit ||
          isTokenWithdrawPausedMode ||
          isTokenDepositWithdrawPausedMode,
        tokenPauseMessage: "AERO Deposit is paused now",
      });
    }

    return tokenList;
  }, [
    GlobalContractData?.usdtAmountDepositedTillNow,
    usdtBalance,
    usdaBalance,
    chainId,
    modeBalance,
    opBalance,
    getOraclePrice,
    theme,
  ]);

  console.log(tokenList, "tokenList");

  // approve usda
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

  // get the confirmed txn receipt for the usda approve
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

  // approve usdt
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

  // get the confirmed txn receipt for the usdt approve
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

  // approve native token
  const {
    approveNativeTokenDynamic,
    nativeTokenApproveReset,
    nativeTokenApproveError,
    nativeTokenApproveHash,
    nativeTokenApproveLoading,
    nativeTokenApproveSuccess,
  } = useApproveNativeToken({
    onError: () => {
      handleDepositFailure();
    },
  });

  // get the confirmed txn receipt for the native token approve
  const {
    isLoading: nativeApprovalLoadingReceipt,
    isSuccess: nativeApprovalSuccessReceipt,
    isError: nativeApprovalErrorReceipt,
    data: nativeApprovalReceipt,
  } = useWaitForTransactionReceipt({
    hash: nativeTokenApproveHash,
    confirmations: 2,
    query: {},
  });

  console.log(nativeApprovalSuccessReceipt, nativeApprovalErrorReceipt, ">>>");

  // assigning the formik values to the local variables because getting old values from formik directly 
  const usdtAmountLocal = formik.values.usdtAmount;
  const usdaAmountLocal = formik.values.usdaAmount;
  const opAmountLocal = formik.values.opAmount;
  const modeAmountLocal = formik.values.aeroAmount;
  const liquidationGains = formik.values.liquidationGains;
  const lockInPeriodLocal = formik.values.lockInPeriod;

  // calculating the native token amount based on the chain id
  const nativeTokenAmount =
    chainId == NetworkId.BaseSepolia
      ? Number(formik.values.aeroAmount) || 0
      : Number(formik.values.opAmount) || 0;

  // calculating the native token amount in dollor value based on the chain id
  const nativeTokenAmountDollor =
    chainId == NetworkId.BaseSepolia
      ? ((Number(formik.values.aeroAmount) || 0) * Number(getOraclePrice[0])) /
        1e18
      : ((Number(formik.values.opAmount) || 0) * Number(getOraclePrice[0])) /
        1e18;

  console.log(
    formik.values.aeroAmount,
    nativeTokenAmount,
    "nativeTokenAmount",
    getOraclePrice[0],
    nativeTokenAmountDollor
  );

  //  usda token address based on the chain id
  const usdaTokenAdds = usDaAddress[chainId as keyof typeof usDaAddress];

  // usdt token address based on the chain id
  const usdtTokenAdds = formik.values.usdtFlag
    ? testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
    : zeroAddress;

 
// fetching the prices from the contract of usda, usdt and native token from the blockchain
  const { data: getPrices } = useReadContract({
    address: cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
    abi: cdsAbi,
    functionName: "getPrices",
    args: [
      [
        formik.values.usdaFlag ? usdaTokenAdds : zeroAddress,
        formik.values.usdtFlag ? usdtTokenAdds : zeroAddress,
        formik.values.opFlag || formik.values.aeroFlag
          ? nativeTokenAdds
          : zeroAddress,
      ],
    ],
    query: {
      enabled:
        formik.values.usdaFlag ||
        formik.values.usdtFlag ||
        formik.values.opFlag ||
        formik.values.aeroFlag,
    },
  });

  // calculating the liquidation amount
  // this will run when token amount is changed
  const liqAmnt = useMemo(() => {
    let res = 0;
    if (
      formik.values.aeroAmount ||
      formik.values.opAmount ||
      formik.values.usdaAmount ||
      formik.values.usdtAmount
    ) {
      res = getTotalDepositingAmount(
        getPrices,
        // token addresses
        [
          formik.values.usdaFlag ? usdaTokenAdds : zeroAddress,
          formik.values.usdtFlag ? usdtTokenAdds : zeroAddress,
          formik.values.opFlag || formik.values.aeroFlag
            ? nativeTokenAdds
            : zeroAddress,
        ],
        [
          //  amount in wei
          BigInt(
            usdaAmountLocal ? parseUnits(usdaAmountLocal.toString(), 6) : 0
          ),
          BigInt(
            usdtAmountLocal ? parseUnits(usdtAmountLocal.toString(), 6) : 0
          ),
          BigInt(
            formik.values.opFlag || formik.values.aeroFlag
              ? parseUnits(nativeTokenAmount?.toString() || "0", 18)
              : 0
          ),
        ],
        [
          // token details
          assetDetailsUSDa,
          assetDetailsUSDT,
          chainId === NetworkId.BaseSepolia ? assetDetailsMode : assetDetailsOP,
        ]
      );
    }
    return res;
  }, [
    formik.values.aeroAmount,
    formik.values.opAmount,
    formik.values.usdaAmount,
    formik.values.usdtAmount,
  ]);

  // useEffect call deposit function after the native token is approved
  useEffect(() => {
    if (nativeApprovalSuccessReceipt || nativeAllowanceDone) {
      setNativeTokenLoadingLocal(false);
      // calling the deposit function in the contract
      callDepositFnInContract();
    }
  }, [nativeApprovalSuccessReceipt, nativeAllowanceDone]);

  useEffect(() => {
    if (UsdtApprovalSuccessReceipt || usdtAllowanceDone) {
      setUsdtApproveLoadingLocal(false);
      // checking if the op or aero amount is there
      if (formik.values.opAmount || formik.values.aeroAmount) {
        // checking if the aero or op flag is there
        if (formik.values.aeroFlag || formik.values.opFlag) {
          // calculating the allowance amount
          const allowanceAmount = BigInt(
            formik?.values?.aeroFlag
              ? parseUnits(nativeTokenAmount.toString() || "0", 18)
              : formik?.values?.opFlag
              ? parseUnits(nativeTokenAmount.toString() || "0", 18)
              : 0
          );
          // Already approved allowance for the native token
          const allowanceNativeToken =
            chainId == NetworkId.BaseSepolia ? allowanceAERO : allowanceOP;
            if ((allowanceNativeToken || 0) < allowanceAmount) {
            // if the allowance is less than the allowance amount
            setNativeTokenLoadingLocal(true);
            approveNativeTokenDynamic(
              cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
              allowanceAmount
            );
            // refetching the new allowance
            refetchAllowance();
          } else {
            // setting the allowance skip state to true
            // this run another useEffect to check remaining selected tokens approval
            setNativeAllowanceDone(true);
          }
        }
      } else if (nativeFee) {
        // calling deposit if only usdt is selected
        callDepositFnInContract();
      }
    }
  }, [UsdtApprovalSuccessReceipt, usdtAllowanceDone]);

  // deposit function hook
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

  // get the confirmed txn receipt for the cds deposit
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
      // handling the deposit failure
      handleDepositFailure();
    }
    if (cdsDepositSuccessReceipt) {
      // handling the deposit success
      handleDepositSuccess();
    }
  }, [DepositdataReceipt]);

  // useEffect to check the status of the usda approval transaction
  useEffect(() => {
    if (usdaApprovalSuccessReceipt || usdaAllowanceDone) {
      setUsdaApproveLoadingLocal(false);
      // checking if the usdt amount is there and the usda amount is greater than 0
      if (
        Number(formik.values.usdtAmount) &&
        (Number(formik.values.usdaAmount) ?? 0) > 0
      ) {
        // calculating the allowance amount for the usdt
        const allowanceAmount = BigInt(
          formik.values.usdtAmount
            ? parseUnits(formik.values.usdtAmount.toString(), 6)
            : 0
        );
        // if the allowance is less than the allowance amount
        if ((allowanceUSDT || 0) < allowanceAmount) {
          // setting the usdt approve loading state to true
          setTimeout(() => {
            setUsdtApproveLoadingLocal(true);
          }, 600);
          // calling the usdt approve function
          handleUsdtApprove([
            cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
            allowanceAmount,
          ]);
          // refetching the new allowance
          refetchAllowance();
        } else {
          // setting the usdt allowance done state to true
          // this run another useEffect to check remaining selected tokens approval
          setUsdtAllowanceDone(true);
        }
      } else if (formik.values.opAmount || formik.values.aeroAmount) {
        // calculating the allowance amount for the native token
        const allowanceAmount = BigInt(
          formik?.values?.aeroFlag
            ? parseUnits(nativeTokenAmount.toString() || "0", 18)
            : formik?.values?.opFlag
            ? parseUnits(nativeTokenAmount.toString() || "0", 18)
            : 0
        );
        // Already approved allowance for the native token
        const allowanceNativeToken =
          chainId == NetworkId.BaseSepolia ? allowanceAERO : allowanceOP;
        // if the allowance is less than the allowance amount
        if ((allowanceNativeToken || 0) < allowanceAmount) {
          // setting the native token loading state to true
          setTimeout(() => {
            setNativeTokenLoadingLocal(true);
          }, 600);
          approveNativeTokenDynamic(
            cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
            allowanceAmount
          );
          // refetching the new allowance
          refetchAllowance();
        } else {
          // setting the native allowance done state to true
          setNativeAllowanceDone(true);
        }
      } else {
        // calling the deposit function in the contract if only usda is selected
        callDepositFnInContract();
      }
    }
  }, [usdaApprovalReceiptReceipt, usdaAllowanceDone]);


// function to call the deposit function in the contract
  const callDepositFnInContract = () => {
    setTimeout(() => {
      setDcdsDepositLoadingLocal(true);
    }, 600);

    if (nativeFee?.nativeFee) {
      handleDcdsDeposit?.(
        [
          // token addresses
          [
            formik.values.usdaFlag ? usdaTokenAdds : zeroAddress,
            formik.values.usdtFlag ? usdtTokenAdds : zeroAddress,
            formik.values.opFlag || formik.values.aeroFlag
              ? nativeTokenAdds
              : zeroAddress,
          ],
          // token amount in wei
          [
            BigInt(
              usdaAmountLocal ? parseUnits(usdaAmountLocal.toString(), 6) : 0
            ),
            BigInt(
              usdtAmountLocal ? parseUnits(usdtAmountLocal.toString(), 6) : 0
            ),
            BigInt(
              formik.values.opFlag || formik.values.aeroFlag
                ? parseUnits(nativeTokenAmount?.toString() || "0", 18)
                : 0
            ),
          ],
          // liquidation gains
          liquidationGains,
          liquidationGains ? BigInt(liqAmnt.toString()) : 0n,
          BigInt(Number(lockInPeriodLocal || 0) * 86400000),
        ],
        nativeFee.nativeFee
      );
    }
  };

  // function to handle the deposit button click
  const handleDeposit = async () => {
    // checking if the user is connected
    if (!isConnected || !address) {
      openWalletPopup();
    }
    // checking if the user has selected any token
    if (selectedTokens.length === 0) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Please select token"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }
    // resetting the approve function and deposit fn
    resetFunctionState();
    // refetching already approved allowance  
    await refetchAllowance();
    // setting the deposit loading state to true
    setDcdsLoadingLocal(true);

    // checking if the usdt amount is greater than the deposit limit
    if (
      (GlobalContractData?.usdtAmountDepositedTillNow ?? 0n) >=
        USDT_DEPOSIT_LIMIT_IN_DCDS &&
      formik.values.usdaFlag
    ) {
      if (
        formik.values.usdaAmount == undefined ||
        formik.values.usdaAmount == 0
      ) {
        return;
      } else {
        const allowanceAmount = BigInt(
          formik.values.usdaAmount
            ? parseUnits(formik.values.usdaAmount.toString(), 6)
            : 0
        );
        // checking if the allowance is less than the allowance amount
        if ((allowanceUSDa || 0) < allowanceAmount) {
          setUsdaApproveLoadingLocal(true);
          approveUsdaDynamic(
            allowanceAmount,
            cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`
          );
          refetchAllowance();
        } else {
          setUsdaAllowanceDone(true);
        }

        return;
      }
    }
    if (formik.values.usdtFlag) {
      const allowanceAmount = BigInt(
        formik.values.usdtAmount
          ? parseUnits(formik.values.usdtAmount.toString(), 6)
          : 0
      );
      // checking if the allowance is less than the allowance amount
      if ((allowanceUSDT || 0) < allowanceAmount) {
        setUsdtApproveLoadingLocal(true);
        handleUsdtApprove([
          cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
          allowanceAmount,
        ]);
        refetchAllowance();
      } else {
        setUsdtAllowanceDone(true);
      }

      return;
    }
    if (formik.values.aeroFlag || formik.values.opFlag) {
      const allowanceAmount = BigInt(
        formik?.values?.aeroFlag
          ? parseUnits(nativeTokenAmount.toString() || "0", 18)
          : formik?.values?.opFlag
          ? parseUnits(nativeTokenAmount.toString() || "0", 18)
          : 0
      );
      const allowanceNativeToken =
        chainId == NetworkId.BaseSepolia ? allowanceAERO : allowanceOP;
      // checking if the allowance is less than the allowance amount
      if ((allowanceNativeToken || 0) < allowanceAmount) {
        setNativeTokenLoadingLocal(true);
        approveNativeTokenDynamic(
          cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
          allowanceAmount
        );
        refetchAllowance();
      } else {
        setNativeAllowanceDone(true);
      }

      return;
    }
  };

  const resetFunctionState = () => {
    resetUsdtApprove();
  };

  // This function show toast for success deposit and redirect to the portfolio page
  // reset page data, state for new deposit
  const handleDepositSuccess = () => {
    setIsScroll(true);
    setPortfolioTab("Deposited");
    resetLoadings();
    resetAllowanceDone();
    refetchAllowance();
    toast.custom((t) => {
      const link = `${scanUrls[chainId as keyof typeof scanUrls]}tx/${
        DepositdataReceipt?.transactionHash
      } `;
      return (
        <ToastNotification
          title="Deposit Successful"
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
    router.push("/dashboard/portfolio");
  };

  // This function show toast for failed deposit and reset the page data, state for new deposit
  const handleDepositFailure = () => {
    resetLoadings();
    resetAllowanceDone();
    refetchAllowance();
    toast.custom((t) => (
      <ToastNotificationError
        title="Transaction failed, Please try again"
        onClose={() => toast.dismiss(t)}
      />
    ));
  };
  // This function reset the loading state
  const resetLoadings = () => {
    setTimeout(() => {
      setDcdsLoadingLocal(false);
    }, 1000);
    setUsdtApproveLoadingLocal(false);
    setUsdaApproveLoadingLocal(false);
    setDcdsDepositLoadingLocal(false);
    setNativeTokenLoadingLocal(false);
  };

  // handle show scroll button for desktop of token input section
  const deviceType = useDeviceType();
  const showBack = deviceType === "mobile" || deviceType === "tablet";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // handle scroll down for desktop of token input section
  const handleScrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: 400,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // Check if the user is at the bottom
      if (scrollTop + clientHeight >= scrollHeight) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    }
  };
// Adding event listener for scroll
  useEffect(() => {
    const currentRef = scrollRef.current;

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // calculating the total deposit amount for showing in the ui 
  const depositValue = useMemo(() => {
    return (
      Number(formik.values?.usdaAmount) *
        Number(formatUnits(BigInt(getOraclePriceUSDa[0]), 18)) +
      Number(formik.values?.usdtAmount) *
        Number(formatUnits(BigInt(getOraclePriceUSDT[0]), 18)) +
      Number(formik.values?.opAmount) *
        Number(formatUnits(BigInt(getOraclePrice[0]), 18)) +
      Number(formik.values?.aeroAmount) *
        Number(formatUnits(BigInt(getOraclePrice[0]), 18))
    );
  }, [formik.values]);

  console.log(formik, depositValue, "depositValue");

  return (
    <div>
      <AppNavbar activeBack={showBack} />
      <div className="grid h-[97%] lg:grid-cols-4 grid-cols-1">
        <div className="lg:col-span-2 xl:col-span-1 flex flex-col p-5 md:px-16 md:py-5 lg:p-5 gap-8 border border-t-0 border-grayLight border-solid">
          {!isConnected && !address ? (
            <div className="flex w-full h-full text-lg dark:text-white text-center text-black justify-center items-center ">
              Please connect wallet
            </div>
          ) : isOmniChainDataPending ? (
            <PageLoader />
          ) : (
            tokenList.map((token: TokenDetails, key: number) => (
              <AddToken
                formik={formik}
                key={key}
                tokenDetails={token}
                setSelectedTokens={setSelectedTokens}
                selectedTokens={selectedTokens}
              />
            ))
          )}
        </div>

        <div className="hidden xl:flex col-span-2 flex-col items-center justify-center relative">
          <div className="relative h-full  flex flex-col items-center justify-center w-full">
            <div className="2xl:w-[600px] 3xl:w-[550px] 3xl:h-[550px] xl:w-[500px] xl:h-[500px] w-[400px]  2xl:h-[600px] h-[400px] flex items-center justify-center relative">
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
            {/* showing the selected tokens in the ui */}
            {selectedTokens.length > 0 && (
              <div className="w-[235px] z-[9] h-[235px] bg-gradient-to-b dark:bg-custom-gradient-to-top from-[#E5F3FF] to-[#FFFDE4] absolute rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
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
                        src={
                          theme === "dark" && token.tokenName === "USDa"
                            ? USDaIconGreen
                            : token?.tokenImage
                        }
                        alt={token?.tokenName}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  );
                })}

                <span className="text-[28px] font-medium mt-1 absolute bottom-6">
                  {selectedTokens[0].tokenLabel || selectedTokens[0].tokenName}
                  {selectedTokens.length > 1 &&
                    ` +${selectedTokens.length - 1}`}
                </span>
              </div>
            )}
          </div>
          <div className=" flex px-4 my-3 justify-center items-center w-full gap-14">
            {" "}
            <div
              className="absolute left-[2%] bottom-[2%]"
              onClick={() => setIsOpenHowItWork(true)}
            >
              <Typography
                className="text-black   cursor-pointer text-[18px] font-medium dark:text-white underline"
                size="lg"
                variant="regular"
              >
                How it works?
              </Typography>
            </div>
            <div className="bg-[#FFE0E0] dark:bg-[#380000]  ml-4 xl:ml-0 p-1 2xl:p-2">
              <Typography
                size="lg"
                className="text-[#FF0000] dark:text-[#FF1A1A] !text-[14px] 2xl:!text-[18px] font-medium"
                variant="regular"
              >
                dCDS will be exposed to ETH volatility risks.
              </Typography>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 xl:col-span-1 border border-solid border-grayLight border-t-0 flex flex-col justify-between">
          <div className=" p-5 md:px-16 md:py-5  lg:p-5 lg:pb-0">
            <span className="text-textBlack text-[24px] font-medium dark:text-white">
              Deposit Funds
            </span>
            <div
              ref={scrollRef}
              className="h-[200px]  2xl:h-[250px] overflow-y-auto no-scrollbar"
            >
              {/* mapping the selected tokens in the ui */}
              {selectedTokens.map((token, key) => (
                <div key={key} className="mt-4">
                  <Label
                    htmlFor={`token-${key}`}
                    className="text-grayLight text-lg font-medium"
                  >
                    {token.tokenLabel || token.tokenName}
                  </Label>
                  <div className="flex flex-nowrap">
                    <Input
                      onWheel={handleWheel}
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
                    {/* showing the token value in usd */}
                    <div className="p-1 flex justify-center items-center border-[1px] border-y border-x border-grayLight font-medium md:text-[20px] dark:text-[20px] border-l-0 text-grayLight">
                      <span>
                        $
                        {(
                          (Number(
                            formik.values[
                              `${token.tokenName?.toLocaleLowerCase()}Amount` as keyof FormValues
                            ]
                          ) *
                            Number(token?.tokenPrice || 0)) /
                          1e18
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[18px] font-medium text-grayLight">
                      {/* Min $100 */}
                      <Typography
                        size="sm"
                        variant="regular"
                        className="text-red-500"
                      >
                        {formik.errors?.[
                          `${token.tokenName.toLocaleLowerCase()}Amount` as keyof FormValues
                        ]
                          ? formik.errors?.[
                              `${token.tokenName.toLocaleLowerCase()}Amount` as keyof FormValues
                            ] === "max"
                            ? `Amount exceeded balance`
                            : formik.errors?.[
                                `${token.tokenName.toLocaleLowerCase()}Amount` as keyof FormValues
                              ]
                          : ""}
                      </Typography>
                    </span>
                    <span className="text-[18px] font-medium text-grayLight">
                      Bal {token.balanceAvailable}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-[30px] lg:pt-0 relative">
            {selectedTokens.length > 2 && !isAtBottom && (
              <ScrollDownArrow
                handleClick={handleScrollDown}
                classNames="top-[-26px] "
              />
            )}
            <div className=" px-5 md:px-16 md:py-5  lg:px-5 md:pb-0 ">
              <GenericDropdownMenu
                buttonText={
                  formik.values.lockInPeriod
                    ? `${formik.values.lockInPeriod} Days`
                    : "Lock-in Period"
                }
                items={dropdownItems}
                className="w-full text-[20px] 2xl:text-[24px] border border-grayLight"
                iconWrapBg="bg-white dark:bg-black"
              />
              <Typography size="sm" variant="regular" className="text-red-500">
                {formik.errors.lockInPeriod && formik.touched.lockInPeriod
                  ? formik.errors.lockInPeriod
                  : ""}
              </Typography>
            </div>
            <div className="p-5 md:px-16 md:py-5 md:pb-0 lg:pb-0 lg:p-5 flex   items-center justify-between w-full">
              <span className="text-grayLight flex flex-row items-center justify-start font-normal text-[16px]  2xl:text-[18px]">
                Opt for liquidation gains?
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info width={24} height={24} className="ml-2" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white dark:bg-black">
                    <p>liquidation gains</p>
                  </TooltipContent>
                </Tooltip>
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
            <div className=" md:px-16 md:py-5  md:pb-0 px-5 lg:px-5">
              <div className="p-3 bg-[#FFF0CA] text-[12px] text-grayLight font-medium dark:text-[#D6A100] dark:bg-[#4F3800] max-w-full">
                Note: Your amount will be used to offer protection to borrowers
                & protocol in return for fixed option fees.
              </div>
            </div>
            <div className=" px-5 py-3 md:px-16 md:py-5  lg:px-5">
              <DepositSummary
                apy="Expected range 5% to 200%"
                depositing={depositValue ? `$${depositValue.toFixed(2)}` : "-"}
              />
            </div>
            {/* showing the deposit button */}
            <div className=" h-[86px] overflow-hidden">
              {isConnected && address ? (
                !dcdsLoadingLocal && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="h-full">
                        <Button
                          disabled={
                            isFunctionPausedCDS_Deposit || allowanceLoading
                          }
                          type="submit"
                          onClick={() => formik.handleSubmit()}
                          className="bg-black text-white text-[24px] h-full w-full dark:bg-custom-gradient-to-bottom cursor-pointer"
                        >
                          {allowanceLoading ? (
                            <Spinner color="#fff" />
                          ) : (
                            "Deposit"
                          )}
                          <span className="text-base">
                            {isFunctionPausedCDS_Deposit && "(Paused)"}
                          </span>
                        </Button>
                      </div>
                    </TooltipTrigger>
                    {isFunctionPausedCDS_Deposit && (
                      <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                        <p>{"Cds Deposit is paused now"}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )
              ) : (
                <WalletConnectButton />
              )}

              {/* showing the loading box for the usdt approve */}

              <LoadingBox
                isLoading={usdtApproveLoadingLocal}
                isFailure={UsdtApprovalErrorReceipt || usdtApproveError}
                isSuccess={Boolean(UsdtApprovalSuccessReceipt)}
                setSuccessLoading={() => console.log(true)}
                heading="Approving USDT"
                loadingCount={
                  selectedTokens.length === 3
                    ? "2/4"
                    : selectedTokens.length === 2
                    ? selectedTokens.find((item) => item.tokenName === "USDa")
                        ?.tokenName
                      ? "2/3"
                      : "1/3"
                    : selectedTokens.length === 2
                    ? "1/2"
                    : "1/2"
                }
              />
              <LoadingBox
                isLoading={usdaApproveLoadingLocal}
                isFailure={usdaApprovalErrorReceipt || usdaApproveError}
                isSuccess={Boolean(usdaApprovalReceiptReceipt)}
                setSuccessLoading={() => console.log(true)}
                heading="Approving USDA+"
                loadingCount={
                  selectedTokens.length === 3
                    ? "1/4"
                    : selectedTokens.length === 2
                    ? selectedTokens.find((item) => item.tokenName === "USDa")
                        ?.tokenName
                      ? "1/3"
                      : "2/3"
                    : selectedTokens.length === 2
                    ? "1/2"
                    : "1/2"
                }
              />
              <LoadingBox
                isLoading={nativeTokenLoadingLocal}
                isFailure={
                  nativeApprovalErrorReceipt || nativeTokenApproveError
                }
                isSuccess={Boolean(nativeApprovalSuccessReceipt)}
                setSuccessLoading={() => console.log(true)}
                heading={`Approving ${
                  chainId === NetworkId.BaseSepolia ? "AERO" : "OP"
                }`}
                loadingCount={
                  selectedTokens.length === 3
                    ? "3/4"
                    : selectedTokens.length === 2
                    ? "2/3"
                    : selectedTokens.length === 2
                    ? "1/2"
                    : "1/2"
                }
              />
              <LoadingBox
                isLoading={dcdsDepositLoadingLocal}
                isFailure={dcdsDepositeError || cdsDepositErrorReceipt}
                isSuccess={Boolean(DepositdataReceipt)}
                setSuccessLoading={() => console.log(true)}
                heading="Depositing"
                loadingCount={
                  selectedTokens.length === 3
                    ? "4/4"
                    : selectedTokens.length === 2
                    ? "3/3"
                    : selectedTokens.length === 2
                    ? "2/2"
                    : "2/2"
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* showing the token tvl details */}
      <TokenTvlDetails
        icon={UsdtIcon}
        tokenName="USDT"
        tvl={`$${formatNumber(
          Number(formatUnits(BigInt(tvlValueUSDT || 0n), 6))
        )}`}
      />
      <TokenTvlDetails
        icon={theme === "dark" ? USDaIconGreen : USDaIcon}
        tokenName="USDA+"
        tvl={`$${formatNumber(Number(tvlValueUSDa || 0) / 1e6)} `}
      />
      <TokenTvlDetails
        icon={chainId === NetworkId.BaseSepolia ? AEROIcon : OPIcon}
        tokenName={chainId === NetworkId.BaseSepolia ? "AERO" : "OP"}
        tvl={`$${formatNumber(
          ((Number(tvlValueNative) || 0) * Number(getOraclePrice[0])) / 1e36
        )} `}
      />
      {/* showing the how it works popup */}
      <HowItWorksPopUp
        isDialogOpen={isOpenHowItWork}
        setIsDialogOpen={() => setIsOpenHowItWork(false)}
      />
      {/* showing the how it works button */}
      <HowItWorksButton handleClick={() => setIsOpenHowItWork(true)} />
    </div>
  );
}

export default WithPrivateRoute(DCDSTemplate);
