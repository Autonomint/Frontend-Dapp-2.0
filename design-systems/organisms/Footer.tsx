"use client";
import autonomintTxtImage from "@/app/assets/autonomint.svg";
import autonomintTxtImageDark from "@/app/assets/Company Name (1).svg";
import logo from "@/app/assets/logo.svg";
import { Button } from "@/design-systems/atoms/button";
import { StickyNote } from "lucide-react";
import Image from "next/image";
import { AiOutlineDiscord } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { PiTelegramLogo } from "react-icons/pi";

export default function Footer() {
  // Define fallback URLs in case environment variables are not set
  const docsUrl = process.env.NEXT_PUBLIC_LINK_DOCS || "#";
  const discordUrl = process.env.NEXT_PUBLIC_LINK_DISCORD || "#";
  const twitterUrl = process.env.NEXT_PUBLIC_LINK_TWITTER || "#";
  const telegramUrl = process.env.NEXT_PUBLIC_LINK_TELEGRAM || "#";

  return (
    <div className="h-[80px]  lg:h-[108px] flex items-center border-[1] border-x border-y border-grayLight">
      <div className="relative w-full flex flex-col-reverse justify-between gap-2 mx-auto sm:flex-row mdb-5 lg:ml-5 ">
        <div className="flex w-full justify-center  text-sm rounded-md">
          <div className="flex w-full justify-between  ">
            <div className="  items-center hidden lg:flex  gap-4">
              <div className="w-[3rem] h-[3rem]">
                <Image
                  src={logo}
                  alt="autonomint-dapp"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>

              <div className="text-xl    tracking-tighter text-[#020202]">
                <Image
                  className="hidden dark:block w-full"
                  src={autonomintTxtImageDark}
                  alt="dark-mode-image"
                />
                <Image
                  className="block dark:hidden w-full"
                  src={autonomintTxtImage}
                  alt="light-mode-image"
                />
              </div>
            </div>
            <div className="lg:w-[20%] w-full flex gap-6 justify-center lg:justify-end mr-4">
              {/* Docs Link */}
              <Button
                variant={"shadowOutline"}
                className=" lg:p-[10px] w-[44px] h-[44px]"
              >
                <a href={docsUrl} target="_blank" rel="noreferrer">
                  <StickyNote style={{ width: "24px", height: "24px" }} />
                </a>
              </Button>
              {/* Discord Link */}
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50]  lg:p-[10px] w-[44px] h-[44px]"
              >
                <a href={discordUrl} target="_blank" rel="noreferrer">
                  <AiOutlineDiscord style={{ width: "24px", height: "24px" }} />
                </a>
              </Button>
              {/* Twitter/X Link */}
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50]  lg:p-[10px] w-[44px] h-[44px]"
              >
                <a href={twitterUrl} target="_blank" rel="noreferrer">
                  <BsTwitterX style={{ width: "24px", height: "24px" }} />
                </a>
              </Button>
              {/* Telegram Link */}
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50]  lg:p-[10px] w-[44px] h-[44px]"
              >
                <a href={telegramUrl} target="_blank" rel="noreferrer">
                  <PiTelegramLogo style={{ width: "24px", height: "24px" }} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
