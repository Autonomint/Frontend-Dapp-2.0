"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import farmyourluckLogo from "../assets/cryptocurrency-color_eth.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AppNavbar from "@/custom-components/AppNavbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { parseEther, parseUnits } from "viem";
import { BACKEND_API_URL } from "@/utils/urls";
import { useAccount, useBalance, useChainId } from "wagmi";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useDepositTokens from "@/hookes/contract-hooks/useMintUsds";
import displayNumberWithPrecision from "@/utils/helpers";
import useGetTvl from "@/hookes/contract-hooks/useGetLtv";
import { Typography } from "@/components/ui/Typography";

function ChartComponent() {
  return <>HI</>;
}

function MetricFields({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex justify-between mb-3">
      <div className=" text-grayLight font-medium text-lg">{label}</div>
      <div
        className="font-medium text-lg"
        style={{
          color: color,
        }}
      >
        {value}
      </div>
    </div>
  );
}
interface addAdditionalMeticsProps {
  deposit: string;
  optionFees: string;
  usdaBorrowed: string;
  Dp: string;
}

function AdditionalMetics({
  deposit,
  optionFees,
  usdaBorrowed,
  Dp,
}: addAdditionalMeticsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-textBlack  font-medium text-xl dark:text-white">
        100% Synthetic LTV
      </div>
      <div className="flex flex-col mt-3">
        {[
          { label: "Deposit", value: `$${deposit}`, color: "#2DDA95" },
          { label: "Option Fee", value: `$${optionFees}`, color: "#FF5270" },
          {
            label: "USDa borrowed",
            value: `$${usdaBorrowed}`,
            color: "#627EEA",
          },
          { label: "Downside Protection", value: `$${Dp}`, color: "#05A552" },
        ].map((metric, index) => (
          <MetricFields
            key={index}
            label={metric.label}
            value={metric.value}
            color={metric.color}
          />
        ))}
      </div>
      {/* <Button className="bg-textBlack w-full absolute left-0 bottom-0  rounded-none h-16 font-bold text-[#FFFFFF] text-[32px] ">
        Mint USDa
      </Button> */}
    </div>
  );
}

const formSchema = Yup.object({
  collateral: Yup.string().required("Collateral is required"),
  collateralAmount: Yup.mixed()
    .test(
      "is-positive-number",
      "Value must be positive and >= 0.05",
      (value) => Number(value) >= 0.05
    )
    .required("Collateral amount is required"),
  strikePrice: Yup.number()
    .min(5, "Minimum is 5")
    .max(25, "Maximum is 25")
    .required("Strike price is required"),
});

