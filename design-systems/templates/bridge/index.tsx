"use client";
import { usDaAbi } from "@/blockchain/abis/usda";
import { testusdtAbiAbi } from "@/blockchain/abis/usdt";
import { testusdtAbiAddress, usDaAddress } from "@/blockchain/contracts";
import { Button } from "@/components/ui/button";
import { GenericDropdownMenu } from "@/components/ui/DropdownCustom/GenericDropdownMenu";
import { Typography } from "@/components/ui/Typography";
import AppNavbar from "@/custom-components/AppNavbar";
import LoadingBox from "@/custom-components/LoadingBox";
import ToastNotification from "@/custom-components/toasts/ToastNotification";
import ToastNotificationError from "@/custom-components/toasts/ToastNotificationError";
import { useGetBridgeFeeUsda } from "@/hookes/contract-hooks/useGetBridgeFeeUsda";
import { useGetBridgeFeeUsdt } from "@/hookes/contract-hooks/useGetBridgeFeeUsdt";
import { handleWheel, secondsToMinutes } from "@/utils/helpers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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

function BridgeComponentRight({
  heading,
  network,
  token,
  totalAmount,
  receiveAmount,
}: {
  receiveAmount: number;
  heading: string;
  network: string;
  token: string;
  totalAmount: string;
}) {
  return (
    <div
      className={`flex flex-col md:p-6 p-5 justify-between border border-y-0 border-r-0 border-grayLight border-solid rounded-none ${
        heading === "To"
          ? "bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top"
          : "bg-none dark:bg-none"
      }`}
    >
      <div className=" text-[24px] md:text-[28px] lg:text-[32px] font-medium mb-4">
        {heading}
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex gap-6">
          <div className="flex flex-col gap-3 flex-1">
            <span className="text-[18px] font-medium text-grayLight">
              Network
            </span>
            <GenericDropdownMenu
              buttonText="Mode"
              items={[
                {
                  label: "Mode",
                  onClick: () => {},
                },
              ]}
              className="w-full text-[18px] lg:text-[24px] border border-grayLight  h-[60px] lg:h-[65px]"
            />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <span className="text-[18px] font-medium text-grayLight">
              Token
            </span>
            <GenericDropdownMenu
              buttonText={token}
              items={[
                {
                  label: "USDa",
                  onClick: () => {},
                },
              ]}
              className="w-full text-[18px] lg:text-[24px] border border-grayLight h-[60px] lg:h-[65px]"
            />
          </div>
        </div>
        <div className="border border-solid border-grayLight p-5">
          <div className="flex justify-between h-[27px]"></div>
          <div className="text-[42px] text-textBlack  mt-4 lg:mt-8 dark:text-white">
            ${receiveAmount.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
function BridgeComponentLeft({
  heading,
  network,
  token,
  totalAmount,
  setSendToken,
  setSendNetwork,
  setSendAmount,
  sendAmount,
  balance,
  amountError,
}: {
  balance: number;
  amountError: string;
  setSendToken: Dispatch<SetStateAction<"USDa" | "TUSDT">>;
  setSendAmount: Dispatch<SetStateAction<number | null>>;
  sendAmount: number | null;
  setSendNetwork: Dispatch<React.SetStateAction<"Base" | "Sepolia">>;
  heading: string;
  network: string;
  token: string;
  totalAmount: string;
}) {
  const { switchChain } = useSwitchChain();

  const { chainId } = useAccount();

  return (
    <div
      className={`flex flex-col md:p-6 p-5 justify-between border border-y-0 border-r-0 border-grayLight border-solid rounded-none ${
        heading === "To"
          ? "bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top"
          : "bg-none dark:bg-none"
      }`}
    >
      <div className=" text-[24px] md:text-[28px] lg:text-[32px] font-medium mb-4">
        {heading}
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex gap-6">
          <div className="flex flex-col gap-3 flex-1">
            <span className="text-[18px] font-medium text-grayLight">
              Network
            </span>
            <GenericDropdownMenu
              buttonText={network}
              items={[
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
              ]}
              className="w-full  text-[20px] lg:text-[24px] border border-grayLight h-[60px] lg:h-[65px]"
            />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <span className="text-[18px] font-medium text-grayLight">
              Token
            </span>
            <GenericDropdownMenu
              buttonText={token}
              items={[
                {
                  label: "USDa",
                  onClick: () => setSendToken("USDa"),
                },
              ]}
              className="w-full text-[20px] lg:text-[24px] border border-grayLight h-[60px] lg:h-[65px]"
            />
          </div>
        </div>
        <div className="border border-solid border-grayLight p-5">
          <div className="flex justify-between">
            <div
              className={
                `${heading == "From" ? "" : "dark:text-white"}` +
                "text-grayLight text-[14px] lg:text-lg "
              }
            >
              You {heading == "From" ? "Send" : "Receive"}
            </div>
            <div className="text-grayLight  text-[14px] lg:text-lg flex gap-3 ">
              Available Bal: {balance}
              <span
                onClick={() => setSendAmount(balance)}
                className="text-textBlack text-[14px] lg:text-lg cursor-pointer dark:text-white"
              >
                Max
              </span>
            </div>
          </div>
          <input
            onWheel={handleWheel}
            value={sendAmount || undefined}
            onChange={(e) => setSendAmount(Number(e.target.value))}
            type="number"
            placeholder="0"
            className="text-[42px] w-full bg-transparent border-0 outline-0 text-textBlack  mt-4 lg:mt-8 dark:text-white"
          />

          <Typography size="sm" variant="regular" className="text-red-500">
            {amountError}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function BridgeMetricFields({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col justify-between mb-3">
      <div className=" text-gray-500 font-medium text-[18px]">{label}</div>
      <div className="font-medium text-[20px] text-black dark:text-white">
        {value}
      </div>
    </div>
  );
}

interface TransactionParams {
  dstEid: number; // Assuming Eid is a string, adjust the type if it's different
  to: `0x${string}`; // Account address padded to 32 characters
  amountLD: bigint; // Amount in Ether, parsed from a string
  minAmountLD: bigint; // Minimum amount in Ether, parsed from a string
  extraOptions: any; // Assuming options is of a generic type, adjust as necessary
  composeMsg: `0x${string}`; // A hexadecimal string
  oftCmd: `0x${string}`; // Another hexadecimal string
}

function BridgeTemplate() {
  const [sendToken, setSendToken] = useState<"USDa" | "TUSDT">("USDa");
  const [receiveToken, setReceiveToken] = useState<"USDa" | "TUSDT">("USDa");
  const [sendNetwork, setSendNetwork] = useState<"Sepolia" | "Base">("Sepolia");
  const [sendAmount, setSendAmount] = useState<number | null>(null);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const [estimateTime, setEstimateTime] = useState<number>(0);
  const [amountError, setAmountError] = useState<string>("");
  const [transferLoadingLocal, setTransferLoadingLocal] =
    useState<boolean>(false);

  const [usdaApproveLoadingLocal, setUsdaApproveLoading] =
    useState<boolean>(false);
  const [usdtApproveLoading, setUsdtApproveLoading] = useState<boolean>(false);

  const [sendLoading, setSendLoading] = useState<boolean>(false);

  const { switchChain } = useSwitchChain();

  const { address: accountAddress, isConnected } = useAccount();

  const toastId = useRef<string | number>("");

  const chainId = useChainId();

  const Eid = chainId === 11155111 ? 40245 : 40161;

  // Option Fees to be added to the transaction parameters (200000)
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(200000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const [collateralAmountString, setCollateralAmountString] =
    useState<string>("0");

  useEffect(() => {
    if ((sendAmount || 0) > Number(usdaBal?.formatted)) {
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
      setCollateralAmountString((sendAmount * 10 ** 6).toString());
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

  // Get the tusdt balance of the user
  const { data: tusdtBal } = useBalance({
    address: accountAddress,
    token: testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
  });

  // Get the usda balance of the user
  const { data: usdaBal } = useBalance({
    address: accountAddress,
    token: usDaAddress[chainId as keyof typeof usDaAddress],
  });

  // Get the maximum amount of collateral set to the input field
  const getmax = () => {
    if (sendToken === "USDa") {
      setSendAmount(Number(usdaBal?.formatted.slice(0, 8)));
    } else if (sendToken === "TUSDT") {
      setSendAmount(Number(tusdtBal?.formatted.slice(0, 8)));
    }
  };

  //  Define the transaction parameters
  const transactionParams: TransactionParams = {
    dstEid: 40260,
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

  // Get the native fee for the transaction
  const { nativeFee2, TUSDTQuoteError, refetchnativeFee2 } =
    useGetBridgeFeeUsdt(transactionParams);
  // Approve USDa

  const {
    isPending: amintApproveLoading,
    data: amintApproveData,
    writeContract: amintApproveWrite,
    isSuccess: amintApproved,
    isError: depositError,
    error: depositHashError,
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

  // Approve TUSDT

  const {
    isPending: usdaApproveLoading,
    data: usdaApproveData,
    writeContract: usdaApproveWrite,
    isSuccess: usdaApproved,
    isError: usdaErrorApproveFn,
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
        const link =
          chainId === 84532
            ? `https://sepolia.basescan.org/tx/${usdaTransactionConfirmed.transactionHash} `
            : `https://sepolia.etherscan.io/tx/${usdaTransactionConfirmed.transactionHash}`;

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
    }
  }, [usdaTransactionConfirmed]);

  const handleTransferFail = () => {
    toast.custom((t) => (
      <ToastNotificationError
        title="Transaction failed, Please try again"
        onClose={() => toast.dismiss(t)}
      />
    ));
    clearLoading();
  };
  const clearLoading = () => {
    setTimeout(() => {
      setTransferLoadingLocal(false);
    }, 1000);
    setUsdaApproveLoading(false);
    setUsdtApproveLoading(false);
    setSendLoading(false);
  };

  // Approve TUSDT
  const {
    isPending: tusDTApproveLoading,
    data: tusDTApproveData,
    writeContract: tusDTApproveWrite,
    isSuccess: tusDTApproved,
    isError: tusDTErrorApproveFn,
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
    data: tusDTTransactionAllowed,
    isLoading: tusDTTransactionLoading,
    isError: tusDTErrorApprove,
    isSuccess: tusDTApproveSuccess,
  } = useWaitForTransactionReceipt({
    hash: tusDTApproveData,
  });

  // If the transaction is confirmed, show a toast notification and call tusdtApprove write call to bridge token
  useEffect(() => {
    if (tusDTApproveSuccess && accountAddress) {
      setUsdtApproveLoading(false);
      setTimeout(() => {
        setSendLoading(true);
      }, 1000);
      tusdtApproveWrite({
        abi: testusdtAbiAbi,
        address: testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
        functionName: "send",
        args: [
          transactionParams as never,
          { nativeFee: 37671213890518646n, lzTokenFee: 0n },
          accountAddress,
        ],
        value: nativeFee2?.nativeFee,
      });
    } else if (usdaErrorApprove) {
      handleTransferFail();
    }
  }, [tusDTTransactionAllowed]);

  const {
    isPending: tusdtApproveLoading,
    data: tusdtApproveData,
    writeContract: tusdtApproveWrite,
    isSuccess: tusdtApproved,
    isError: tusdtErrorApproveFn,
  } = useWriteContract({});

  // Wait for the transaction to be confirmed
  const {
    data: tusdtTransactionConfirmed,
    isLoading: istusdtTransactionLoading,
    isError: tusdtIsError,
    isSuccess: tusdtIsSuccess,
    error: tusdtError,
  } = useWaitForTransactionReceipt({
    hash: tusdtApproveData,
  });
  // If the transaction is confirmed, show a toast notification
  useEffect(() => {
    if (tusdtIsSuccess) {
      setSendLoading(false);
      setTimeout(() => {
        setTransferLoadingLocal(false);
      }, 1000);
      toast.success("Transaction Confirmed");
    } else if (tusdtIsError) {
      handleTransferFail();
    }
  }, [usdaTransactionConfirmed]);

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
            BigInt((sendAmount || 0) * 10 ** 6),
          ],
        });
      } else if (sendToken === "TUSDT") {
        setUsdtApproveLoading(true);
        tusDTApproveWrite({
          abi: testusdtAbiAbi,
          address: testusdtAbiAddress[chainId as keyof typeof usDaAddress],
          functionName: "approve",
          args: [
            testusdtAbiAddress[
              chainId as keyof typeof testusdtAbiAddress
            ] as `0x${string}`,
            BigInt((sendAmount || 0) * 10 ** 6),
          ],
        });
      }
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

  return (
    <div className="flex flex-col min-h-full ">
      <AppNavbar activeBack={false} />
      <div className="grid md:grid-cols-2 md:grid-rows-[85%_15%] flex-grow">
        <BridgeComponentLeft
          balance={Number(
            sendToken === "USDa" ? usdaBal?.formatted : tusdtBal?.formatted
          )}
          heading={"From"}
          network={sendNetwork}
          token={sendToken}
          setSendToken={setSendToken}
          setSendNetwork={setSendNetwork}
          totalAmount={"$1,202"}
          sendAmount={sendAmount}
          setSendAmount={setSendAmount}
          amountError={amountError}
        />

        <BridgeComponentRight
          heading={"To"}
          network={"Base"}
          token={sendToken}
          totalAmount={"$1,200"}
          receiveAmount={receiveAmount}
        />
        <div className="flex flex-wrap justify-between py-5 px-8 border  border-solid border-grayLight rounded-md h-full">
          <BridgeMetricFields label={"Gas"} value={"-"} />
          <BridgeMetricFields
            label={"Time"}
            value={secondsToMinutes(estimateTime * 2)}
          />
        </div>
        <div className=" w-full">
          {!transferLoadingLocal && (
            <Button
              onClick={onSubmit}
              className="bg-textBlack text-white py-4 font-semibold text-[24px] w-full h-full rounded-md dark:bg-custom-gradient-to-bottom border border-grayLight"
            >
              Bridge
            </Button>
          )}

          <LoadingBox
            isLoading={usdaApproveLoadingLocal}
            isFailure={depositError || usdaErrorApprove}
            isSuccess={Boolean(usdaApproveSuccess)}
            setSuccessLoading={() => console.log()}
            heading="Approving USDa"
          />

          <LoadingBox
            isLoading={usdtApproveLoading}
            isFailure={tusDTErrorApproveFn || tusDTErrorApprove}
            isSuccess={Boolean(tusDTApproveSuccess)}
            setSuccessLoading={() => console.log()}
            heading="Approving USDT"
          />
          <LoadingBox
            isLoading={sendLoading && sendToken === "USDa"}
            isFailure={usdaErrorApproveFn || usdaIsError}
            isSuccess={Boolean(usdaIsSuccess)}
            setSuccessLoading={() => console.log()}
            heading={"Transferring " + sendToken}
          />
          <LoadingBox
            isLoading={sendLoading && sendToken === "TUSDT"}
            isFailure={tusdtErrorApproveFn || tusdtIsError}
            isSuccess={Boolean(tusdtIsSuccess)}
            setSuccessLoading={() => console.log()}
            heading={"Transferring " + sendToken}
          />
        </div>
      </div>
    </div>
  );
}

export default BridgeTemplate;
