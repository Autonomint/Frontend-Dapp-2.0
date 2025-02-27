"use client";
import { Button } from "@/design-systems/atoms/button";
import { FormYourLuckIcon } from "@/design-systems/atoms/SvgIcons";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import ChartComponent from "@/design-systems/organisms/mint-page/chart-wrapper";
import InputForm from "@/design-systems/organisms/mint-page/input-form";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import { useRouter } from "next/navigation";

function MintUSDa({ currency }: { currency: string }) {
  const { isConnected: isWalletConnected } = useCheckWalletConnection();
  const router = useRouter();
  // const currency = "eth";

  return (
    <>
      <AppNavbar />
      <div className="grid lg:grid-cols-3 grid-cols-1">
        <div className="col-span-2 hidden lg:block border border-solid border-grayLight">
          <ChartComponent currency={currency} />
        </div>
        <div className="col-span-1 hidden lg:block border border-solid border-grayLight">
          <InputForm currency={currency} />
        </div>
        <div className="col-span-1 block lg:hidden border border-solid border-grayLight">
          <InputForm currency={currency} />
        </div>
        <div className="col-span-2 block lg:hidden border border-solid border-grayLight">
          <ChartComponent currency={currency} />
        </div>

        <div className="col-span-2 border border-solid border-grayLight p-4 lg:p-6">
          <div className="flex flex-col justify-start">
            <div className=" text-textBlack text-3xl font-medium dark:text-white">
              How it works?
            </div>
            <ol className="list-decimal list-outside pl-4 mt-3 text-grayLight">
              <li className="mb-2 text-lg">
                Deposit ETH as collateral and mint USDa (up to 80% of collateral
                value).
              </li>
              <li className="mb-2 text-lg">
                Get 20% downside price fall protection on collateral with 1
                month expiry, with option to renew every month.
              </li>
              <li className="mb-2 text-lg">
                Pay a closing option fee, ~50% lower than charged in any
                derivative platform.
              </li>
              <li className="mb-2 text-lg">
                Track and manage positions under ‘Borrowed Position’ in
                Portfolio.
              </li>
              <li className=" text-lg">
                Earn yield-bearing ABOND tokens when closing your position.
              </li>
            </ol>
          </div>
        </div>
        <div className=" cursor-pointer dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] col-span-1 border border-solid border-grayLight p-8">
          <div
            onClick={() => {
              router.push("/farmyourluck");
            }}
            className="flex flex-col justify-between h-full"
          >
            <Button
              variant={"shadowOutline"}
              className="w-[50px] hidden  lg:flex !h-[50px] !py-4 !shadow-none hover:bg-none"
            >
              <FormYourLuckIcon
                style={{
                  width: "26px",
                  height: "26px",
                }}
                width={24}
                height={24}
                className="dark:stroke-white stroke-black"
              />
            </Button>
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
