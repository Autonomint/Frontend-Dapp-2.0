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

function InputForm({ currency }: { currency: string }) {
  const chainId = useChainId();
  const router = useRouter();
  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const {
    isUsdValuePending,
    usdValue: ethPrice,
    assetPrice,
    exchangeRate,
  } = useGetUsdValue(
    borrowAssetsAddress[currency as keyof typeof borrowAssetsAddress]
  );

  const selectedAssetPrice =
    currency.toLocaleLowerCase() == "eth" ? ethPrice : assetPrice;

  const { isFunctionPausedBorrow_Deposit } = useBorrowPause();

  console.log(ethPrice, assetPrice, "eth");

  const [usdaToBeMinted, setUsdaToBeMinted] = useState("0");
  const [downsideProtectionAmnt, setDownsideProtectionAmnt] = useState("0");
  const [upsideCollateral, setUpsideCollateral] = useState(0);
  const { address, isConnected } = useAccount();

  const { refetchBorrowSignedData } = useGetBorrowSignedData();

  const ethBalance = useBalance({
    address: address,
    token:
      currency.toLocaleLowerCase() !== "eth"
        ? borrowAssetsAddress[currency as keyof typeof borrowAssetsAddress][
            chainId
          ]
        : undefined,
  });

  const formattedBalance = Number(ethBalance.data?.formatted || 0).toFixed(4);
  const { isScroll, setIsScroll } = useScroll();

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
    if (!address) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Please connect your wallet"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }
    if (!formik.values.collateralAmount) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Please enter amount"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }
    setMintBtnLoading(true);

    reset();

    const approveAmount = parseEther(formik.values.collateralAmount.toString());

    // check if allowance is less than approve amount
    if (
      ["wrsETH", "weETH"].includes(currency) &&
      BigInt(allowance || 0) < approveAmount
    ) {
      setApproveLoading(true);
      await approveWrapETHDynamic(
        borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
        ],
        parseEther(formik.values.collateralAmount.toString())
      );
      // else mining direct
    } else {
      handleMint(formik.values);
    }
  };

  const formik = useFormik({
    initialValues: {
      collateral: currency || "eth",
      collateralAmount: 0,
      strikePricePercent: 5,
      balance: 0,
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
    formik.setFieldValue("balance", formattedBalance);
  }, [formattedBalance]);

  useEffect(() => {
    formik.setFieldValue("collateral", currency);
  }, [currency]);

  // Create the options for the contract
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(400000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(options, 1);
  const { isTvlPending, tvlValue: ltv } = useGetTvl();

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
    confirmations: 2,
  });

  const { portfolioTab, setPortfolioTab } = usePortfolioTab();

  const fetchWalletAddress = async (chainId?: number) => {
    const response = await axios.post(
      `${BACKEND_API_URL}/global/get-min-usda-mint-for-luck`,
      {
        chainId,
      }
    );
    return response.data;
  };

  const { data: minUSDAforLuck, isLoading } = useQuery({
    queryKey: ["farmYourLuckWalletAddress", chainId],
    queryFn: () => fetchWalletAddress(chainId),
    enabled: Boolean(chainId),
    refetchInterval: 0,
  });

  console.log(minUSDAforLuck, "minUSDAforLuck");

  useEffect(() => {
    if (isDepositSuccess && Depositdata) {
      setPortfolioTab("Borrowed");
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
        router.push("/farmyourluck");
      } else {
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
  }, [Depositdata, isDepositSuccess]);

  const handleResetPage = () => {
    // formik.resetForm();
    reset();
    setApproveLoading(false);
    setMintLoading(false);
  };

  const { optionFees, refetchOptionFee, Fees } = useFetchOptionFees(
    (Number(formik.values.collateralAmount) * exchangeRate) / 1e18,
    (ethPrice || 0) as number,
    getStrikePercent(formik.values.strikePricePercent)
  );

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
    const strikePercent = getStrikePercent(values.strikePricePercent);

    const borrowSignedData = await refetchBorrowSignedData();

    const data = optionFees;
    if (data != undefined && nativeFee != undefined) {
      setApproveLoading(false);
      setTimeout(() => {
        setMintLoading(true);
      }, 1000);
      mintUSDa?.({
        strikePercent: BigInt(strikePercent),
        volatility: BigInt(borrowSignedData.data?.volatility || 0),
        depositingAmount: parseEther(formik.values.collateralAmount.toString()),
        assetName: BorrowAssetsEnum[currency as keyof typeof BorrowAssetsEnum],
        deadline: BigInt(borrowSignedData.data?.deadline || 0),
        nonce: BigInt(borrowSignedData.data?.nonce || 0),
        signature: borrowSignedData.data?.signature || ("" as `0x${string}`),
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
      const usdaToMint =
        (Number(formik.values.collateralAmount || 0) *
          Number(selectedAssetPrice || 0) *
          Number(ltv || 0)) /
        10000;
      const udsa2Decimal = displayNumberWithPrecision(usdaToMint.toString());
      setUsdaToBeMinted((Number(udsa2Decimal) - optionf).toFixed(2));

      // Calculate the downside protection amount
      const downsideProtection =
        (Number(formik.values.collateralAmount || 0) *
          Number(selectedAssetPrice || 0) *
          (100 - (ltv ? ltv : 0))) /
        10000;
      const downsideProtection2Decimal = displayNumberWithPrecision(
        downsideProtection.toString()
      );
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

  const handleSetMaxBal = () => {
    formik.setFieldValue(
      "collateralAmount",
      Number(ethBalance.data?.formatted || 0)
    );
  };

  const [mintBtnLoading, setMintBtnLoading] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col p-6 gap-[18px] relative">
        <div className=" font-medium text-2xl">Mint USDA+</div>
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
                Min: 0.05 ETH
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

            <div className="flex justify-between">
              <span className=" font-medium text-lg text-grayLight">
                5% of collateral upside
              </span>
              <span className=" font-medium text-lg text-grayLight">
                ${upsideCollateral.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
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
          <WalletConnectButton />
        )}
        <LoadingBox
          isLoading={mintLoading}
          isFailure={depositError || depositHashError}
          isSuccess={Boolean(Depositdata)}
          setSuccessLoading={setMintBtnLoading}
          heading="Minting USDA+"
          loadingCount={currency.toLocaleLowerCase() === "eth" ? "1/1" : "2/2"}
        />
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
