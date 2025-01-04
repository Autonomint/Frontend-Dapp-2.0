import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 h-full">
      <div className="grid col-span-1 lg:col-span-4">
        <div className="grid grid-cols-3 gap-6 md:p-8 p-5">
          {Array.from({ length: 9 }).map(() => {
            return (
              <div
                className="bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] border border-grayLight 
                  aspect-square lg:aspect-auto lg:h-auto lg:w-auto w-full h-full"
              ></div>
            );
          })}
        </div>
      </div>
      <div className="grid col-span-1 lg:col-span-2 lg:p-6 border border-solid-grayLight relative">
        <div className="flex flex-col md:justify-between md:max-h-[calc(100%-80px)] border border-solid border-grayLight lg:border-0 p-5 lg:p-0 gap-20 lg:gap-0">
          <span className="text-grayLight font-medium  lg:text-[32px] text-[24px] lg:text-center">
            Tap a card to view details
          </span>
          <div className="flex flex-col text-left mb-28 lg:mb-0">
            <div className=" text-textBlack lg:text-3xl text-[20px] font-medium">
              How it works?
            </div>
            <ol className="list-decimal list-inside mt-3 text-grayLight">
              <li className="mb-3 text-lg">
                Select cards to view potential rewards.
              </li>
              <li className="mb-3 text-lg">
                Confirm your selection to reveal rewards.
              </li>
              <li className="mb-3 text-lg">
                Earn prizes or reclaim your option fees!
              </li>
              <li className="text-lg">
                Earn prizes or reclaim your option fees!
              </li>
            </ol>
          </div>
          <Button className="absolute bg-black w-full left-0 bottom-0 text-white h-[90px] font-bold text-[32px]">
            Pay $5
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
