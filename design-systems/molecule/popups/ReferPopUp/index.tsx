import twitter from "@/app/assets/new-twitter.svg";
import { Button } from "@/design-systems/atoms/button";
import { Input } from "@/design-systems/atoms/input";
import Popup from "@/design-systems/atoms/PopUp";
import { Typography } from "@/design-systems/atoms/Typography";
import { useReferral } from "@/hookes/api-hooks/useReferral";
import { Gift } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useAccount } from "wagmi";

interface ReferPopupProps {
  wrapperClassName?: string;
}

/**
 * ReferPopup is a component that allows the user to refer and earn points.
 * It provides functionality to generate and share referral links.
 */
const ReferPopup: React.FC<ReferPopupProps> = ({ wrapperClassName }) => {
  const { address } = useAccount();
  const [copy, setCopy] = useState("Copy");
  const { 
    code: referral, 
    referralLink, 
    generateReferral, 
    isLoading, 
    isError 
  } = useReferral(address);
  
  const showReferral = !!referral && referral !== "null";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      // Optionally, show a message to the user indicating the link was copied
      setCopy("Copied!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  /**
   * Share text on Twitter using the Twitter Web Intent URL.
   * @param text - The text to share in the tweet.
   * @param url - (Optional) A URL to include in the tweet.
   * @param hashtags - (Optional) Comma-separated list of hashtags.
   * @param via - (Optional) Twitter username to attribute the tweet to (e.g., your app's Twitter handle).
   */
  function shareOnTwitter(
    text: string,
    url?: string,
    hashtags?: string,
    via?: string
  ): void {
    // Construct the base Twitter intent URL
    let shareUrl = "https://twitter.com/intent/tweet?";

    // Add the text parameter
    shareUrl += `text=${encodeURIComponent(text)}`;

    // Add the URL parameter if provided
    if (url) {
      shareUrl += `&url=${encodeURIComponent(url)}`;
    }

    // Add the hashtags parameter if provided
    if (hashtags) {
      shareUrl += `&hashtags=${encodeURIComponent(hashtags)}`;
    }

    // Add the via parameter if provided
    if (via) {
      shareUrl += `&via=${encodeURIComponent(via)}`;
    }

    // Open the Twitter share URL in a new window
    window.open(shareUrl, "_blank");
  }

  return (
    <div className={wrapperClassName}>
      <Popup
        popUpWidth="665px"
        title="Refer and Earn"
        content={
          <Button
            variant={"shadowOutline"}
            className="border-[#041A50] cursor-pointer  h-fit p-[10px] flex gap-2 hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:hover:bg-custom-gradient-to-top"
          >
            <Gift style={{ width: "24px", height: "24px" }} />{" "}
            <Typography size="body" className="">
              Referral
            </Typography>
          </Button>
        }
        contentClass="!left-[unset] right-[0px] top-[50px] dark:bg-black"
      >
        <div className="mt-4">
          <Typography size="lg" className="text-grayLight">
            Refer Autonomint to your friends and boost your earnings!
          </Typography>
        </div>
        {referral !== "null" ? (
          <div className="flex mt-3">
            <Input
              readOnly
              className="rounded-none !text-lg h-12 px-4 !font-medium"
              value={referralLink}
            />
            <Button
              onClick={copyToClipboard}
              className="rounded-none !text-lg border-l-0 !font-medium h-12 px-4"
              variant={"outline"}
              size={"lg"}
            >
              {copy}
            </Button>
          </div>
        ) : (
          <Button
            onClick={generateReferral}
            variant={"default"}
            className="border-[#041A50] mt-8 h-fit text-[24px] font-normal  w-full p-[10px] dark:bg-custom-gradient-to-bottom"
          >
            Create Referral Link
          </Button>
        )}

        <Button
          onClick={() =>
            shareOnTwitter(
              "Just tried @autonomint.  I can deposit any ETH or LRT to mint USDA+ stablecoin and always remain hedged, it doesn't matter how much the ETH price drops...curious how it works! Also, highest stablecoin yields on their CDS"
            )
          }
          variant={"default"}
          className="border-[#041A50] mt-8 h-fit text-[24px] font-normal  w-full p-[10px] dark:bg-custom-gradient-to-bottom"
        >
          <Image alt="twitter" src={twitter} /> Share on twitter
        </Button>
      </Popup>
    </div>
  );
};

export default ReferPopup;
