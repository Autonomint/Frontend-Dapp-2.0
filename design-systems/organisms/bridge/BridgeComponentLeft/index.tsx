import { GenericDropdownMenu } from "@/design-systems/atoms/DropdownCustom/GenericDropdownMenu";
import { Typography } from "@/design-systems/atoms/Typography";
import { handleWheel } from "@/utils/helpers";
import { Dispatch, SetStateAction } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export default function BridgeComponentLeft({
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
  fromNetworkOption,
  isChainSwitchPending,
}: {
  balance: number;
  amountError: string;
  setSendToken: Dispatch<SetStateAction<"USDa" | "TUSDT">>;
  setSendAmount: Dispatch<SetStateAction<number | null>>;
  sendAmount: number | null;
  setSendNetwork: Dispatch<
    React.SetStateAction<"Sepolia" | "Base" | "Mode" | "OP">
  >;
  heading: string;
  network: string;
  token: string;
  totalAmount: string;
  fromNetworkOption: {
    label: string;
    onClick: () => void;
  }[];
  isChainSwitchPending: boolean;
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
              items={fromNetworkOption}
              className="w-full  text-[20px] lg:text-[24px] border border-grayLight h-[60px] lg:h-[65px]"
              isLoading={isChainSwitchPending}
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
