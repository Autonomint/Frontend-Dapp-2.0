import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function page() {
  return (
    <div className="flex flex-col">
      <div className="p-8 border-solid border-graylight">
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex flex-col flex-1">
            <span className="text-medium text-grayLight text-lg ">
              Input Amount
            </span>
            <Input
              className="rounded-none border border-GrayLight font-medium"
              value={"$1,202"}
            />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-medium text-grayLight text-lg ">
              Select Collateral
            </span>
            <Input
              className="rounded-none border border-GrayLight font-medium"
              value={"$1,202"}
            />
          </div>
        </div>
        <div className="border border-solid border-grayLight-1 p-5 mt-8">
          <div className="flex justify-between">
            <div className="text-grayLight text-lg ">Redeemable Amount</div>
          </div>
          <div className="md:text-[42px] text-[32px] text-textBlack  mt-8 font-medium">
            $1,201
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="border border-solid border-grayLight-1 md:p-12 p-6">
          <div className="flex justify-between">
            <div className="text-grayLight md:text-lg  text-[14px]">
              Note: A withdrawal Fee of 2% will be applied.
            </div>
          </div>
        </div>
        <Button className="bg-textBlack text-white h-full text-white md:text-[32px] text-[24px] font-bold  py-4 md:p-0">
          Redeem
        </Button>
      </div>
    </div>
  );
}

export default page;
