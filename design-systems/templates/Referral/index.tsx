"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/Typography";
import AppNavbar from "@/custom-components/AppNavbar";
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import twitter from "@/app/assets/new-twitter.svg";

const ReferralTemplate = () => {
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
  });
  const referralLink = `https://www.dev.testnet.app.autonomint.com?ref=${referral}`;

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
  return (
    <div className="flex flex-col h-[calc(100vh-185px)] ">
      <AppNavbar
        tabOptions={[
          {
            isActive: true,
            path: "/referral",
            nameA: "Referral",
          },
        ]}
      />
      <div className="p-[10%] sm:p-[15%] h-full gap-5 flex flex-col items-center justify-center">
        <div className="mt-4">
          <Typography size="lg" className=" text-grayLight text-center ">
            Refer Autonomint to your friends and boost your earnings!
          </Typography>
        </div>
        {referral !== "null" ? (
          <div className="w-full lg:w-[60%] flex mt-3">
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
          onClick={() => shareOnTwitter("", referralLink)}
          variant={"default"}
          className="border-[#041A50] mt-8 h-fit text-[24px] font-normal  w-full p-[10px] dark:bg-custom-gradient-to-bottom"
        >
          <Image alt="twitter" src={twitter} /> Share on twitter
        </Button>
      </div>
    </div>
  );
};

export default ReferralTemplate;
