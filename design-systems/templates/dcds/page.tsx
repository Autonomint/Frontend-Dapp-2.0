"use client";
import USDaIconGreen from "@/app/assets/brand-logo-small-green.svg";
import UsdtIcon from "@/app/assets/cryptocurrency-color_usdt.svg";
import dcdsDark from "@/app/assets/dcds-ring-dark.svg";
import dcdsFrame from "@/app/assets/dcds-ring-light.svg";
import USDaIcon from "@/app/assets/logo.svg";
import { Button } from "@/design-systems/atoms/button";
import { Input } from "@/design-systems/atoms/input";
import { Label } from "@/design-systems/atoms/label";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import AEROIcon from "@/app/assets/aero-icon.png";
import OPIcon from "@/app/assets/optimism.png";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { mpoABI } from "@/blockchain/abis/mpo";
import { cdsAddress, mpoAddress } from "@/blockchain/contracts";
import { config } from "@/blockchain/WalletConfigs/iindex";
import { usePortfolioTab } from "@/contexts/portfolio-tab";
import { useScroll } from "@/contexts/scroll";
import { Checkbox } from "@/design-systems/atoms/checkbox";
import { GenericDropdownMenu } from "@/design-systems/atoms/DropdownCustom/GenericDropdownMenu";
import Spinner from "@/design-systems/atoms/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Typography } from "@/design-systems/atoms/Typography";
import LoadingBox from "@/design-systems/molecule/LoadingBox";
import PageLoader from "@/design-systems/molecule/page-loader";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import ScrollDownArrow from "@/design-systems/molecule/scroll-down-button";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import WalletConnectButton from "@/design-systems/molecule/WalletConnectButton";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import AddToken from "@/design-systems/organisms/dcds/add-token";
import DepositSummary from "@/design-systems/organisms/dcds/deposit-summary";
import HowItWorksPopUp from "@/design-systems/organisms/dcds/how-it-works";
import HowItWorksButton from "@/design-systems/organisms/dcds/how-it-works-button";
import TokenTvlDetails from "@/design-systems/organisms/dcds/TokenTvlDetails";
import useCdsPause from "@/hookes/contract-hooks/useCdsPause";
import useDcdsDeposit from "@/hookes/contract-hooks/useDepositDcds";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import { useGetTVLBothChain } from "@/hookes/contract-hooks/useGetTVLUSDA";
import useGetUsdtAmountDepositedTillNow from "@/hookes/contract-hooks/useGetUsdtMintTillNow";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import useDeviceType from "@/hookes/useDeviceType";
import { AssetStatus, NetworkId, scanUrls } from "@/utils/constants";
import {
  formatNumber,
  getTotalDepositingAmount,
  handleWheel,
} from "@/utils/helpers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useFormik } from "formik";
import { Info } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Abi, erc20Abi, formatUnits, parseUnits, zeroAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import * as Yup from "yup";
import { FormValues, TokenDetails } from "./interface";
import { usePoint } from "@/hookes/api-hooks/usePoint";
import { getIconMapping } from "@/utils/token-config";

