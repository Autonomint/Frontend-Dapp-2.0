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

  const toggleToken = () => {
    if (!tokenDetails.active) {
      toast.custom((t) => (
        <ToastNotificationError
          title={tokenDetails?.errorMessage || ""}
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}Flag`,
      isSelected ? false : true
    );
    formik.setFieldValue(
      `${tokenDetails.tokenName.toLocaleLowerCase()}Amount`,
      0
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

  console.log(tokenConfig, "tokenConfig");

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
        className={` border border-solid border-grayLight p-5 flex justify-start items-center h-full relative `}
      >
        <div className="flex  gap-5 w-full items-center">
          <div className="flex w-[40%] md:w-[25%] flex-row items-center lg:items-start lg:flex-col gap-5">
            <div>
              <Image
                src={tokenDetails.tokenImage}
                alt="token"
                width={30}
                height={30}
              />
            </div>
            <span className="text-[24px] text-textBlack dark:text-white">
              {tokenDetails.tokenLabel || tokenDetails.tokenName}
            </span>
          </div>
          <div className="flex flex-row items-center lg:items-start lg:flex-col justify-start  md:gap-0">
            <div className="hidden md:flex text-[18px] text-[#7a7a7a] dark:text-[#c2c2c2]">
              balance
            </div>
            <div className="flex md:hidden text-[18px] text-[#7a7a7a] dark:text-[#7a7a7a]">
              bal.
            </div>
            <div className="flex flex-col gap-0">
              <span className="text-base md:text-[16px] md:mt-1 text-[#7a7a7a]">
                {tokenDetails.balanceAvailable.replaceAll(
                  tokenDetails.tokenName,
                  ""
                )}
              </span>
              {tokenDetails.tokenCount && (
                <span className="text-base md:text-[16px] md:mt-1 text-[#7a7a7a]">
                  {tokenDetails.tokenCount} {` ${tokenDetails.tokenName}`}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center h-full gap-2 items-center">
            <div onClick={handleAddToken} className="cursor-pointer">
              {isAddingToken ? (
                <Spinner />
              ) : (
                <CircleFadingPlus className="stroke-black dark:stroke-white " />
              )}
            </div>
            <div className="text-md text-grayLight ">Add token</div>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="  absolute right-0 top-0 h-full">
              <Button
                disabled={tokenDetails.isLoading || tokenDetails.isTokenPause}
                onClick={toggleToken}
                className="bg-black h-full dark:bg-custom-gradient-to-bottom"
              >
                {isSelected ? (
                  <Image src={minus} alt="minus" />
                ) : (
                  <Image src={add} alt="add" />
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
