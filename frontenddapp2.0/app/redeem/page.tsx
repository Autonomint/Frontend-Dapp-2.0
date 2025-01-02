import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function page() {
  return (
    <div className="flex flex-col">
      <div className="p-8 border-solid border-graylight">
        <div className="flex gap-8">
          <div className="flex flex-col flex-1">
            <span className="text-medium text-grayLight text-lg font-plex-grotesk">
              Input Amount
            </span>
            <Input
              className="rounded-none border border-GrayLight font-medium"
              value={"$1,202"}
            />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-medium text-grayLight text-lg font-plex-grotesk">
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
            <div className="text-grayLight text-lg font-plex-grotesk">
              Redeemable Amount
            </div>
          </div>
          <div className="text-[42px] text-textBlack font-plex-grotesk mt-8">
            $1,201
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="border border-solid border-grayLight-1 p-12">
          <div className="flex justify-between">
            <div className="text-grayLight text-lg font-plex-grotesk">
              Note: A withdrawal Fee of 2% will be applied
            </div>
          </div>
        </div>
        <Button className="bg-textBlack text-white h-full text-white text-[32px]">
          Redeem
        </Button>
      </div>
    </div>
  );
}

export default page;
