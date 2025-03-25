"use client";
import { usDaAbi } from "@/blockchain/abis/usda";
import { testusdtAbiAbi } from "@/blockchain/abis/usdt";
import { testusdtAbiAddress, usDaAddress } from "@/blockchain/contracts";
import { Button } from "@/design-systems/atoms/button";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import LoadingBox from "@/design-systems/molecule/LoadingBox";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import BridgeComponentLeft from "@/design-systems/organisms/bridge/BridgeComponentLeft";
import BridgeComponentRight from "@/design-systems/organisms/bridge/BridgeComponentRight";
import BridgeMetricFields from "@/design-systems/organisms/bridge/BridgeMetricFields";
import { useGetBridgeFeeUsda } from "@/hookes/contract-hooks/useGetBridgeFeeUsda";
import { useGetBridgeFeeUsdt } from "@/hookes/contract-hooks/useGetBridgeFeeUsdt";
import useDeviceType from "@/hookes/useDeviceType";
import { secondsToMinutes } from "@/utils/helpers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { formatUnits, padHex, parseEther, parseUnits } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  useEstimateGas,
  usePublicClient,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { TransactionParams } from "./interfaces";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import WalletConnectButton from "@/design-systems/molecule/WalletConnectButton";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import { eId, scanUrls } from "@/utils/constants";