// Form schema for the dcds template
const createFormSchema = (tokenList: TokenDetails[]) => {
  const schema: Record<string, any> = {};

  // Add flag for each token
  tokenList.forEach((token) => {
    const flagName = `${token.tokenName.toLowerCase()}Flag`;
    schema[flagName] = Yup.boolean();
  });

  // Add amount validation for each token
  tokenList.forEach((token) => {
    const amountName = `${token.tokenName.toLowerCase()}Amount`;
    schema[amountName] = Yup.mixed()
      .test(
        "is-required",
        `${token.tokenName} amount is required`,
        function (value) {
          return this.parent[`${token.tokenName.toLowerCase()}Flag`]
            ? value !== null && value !== undefined && value !== 0
            : true;
        }
      )
      .test("max", "max", function (value) {
        const {
          [amountName]: amount,
          [`${token.tokenName.toLowerCase()}Balance`]: balance,
        } = this.parent;
        if (amount) {
          return Number(value) <= Number(token.tokenCount || 0);
        }
        return true;
      })
      .test("is-valid-number", "Value must be greater than 0", (value) => {
        if (value === null || value === undefined) {
          return true;
        }
        return Number(value) >= 0;
      })
      .nullable();
  });

  return Yup.object().shape(schema);
};

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

  const [dcdsDepositLoadingLocal, setDcdsDepositLoadingLocal] =
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
  const formik = useFormik<Record<string, any>>({
    initialValues: {
      lockInPeriod: null,
      liquidationGains: false,
    },
    validationSchema: createFormSchema(selectedTokens),
    onSubmit: (values) => {
      handleDeposit();
    },
  });

  console.log(formik, "formik.values");

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

  // Define the initial state for the options variable
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(400000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(options, 1);

  const { omniChainData: GlobalContractData, isOmniChainDataPending } =
    useGetUsdtAmountDepositedTillNow();

  //checking is Cds Deposit pause or not
  const { isFunctionPausedCDS_Deposit } = useCdsPause();

  // getting current LTV value
  const { data: usdtLimit, refetch: refetchCurrentData } = useReadContract({
    abi: cdsAbi,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: "usdtLimit",
  });

  const USDT_DEPOSIT_LIMIT_IN_DCDS = Number(usdtLimit || 0) / 1e6;

  // assigning the formik values to the local variables because getting old values from formik directly
  const liquidationGains = formik.values.liquidationGains;
  const lockInPeriodLocal = formik.values.lockInPeriod;

  // fetching the prices from the contract of usda, usdt and native token from the blockchain
  const { data: getPrices } = useReadContract({
    address: cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
    abi: cdsAbi,
    functionName: "getPrices",
    args: [selectedTokens.map((token) => token.tokenAddress as `0x${string}`)],
    query: {
      enabled:
        formik.values.usdaFlag ||
        formik.values.usdtFlag ||
        formik.values.opFlag ||
        formik.values.aeroFlag,
    },
  }) as any;

  console.log(getPrices, "getPrices");

  // calculating the liquidation amount
  // this will run when token amount is changed
  const liqAmnt = useMemo(() => {
    let res = 0;
    if (selectedTokens.length > 0 && getPrices?.length > 0) {
      res = getTotalDepositingAmount(
        getPrices,
        // token addresses
        selectedTokens.map((token) => token.tokenAddress as `0x${string}`),
        //  amount in wei
        selectedTokens.map((token) => {
          return BigInt(
            formik.values[`${token.tokenName.toLowerCase()}Amount`]
              ? parseUnits(
                  formik.values[
                    `${token.tokenName.toLowerCase()}Amount`
                  ].toString(),
                  Number(token.tokenDecimals)
                )
              : 0
          );
        }),

        selectedTokens.map((token) => token.tokenDetails)
      );
    }
    return res;
  }, [
    formik.values.aeroAmount,
    formik.values.opAmount,
    formik.values.usdaAmount,
    formik.values.usdtAmount,
    getPrices,
  ]);

  console.log(liqAmnt, "liqAmnt");

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

  // function to call the deposit function in the contract
  const callDepositFnInContract = () => {
    setTimeout(() => {
      setDcdsDepositLoadingLocal(true);
    }, 600);

    if (nativeFee?.nativeFee) {
      handleDcdsDeposit?.(
        [
          // token addresses
          tokenList.map((token) => {
            const tokenDetail = selectedTokens.find((selectedToken) => {
              return selectedToken.tokenAddress === token.tokenAddress;
            });
            return (tokenDetail?.tokenAddress ?? zeroAddress) as `0x${string}`;
          }),
          // token amount in wei
          tokenList.map((token) => {
            const tokenDetail = selectedTokens.find((selectedToken) => {
              return selectedToken.tokenAddress === token.tokenAddress;
            });
            return formik.values[
              `${tokenDetail?.tokenName.toLowerCase()}Amount`
            ]
              ? parseUnits(
                  formik.values[
                    `${tokenDetail?.tokenName.toLowerCase()}Amount`
                  ].toString(),
                  Number(tokenDetail?.tokenDecimals)
                )
              : 0n;
          }),
          // liquidation gains
          liquidationGains,
          liquidationGains ? BigInt(liqAmnt.toString()) : 0n,
          BigInt(Number(lockInPeriodLocal || 0) * 86400000),
        ],
        nativeFee.nativeFee
      );
    }
  };

  const {
    writeContractAsync: approveTokenDynamicAsync,
    isPending: approveTokenDynamicLoading,
    isSuccess: approveTokenDynamicSuccess,
    reset: resetApproveTokenDynamic,
  } = useWriteContract({
    mutation: {
      onError: () => {
        handleDepositFailure();
      },
    },
  });

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
    // setting the deposit loading state to true
    setDcdsLoadingLocal(true);

    // checking if the usdt amount is greater than the deposit limit

    let currentTransactionCount = 1;

    for (const token of selectedTokens) {
      // setting the current token approving state to true
      setTimeout(() => {
        formik.setFieldValue(`${token.tokenName.toLowerCase()}Approving`, true);
      }, 1000);

      currentTransactionCount++;
      // current token allowance amount
      const allowanceAmount = BigInt(
        parseUnits(
          formik.values[`${token.tokenName.toLowerCase()}Amount`].toString(),
          Number(token.tokenDecimals)
        )
      );
      // checking if the allowance is less than the allowance amount
      if (Number(token.allowance || 0) < Number(allowanceAmount)) {
        // setting the approve loading state to true
        const tx = await approveTokenDynamicAsync({
          abi: erc20Abi,
          address: token?.tokenAddress as `0x${string}`,
          functionName: "approve",
          args: [
            cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
            allowanceAmount,
          ],
        });
        // waiting for the transaction receipt
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: tx,
        });
        // setting the approve success state to true
        if (transactionReceipt) {
          formik.setFieldValue(
            `${token.tokenName.toLowerCase()}ApproveSuccess`,
            true
          );
        } else {
          // setting the approve failure state to true
          formik.setFieldValue(
            `${token.tokenName.toLowerCase()}ApproveFailure`,
            true
          );
        }
        // setting the approve loading state to false
        formik.setFieldValue(
          `${token.tokenName.toLowerCase()}Approving`,
          false
        );
      }
    }

    callDepositFnInContract();

    return;
  };

  const resetFunctionState = () => {
    resetApproveTokenDynamic();
  };

  // This function show toast for success deposit and redirect to the portfolio page
  // reset page data, state for new deposit
  const handleDepositSuccess = () => {
    setIsScroll(true);
    setPortfolioTab("Deposited");
    resetLoadings();
    handleResetTransactionState();
    refetchAllowanceDynamic();
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

  const handleResetTransactionState = () => {
    selectedTokens.forEach((token) => {
      formik.setFieldValue(`${token.tokenName.toLowerCase()}Approving`, false);
    });
    selectedTokens.forEach((token) => {
      formik.setFieldValue(
        `${token.tokenName.toLowerCase()}ApproveSuccess`,
        false
      );
    });
    selectedTokens.forEach((token) => {
      formik.setFieldValue(
        `${token.tokenName.toLowerCase()}ApproveFailure`,
        false
      );
    });
  };

  // This function show toast for failed deposit and reset the page data, state for new deposit
  const handleDepositFailure = () => {
    resetLoadings();
    handleResetTransactionState();
    refetchAllowanceDynamic();
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
    return selectedTokens.reduce((total, token) => {
      const amount = Number(
        formik.values[`${token.tokenName.toLowerCase()}Amount`] || 0
      );
      const price = Number(token.tokenPrice || 0);

      return total + amount * price;
    }, 0);
  }, [formik.values, selectedTokens]);

  console.log(formik, depositValue, "depositValue");

  // fetching list of the token addresses for the deposit
  const { data: tokenAddress } = useReadContract({
    address: cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
    abi: cdsAbi,
    functionName: "getSupportedTokenAddresses",
    query: {
      placeholderData: [],
    },
  }) as { data: `0x${string}`[] };

  console.log(tokenAddress, "tokenAddress");

  // fetching the token details for the deposit (name, symbol, decimals)
  const { data: tokenDetailsList } = useReadContracts({
    contracts: tokenAddress?.flatMap((address) => [
      {
        address,
        abi: erc20Abi,
        functionName: "name",
      },
      {
        address,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ]),
    query: {
      select: (data) => {
        const tokens = [];
        // Process data in groups of 3 (name, symbol, decimals)
        for (let i = 0; i < data.length; i += 3) {
          tokens.push({
            name: data[i].result,
            symbol: data[i + 1].result,
            decimals: data[i + 2].result,
            address: tokenAddress?.[i],
          });
        }
        console.log(tokens, "tokens");
        return tokens;
      },
    },
  });

  // fetching the token balances for the deposit
  const { data: tokenBalances } = useReadContracts({
    contracts: tokenAddress
      ? tokenAddress.map((contractAddress) => ({
          address: contractAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        }))
      : [],
    query: {
      select: (data) => {
        return data.map((item) => item.result);
      },
    },
  });

  // fetching the token prices for the deposit
  const { data: tokenPrices, isPending: isLoadingOraclePrices } =
    useReadContracts({
      contracts: tokenAddress?.map((address) => ({
        address: mpoAddress[chainId as keyof typeof mpoAddress],
        abi: mpoABI as Abi,
        functionName: "price",
        args: [address],
      })),
      query: {
        select: (data: any) => {
          return data.map((item: any) => item.result?.[0]);
        },
      },
    });

  const { data: tokenAllowanceByUser, refetch: refetchAllowanceDynamic } =
    useReadContracts({
      contracts: tokenAddress?.map((contractAddress) => ({
        address: contractAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "allowance",
        args: [
          address,
          cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
        ],
      })),
      query: {
        select: (data) => {
          return data.map((item) => item.result);
        },
      },
    });

  const { totalTVLList } = useGetTVLBothChain(tokenAddress || []);

  // checking the token pause state
  const { data: tokensPauseState } = useReadContracts({
    contracts: tokenAddress?.map((address) => ({
      address: cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`,
      abi: cdsAbi as Abi,
      functionName: "assetDetails",
      args: [address],
    })),
    query: {
      select: (data) => {
        return data.map((item) => item.result);
      },
    },
  });

  // token list for the deposit
  const tokenList: TokenDetails[] = useMemo(() => {
    if (
      !tokenDetailsList ||
      !tokenBalances ||
      !tokenPrices ||
      !tokenAllowanceByUser
    ) {
      return [];
    }

    return tokenDetailsList.map((token, index) => {
      const balance = tokenBalances[index] as bigint | undefined;
      const price = tokenPrices[index] as bigint | undefined;
      const allowance = tokenAllowanceByUser[index] as bigint | undefined;
      const tvl = Array.isArray(totalTVLList) ? totalTVLList[index] : 0;

      // Format balance with proper decimals
      const formattedBalance = formatUnits(
        balance || 0n,
        Number(token.decimals || 18)
      );

      // Format price with 18 decimals (standard for price oracles)
      const formattedPrice = formatUnits(price || 0n, 18);

      // Calculate USD value of balance
      const balanceInUSD = Number(formattedBalance) * Number(formattedPrice);

      return {
        tokenImage: getIconMapping(
          theme || "dark",
          token.symbol?.toString().toLowerCase() || "usda"
        ),
        tokenName: String(token.symbol || ""),
        tokenLabel: String(
          token.symbol === "USDa" ? "USDA+" : token.symbol || ""
        ),
        isLoading: false,
        active: true,
        errorMessage: `Token ${token.symbol} not active now`,
        balanceAvailable: `$${balanceInUSD.toFixed(2)}`,
        minTokenAmount: 500,
        tokenPauseMessage: ` ${token.symbol} Token not active now`,
        tokenPrice: formattedPrice,
        tokenCount: Number(formattedBalance),
        tvl:
          Number(formatUnits(BigInt(tvl), Number(token.decimals))) *
          Number(formattedPrice),
        tokenAddress: tokenAddress?.[index],
        tokenDecimals: Number(token.decimals),
        allowance: allowance || 0,
        isTokenPause:
          tokensPauseState?.[index] === AssetStatus.DEPOSIT_PAUSED ||
          isFunctionPausedCDS_Deposit,
        tokenDetails: tokensPauseState?.[index] as Record<
          number,
          string | number
        >,
      } satisfies TokenDetails;
    });
  }, [
    tokenDetailsList,
    tokenBalances,
    tokenPrices,
    tokenAllowanceByUser,
    totalTVLList,
    theme,
  ]);

  console.log(tokenList, tokensPauseState, "calls");

  console.log(tokenAddress, "tokenAddress");

  const { usdaPoints, usdtPoints, isLoading, error } = usePoint();

  const LoadingBoxs = useMemo(() => {
    return selectedTokens.map(
      (token) =>
        formik.values[`${token.tokenName.toLowerCase()}Flag`] && (
          <LoadingBox
            key={token.tokenName}
            isLoading={
              formik.values[`${token.tokenName.toLowerCase()}Approving`]
            }
            isFailure={
              formik.values[`${token.tokenName.toLowerCase()}ApproveFailure`]
            }
            isSuccess={Boolean(
              formik.values[`${token.tokenName.toLowerCase()}ApproveSuccess`]
            )}
            setSuccessLoading={() => console.log(true)}
            heading={`Approving ${token.tokenLabel}`}
            loadingCount={`${
              selectedTokens.findIndex((t) => t.tokenName === token.tokenName) +
              1
            }/${selectedTokens.length + 1}`}
          />
        )
    );
  }, [formik.values, selectedTokens]);

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
            <div className="2xl:w-[550px] 3xl:w-[550px] 3xl:h-[550px] xl:w-[500px] xl:h-[500px] w-[400px]  2xl:h-[580px] h-[400px] flex items-center justify-center relative">
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
          <div className=" p-5 md:px-16 md:py-5  lg:p-5 lg:pt-4 lg:pb-0">
            <span className="text-textBlack text-[24px] font-medium dark:text-white">
              Deposit Funds
            </span>
            <div
              ref={scrollRef}
              className="h-[200px]  2xl:h-[170px] overflow-y-auto no-scrollbar"
            >
              {/* mapping the selected tokens in the ui */}
              {selectedTokens.map((token, key) => (
                <div key={key} className="mt-1">
                  <Label
                    htmlFor={`token-${key}`}
                    className="text-grayLight text-base font-medium"
                  >
                    {token.tokenLabel || token.tokenName}
                  </Label>
                  <div className="flex flex-nowrap">
                    <Input
                      onWheel={handleWheel}
                      type="number"
                      name={`${token?.tokenName?.toLocaleLowerCase()}Amount`}
                      id={`token-${key}`}
                      className="flex  py-1 items-center h-[44px] border border-grayLight font-medium md:text-[20px] dark:text-[20px]"
                      placeholder="0"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[
                        `${token.tokenName}Amount` as keyof FormValues
                      ]?.toString()}
                    />
                    {/* showing the token value in usd */}
                    <div className="p-1 flex justify-center items-center border-[1px] border-y border-x border-grayLight font-medium md:text-[18px] dark:text-[20px] border-l-0 text-grayLight">
                      <span>
                        $
                        {(
                          Number(
                            formik.values[
                              `${token.tokenName?.toLocaleLowerCase()}Amount` as keyof FormValues
                            ]
                          ) * Number(token?.tokenPrice || 0)
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
                        {(() => {
                          const error =
                            formik.errors?.[
                              `${token.tokenName.toLocaleLowerCase()}Amount` as keyof FormValues
                            ];
                          return error === "max"
                            ? "Amount exceeded balance"
                            : String(error || "");
                        })()}
                      </Typography>
                    </span>
                    <span className="text-[16px] font-medium text-grayLight">
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
                className="w-full text-[20px] 2xl:text-[20px] border border-grayLight h-[44px]"
                iconWrapBg="bg-white dark:bg-black"
              />
              <Typography size="sm" variant="regular" className="text-red-500">
                {(() => {
                  const error = formik.errors?.lockInPeriod;
                  return formik?.touched?.lockInPeriod
                    ? String(error || "")
                    : "";
                })()}
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
                usdaPoints={Number(usdaPoints?.pointsToBeGiven || 0)}
                usdtPoints={Number(usdtPoints?.pointsToBeGiven || 0)}
                minUsdaDeposit={Number(usdaPoints?.minAmount || 0)}
                minUsdtDeposit={Number(usdtPoints?.minAmount || 0)}
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
              {LoadingBoxs}
              {/* <LoadingBox
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
              /> */}
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
      {tokenList.map((token) => (
        <TokenTvlDetails
          key={token.tokenName}
          icon={token.tokenImage}
          tokenName={token.tokenLabel}
          tvl={`$${formatNumber(Number(token.tvl || 0n))}`}
        />
      ))}

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