function AdditionalDetails() {
  const chainId = useChainId();
  const { isUsdValuePending, usdValue: ethPrice } = useGetUsdValue();
  const [amintToBeMinted, setAmintToBeMinted] = useState("0");
  const [downsideProtectionAmnt, setDownsideProtectionAmnt] = useState("0");
  const [upsideCollateral, setUpsideCollateral] = useState(0);
  const [optionFees, setOptionFees] = useState(0);
  const { address } = useAccount();
  const ethBalance = useBalance({ address: address });
  const formattedBalance = Number(ethBalance.data?.formatted || 0).toFixed(4);
  const formik = useFormik({
    initialValues: {
      collateral: "eth",
      collateralAmount: 0,
      strikePrice: 5,
    },
    validationSchema: formSchema,
    onSubmit: handleMint,
  });

  // Create the options for the contract
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(250000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(options);
  const { isTvlPending, tvlValue: ltv } = useGetTvl();
  console.log("quoteError", nativeFee, quoteError, options);

  const { depositDatahash, isDepositsLoading, mintUSDa, reset } =
    useDepositTokens();

  async function handleMint(values: any) {
    const strikePrice = values.strikePrice;
    let colateralamount = parseUnits(
      formik.values.collateralAmount.toString(),
      18
    );
    let strikePercent =
      strikePrice == 5
        ? 0
        : strikePrice == 10
        ? 1
        : strikePrice == 15
        ? 2
        : strikePrice == 20
        ? 3
        : 4;
    const data = await fetch(
      `${BACKEND_API_URL}/borrows/optionFees/${chainId}/${colateralamount}/${ethPrice}/${strikePercent}`
    ).then((res) => res.json());
    if (data[0] != undefined && nativeFee != undefined) {
      mintUSDa?.({
        strikePercent,
        strikePrice: BigInt(
          Math.floor(
            (1 + Number(formik.values.strikePrice) / 100) *
              Number(ethPrice ? ethPrice : 0)
          )
        ),
        volatility: BigInt(data[0]),
        depositingAmount: parseEther(formik.values.collateralAmount.toString()),
        value:
          parseEther(formik.values.collateralAmount.toString()) +
          nativeFee.nativeFee,
      });
    }
  }

  console.log("depositDatahash", formik.values.collateralAmount, formik.errors);

  /**
   * Retrieves the option fees for a given address.
   *
   * @return {Promise<any>} A promise that resolves to the option fees.
   */
  async function getOptionFees() {
    const strikePrice = formik.values.strikePrice;
    const response = await fetch(
      `${BACKEND_API_URL}/borrows/optionFees/${chainId}/${parseUnits(
        formik.values.collateralAmount.toString(),
        18
      )}/${ethPrice ?? 0}/${
        strikePrice == 5
          ? 0
          : strikePrice == 10
          ? 1
          : strikePrice == 15
          ? 2
          : strikePrice == 20
          ? 3
          : 4
      }`
    );
    const data = await response.json();
    console.log(data);
    return data[1] ? data[1] / 10 ** 6 : 0;
  }

  /**
   * Handles the calculation and setting of the amint to be minted and downside protection amounts.
   */
  const CalculateAmtToBeMinted = async () => {
    try {
      // Calculate the amint to be minted
      const optionf = await getOptionFees();
      setOptionFees(optionf);
      debugger;

      const amintToMint =
        (Number(formik.values.collateralAmount) * Number(ethPrice) * 80) /
        10000;
      const amint2Decimal = displayNumberWithPrecision(amintToMint.toString());
      setAmintToBeMinted((Number(amint2Decimal) - optionf).toFixed(2));

      // Calculate the downside protection amount
      const downsideProtection =
        (Number(formik.values.collateralAmount) *
          Number(ethPrice) *
          (100 - (ltv ? ltv : 0))) /
        10000;
      const downsideProtection2Decimal = displayNumberWithPrecision(
        downsideProtection.toString()
      );
      const upsideCollateral =
        (Number(formik.values.collateralAmount) *
          Number(ethPrice) *
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
    debugger;
    if (formik.values.collateral == undefined) {
      formik.setErrors({
        collateralAmount: "select collateral type",
      });
    } else if (formik.values.collateralAmount == 0) {
      setAmintToBeMinted("0");
      setDownsideProtectionAmnt("0");
      setOptionFees(0);
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
  }, [formik.values.collateralAmount, formik.values.strikePrice]);
  console.log(optionFees, ">>");

  const handleSetMaxBal = () => {
    formik.setFieldValue(
      "collateralAmount",
      Number(ethBalance.data?.formatted || 0)
    );
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col p-6 gap-[18px] relative">
        <div className=" font-medium text-2xl">Mint USDa</div>
        <div className="flex flex-col gap-[18px] ">
          <div className="flex flex-col">
            <div className="flex-col gap-1 justify-start">
              <div className="flex">
                <Input
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
        <AdditionalMetics
          deposit={(
            (Number(ethPrice || 0) / 100) *
            Number(formik.values.collateralAmount)
          ).toFixed(2)}
          optionFees={optionFees.toFixed(2)}
          usdaBorrowed={amintToBeMinted == "0" ? "0.00" : amintToBeMinted}
          Dp={Number(downsideProtectionAmnt).toFixed(2)}
        />
      </div>
      <div className="col-span-1">
        <Button
          type="submit"
          className="bg-textBlack text-white py-4 font-semibold text-[24px] w-full h-full rounded-md dark:bg-custom-gradient"
        >
          Mint
        </Button>
      </div>
    </form>
  );
}

function MintUSDa() {
  const router = useRouter();
  return (
    <>
      <AppNavbar />
      <div className="grid md:grid-cols-3 grid-cols-1">
        <div className="col-span-2 hidden md:block border border-solid border-grayLight">
          <ChartComponent />
        </div>
        <div className="col-span-1 hidden md:block border border-solid border-grayLight">
          <AdditionalDetails />
        </div>
        <div className="col-span-1 block md:hidden border border-solid border-grayLight">
          <AdditionalDetails />
        </div>
        <div className="col-span-2 block md:hidden border border-solid border-grayLight">
          <ChartComponent />
        </div>

        <div className="col-span-2 border border-solid border-grayLight p-8">
          <div className="flex flex-col justify-start">
            <div className=" text-textBlack text-3xl font-medium dark:text-white">
              How it works?
            </div>
            <ol className="list-decimal list-outside pl-4 mt-3 text-grayLight">
              <li className="mb-3 text-lg">
                Select cards to view potential rewards.
              </li>
              <li className="mb-3 text-lg">
                Confirm your selection to reveal rewards.
              </li>
              <li className="mb-3 text-lg">
                Earn prizes or reclaim your option fees!
              </li>
              <li className="text-base">
                Earn prizes or reclaim your option fees!
              </li>
            </ol>
          </div>
        </div>
        <div className="col-span-1 border border-solid border-grayLight p-8">
          <div
            onClick={() => {
              router.push("/farmyourluck");
            }}
            className="flex flex-col justify-between h-full"
          >
            <Image
              src={farmyourluckLogo}
              width={50}
              height={50}
              alt="farm-your-luck"
              className="hidden md:block"
            />
            <div className=" text-textBlack text-3xl font-medium dark:text-white">
              Farm Your Luck
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MintUSDa;
