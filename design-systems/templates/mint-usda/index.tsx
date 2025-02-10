"use client";
import { Button } from "@/components/ui/button";
import { FormYourLuckIcon } from "@/components/ui/SvgIcons";
import AppNavbar from "@/custom-components/AppNavbar";
import ChartComponent from "@/design-systems/organisms/mint-page/chart-wrapper";
import InputForm from "@/design-systems/organisms/mint-page/input-form";
import { useRouter } from "next/navigation";

function MintUSDa() {
  const router = useRouter();
  const currency = "eth";

  return (
    <>
      <AppNavbar />
      <div className="grid lg:grid-cols-3 grid-cols-1">
        <div className="col-span-2 hidden lg:block border border-solid border-grayLight">
          <ChartComponent />
        </div>
        <div className="col-span-1 hidden lg:block border border-solid border-grayLight">
          <InputForm currency={currency} />
        </div>
        <div className="col-span-1 block lg:hidden border border-solid border-grayLight">
          <InputForm currency={currency} />
        </div>
        <div className="col-span-2 block lg:hidden border border-solid border-grayLight">
          <ChartComponent />
        </div>

        <div className="col-span-2 border border-solid border-grayLight p-6 lg:p-8">
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
            <Button
              variant={"shadowOutline"}
              className="w-[50px] hidden  lg:flex !h-[50px] !py-4 !shadow-none"
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
