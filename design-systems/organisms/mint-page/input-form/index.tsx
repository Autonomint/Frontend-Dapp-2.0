import { usePortfolioTab } from "@/contexts/portfolio-tab";
import { useScroll } from "@/contexts/scroll";
import { Button } from "@/design-systems/atoms/button";
import { Input } from "@/design-systems/atoms/input";
import { Typography } from "@/design-systems/atoms/Typography";
import LoadingBox from "@/design-systems/molecule/LoadingBox";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import useDepositTokens from "@/hookes/contract-hooks/useMintUsds";
import displayNumberWithPrecision, {
  getBaseScanAdvancedFilterUrl,
  handleWheel,
  toLocalISOString,
} from "@/utils/helpers";
import { BACKEND_API_URL, explorerNames, scanUrls } from "@/utils/urls";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import useGetTvl from "@/hookes/contract-hooks/useGetLtv";

import * as Yup from "yup";

import { wrsETHABI } from "@/blockchain/abis/wrsETH";
import {
  borrowAssetsAddress,
  borrowCoreAddress,
  borrowDepositCoreAddress,
  borrowingContractAddress,
  borrowingDepositContractAddress,
  optionContractAddress,
} from "@/blockchain/contracts";
import { HoverCard } from "@/design-systems/atoms/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import WalletConnectButton from "@/design-systems/molecule/WalletConnectButton";
import { useFarmLuckDetails } from "@/hookes/api-hooks/useFarmyourLuckDetails";
import useGetBorrowSignedData from "@/hookes/api-hooks/useGetBorrowSignedData";
import { useGetTokenReward } from "@/hookes/api-hooks/useGetTokenReward";
import useFetchOptionFees from "@/hookes/api-hooks/useOptionFee";
import { useTrackUserData } from "@/hookes/api-hooks/useTrackUser";
import useApproveWrapEth from "@/hookes/contract-hooks/useApproveWrapEth";
import useBorrowPause from "@/hookes/contract-hooks/useBorrowPause";
import useGetOmniChainData from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import {
  BorrowAssetsEnum,
  NetworkId,
  tokenFormatDecimal,
} from "@/utils/constants";
import { calculateRemainingTimeDate } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EqualApproximately, Info } from "lucide-react";
import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import InputMetics from "../Input-metrics";
import { useLayerZeroMessages } from "@/hookes/contract-hooks/useLayerZeroMessages";
import Spinner from "@/design-systems/atoms/Spinner";
import useBorrowRatio from "@/hookes/contract-hooks/useBorrowRatio";
import useGetPositionList from "@/hookes/api-hooks/useGetPositionList";
import { optionABI } from "@/blockchain/abis/option";
import { GenericDropdownMenu } from "@/design-systems/atoms/DropdownCustom/GenericDropdownMenu";
import useGetKrwqPrice from "@/hookes/api-hooks/useGetKrwqPrice";
import useDepositStakeTokens from "@/hookes/contract-hooks/useStakeBorrow";

/**
 * Yup validation schema for the input form
 */
