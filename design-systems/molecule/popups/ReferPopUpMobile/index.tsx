import twitter from "@/app/assets/new-twitter.svg";
import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import { Input } from "@/design-systems/atoms/input";
import Popup from "@/design-systems/atoms/PopUp";
import { Typography } from "@/design-systems/atoms/Typography";
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { Gift } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

interface ReferPopupProps {
  //   twitter: string; // Path to the twitter icon image
  wrapperClassName?: string;
}

const ReferPopupMobile: React.FC<ReferPopupProps> = ({ wrapperClassName }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const [showReferral, setShowReferral] = useState(false);
  const { address } = useAccount();
  const [copy, setCopy] = useState("Copy");

  // Generate referral code
  const generateReferral = async () => {
    const res = await fetch(
      `${BACKEND_API_URL}/points/generate-referral-code/${address}`,
      {
        method: "POST",
      }
    );
    const data = await res.text();

    if (data) {
      refetch().then(() => setShowReferral(true));
    }
  };

  // Fetch referral code
  async function fetchReferralCode(
    address: `0x${string}` | undefined
  ): Promise<any> {
    return fetch(`${BACKEND_API_URL}/points/referral/${address}`, {
      method: "GET",
    }).then((res) => res.text());
  }
  const { data: referral, refetch } = useQuery({
    queryKey: ["referralcode", address],
    queryFn: () => fetchReferralCode(address),
    staleTime: Infinity,
    enabled: !!address,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const referralLink = useMemo(() => {
    if (isMounted) {
      // browser current url
      const currentUrl = window?.location?.origin;

      // creating referral url
      const referralLink = `${currentUrl}?ref=${referral}`;
      return referralLink;
    }
    return "";
  }, [referral]);

  useEffect(() => {
    if (referral != undefined) {
      if (referral != "null") {
        setShowReferral(true);
      } else {
        setShowReferral(false);
      }
    }
  }, [referral]);

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

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={wrapperClassName}>
      <Button
        onClick={() => setIsDialogOpen(true)}
        variant={"shadowOutline"}
        className="border-[#041A50] cursor-pointer  h-fit p-[10px] flex gap-2 bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top"
      >
        <Gift style={{ width: "24px", height: "24px" }} />{" "}
        <Typography size="body" className="">
          Referral
        </Typography>
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="w-[90%] dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0">
          <div className="text-2xl  font-semibold mb-4">Refer and Earn</div>
          <div className="mt-4">
            <Typography size="body" className="text-grayLight">
              Refer Autonomint to your friends and boost your earnings!
            </Typography>
          </div>
          {referral !== "null" ? (
            <div className="flex mt-3">
              <Input
                readOnly
                className="rounded-none !text-[16px] h-12 px-4 !font-medium"
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
              className="border-[#041A50] !text-lg mt-8 h-fit  font-normal  w-full p-[10px] dark:bg-custom-gradient-to-bottom"
            >
              Create Referral Link
            </Button>
          )}

          <Button
            onClick={() => shareOnTwitter("", referralLink)}
            variant={"default"}
            className="border-[#041A50] text-lg mt-8 h-fit  font-normal  w-full p-[10px] dark:bg-custom-gradient-to-bottom"
          >
            <Image alt="twitter" src={twitter} /> Share on twitter
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReferPopupMobile;
