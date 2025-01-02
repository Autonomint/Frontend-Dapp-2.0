import { Button } from "@/components/ui/button";
import React from "react";
import arrow from "../assets/arrow-right-02.png";
import Image from "next/image";

function AppNavbar({ hasBackButton }: { hasBackButton: boolean }) {
  const navList = ["Mint USDa", "dCDS", "Bridge", "Dashboard"];
  return (
    <div className="flex relative">
      <Button
        style={{
          display: hasBackButton ? "block" : "none",
        }}
        className="bg-black absolute h-full mr-4"
      >
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
      {navList.map((navItem) => {
        return (
          <div
            className="flex-1 px-5 py-3 text-[32px] font-plex-grotesk font-medium border-r border-grayLight"
            style={{
              marginLeft: hasBackButton ? "70px" : "0px",
            }}
          >
            {navItem}
          </div>
        );
      })}
    </div>
  );
}

export default AppNavbar;