const formSchema = Yup.object({
  collateral: Yup.string().required("Collateral is required"),
  collateralAmount: Yup.number().max(
    Yup.ref("balance"),
    `Amount must be less than or equal to balance`,
  ),
  hedgeDuration: Yup.number()
    .required("Hedge duration is required")
    .positive("Hedge duration must be greater than 0")
    .typeError("Hedge duration must be a number")
    .required("Collateral amount is required"),
  strikePricePercent: Yup.number().required("Strike price is required"),
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
    unformattedValue,
  } = useGetUsdValue(
    borrowAssetsAddress[
      currency.toLocaleLowerCase() === "krwq"
        ? "ETH"
        : (currency as keyof typeof borrowAssetsAddress)
    ],
    currency.toLocaleLowerCase() === "krwq",
    currency.toLocaleLowerCase() === "eurc" ||
      currency.toLocaleLowerCase() === "hype",
    currency.toLocaleLowerCase() === "nvda",
  );

  // Selected asset price
  const selectedAssetPrice =
    currency.toLocaleLowerCase() == "eth" ? ethPrice : assetPrice;

  // Custom hook to check the pause state of borrow functions
  const { isFunctionPausedBorrow_Deposit } = useBorrowPause();

  // Custom hook to fetch the borrow signed data
  const { refetchBorrowSignedData } = useGetBorrowSignedData();

  // Custom hook to fetch the balance of the selected asset
  const ethBalance = useBalance({
    address: address,
    token:
      currency.toLocaleLowerCase() !== "eth" &&
      currency.toLocaleLowerCase() !== "hype"
        ? borrowAssetsAddress[currency as keyof typeof borrowAssetsAddress][
            chainId || NetworkId.BaseSepolia
          ]
        : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  console.log(
    ethBalance,
    borrowAssetsAddress[currency as keyof typeof borrowAssetsAddress][chainId],
    "useBalance",
  );
  // Formatted balance of the selected asset
  const formattedBalance = Number(ethBalance.data?.formatted || 0).toFixed(
    tokenFormatDecimal[currency as keyof typeof tokenFormatDecimal],
  );

  const contract =
    currency === "cbBTC" ||
    currency === "KRWQ" ||
    currency === "EURC" ||
    currency === "NVDA"
      ? borrowDepositCoreAddress
      : borrowingDepositContractAddress;

  // fetching allowance
  const { data: allowance } = useReadContract({
    abi: wrsETHABI,
    address:
      borrowAssetsAddress[currency as keyof typeof borrowAssetsAddress][
        chainId || NetworkId.BaseSepolia
      ],
    functionName: "allowance",
    args: [address, contract[chainId as keyof typeof contract]],
  }) as { data: number | undefined };

  const {
    omniChainDataEth,
    omniChainDataCbbtc,
    omniChainDataKrwq,
    omniChainDataEURC,
    omniChainDataHype,
    omniChainDataNVDA,
  } = useGetOmniChainData();

  const omniChainDataMap = {
    ETH: omniChainDataEth,
    weETH: omniChainDataEth,
    wrsETH: omniChainDataEth,
    wsuperOETHb: omniChainDataEth,
    cbBTC: omniChainDataCbbtc,
    KRWQ: omniChainDataKrwq,
    EURC: omniChainDataEURC,
    Hype: omniChainDataHype,
    NVDA: omniChainDataNVDA,
  };

  const maxMintAmount =
    Number(
      omniChainDataMap[currency as keyof typeof omniChainDataMap]
        ?.totalCdsDepositedAmount || 0,
    ) /
    1e6 /
    0.2 /
    (assetPrice / (currency === "ETH" || currency === "cbBTC" ? 1e2 : 1));
  console.log(maxMintAmount, "maxMintAmount");

  useEffect(() => {
    formik.setFieldValue("maxMintAmount", maxMintAmount);
  }, [maxMintAmount]);

  // handle mint btn click
  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const { submitType, ...formValues } = values;
    const isStake = submitType === "stake";
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

    if (Number(formatUnits(BigInt(ratioValue || 0), 5)) < 0.2) {
      toast.custom((t) => (
        <ToastNotificationError
          title={`The current (dCDS liquidity / Total ${currency} hedged) ratio is below 0.2. Once the ratio moves above 0.2 — due to new dCDS deposits, a rise in ${currency} price, or the expiry of active ${currency} hedges — users will be able to mint USDA+ and receive the ${currency} hedge.`}
          onClose={() => toast.dismiss(t)}
          width="!w-[500px]"
        />
      ));
      return;
    }
    // set the loading state to true
    setMintBtnLoading(true);

    reset();

    // parse the amount to be minted
    const approveAmount =
      currency === "cbBTC" || currency === "NVDA"
        ? parseUnits(formik.values.collateralAmount.toString(), 8)
        : currency === "EURC" || currency === "HYPE"
          ? parseUnits(formik.values.collateralAmount.toString(), 6)
          : parseEther(formik.values.collateralAmount.toString());

    if (
      ["wrsETH", "weETH", "wsuperOETHb", "cbBTC", "KRWQ", "EURC", "NVDA"].includes(
        currency,
      ) &&
      BigInt(allowance || 0) < approveAmount
    ) {
      // check if allowance is less than approve amount
      setApproveLoading(true);

      await approveWrapETHDynamic(
        contract[chainId as keyof typeof contract] as `0x${string}`,
        currency === "cbBTC" || currency === "NVDA"
          ? parseUnits(formik.values.collateralAmount.toString(), 8)
          : currency === "EURC" || currency === "HYPE"
            ? parseUnits(formik.values.collateralAmount.toString(), 6)
            : parseEther(formik.values.collateralAmount.toString()),
      );
      // else mining directly
    } else {
      handleMint(formik.values, isStake);
    }
  };

  // Formik form values
  const formik = useFormik({
    initialValues: {
      collateral: currency || "eth", // assets type
      collateralAmount: 0, // collateral amount
      strikePricePercent: 0, // strike price percent
      balance: 0, // balance
      hedgeDuration: null, // hedge duration
      submitType: "mint", // tracks which button was clicked
      maxMintAmount: 0,
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  const { ratioValue, refetchRatio, ratioError } = useBorrowRatio(
    BigInt(parseUnits(formik.values.collateralAmount.toString(), 18)),
    currency as keyof typeof BorrowAssetsEnum,
  );
  console.log(
    ratioValue,
    parseUnits(formik.values.collateralAmount.toString(), 18),
    ratioError,
    "ratioValue",
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
  const { isTvlPending, tvlValue: ltv } = useGetTvl(
    BorrowAssetsEnum[currency as keyof typeof BorrowAssetsEnum],
  );

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

  // Custom hook to fetch the deposit data hash for the contract
  const {
    depositStakeDatahash,
    depositStakeError,
    isDepositsStakeLoading,
    mintStakeUSDa,
    resetStake,
  } = useDepositStakeTokens({
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
      },
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
            linkText={explorerNames[Number(chainId)] || "View On Explorer"}
            linkUrl={link}
            onClose={() => toast.dismiss(t)}
          />
        );
      });
      // const assetName =
      //   BorrowAssetsEnum[currency as keyof typeof BorrowAssetsEnum];
      // const contractAddress =
      //   assetName === 12 || assetName === 13
      //     ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress]
      //     : borrowingContractAddress[
      //         chainId as keyof typeof borrowingContractAddress
      //       ];

      // getBaseScanAdvancedFilterUrl(contractAddress, address || zeroAddress);
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
    setTimeout(() => {
      setMintBtnLoading(false);
    }, 800);
  };

  //getting option fees for selected amount
  const { optionFees, refetchOptionFee, Fees } = useFetchOptionFees(
    String(formik.values.collateralAmount),
    (currency === "KRWQ" || currency === "NVDA"
      ? parseUnits(String(assetPrice), 8)
      : currency === "EURC" || currency === "HYPE"
        ? parseUnits(String(assetPrice), 6)
        : assetPrice || 0) as number,
    formik.values.strikePricePercent,
    currency === "cbBTC"
      ? "BTC"
      : currency === "KRWQ"
        ? "krwq"
        : currency === "EURC"
          ? "EURC"
          : currency === "HYPE"
            ? "HYPE"
            : currency === "NVDA"
              ? "NVDA"
              : "ETH",
    Number(formik.values.hedgeDuration),
  );
  console.log(assetPrice, "assetPrice");
  // Custom hook to fetch the current strike price percent limit
  const { data: currentStrikePricePercentLimit } = useReadContract({
    abi: optionABI,
    address: optionContractAddress[
      chainId as keyof typeof optionContractAddress
    ] as `0x${string}`,
    functionName: "strikePricePercentLimits_",
    args: [
      BorrowAssetsEnum[currency as keyof typeof BorrowAssetsEnum],
      formik.values.hedgeDuration || 1n,
    ],
    query: {
      select: (data) => Number(data || 0) / 100,
    },
  });

  // set the strike price percent to formik values
  useEffect(() => {
    formik.setFieldValue(
      "strikePricePercent",
      Number(currentStrikePricePercentLimit || 0),
    );
  }, [currentStrikePricePercentLimit]);

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
    currency,
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
      handleMint(formik.values, formik.values.submitType === "stake");
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

  async function handleMint(values: any, isStake: boolean) {
    // get the strike percent
    const strikePercent = values.strikePricePercent;
    // fetch the borrow signed data
    const borrowSignedData = await refetchBorrowSignedData({
      token: currency === "KRWQ" ? "krwq" : currency,
      duration: Number(formik.values.hedgeDuration),
    });

    const data = optionFees;
    if (data != undefined && nativeFee != undefined && !isStake) {
      setApproveLoading(false);
      setTimeout(() => {
        setMintLoading(true);
      }, 1000);
      // calling the mint usda function in the contract
      mintUSDa?.({
        depositingAmount:
          currency === "cbBTC" || currency === "NVDA"
            ? parseUnits(formik.values.collateralAmount.toString(), 8)
            : currency === "EURC"
              ? parseUnits(formik.values.collateralAmount.toString(), 6)
              : parseEther(formik.values.collateralAmount.toString()),
        assetName: BorrowAssetsEnum[currency as keyof typeof BorrowAssetsEnum],
        value:
          currency === "cbBTC" ||
          currency === "KRWQ" ||
          currency === "EURC" ||
          currency === "NVDA"
            ? undefined
            : chainId === NetworkId.Ethereum
              ? parseEther(formik.values.collateralAmount.toString())
              : currency.toLocaleLowerCase() == "eth"
                ? parseEther(formik.values.collateralAmount.toString()) +
                  nativeFee.nativeFee
                : currency === "HYPE"
                  ? parseEther(formik.values.collateralAmount.toString())
                  : nativeFee.nativeFee,
        hedgeDuration: BigInt(formik.values.hedgeDuration || 0),
        ethPrice: BigInt(borrowSignedData?.ethPrice || 0),
        verifyParams: borrowSignedData,
      });
    }
    if (data != undefined && nativeFee != undefined && isStake) {
      setApproveLoading(false);
      setTimeout(() => {
        setMintLoading(true);
      }, 1000);
      // calling the mint usda function in the contract
      mintStakeUSDa?.({
        depositingAmount:
          currency === "cbBTC" || currency === "NVDA"
            ? parseUnits(formik.values.collateralAmount.toString(), 8)
            : parseEther(formik.values.collateralAmount.toString()),
        assetName: BorrowAssetsEnum[currency as keyof typeof BorrowAssetsEnum],
        value:
          currency === "cbBTC" ||
          currency === "KRWQ" ||
          currency === "EURC" ||
          currency === "HYPE" ||
          currency === "NVDA"
            ? undefined
            : chainId === NetworkId.Ethereum
              ? parseEther(formik.values.collateralAmount.toString())
              : currency.toLocaleLowerCase() == "eth"
                ? parseEther(formik.values.collateralAmount.toString()) +
                  nativeFee.nativeFee
                : nativeFee.nativeFee,
        hedgeDuration: BigInt(formik.values.hedgeDuration || 0),
        ethPrice:
          currency === "KRWQ"
            ? BigInt(borrowSignedData?.ethPrice || 0)
            : undefined,
        verifyParams: borrowSignedData,
      });
    }
  }

  /**
   * Handles the calculation and setting of the usda to be minted and downside protection amounts.
   */
  console.log(selectedAssetPrice, "selectedAssetPrice");
  const CalculateAmtToBeMinted = async () => {
    try {
      // Calculate the usda to be minted
      const optionf = optionFees || 0;
      // calculate the usda to be minted
      const usdaToMint =
        (Number(formik.values.collateralAmount || 0) *
          Number(selectedAssetPrice || 0) *
          Number(ltv?.LTV || 0)) /
        (currency === "KRWQ" ||
        currency === "EURC" ||
        currency === "HYPE" ||
        currency === "NVDA"
          ? 100
          : 10000);
      // display the usda to be minted with 2 decimal places
      const udsa2Decimal = displayNumberWithPrecision(usdaToMint.toString());
      // set the usda to be minted
      setUsdaToBeMinted((Number(udsa2Decimal) - Number(optionf)).toFixed(2));

      // Calculate the downside protection amount
      const downsideProtection =
        (Number(formik.values.collateralAmount || 0) *
          Number(selectedAssetPrice || 0) *
          (100 - (ltv?.LTV ? Number(ltv?.LTV) : 0))) /
        (currency === "KRWQ" ||
        currency === "EURC" ||
        currency === "HYPE" ||
        currency === "NVDA"
          ? 100
          : 10000);

      // display the downside protection amount with 2 decimal places
      const downsideProtection2Decimal = displayNumberWithPrecision(
        downsideProtection.toString(),
      );

      // calculate the upside collateral
      const upsideCollateral =
        (Number(formik.values.collateralAmount || 0) *
          Number(selectedAssetPrice || 0) *
          formik.values.strikePricePercent) /
        (currency === "KRWQ" ||
        currency === "EURC" ||
        currency === "HYPE" ||
        currency === "NVDA"
          ? 100
          : 10000);
      setUpsideCollateral(upsideCollateral);
      setDownsideProtectionAmnt(downsideProtection2Decimal);
    } catch (error) {}
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
      Number(ethBalance.data?.formatted || 0),
    );
  };

  // hook for getting the farm your luck data (current reward data) from the backend api for showing point boaster in ui
  const {
    data: farmLuckDetails,
    isLoading: isFarmLuckLoading,
    refetch: refetchFarmLuckDetails,
  } = useFarmLuckDetails(address, chainId);

  // get user tracking data and setter function
  const {
    userTrackingData,
    setUserTrackLocalStorageData,
    getUserTrackLocalStorageData,
  } = useTrackUserData();

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

  const { tokenRewardDetailList } = useGetTokenReward();

  const tokenRewardDetailBorrow =
    tokenRewardDetailList?.[
      currency === "KRWQ"
        ? "krwq"
        : (currency as keyof typeof tokenRewardDetailList)
    ];

  // boaster from farm your luck
  const luckBoaster =
    calculateRemainingTimeDate(farmLuckDetails?.deadLine5xTimestamp || "")
      .minutes > 0 &&
    calculateRemainingTimeDate(farmLuckDetails?.deadLine10xTimestamp || "")
      .minutes > 0
      ? 10
      : calculateRemainingTimeDate(farmLuckDetails?.deadLine5xTimestamp || "")
            .minutes > 0
        ? 5
        : calculateRemainingTimeDate(
              farmLuckDetails?.deadLine10xTimestamp || "",
            ).minutes > 0
          ? 10
          : 0;

  // total boaster for token
  const totalBooster =
    (tokenRewardDetailBorrow
      ? Number(tokenRewardDetailBorrow?.assetBooster ?? 0)
      : 0) + luckBoaster;

  // Finding the max timestamp
  const totalTimeStamp = Math.max(
    farmLuckDetails?.deadLine5xTimestamp
      ? // convert date to timestamp
        new Date(farmLuckDetails.deadLine5xTimestamp).getTime() / 1000
      : 0,
    farmLuckDetails?.deadLine10xTimestamp
      ? // convert date to timestamp
        new Date(farmLuckDetails.deadLine10xTimestamp).getTime() / 1000
      : 0,
    // timestamp for campaign booster
    Number(tokenRewardDetailBorrow?.assetBoosterValidity ?? 0),
  );

  // calculate the point based on depositing amount
  const depositTokenPoint =
    (tokenRewardDetailBorrow?.minAmount || 0) <=
    Number(formik.values.collateralAmount || 0)
      ? Number(
          formik.values.collateralAmount /
            (tokenRewardDetailBorrow?.minAmount || 0) || 0,
        ) * Number(tokenRewardDetailBorrow?.pointsToBeGiven || 0)
      : 0;

  // calculate the total point
  const totalPoint = depositTokenPoint * totalBooster;

  // calculate the point based on token boaster
  const tokenBoasterPoint = totalPoint - depositTokenPoint;

  // calculate the liquidation price
  const LiquidationPrice = useMemo(() => {
    return (
      ((Number(selectedAssetPrice) /
        (currency === "EURC" || currency === "HYPE" || currency === "NVDA" ? 1 : 100)) *
        80) /
      100
    ).toFixed(currency === "KRWQ" ? 8 : 2);
  }, [selectedAssetPrice, currency]);

  const hedgeDurationOption = [
    {
      label: "1 Day",
      onClick: () => formik.setFieldValue("hedgeDuration", "1"),
    },
    ...(currency === "KRWQ" || currency === "EURC"
      ? []
      : [
          {
            label: "1 Week",
            onClick: () => formik.setFieldValue("hedgeDuration", "7"),
          },
          {
            label: "1 Month",
            onClick: () => formik.setFieldValue("hedgeDuration", "30"),
          },
        ]),
  ];
  console.log(currency, currency === "KRWQ" || currency === "EURC", "KRWQ");
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col p-6 gap-[18px] relative">
        <div className="flex justify-between items-center">
          <div className=" font-medium text-2xl">Mint USDA+</div>
          <div className="flex justify-end items-center gap-1">
            {!!totalBooster &&
              calculateRemainingTimeDate(
                toLocalISOString(new Date(totalTimeStamp * 1000)),
              ).minutes > 0 &&
              totalBooster > 1 && (
                <div className="badge pulsate w-fit  text-[14px] flex justify-center items-center rounded-full border-[2px] border-green-500 font-bold text-green-600 dark:text-green-400 bg-[#22c55e96] px-1 py-[2px]">
                  {totalBooster}x Points
                </div>
              )}
          </div>
        </div>
        <div className="flex flex-col gap-[18px] ">
          <div className="flex flex-col">
            <div className="flex-col gap-1 justify-start">
              <div className="w-full text-[14px] 3xl:text-lg flex justify-between items-center">
                <div>
                  <span className="text-grayLight">Max Mint Amount:</span>{" "}
                  <span>{maxMintAmount.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-grayLight">{currency} Price: </span>{" "}
                  <span className=" dark:text-white text-textBlack font-semibold ml-1">
                    $
                    {currency === "KRWQ" ||
                    currency === "EURC" ||
                    currency === "HYPE"
                      ? Number(selectedAssetPrice)
                      : Number(selectedAssetPrice) / 100 || 0}
                  </span>
                </div>
              </div>
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
              <span className="  text-[14px] 3xl:text-lg text-grayLight">
                <span className="">Bal:</span>{" "}
                <span className="ml-1 dark:text-white font-semibold  text-textBlack">
                  {formattedBalance}
                </span>{" "}
                <span className="ml-1 dark:text-white font-semibold text-textBlack">
                  {currency}
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[18px]">
            <div className="">
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
              <div className="w-full text-[14px] 3xl:text-lg flex justify-end items-center">
                <span className="dark:text-grayLight text-grayLight">
                  Liquidation Price:{" "}
                </span>{" "}
                <span className="text-black font-semibold dark:text-white ml-1 flex items-center gap-1">
                  <EqualApproximately className="stroke-black dark:stroke-white w-[18px] h-[18px]" />{" "}
                  ${LiquidationPrice || 0}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <span className=" font-medium text-lg text-grayLight">
                    {currentStrikePricePercentLimit}% of collateral upside
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="">
                        <Info className="stroke-grayLight w-[18px] h-[18px]" />
                      </div>
                    </TooltipTrigger>
                    {
                      <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                        <p>
                          This {currentStrikePricePercentLimit}% of your
                          collateral upside will be shared proportionally with
                          dCDS users.
                        </p>
                      </TooltipContent>
                    }
                  </Tooltip>
                </div>

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
                          {currency}
                        </span>
                        <span className="font-medium text-black dark:text-white">
                          {Math.round(depositTokenPoint)}
                        </span>
                      </div>
                      <div className="flex  justify-between">
                        <span className="font-medium text-grayLight">
                          Boosted
                        </span>
                        <span className="font-medium text-black dark:text-white">
                          {Math.round(tokenBoasterPoint)}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCard>
                <span className=" font-medium text-lg dark:text-white text-black flex items-center gap-1">
                  <EqualApproximately className="stroke-black dark:stroke-white w-[18px] h-[18px]" />{" "}
                  {Math.round(totalPoint)}
                </span>
              </div>

              <div>
                <GenericDropdownMenu
                  buttonText={
                    formik.values.hedgeDuration
                      ? `${formik.values.hedgeDuration} days`
                      : "Hedge Duration"
                  }
                  items={hedgeDurationOption}
                  className={`w-full mt-3 text-[20px] 2xl:text-[20px] border ${
                    formik.touched.hedgeDuration && formik.errors.hedgeDuration
                      ? "border-red-500"
                      : "border-grayLight"
                  } h-[44px]`}
                  iconWrapBg="bg-white dark:bg-black"
                />
                {formik.touched.hedgeDuration &&
                  formik.errors.hedgeDuration && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.hedgeDuration}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/*  displaying the input metrics */}
        <InputMetics
          deposit={(
            (Number(selectedAssetPrice || 0) /
              (currency === "KRWQ" ||
              currency === "EURC" ||
              currency === "HYPE" ||
              currency === "NVDA"
                ? 1
                : 100)) *
            Number(formik.values.collateralAmount)
          ).toFixed(2)}
          optionFees={Number(optionFees).toFixed(2)}
          usdaBorrowed={usdaToBeMinted == "0" ? "0.00" : usdaToBeMinted}
          Dp={Number(downsideProtectionAmnt).toFixed(2)}
        />
      </div>
      <div className="col-span-1 overflow-hidden h-[85px]">
        {address && isConnected ? (
          !mintBtnLoading && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-full flex p-2 gap-2">
                  <Button
                    disabled={isFunctionPausedBorrow_Deposit}
                    type="submit"
                    className={`
                    bg-black dark:bg-custom-gradient-to-top py-6
                    text-white font-semibold text-[24px] w-full h-full rounded-[12px]`}
                  >
                    {!mintBtnLoading ? "Mint USDA+" : <Spinner color="#fff" />}
                    <span className="text-base">
                      {isFunctionPausedBorrow_Deposit && "(Paused)"}
                    </span>
                  </Button>

                  {(currency === "KRWQ" || currency === "EURC") && (
                    <Button
                      disabled={isFunctionPausedBorrow_Deposit}
                      type="submit"
                      name="stake"
                      onClick={(e) => {
                        formik.setFieldValue("submitType", "stake");
                      }}
                      className={`
                    bg-black dark:bg-custom-gradient-to-top py-6
                    text-white font-semibold text-[24px] w-full h-full rounded-[12px]`}
                    >
                      {!mintBtnLoading ? (
                        "Mint & Stake"
                      ) : (
                        <Spinner color="#fff" />
                      )}
                      <span className="text-base">
                        {isFunctionPausedBorrow_Deposit && "(Paused)"}
                      </span>
                    </Button>
                  )}
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
