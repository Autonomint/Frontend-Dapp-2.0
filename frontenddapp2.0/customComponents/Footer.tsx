"use client";
import autonomintTxtImage from "@/app/assets/autonomint.svg";
import discord from "@/app/assets/discord_symbol.svg";
import logo from "@/app/assets/logo.svg";
import twitter from "@/app/assets/twitter-white-icon.svg";
import paperIcon from "@/app/assets/paper-icon.svg";
import telegram from "@/app/assets/telegram-icon.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Footer() {
  const [openFaq, setOpenFaq] = React.useState(false);
  const [openGetstart, setOpenGetstart] = React.useState(false);
  return (
    <div className=" h-[180px] py-7 mt-[1px] flex items-center border-[1] border-x border-y border-grayLight border-solid">
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

              <div className="text-xl    tracking-tighter text-[#020202] dark:text-[#EEEEEE]">
                <Image
                  src={autonomintTxtImage}
                  alt="autonomint-dapp"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <div className="w-[20%] flex gap-6 justify-end mr-4">
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50] h-fit p-[10px]"
              >
                <a href="https://t.co/Ck6x2jhVOj" target="_blank">
                  <div className="w-[1.5rem]">
                    <Image
                      src={paperIcon}
                      alt="autonomint-dapp"
                      className="rounded-md "
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </a>
              </Button>
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50] h-fit p-[10px]"
              >
                <a href="https://t.co/Ck6x2jhVOj" target="_blank">
                  <div className="w-[1.5rem]">
                    <Image
                      src={discord}
                      alt="autonomint-dapp"
                      className="rounded-md "
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </a>
              </Button>
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50] h-fit p-[10px]"
              >
                <a href="https://twitter.com/autonomint" target="_blank">
                  <div className="w-[1.5rem] ">
                    <Image
                      src={twitter}
                      alt="autonomint-dapp"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </a>
              </Button>
              <Button
                variant={"shadowOutline"}
                className="border-[#041A50] h-fit p-[10px]"
              >
                <a href="" target="_blank">
                  <div className="w-[1.5rem]">
                    <Image
                      src={telegram}
                      alt="autonomint-dapp"
                      className="rounded-md "
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
