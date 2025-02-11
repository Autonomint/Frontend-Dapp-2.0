import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/Typography";
import { usePortfolioTab } from "@/contexts/portfolio-tab";
import { useScroll } from "@/contexts/scroll";
import LoadingBox from "@/custom-components/LoadingBox";
import ToastNotification from "@/custom-components/toasts/ToastNotification";
import ToastNotificationError from "@/custom-components/toasts/ToastNotificationError";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import useDepositTokens from "@/hookes/contract-hooks/useMintUsds";
import displayNumberWithPrecision, { handleWheel } from "@/utils/helpers";
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
  useWaitForTransactionReceipt,
} from "wagmi";
import InputMetics from "../Input-metrics";
import useFetchOptionFees from "@/hookes/api-hooks/useOptionFee";
const formSchema = Yup.object({
  collateral: Yup.string().required("Collateral is required"),
  collateralAmount: Yup.number()
    .max(Yup.ref("balance"), `Amont must be less than or equal to balance`)
    .required("Collateral amount is required"),
  strikePrice: Yup.number()
    .min(5, "Minimum is 5")
    .max(25, "Maximum is 25")
    .required("Strike price is required"),
  balance: Yup.number(),
});

function InputForm({ currency }: { currency: string }) {
  const chainId = useChainId();
  const router = useRouter();
  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const { isUsdValuePending, usdValue: ethPrice } = useGetUsdValue();
  const [amintToBeMinted, setAmintToBeMinted] = useState("0");
  const [downsideProtectionAmnt, setDownsideProtectionAmnt] = useState("0");
  const [upsideCollateral, setUpsideCollateral] = useState(0);
  const { address } = useAccount();
  const ethBalance = useBalance({ address: address });
  const formattedBalance = Number(ethBalance.data?.formatted || 0).toFixed(4);
  const { isScroll, setIsScroll } = useScroll();

  const formik = useFormik({
    initialValues: {
      collateral: currency || "eth",
      collateralAmount: 0,
      strikePrice: 5,
      balance: 0,
    },
    validationSchema: formSchema,
    onSubmit: handleMint,
  });

  useEffect(() => {
    formik.setFieldValue("balance", formattedBalance);
  }, [formattedBalance]);
  useEffect(() => {
    formik.setFieldValue("collateral", currency);
  }, [currency]);

  // Create the options for the contract
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(250000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(options);
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

  useEffect(() => {
    if (isDepositSuccess && Depositdata) {
      setPortfolioTab("Borrowed");
      setIsScroll(true);

      toast.custom((t) => {
        const link =
          chainId === 84532
            ? `https://sepolia.basescan.org/tx/${Depositdata.transactionHash} `
            : `https://sepolia.etherscan.io/tx/${Depositdata.transactionHash}`;

        return (
          <ToastNotification
            title="Mint Successful"
            message="New Deposit has been created"
            linkText={
              chainId === 84532 ? "View On Basescan" : "View On Etherscan"
            }
            linkUrl={link}
            onClose={() => toast.dismiss(t)}
          />
        );
      });
      setMintLoading(false);
      handleResetPage();
      router.push("/dashboard/portfolio");
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
    formik.resetForm();
    reset();
  };

  const { optionFees, refetchOptionFee } = useFetchOptionFees(
    formik.values.collateralAmount,
    (ethPrice || 0) as number,
    formik.values.strikePrice == 5
      ? 0
      : formik.values.strikePrice == 10
      ? 1
      : formik.values.strikePrice == 15
      ? 2
      : formik.values.strikePrice == 20
      ? 3
      : 4
  );

  console.log(optionFees, "optionFees");

  async function handleMint(values: any) {
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
    setMintLoading(true);
    setMintBtnLoading(true);
    reset();
    const strikePrice = values.strikePrice;
    const colateralamount = parseUnits(
      formik.values.collateralAmount.toString(),
      18
    );
    const strikePercent =
      strikePrice == 5
        ? 0
        : strikePrice == 10
        ? 1
        : strikePrice == 15
        ? 2
        : strikePrice == 20
        ? 3
        : 4;
    const data = optionFees;
    if (data != undefined && nativeFee != undefined) {
      mintUSDa?.({
        strikePercent,
        strikePrice: BigInt(
          Math.floor(
            (1 + Number(formik.values.strikePrice) / 100) *
              Number(ethPrice ? ethPrice : 0)
          )
        ),
        volatility: BigInt(data),
        depositingAmount: parseEther(formik.values.collateralAmount.toString()),
        value:
          parseEther(formik.values.collateralAmount.toString()) +
          nativeFee.nativeFee,
      });
    }
  }

  /**
   * Handles the calculation and setting of the amint to be minted and downside protection amounts.
   */
  const CalculateAmtToBeMinted = async () => {
    try {
      // Calculate the amint to be minted
      const optionf = optionFees || 0;
      const amintToMint =
        (Number(formik.values.collateralAmount || 0) *
          Number(ethPrice || 0) *
          80) /
        10000;
      const amint2Decimal = displayNumberWithPrecision(amintToMint.toString());
      setAmintToBeMinted((Number(amint2Decimal) - optionf).toFixed(2));

      // Calculate the downside protection amount
      const downsideProtection =
        (Number(formik.values.collateralAmount || 0) *
          Number(ethPrice || 0) *
          (100 - (ltv ? ltv : 0))) /
        10000;
      const downsideProtection2Decimal = displayNumberWithPrecision(
        downsideProtection.toString()
      );
      const upsideCollateral =
        (Number(formik.values.collateralAmount || 0) *
          Number(ethPrice || 0) *
          formik.values.strikePrice) /
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
      setAmintToBeMinted("0");
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
  }, [formik.values.collateralAmount, formik.values.strikePrice, optionFees]);

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
        <div className=" font-medium text-2xl">Mint USDa</div>
        <div className="flex flex-col gap-[18px] ">
          <div className="flex flex-col">
            <div className="flex-col gap-1 justify-start">
              <div className="flex">
                <Input
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
                Bal: {Number(ethBalance.data?.formatted || 0).toFixed(4)} ETH
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[18px]">
            <div className="flex">
              <div className="relative w-full">
                <Input
                  value={amintToBeMinted}
                  readOnly
                  className="rounded-none md:text-subtitle h-12 px-4"
                />
                <Button
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 md:text-subtitle font-medium px-4 text-textBlack dark:text-white"
                  variant={"ghost"}
                  size={"sm"}
                >
                  USDa
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
            (Number(ethPrice || 0) / 100) *
            Number(formik.values.collateralAmount)
          ).toFixed(2)}
          optionFees={optionFees.toFixed(2)}
          usdaBorrowed={amintToBeMinted == "0" ? "0.00" : amintToBeMinted}
          Dp={Number(downsideProtectionAmnt).toFixed(2)}
        />
      </div>
      <div className="col-span-1 h-[85px]">
        {!mintBtnLoading && (
          <Button
            type="submit"
            className={`
               bg-black dark:bg-custom-gradient-to-top py-6
             text-white  font-semibold text-[24px] w-full h-full rounded-md `}
          >
            {!mintBtnLoading && "Mint USDa"}
          </Button>
        )}
        <LoadingBox
          isLoading={mintLoading}
          isFailure={depositError || depositHashError}
          isSuccess={Boolean(Depositdata)}
          setSuccessLoading={setMintBtnLoading}
          heading="Minting USDa"
        />
      </div>
    </form>
  );
}

export default InputForm;
