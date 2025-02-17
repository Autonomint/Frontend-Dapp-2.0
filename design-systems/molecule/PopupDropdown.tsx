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

const networks = [
  "Extend Maturity By 30days",
  "Extend Maturity By 60days",
  "Extend Maturity By 90days",
  "Extend Maturity By 120days",
];

const PopupDropdown = () => {
  const [selected, setSelected] = useState("Extend Maturity By 30days");

  return (
    <div className="flex flex-col space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex justify-between w-full h-17 px-3 py-0 border border-grayLight rounded-md text-textBlack  md:text-[24px] dark:text-white"
          >
            {selected}
            <div className="border border-grayLight border-l border-y-0 h-full py-4 px-4 border-r-0">
              <ChevronDownIcon className="w-4  h-4 ml-2" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="bg-white dark:bg-[#0D0D0D] border border-grayLight rounded-md shadow-md"
        >
          <div className="flex flex-col">
            {networks.map((network) => (
              <button
                key={network}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
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

export default PopupDropdown;
