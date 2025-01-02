import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 h-full">
      <div className="grid col-span-1 lg:col-span-4">
        <div className="grid grid-cols-3 gap-6 p-8">
          {Array.from({ length: 9 }).map(() => {
            return (
              <div className="bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] border border-grayLight"></div>
            );
          })}
        </div>
      </div>
      <div className="grid col-span-1 lg:col-span-2 p-6 border border-left-grayLight border-t-0 border-b-0 relative">
        <div className="flex flex-col justify-between max-h-[calc(100%-80px)]">
          <span className="text-grayLight font-medium font-plex-grotesk text-[32px] text-center ">
            Tap a card to view details
          </span>
          <div className="flex flex-col text-left">
            <div className="font-plex-grotesk text-textBlack text-3xl font-medium">
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
