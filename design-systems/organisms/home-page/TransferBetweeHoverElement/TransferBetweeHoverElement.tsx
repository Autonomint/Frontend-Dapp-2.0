import { Button } from "@/design-systems/atoms/button";
import {
  DotIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@/design-systems/atoms/SvgIcons";
import { Typography } from "@/design-systems/atoms/Typography";
import { useTheme } from "next-themes";
import Image from "next/image";
import arrow from "@/app/assets/arrow-right-02.png";
import ModeImage from "@/app/assets/op-blue.svg";
import OptimismImage from "@/app/assets/optimism.png";
import infinityImage from "@/app/assets/infinity.svg";
import { useRouter } from "next/navigation";

function TransferBetweeHoverElement() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/bridge");
      }}
      className="flex  border-[1px] border-top border-grayLight flex-col  gap-4 lg:gap-8 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-2 lg:p-8 relative  dark:bg-custom-gradient-to-top"
    >
      <div className=" text-textBlack text-[24px] lg:text-[38px] font-medium dark:text-white bg-none">
        Transfer Between
      </div>
      <div className="flex-col gap-6 lg:gap-0 flex xl:flex-row justify-between items-start lg:items-start xl:items-end bg-none">
        <div className="flex gap-3 bg-none">
          <div className="flex flex-col bg-none">
            <Image
              className=" w-[65px] h-[65px] lg:w-[100px] lg:h-[100px]  xl:w-[130px] xl:h-[130px]"
              src={OptimismImage}
              alt="Price Graph"
              style={{
                backgroundColor: theme == "dark" ? "unset !important" : "",
              }}
            />
            <div className=" text-grayLight text-center text-[18px] lg:text-[32px] font-light bg-none dark:text-white">
              From
            </div>
          </div>
          <div className="flex items-center pb-6 lg:pb-9  justify-center gap-3 bg-none">
            <RightArrowIcon className="w-7 h-7" />

            <DotIcon className="w-2  h-2" />
            <LeftArrowIcon
              className="w-7 h-7"
              style={{
                backgroundColor: theme == "dark" ? "unset !important" : "",
              }}
            />
          </div>
          <div className="flex flex-col bg-none">
            <Image
              src={ModeImage}
              alt="Price Graph"
              className=" w-[65px] h-[65px] lg:w-[100px] lg:h-[100px]  xl:w-[130px] xl:h-[130px]"
              style={{
                backgroundColor: theme == "dark" ? "unset !important" : "",
              }}
            />
            <div className=" text-center text-grayLight text-[18px] lg:text-[32px] font-light bg-none dark:text-white">
              To
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3 items-center bg-none">
          <Image
            className="mb-3"
            src={infinityImage}
            alt="alt"
            style={{
              backgroundColor: theme == "dark" ? "unset !important" : "",
            }}
          />
          <Typography
            variant="regular"
            size="subtitle"
            className="text-center mb-3  text-grayLight  font-light bg-none"
          >
            Layer Zero Integration
          </Typography>
        </div>
      </div>
      <Button className="absolute bottom-0 lg:px-6 px-3  left-0 w-full mt-13 bg-textBlack text-white text-[24px] lg:text-[32px] flex justify-between h-[60px] lg:h-[102px] hover:bg-textBlack dark:bg-home-btn-bg">
        Bridge
        <Image
          src={arrow}
          width={42}
          height={42}
          alt="arrow"
          className="bg-none"
        />
      </Button>
    </div>
  );
}

export default TransferBetweeHoverElement;
