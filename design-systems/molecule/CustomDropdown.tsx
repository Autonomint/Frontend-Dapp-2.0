"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design-systems/atoms/popover";
import { Label } from "@/design-systems/atoms/label";
import { Button } from "@/design-systems/atoms/button";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

const networks = ["Sepolia", "Base", "Ethereum", "Polygon"];

const CustomDropdown = () => {
  const [selected, setSelected] = useState("Sepolia");

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="network" className=" text-grayLight text-lg font-medium">
        Network
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex justify-between w-full h-17 px-3 border border-grayLight rounded-md text-textBlack  md:text-[32px] text-[24px] dark:text-white"
          >
            {selected}
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-full border border-grayLight rounded-md shadow-md"
        >
          <div className="flex flex-col">
            {networks.map((network) => (
              <button
                key={network}
                className="w-full px-3 py-2 text-left hover:bg-gray-100"
                onClick={() => setSelected(network)}
              >
                {network}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomDropdown;
