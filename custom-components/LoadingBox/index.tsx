import { CheckIcon, RingLoadingIcon } from "@/components/ui/SvgIcons";
import { Typography } from "@/components/ui/Typography";
import Image from "next/image";
import Spinner from "@/app/assets/Spinner@1x-1.0s-200px-200px (2).svg";
import { useEffect, useState } from "react";

const LoadingBox = ({
  isLoading,
  heading,
  isSuccess,
  isFailure,
  setSuccessLoading,
  loadingCount,
}: {
  loadingCount?: string;
  isLoading: boolean;
  heading?: string;
  isSuccess?: boolean;
  isFailure?: boolean;
  setSuccessLoading: (value: boolean) => void;
}) => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const start = isLoading;
  const [end, setEnd] = useState<boolean>(false);

  useEffect(() => {
    if ((isSuccess && !isLoading) || isFailure) {
      setEnd(true);
      setTimeout(() => {
        setEnd(false);
      }, 500);
    }
  }, [isSuccess, !isLoading, isFailure]);

  useEffect(() => {
    if (end) {
      if (isSuccess && !isLoading) {
        setShowSuccess(true);
      }
      setTimeout(() => {
        setShowBox(false);
        setShowSuccess(false);
        // setSuccessLoading?.(false);
      }, 400);
      setTimeout(() => {
        setSuccessLoading?.(false);
      }, 1000);
    }
    if (start) {
      setShowBox(true);
      // setSuccessLoading(true);
    }
  }, [end, start, isSuccess, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setSuccessLoading?.(false);
      }, 1000);
    }
  }, [isLoading]);

  return (
    <div className={`relative  ${showBox && "h-full"}  w-full overflow-hidden`}>
      {showBox && (
        <div
          className={` absolute h-full p-6  flex justify-between items-center  border-[1px] border-[#7A7A7A] w-full transition-all dark:bg-custom-gradient-to-top bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]  ${
            start && "animate-slideIn"
          } ${end && "animate-slideOut"} `}
        >
          <div className="flex justify-between w-full h-full items-center">
            <Typography
              size="subtitle"
              variant="regular"
              className="text-black dark:text-white text-[20px] md:text-[24px]"
            >
              {heading || "Transaction Pending... 1/3"}
            </Typography>
            <div className="flex items-center gap-2 ">
              <span>{loadingCount}</span>
              {showSuccess ? (
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#ABFFDE]">
                  <CheckIcon
                    style={{
                      width: "12px",
                      height: "12px",
                    }}
                  />
                </div>
              ) : (
                <RingLoadingIcon className="fill-black dark:fill-white" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingBox;
