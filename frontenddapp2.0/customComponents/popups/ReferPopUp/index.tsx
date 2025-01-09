import twitter from "@/app/assets/new-twitter.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Popup from "@/components/ui/PopUp";
import { Typography } from "@/components/ui/Typography";
import { Gift } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ReferPopupProps {
  //   twitter: string; // Path to the twitter icon image
}

const ReferPopup: React.FC<ReferPopupProps> = ({}) => {
  return (
    <Popup
      popUpWidth="665px"
      title="Refer and Earn"
      content={
        <Button
          variant={"shadowOutline"}
          className="border-[#041A50] h-fit p-[10px]"
        >
          <Gift style={{ width: "24px", height: "24px" }} />
        </Button>
      }
      contentClass="!left-[unset] right-[0px] top-[50px]"
    >
      <div className="mt-4">
        <Typography size="lg" className="text-grayLight">
          Refer Autonomint to your friends and boost your earnings!
        </Typography>
      </div>
      <div className="flex mt-3">
        <Input
          className="rounded-none !text-lg h-12 px-4 !font-medium"
          value={"https://www.testnet.app.autonomint.com?ref=1A037"}
        />
        <Button
          className="rounded-none !text-lg border-l-0 !font-medium h-12 px-4"
          variant={"outline"}
          size={"lg"}
        >
          Copy
        </Button>
      </div>

      <Button
        variant={"default"}
        className="border-[#041A50] mt-8 h-fit text-[24px] font-normal  w-full p-[10px]"
      >
        <Image alt="twitter" src={twitter} /> Share on twitter
      </Button>
    </Popup>
  );
};

export default ReferPopup;
