import Image from "next/image";
import { useRouter } from "next/router";
import ModeImage from "./assets/mode.png";
import arrow from "./assets/arrow-right-02.png";
import infinityImage from "./assets/infinity.svg";
import {
  DotIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@/components/ui/SvgIcons";
import OptimismImage from "./assets/optimism.png";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
export default function TransferBetweeHoverElement() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/bridge");
      }}
      className="flex  border-[1px] border-top border-grayLight flex-col gap-8 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative"
    >
      <div className=" text-textBlack text-[38px] font-medium">
        Transfer Between
      </div>
      <div className="flex justify-between items-end">
        <div className="flex gap-3">
          <div className="flex flex-col">
            <Image
              width={130}
              height={130}
              src={ModeImage}
              alt="Price Graph"
              className=""
            />
            <div className=" text-grayLight text-center text-[32px] font-light">
              Mode
            </div>
          </div>
          <div className="flex items-center pb-9  justify-center gap-3">
            <RightArrowIcon />
            <DotIcon />
            <LeftArrowIcon />
          </div>
          <div className="flex flex-col">
            <Image
              width={130}
              height={130}
              src={OptimismImage}
              alt="Price Graph"
            />
            <div className=" text-center text-grayLight text-[32px] font-light">
              Optimism
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Image className="mb-3" src={infinityImage} alt="alt" />
          <Typography
            variant="regular"
            size="subtitle"
            className="text-center mb-3  text-grayLight  font-light "
          >
            Layer Zero Integration
          </Typography>
        </div>
      </div>
      <Button className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[102px] hover:bg-textBlack">
        Bridge
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}
