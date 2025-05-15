"use client";
import twitter from "@/app/assets/x-social-media-black-icon.svg";
import { Button } from "@/design-systems/atoms/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const InvitedTemplate = () => {
  const { address } = useAccount();
  const users = [
    {
      name: "Alex",
      handle: "@alex_eth",
      avatar: "https://unavatar.io/twitter/alex_eth",
      quote: "Just tried the new stablecoin — super smooth!",
      link: "https://twitter.com/alex_eth",
    },
    {
      name: "Sara",
      handle: "@saraonchain",
      avatar: "https://unavatar.io/twitter/saraonchain",
      quote: "Loved the UX. Excited to see where this goes 🚀",
      link: "https://twitter.com/saraonchain",
    },
    {
      name: "Dev",
      handle: "@devmint",
      avatar: "https://unavatar.io/twitter/devmint",
      quote: "One of the cheapest hedging tools I’ve seen",
      link: "https://twitter.com/devmint",
    },
  ];

  useEffect(() => {
    // if the user is not in the list, then add them to the list
    const currentAddress = localStorage.getItem("invited-page-visited-address");
    // parse the current address
    const parsedCurrentAddress = JSON.parse(currentAddress || "[]");
    // if the user is not in the list, then add them to the list
    if (!parsedCurrentAddress.includes(address)) {
      localStorage.setItem(
        "invited-page-visited-address",
        JSON.stringify([...parsedCurrentAddress, address])
      );
    }
  }, []);

  return (
    <div className="dark:bg-[#0d0d0d] dark:text-[#f1f1f1]">
      <div className="min-h-screen container mx-auto  text-black  dark:text-[#f1f1f1] p-8 pt-[65px] text-center transition-colors">
        <div className="w-full relative">
          <h1 className="text-4xl text-center font-bold mb-6">
            🎟️ You're Invited!
          </h1>
        </div>
        <p className="text-lg mb-8">
          Mint early. Hedge better. Join the next-gen stablecoin launch that
          even Black-Scholes would want a look.
        </p>
        {/* 
        <button className="mb-12 bg-[#abffde] hover:bg-[#38c38c] text-black text-lg px-6 py-3 rounded-xl">
          Claim Your Invite Code
        </button> */}

        <h2 className="text-2xl font-semibold mb-4 pt-[52px]">
          🔗 Who’s Tried It
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {users.map((user) => (
            <div
              key={user.handle}
              className="bg-gray-100 dark:bg-[#1e1e1e] rounded-2xl shadow-md hover:shadow-xl transition p-6 py-8 flex flex-col items-center"
            >
              <div className="w-16 h-16 mb-5 rounded-full overflow-hidden">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold text-md dark:text-white">
                {user.name}
              </p>
              <a
                href={user.link}
                className="text-md text-[#38c38c] flex items-center gap-1 mt-1 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="stroke-[#38c38c]"
                  width="14"
                  height="14"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 19.5L8.5484 11.9516M8.5484 11.9516L1 1.5H6L11.4516 9.0484M8.5484 11.9516L14 19.5H19L11.4516 9.0484M19 1.5L11.4516 9.0484"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {user.handle}
              </a>
              <p className="mt-5 text-grayLight  text-[14px] italic">
                “{user.quote}”
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info Sections */}
        <div className="mt-16 space-y-16">
          {/* Who This App Is For */}
          <section className="max-w-3xl mx-auto text-left">
            <h2 className="text-2xl font-semibold mb-4">
              🤔 Who is this App For?
            </h2>
            <p className="text-grayLight  text-lg">
              Whether you're a DeFi native, a cautious first-timer, an option
              derivative trader or a hedge fund looking for a cheaper hedge on
              crypto assets, USDA+ is designed to provide you with a safe
              stablecoin experience and get you access to unexplored derivative
              strategies without the complex overhead.
            </p>
          </section>

          {/* About USDA+ */}
          <section className="max-w-3xl mx-auto text-left">
            <h2 className="text-2xl font-semibold mb-4">💸 What is USDA+?</h2>
            <p className="text-grayLight  text-lg">
              USDA+ is a new kind of stablecoin that lets you mint 1:1 with your
              crypto, while offering embedded yield and downside protection.
              It’s like owning a stable dollar... with built-in options.
            </p>
          </section>

          {/* Why Trust Us */}
          <section className="max-w-3xl mx-auto text-left">
            <h2 className="text-2xl font-semibold mb-4">🔐 Why Trust Us?</h2>
            <ul className="list-disc pl-6 text-grayLight  text-lg space-y-2">
              <li>
                Built on audited smart contracts with transparency at the core
              </li>
              <li>
                Backed by decentralized credit default swaps (dCDS) — minimizing
                protocol risk
              </li>
              <li>
                Community governance + real-time risk visibility for users
              </li>
              <li>
                Our team has shipped across DeFi, risk, and TradFi for years
              </li>
              <li>
                Zero interest at mint — giving you leverage with peace of mind
              </li>
              <li>
                Launch partner with Sonic — the fastest chain for real-time
                on-chain finance
              </li>
            </ul>
          </section>
          <div className="flex flex-col gap-2 justify-center pt-4">
            <div className=" text-md mb-8 text-center">
              Note: This dApp is in beta. While it has been audited, features
              are still evolving. Use at your own risk.
            </div>
            <Link href={"/"}>
              <Button className="text-lg " variant={"shadowOutline"}>
                Continue
                <ArrowRight />
              </Button>
            </Link>
          </div>
          {/* Footer Section */}
          <footer className="text-center text-grayLight text-sm pt-6">
            Join our{" "}
            <a
              href={"https://t.me/+lBgFePSf6982ZDA9"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38c38c] hover:underline"
            >
              Telegram
            </a>{" "}
            to stay in the loop.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default InvitedTemplate;