function BridgeTemplate() {
  const [sendToken, setSendToken] = useState<"USDa" | "TUSDT">("USDa");
  const [receiveToken, setReceiveToken] = useState<"USDa">("USDa");
  const [sendNetwork, setSendNetwork] = useState<
    "Sepolia" | "Base" | "Mode" | "OP"
  >("Sepolia");
  const [receiveNetwork, setReceiveNetwork] = useState<
    "Sepolia" | "Base" | "Mode" | "OP"
  >("Mode");

  const [sendAmount, setSendAmount] = useState<number | string>();
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const [estimateTime, setEstimateTime] = useState<number>(0);
  const [amountError, setAmountError] = useState<string>("");
  const [transferLoadingLocal, setTransferLoadingLocal] =
    useState<boolean>(false);

  const [usdaApproveLoadingLocal, setUsdaApproveLoading] =
    useState<boolean>(false);
  const [usdtApproveLoading, setUsdtApproveLoading] = useState<boolean>(false);

  const { isConnected: isWalletConnected, address } =
    useCheckWalletConnection();

  const [sendLoading, setSendLoading] = useState<boolean>(false);

  const { switchChain, isPending: isChainSwitchPending } = useSwitchChain();

  const { address: accountAddress, isConnected } = useAccount();

  const toastId = useRef<string | number>("");

  const chainId = useChainId();

  const Eid = chainId === 11155111 ? 40245 : 40161;

  // Option Fees to be added to the transaction parameters (200000)
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(60000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const [collateralAmountString, setCollateralAmountString] =
    useState<string>("0");

  useEffect(() => {
    if ((Number(sendAmount) || 0) > Number(usdaBal?.formatted)) {
      setAmountError(
        `Transfer amount cannot be greater than ${usdaBal?.formatted}USDa`
      );
    } else {
      setAmountError("");
    }
  }, [sendAmount]);

  useEffect(() => {
    if (chainId === 11155111) {
      setSendNetwork("Sepolia");
    } else if (chainId === 84532) {
      setSendNetwork("Base");
    }
  }, [chainId]);

  // Calculation Based on ChainID to bridge amount. It will fetch and update value of outputCollateralAmount (you can change according to your logic and write it clear)
  useEffect(() => {
    let letamount = (sendAmount || 0).toString();
    if (!sendAmount) {
      setCollateralAmountString("0");
      letamount = "0";
    } else {
      setCollateralAmountString((Number(sendAmount) * 10 ** 6).toString());
    }
    let amount = 0n;
    if (sendToken === "USDa" && nativeFee1) {
      amount = parseUnits(letamount, 18) - nativeFee1.nativeFee;
    }

    // if (sendToken === "TUSDT" && nativeFee2) {
    //   amount = parseEther(letamount) - nativeFee2.nativeFee;
    // }

    if (sendAmount != null) {
      setReceiveAmount(Number(formatUnits(sendAmount == 0 ? 0n : amount, 18)));
    }
  }, [sendAmount]);

  // Get the usda balance of the user
  const { data: usdaBal, refetch: refetchUsdaBalance } = useBalance({
    address: accountAddress,
    token: usDaAddress[chainId as keyof typeof usDaAddress],
  });

  // Get the maximum amount of collateral set to the input field
  const getmax = () => {
    if (sendToken === "USDa") {
      setSendAmount(Number(usdaBal?.formatted.slice(0, 8)));
    }
  };

  console.log(
    eId[receiveNetwork],
    usdaBal,
    usDaAddress[chainId as keyof typeof usDaAddress],
    "receiveNetwork"
  );

  //  Define the transaction parameters
  const transactionParams: TransactionParams = {
    dstEid: eId[receiveNetwork],
    to: padHex(accountAddress ?? ("0" as `0x${string}`), {
      size: 32,
    }) as `0x${string}`,
    amountLD: BigInt(collateralAmountString),
    minAmountLD: BigInt(collateralAmountString),
    extraOptions: options,
    composeMsg: `0x${"".padEnd(64, "0")}`,
    oftCmd: `0x${"".padEnd(64, "0")}`,
  };

  // Get the native fee for the transaction
  const { nativeFee1, refetchnativeFee1 } =
    useGetBridgeFeeUsda(transactionParams);

  // // Get the native fee for the transaction
  // const { nativeFee2, TUSDTQuoteError, refetchnativeFee2 } =
  //   useGetBridgeFeeUsdt(transactionParams);
  // // Approve USDa

  console.log(
    nativeFee1,
    usDaAddress[chainId as keyof typeof usDaAddress],
    "nativeFee1"
  );

  const {
    isPending: amintApproveLoading,
    data: amintApproveData,
    writeContract: amintApproveWrite,
    isSuccess: amintApproved,
    isError: depositError,
    error: depositHashError,
    reset: resetAmintApprove,
  } = useWriteContract({
    mutation: {
      onError(error: any) {
        handleTransferFail();
      },
      // Handle success and show a custom toast notification
      onSuccess: (data) => {},
    },
  });

  // Wait for the transaction to be confirmed
  const {
    data: amintTransactionAllowed,
    isLoading: isAmintTransactionLoading,
    isError: usdaErrorApprove,
    isSuccess: usdaApproveSuccess,
  } = useWaitForTransactionReceipt({
    hash: amintApproveData,
  });

  // const config = useConfig();

  // const configCore = createConfig({
  //   chains: [sepolia],
  //   transports: {
  //     [baseSepolia.id]: http(),
  //     [sepolia.id]: http(),
  //     [optimismSepolia.id]: http(),
  //   },
  // });
  // const getGas = async () => {
  //   const estimatedGas = await estimateContractGas(configCore, {
  //     abi: usDaAbi,
  //     address: usDaAddress[chainId as keyof typeof usDaAddress],
  //     functionName: "approve",
  //     args: [
  //       usDaAddress[chainId as keyof typeof usDaAddress] as `0x${string}`,
  //       BigInt(sendAmount * 10 ** 6),
  //     ],
  //   });
  //   console.log(estimatedGas, "gas");
  // };

  // If the transaction is confirmed, show a toast notification and call UsdaApprove write call to bridge token

  useEffect(() => {
    if (usdaApproveSuccess && accountAddress) {
      setUsdaApproveLoading(false);
      setTimeout(() => {
        setSendLoading(true);
      }, 1000);
      usdaApproveWrite({
        abi: usDaAbi,
        address: usDaAddress[chainId as keyof typeof usDaAddress],
        functionName: "send",
        args: [
          transactionParams as never,
          { nativeFee: nativeFee1?.nativeFee ?? 0n, lzTokenFee: 0n },
          accountAddress,
        ],
        value: nativeFee1?.nativeFee,
      });
    } else if (usdaErrorApprove) {
      handleTransferFail();
    }
  }, [amintTransactionAllowed]);

  const {
    isPending: usdaApproveLoading,
    data: usdaApproveData,
    writeContract: usdaApproveWrite,
    isSuccess: usdaApproved,
    isError: usdaErrorApproveFn,
    reset: resetUsdaApprove,
  } = useWriteContract({
    mutation: {
      onError(error: any) {
        handleTransferFail();
      },
      onSuccess: (data) => {},
    },
  });

  // Wait for the transaction to be confirmed
  const {
    data: usdaTransactionConfirmed,
    isLoading: isUsdaTransactionLoading,
    isError: usdaIsError,
    isSuccess: usdaIsSuccess,
    error: usdaError,
  } = useWaitForTransactionReceipt({
    hash: usdaApproveData,
  });

  // If the transaction is confirmed, show a toast notification
  useEffect(() => {
    if (usdaIsSuccess) {
      setSendLoading(false);
      setTimeout(() => {
        setTransferLoadingLocal(false);
      }, 1000);
      toast.custom((t) => {
        const link = `${scanUrls[chainId as keyof typeof scanUrls]}${
          usdaTransactionConfirmed.transactionHash
        } `;
        setSendAmount(0);
        refetchUsdaBalance();
        resetUsdaApprove();
        return (
          <ToastNotification
            title="Transaction Confirmed"
            message=""
            linkText={
              chainId === 84532 ? "View On Basescan" : "View On Etherscan"
            }
            linkUrl={link}
            onClose={() => toast.dismiss(t)}
          />
        );
      });
    } else if (usdaIsError) {
      setSendLoading(false);
      setTimeout(() => {
        setTransferLoadingLocal(false);
      }, 1000);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
      handleTransferFail();
    }
  }, [usdaTransactionConfirmed]);

  const handleTransferFail = () => {
    toast.custom((t) => (
      <ToastNotificationError
        title="Transaction failed, Please try again"
        onClose={() => toast.dismiss(t)}
      />
    ));
    resetPage();
  };
  const clearLoading = () => {
    setTimeout(() => {
      setTransferLoadingLocal(false);
    }, 1000);
    resetPage();
  };

  const resetPage = () => {
    resetUsdaApprove();
    resetAmintApprove();
    clearLoading();
    setSendAmount(0);
  };

  // Handle the form submission
  async function onSubmit() {
    if (amountError) {
      return toast.custom((t) => (
        <ToastNotificationError
          title={amountError}
          onClose={() => toast.dismiss(t)}
        />
      ));
    }
    if (sendAmount === 0) {
      return toast.custom((t) => (
        <ToastNotificationError
          title={"Please enter a valid amount"}
          onClose={() => toast.dismiss(t)}
        />
      ));
    }
    if (!isConnected) {
      return toast.custom((t) => (
        <ToastNotificationError
          title={"Please connect your wallet"}
          onClose={() => toast.dismiss(t)}
        />
      ));
    }
    if (accountAddress) {
      setTransferLoadingLocal(true);
      if (sendToken === "USDa") {
        setUsdaApproveLoading(true);
        amintApproveWrite({
          abi: usDaAbi,
          address: usDaAddress[chainId as keyof typeof usDaAddress],
          functionName: "approve",
          args: [
            usDaAddress[chainId as keyof typeof usDaAddress] as `0x${string}`,
            BigInt((Number(sendAmount) || 0) * 10 ** 6),
          ],
        });
      }
      // else if (sendToken === "TUSDT") {
      //   setUsdtApproveLoading(true);
      //   tusDTApproveWrite({
      //     abi: testusdtAbiAbi,
      //     address: testusdtAbiAddress[chainId as keyof typeof usDaAddress],
      //     functionName: "approve",
      //     args: [
      //       testusdtAbiAddress[
      //         chainId as keyof typeof testusdtAbiAddress
      //       ] as `0x${string}`,
      //       BigInt((sendAmount || 0) * 10 ** 6),
      //     ],
      //   });
      // }
    }
  }

  const result = useEstimateGas({
    account: accountAddress,
    to: usDaAddress[chainId as keyof typeof usDaAddress],
    value: parseEther("0.01"),
  });

  const publicClient = usePublicClient();

  async function estimateTransactionTime() {
    try {
      // 1. Fetch the current gas price
      const gasPrice = await publicClient?.getGasPrice();

      // 2. Fetch the number of pending transactions
      const pendingTransactions = 3;

      // 3. Fetch the latest block to get the average block time
      const latestBlock = await publicClient?.getBlock();
      const averageBlockTime = 12; // Average block time for Ethereum is ~12 seconds

      // 4. Estimate the time for your transaction to be included in a block
      const transactionsPerBlock = 200; // Approximate number of transactions per block
      const estimatedBlocksToWait = Math.ceil(
        pendingTransactions / transactionsPerBlock
      );
      const estimatedTimeInSeconds = estimatedBlocksToWait * averageBlockTime;
      setEstimateTime(estimatedTimeInSeconds);
      return estimatedTimeInSeconds;
    } catch (error) {
      console.error("Error estimating transaction time:", error);
      throw error;
    }
  }

  useEffect(() => {
    estimateTransactionTime();
  }, []);

  // // Fetch the native fee for USDa
  // useEffect(() => {
  //   if (form.getValues("inputCollateral") === "usda") {
  //     refetchnativeFee1();
  //     form.setValue("outputCollateral", "usda");
  //   } else if (form.getValues("inputCollateral") === "tusdt") {
  //     refetchnativeFee2();
  //     form.setValue("outputCollateral", "tusdt");
  //   }
  // }, [form.watch("inputCollateral")]);

  const deviceType = useDeviceType();
  const showBack = deviceType === "mobile" || deviceType === "tablet";

  const fromNetworkOption = [
    {
      label: "Sepolia",
      onClick: () => {
        switchChain({ chainId: 11155111 });
        setSendNetwork("Sepolia");
      },
    },
    {
      label: "Base",
      onClick: () => {
        switchChain({ chainId: 84532 });
        setSendNetwork("Base");
      },
    },
    {
      label: "Mode",
      onClick: () => {
        switchChain({ chainId: 919 });
        setSendNetwork("Mode");
      },
    },
    {
      label: "OP",
      onClick: () => {
        switchChain({ chainId: 11155420 });
        setSendNetwork("OP");
      },
    },
  ];

  const toNetworkOption = useMemo(() => {
    const option = [];

    if (sendNetwork !== "Sepolia") {
      option.push({
        label: "Sepolia",
        onClick: () => {
          setReceiveNetwork("Sepolia");
        },
      });
    }
    if (sendNetwork !== "Base") {
      option.push({
        label: "Base",
        onClick: () => {
          setReceiveNetwork("Base");
        },
      });
    }
    if (sendNetwork !== "Mode") {
      option.push({
        label: "Mode",
        onClick: () => {
          setReceiveNetwork("Mode");
        },
      });
    }
    if (sendNetwork !== "OP") {
      option.push({
        label: "OP",
        onClick: () => {
          setReceiveNetwork("OP");
        },
      });
    }
    setReceiveNetwork(option[0].label as any);
    return option;
  }, [sendNetwork]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-185px)] ">
      <AppNavbar activeBack={showBack} />
      <div className="grid md:grid-cols-2 md:grid-rows-[85%_15%] flex-grow">
        <BridgeComponentLeft
          balance={Number(Number(usdaBal?.formatted).toFixed(2))}
          heading={"From"}
          network={sendNetwork}
          token={sendToken}
          setSendToken={setSendToken}
          setSendNetwork={setSendNetwork}
          totalAmount={"$1,202"}
          sendAmount={sendAmount}
          setSendAmount={setSendAmount}
          amountError={amountError}
          fromNetworkOption={fromNetworkOption}
          isChainSwitchPending={isChainSwitchPending}
        />

        <BridgeComponentRight
          heading={"To"}
          network={"Base"}
          token={sendToken}
          totalAmount={"$1,200"}
          receiveAmount={receiveAmount}
          toNetworkOption={toNetworkOption}
          receiveNetwork={receiveNetwork}
        />
        <div className="flex flex-wrap justify-between py-5 px-8 border  border-solid border-grayLight rounded-md h-full">
          <BridgeMetricFields label={"Gas"} value={"-"} />
          <BridgeMetricFields
            label={"Time"}
            value={secondsToMinutes(estimateTime * 2)}
          />
        </div>
        <div className=" overflow-hidden w-full">
          {isConnected && address ? (
            !transferLoadingLocal && (
              <Button
                onClick={onSubmit}
                className="bg-textBlack text-white py-4 font-semibold text-[24px] w-full h-full rounded-md dark:bg-custom-gradient-to-bottom border border-grayLight"
              >
                Bridge
              </Button>
            )
          ) : (
            <WalletConnectButton />
          )}

          <LoadingBox
            isLoading={usdaApproveLoadingLocal}
            isFailure={depositError || usdaErrorApprove}
            isSuccess={Boolean(usdaApproveSuccess)}
            setSuccessLoading={() => console.log()}
            heading="Approving USDa"
            loadingCount="1/2"
          />

          <LoadingBox
            isLoading={sendLoading && sendToken === "USDa"}
            isFailure={usdaErrorApproveFn || usdaIsError}
            isSuccess={Boolean(usdaIsSuccess)}
            setSuccessLoading={() => console.log()}
            heading={"Transferring " + sendToken}
            loadingCount="2/2"
          />
        </div>
      </div>
    </div>
  );
}

export default WithPrivateRoute(BridgeTemplate);
