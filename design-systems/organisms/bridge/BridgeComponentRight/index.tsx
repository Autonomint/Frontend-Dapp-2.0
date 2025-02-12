import { GenericDropdownMenu } from "@/design-systems/atoms/DropdownCustom/GenericDropdownMenu";

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
          <div className="flex justify-between h-[27px] text-grayLight text-[14px] lg:text-lg">
            You Receive
          </div>
          <div className="text-[42px] text-textBlack  mt-4 lg:mt-8 dark:text-white">
            ${receiveAmount.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BridgeComponentRight;
