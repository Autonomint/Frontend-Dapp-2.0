import { NetworkId } from "@/utils/constants";
import { formatTimestamp } from "@/utils/helpers";
import { dcdsDepositDetails } from "@/utils/interface";
import { getIconMapping } from "@/utils/token-config";
import { Network } from "ethers";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useMemo } from "react";
import { useAccount } from "wagmi";

const DcdsPositionTableRow = ({
  position,
  tabPosition,
  idx,
  setSelectedPosition,
  setIsRebalanceDialogOpen,
  setIsWithdrawDialogOpen,
  isViewPositionOpen,
  setViewPosition,
  isLast,
  setRenewRepay,
  highlight = false,
}: {
  highlight: boolean;
  isViewPositionOpen: boolean;
  setViewPosition: (isOpen: boolean) => void;
  isLast: boolean;
  setRenewRepay: (isOpen: boolean) => void;
  setIsRebalanceDialogOpen: (isOpen: boolean) => void;
  setIsWithdrawDialogOpen: (isOpen: boolean) => void;
  position: dcdsDepositDetails;
  tabPosition: "Borrowed" | "Deposited";
  idx: number;
  setSelectedPosition: (position: dcdsDepositDetails) => void;
}) => {
  const handleRowClick = () => {
    setSelectedPosition(position);
    setIsWithdrawDialogOpen(true);
  };
  const { chainId } = useAccount();
  const { theme } = useTheme();

  // Calculate the total deposited amount in USD by summing up the value of all tokens
  const totalDepositedAmount = useMemo(() => {
    // USDA is already in USD, no need for price conversion
    const usdaAmount = Number(position.depositedAmounts.usda || 0);

    // USDT amount - if priceAtDeposit is available, multiply by it, otherwise use as is
    const usdtAmount = position.usdtPriceAtDeposit
      ? Number(position.depositedAmounts.usdt || 0) *
        Number(position.usdtPriceAtDeposit || 0)
      : Number(position.depositedAmounts.usdt || 0);

    // Calculate value of BOLD tokens in USD
    const boldAmount =
      Number(position.depositedAmounts.boldToken || 0) *
      Number(position.boldPriceAtDeposit || 0);

    // Calculate value of native tokens (like ETH) in USD
    const nativeAmount =
      Number(position.depositedAmounts.nativeToken || 0) *
      Number(position.nativeTokenPriceAtDeposit || 0);

    // Calculate value of USDC in USD (1:1 unless priceAtDeposit is different)
    const usdcAmount =
      Number(position.depositedAmounts.usdc || 0) *
      Number(position.usdcPriceAtDeposit || 1);

    // Calculate value of wBLT in USD (1:1 unless priceAtDeposit is different)
    const wbltAmount =
      Number(position.depositedAmounts.wblt || 0) *
      Number(position.wbltPriceAtDeposit || 1);

    // Return sum of all token values, formatted to 2 decimal places
    return (
      usdaAmount +
      usdtAmount +
      boldAmount +
      nativeAmount +
      usdcAmount +
      wbltAmount
    ).toFixed(2);
  }, [position]);

  const depositedTokenNames = useMemo(() => {
    const tokenNames: string[] = [];
    for (const token in position.depositedAmounts) {
      if (
        Number(
          position.depositedAmounts[
            token as keyof typeof position.depositedAmounts
          ]
        ) > 0
      ) {
        tokenNames.push(
          token === "nativeToken"
            ? chainId === NetworkId.BaseSepolia
              ? "aero"
              : "op"
            : token
        );
      }
    }
    return tokenNames;
  }, [position]);

  return (
    <tr
      className={`border ${
        highlight
          ? "dark:bg-custom-gradient-to-top bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
          : ""
      } border-solid border-grayLight `}
    >
      <td className="px-5 py-4 2xl:py-6 ">{position.index}</td>
      <td className="px-5 py-4 2xl:py-6 text-center sm:text-left">
        {/* {position.depositedAmint == "undefined" ? 0 : position.depositedAmint} /{" "}
        {position.depositedUsdt == "undefined" ? 0 : position.depositedUsdt} */}
        <div className="flex items-center gap-1">
          ${totalDepositedAmount}
          <div className="flex items-center gap-1">
            {depositedTokenNames.map((tokenName) => {
              return (
                <Image
                  key={tokenName}
                  src={getIconMapping(theme || "dark", tokenName)}
                  alt={tokenName}
                  className="w-5 h-5"
                  width={20}
                  height={20}
                />
              );
            })}
          </div>
        </div>
      </td>
      <td className="px-5 py-4 whitespace-nowrap 2xl:py-6 ">
        {position.collateralType ? position.collateralType : "ETH"}
      </td>
      <td className="px-5 py-4 whitespace-nowrap 2xl:py-6 ">
        {formatTimestamp(Number(position.depositedTime))}
      </td>

      <td className="px-5 py-4 2xl:py-6 ">
        {String(position.lockingPeriod).length > 8
          ? Number(position.lockingPeriod) / 86400000
          : Number(position.lockingPeriod) / 86400}{" "}
        days
      </td>

      <td className={`px-5 py-4 2xl:py-6  md:text-right md:space-x-12`}>
        <span
          onClick={handleRowClick}
          className="font-bold cursor-pointer text-[20px] underline "
        >
          {position.status === "WITHDREW_GAINS" ? "Withdrawn" : "Withdraw"}
        </span>
        {/* <span
            onClick={handleRowClick}
            className="font-bold cursor-pointer text-[20px] underline  "
          >
            Rebalance
          </span> */}
      </td>
    </tr>
  );
};

export default DcdsPositionTableRow;
