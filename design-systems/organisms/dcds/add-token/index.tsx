import { Button } from "@/design-systems/atoms/button";
import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import Image from "next/image";
import minus from "@/app/assets/minus-sign.png";
import add from "@/app/assets/add-01.png";
import { TokenDetails } from "@/design-systems/templates/dcds/interface";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { useState } from "react";
import { useWalletClient } from "wagmi";
import { useTokenConfig } from "@/utils/token-config";
import Spinner from "@/design-systems/atoms/Spinner";
import { CircleFadingPlus } from "lucide-react";
import { useTheme } from "next-themes";
import PulsatingBadge from "@/design-systems/atoms/pulsBadge";
import { calculateRemainingTimeDate, toLocalISOString } from "@/utils/helpers";

function AddToken({
  tokenDetails,
  setSelectedTokens,
  selectedTokens,
  formik,
}: {
  formik: any;
  tokenDetails: TokenDetails;
  setSelectedTokens: any;
  selectedTokens: { tokenImage: any; tokenName: string }[];
}) {
  const isSelected = selectedTokens.some(
    (token) => token.tokenName === tokenDetails.tokenName
  );

  const { theme } = useTheme();

  const toggleToken = () => {
    // check if the token is active or not
    if (!tokenDetails.active) {
      toast.custom((t) => (
        <ToastNotificationError
          title={tokenDetails?.errorMessage || ""}
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }
    // Set the flag and field values for the token in formik
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}Flag`,
      isSelected ? false : true
    );
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}Amount`,
      0
    );
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}Balance`,
      tokenDetails.balanceAvailable
    );
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}MinAmount`,
      tokenDetails.minTokenAmount
    );

    // Set approval flags in formik for approval transaction status
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}Approving`,
      false
    );
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}ApproveSuccess`,
      false
    );
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}ApproveFailure`,
      false
    );

    setSelectedTokens?.((prev: TokenDetails[]) => {
      if (isSelected) {
        return prev.filter(
          (token) => token.tokenName !== tokenDetails.tokenName
        );
      } else {
        return [...prev, tokenDetails];
      }
    });
  };

  const [isAddingToken, setIsAddingToken] = useState<boolean>(false);

  const { data: walletClient } = useWalletClient();
  const tokenConfig = useTokenConfig(
    tokenDetails.tokenLabel || tokenDetails.tokenName
  );

  const handleAddToken = async () => {
    if (!walletClient) return console.error("Wallet client not available");
    setIsAddingToken(true);
    try {
      const wasAdded = await walletClient.request({
        method: "wallet_watchAsset",
        params: tokenConfig,
      });

      if (wasAdded) {
        toast.success("✅ Token added successfully");
      } else {
        toast.error("❌ Token was not added");
      }
      setIsAddingToken(false);
    } catch (error) {
      setIsAddingToken(false);
      console.error("Error adding token:", error);
    }
  };

  return (
    <div
      className={`relative ${tokenDetails.isLoading ? "cursor-wait " : ""} `}
    >
      <div
        className={` border border-solid border-grayLight flex flex-col justify-start items-center h-full relative `}
      >
        <div className="flex relative p-4 gap-2 2xl:gap-5 w-full items-center justify-start">
          <div className="flex   items-start  gap-2 sm:gap-5 xl:gap-2">
            <div className="w-[30px] h-[30px]">
              <Image
                src={tokenDetails.tokenImage}
                alt="token"
                width={
                  tokenDetails.tokenName.toLocaleLowerCase() === "usda"
                    ? 24
                    : 30
                }
                height={
                  tokenDetails.tokenName.toLocaleLowerCase() === "usda"
                    ? 24
                    : 30
                }
              />
            </div>
            <span className="2xl:text-[24px] text-[20px] text-textBlack dark:text-white">
              {tokenDetails.tokenLabel || tokenDetails.tokenName}
            </span>
          </div>
          {/* <div className="flex items-start flex-col justify-start  md:gap-0">
            <div className="flex text-[18px] text-black dark:text-[#c2c2c2]">
              Balance
            </div>

            <div className="flex flex-col gap-0">
              <span className="text-[14px] 2xl:text-[16px] md:mt-1 text-[#7a7a7a]">
                {tokenDetails.balanceAvailable.replaceAll(
                  tokenDetails.tokenName,
                  ""
                )}
              </span>
              {tokenDetails.tokenCount && (
                <span className="text-[14px] 2xl:text-[16px] md:mt-1 text-[#7a7a7a]">
                  {tokenDetails?.tokenCount?.toFixed(2)}{" "}

                </span>
              )}
            </div>
          </div> */}
          {Boolean(tokenDetails.minTokenAmount) &&
            Boolean(tokenDetails.pointToGiven) && (
              <div className="flex ml-2 items-center  gap-2 justify-start  md:gap-0">
                {/* <div className="flex text-[18px] text-black dark:text-[#c2c2c2]">
                  Points
                </div> */}

                <div className="flex items-center gap-2">
                  {!!tokenDetails.defaultBooster &&
                    calculateRemainingTimeDate(
                      toLocalISOString(
                        new Date(tokenDetails.boosterValidity * 1000)
                      )
                    ).minutes > 0 &&
                    tokenDetails.defaultBooster > 1 && (
                      <div className="badge mt-1 pulsate w-fit text-[12px] 3xl:text-[16px] flex justify-center items-center rounded-full border-[2px] border-green-500 font-bold text-green-600 dark:text-green-400 bg-[#22c55e96] px-1 py-[2px]">
                        {tokenDetails.defaultBooster}x Points
                      </div>
                    )}
                  <span className="text-[12px] 3xl:text-[16px] md:mt-1 text-[#7a7a7a]">
                    {tokenDetails.pointToGiven} Points Per $
                    {tokenDetails.minTokenAmount}
                  </span>
                </div>
              </div>
            )}
          <div className=" hidden lg:flex flex-col absolute top-1 right-1 justify-center h-fit gap-2 items-center">
            <div onClick={handleAddToken} className="cursor-pointer">
              {isAddingToken ? (
                <Spinner />
              ) : (
                <CircleFadingPlus className="stroke-black dark:stroke-white " />
              )}
            </div>
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="  w-full right-0 top-0 h-full">
              <Button
                disabled={tokenDetails.isLoading || tokenDetails.isTokenPause}
                onClick={toggleToken}
                className="bg-black h-full w-full dark:bg-custom-gradient-to-bottom "
              >
                {isSelected ? (
                  <Image src={minus} alt="minus" width={20} height={20} />
                ) : (
                  <Image src={add} alt="add" width={20} height={20} />
                )}
              </Button>
            </div>
          </TooltipTrigger>
          {tokenDetails.isTokenPause && (
            <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
              <p>{tokenDetails.tokenPauseMessage}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      {tokenDetails.isLoading && (
        <div className="top-0 text-white left-0 absolute w-full h-full bg-[#00000080] dark:bg-[#ffffff52] flex items-center justify-center ">
          <RingLoadingIcon width={50} height={50} />
        </div>
      )}
    </div>
  );
}

export default AddToken;
