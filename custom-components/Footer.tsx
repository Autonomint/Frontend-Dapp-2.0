"use client";
import autonomintTxtImage from "@/app/assets/autonomint.svg";
import autonomintTxtImageDark from "@/app/assets/Company Name (1).svg";
import discord from "@/app/assets/discord_symbol.svg";
import logo from "@/app/assets/logo.svg";
import twitter from "@/app/assets/twitter-white-icon.svg";
import paperIcon from "@/app/assets/paper-icon.svg";
import telegram from "@/app/assets/telegram-icon.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
import { IoNewspaperOutline } from "react-icons/io5";
import { AiOutlineDiscord } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { PiTelegramLogo } from "react-icons/pi";
import { StickyNote } from "lucide-react";

export default function Footer() {
  const [openFaq, setOpenFaq] = React.useState(false);
  const [openGetstart, setOpenGetstart] = React.useState(false);
  const { theme } = useTheme();
  return (
    <div className="py-7  flex items-center border-[1] border-x border-y border-grayLight">
      <div className="relative w-full flex flex-col-reverse justify-between gap-2 mx-auto sm:flex-row mdb-5 lg:ml-5 ">
        <div className="flex w-full justify-center  text-sm rounded-md">
          <div className="flex w-full justify-between  ">
            <div className="flex items-center  gap-4">
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
            <div className="w-[20%] flex gap-6 justify-end mr-4">
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50] p-[10px]"
              >
                <StickyNote style={{ width: "24px", height: "24px" }} />
              </Button>
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50] p-[10px]"
              >
                <AiOutlineDiscord style={{ width: "24px", height: "24px" }} />
              </Button>
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50] p-[10px]"
              >
                <BsTwitterX style={{ width: "24px", height: "24px" }} />
              </Button>
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50] p-[10px]"
              >
                <PiTelegramLogo style={{ width: "24px", height: "24px" }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
