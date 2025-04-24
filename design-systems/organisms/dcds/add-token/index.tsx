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
              {tokenDetails.tokenName === "USDa" && theme === "dark" ? (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 116 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.810303 148.719C38.9786 148.719 76.8445 148.719 115.024 148.719L65.9478 44.6173H50.0351L0.810303 148.719Z"
                    fill="#A1FFCE"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M56.5213 164.938L21.8298 147.89L56.9204 92.5617L91.5122 147.99L56.5213 164.938Z"
                    fill="black"
                  />
                  <path
                    d="M56.0358 165.933L20.2322 148.338L56.9281 90.4804L93.1056 148.451C80.9089 154.354 68.7107 160.254 56.5209 166.172L56.0358 165.933ZM23.4276 147.444L56.523 163.708L89.9189 147.532L56.9148 94.646L23.4276 147.444Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M55.51 164.938V93.0525H57.7312V164.938H55.51Z"
                    fill="#A1FFCE"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22.9812 158.322L56.6198 200L90.36 160.025L56.6198 175.533L22.9812 158.322Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M21.3621 146.901L56.1528 130.545L57.0902 132.55L22.2992 148.906L21.3621 146.901Z"
                    fill="#A1FFCE"
                  />
                  <path
                    d="M90.9431 148.906L56.1516 132.55L57.089 130.545L91.8806 146.901L90.9431 148.906Z"
                    fill="#A1FFCE"
                  />
                </svg>
              ) : (
                <Image
                  src={tokenDetails.tokenImage}
                  alt="token"
                  width={30}
                  height={30}
                />
              )}
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
          {/* <div className="flex flex-col justify-center h-full gap-2 items-center">
            <div onClick={handleAddToken} className="cursor-pointer">
              {isAddingToken ? (
                <Spinner />
              ) : (
                <CircleFadingPlus className="stroke-black dark:stroke-white " />
              )}
            </div>
            <div className="text-md text-grayLight ">Add token</div>
          </div> */}
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
