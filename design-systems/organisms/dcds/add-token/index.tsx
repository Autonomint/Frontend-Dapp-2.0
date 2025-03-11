import { Button } from "@/design-systems/atoms/button";
import { RingLoadingIcon } from "@/design-systems/atoms/SvgIcons";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import Image from "next/image";
import minus from "@/app/assets/minus-sign.png";
import add from "@/app/assets/add-01.png";
import { TokenDetails } from "@/design-systems/templates/dcds/interface";
import { toast } from "sonner";

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

  return (
    <div
      className={`relative ${tokenDetails.isLoading ? "cursor-wait " : ""} `}
    >
      <div
        className={` border border-solid border-grayLight p-5 flex justify-start items-center h-full relative `}
      >
        <div className="flex items-center gap-5 w-full">
          <div className="flex w-[40%] md:w-[30%] flex-row items-center lg:items-start lg:flex-col gap-4">
            <div>
              <Image
                src={tokenDetails.tokenImage}
                alt="token"
                width={30}
                height={30}
              />
            </div>
            <span className="text-[24px] text-textBlack dark:text-white">
              {tokenDetails.tokenName}
            </span>
          </div>
          <div className="flex flex-row items-center lg:items-start lg:flex-col gap-2 md:gap-4">
            <div className="hidden md:flex text-[18px] text-[#7a7a7a] dark:text-[#7a7a7a]">
              balance
            </div>
            <div className="flex md:hidden text-[18px] text-[#7a7a7a] dark:text-[#7a7a7a]">
              bal.
            </div>
            <span className="text-base md:text-[18px] md:mt-1 text-[#7a7a7a]">
              {tokenDetails.balanceAvailable.replaceAll(
                tokenDetails.tokenName,
                ""
              )}
            </span>
          </div>
        </div>
        <Button
          onClick={toggleToken}
          className="bg-black absolute right-0 top-0 h-full dark:bg-custom-gradient-to-bottom"
        >
          {isSelected ? (
            <Image src={minus} alt="minus" />
          ) : (
            <Image src={add} alt="add" />
          )}
        </Button>
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
