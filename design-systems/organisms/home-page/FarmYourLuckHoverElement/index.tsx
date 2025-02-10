import { Button } from "@/components/ui/button";
import Image from "next/image";
import arrow from "@/app/assets/arrow-right-02.png";

function FarmYourLuckHoverElement() {
  return (
    <div className="flex flex-col border-x border-y border-[1px] border-grayLight overflow-y-hidden animateDCDS gap-8 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-2 lg:p-8 relative dark:bg-custom-gradient-to-top">
      <div className="text-textBlack text-[26px] sm:text-[32px] lg:text-[38px] font-medium dark:text-white bg-none">
        Explore incentives from our partners
      </div>
      <div className="lg:text-[24px] text-[20px] text-grayLight font-medium bg-none">
        Claim back 100% of your Option fees
      </div>
      <Button className="absolute lg:px-6 px-3 bottom-0 left-0 w-full mt-13 bg-textBlack text-white  text-[24px] lg:text-[32px] flex justify-between h-[60px] lg:h-[108px] hover:bg-textBlack dark:bg-home-btn-bg">
        Farm your luck
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

export default FarmYourLuckHoverElement;
