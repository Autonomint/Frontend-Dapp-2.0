"use client";
import React, { useState } from "react";
import "../../styles/farmyourluckstyles.css";

function Page() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexForReward, setSelectedIndexForReward] = useState(-1);
  const [isFlipped, setIsFlipped] = useState(Array.from({ length: 9 }).fill(0));

  const handleClick = (index: number) => {
    setIsFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
    setSelectedIndex(index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 h-full">
      <div className="grid col-span-1 lg:col-span-4">
        <div className="grid grid-cols-3 gap-6 md:p-8 p-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="group aspect-square lg:aspect-auto lg:h-auto lg:w-auto w-full h-full cursor-pointer"
            >
              <div
                className={`card-container ${
                  isFlipped[index] ? "flipped" : ""
                }`}
              >
                <div className="card-front">Front</div>
                <div
                  className={`card-back ${
                    selectedIndex === index && selectedIndexForReward === index
                      ? "selected selected-for-reward"
                      : selectedIndex === index
                      ? "selected"
                      : selectedIndexForReward === index
                      ? "selected-for-reward"
                      : ""
                  }`}
                >
                  <div
                    className={`${
                      selectedIndex === index &&
                      selectedIndexForReward === index
                        ? "selected-for-reward-amount"
                        : "selected-for-reward-amount-hidden"
                    }`}
                  >
                    0.001 ETH
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid col-span-1 lg:col-span-2 lg:p-6 border border-solid-grayLight relative">
        <div className="flex flex-col md:justify-between md:max-h-[calc(100%-80px)] border border-solid border-grayLight lg:border-0 p-5 lg:p-0 gap-20 lg:gap-0">
          <span className="text-grayLight font-medium lg:text-[32px] text-[24px] lg:text-center">
            Tap a card to view details
          </span>
          <div className="flex flex-col text-left mb-28 lg:mb-0">
            <div className="text-textBlack lg:text-3xl text-[20px] font-medium">
              How it works?
            </div>
            <ol className="list-decimal list-inside mt-3 text-grayLight">
              <li className="mb-3 text-lg">
                Select cards to view potential rewards.
              </li>
              <li className="mb-3 text-lg">
                Confirm your selection to reveal rewards.
              </li>
              <li className="mb-3 text-lg">
                Earn prizes or reclaim your option fees!
              </li>
              <li className="text-lg">
                Earn prizes or reclaim your option fees!
              </li>
            </ol>
          </div>
          <button
            onClick={() => {
              setSelectedIndexForReward(selectedIndex);
            }}
            className="absolute bg-black w-full left-0 bottom-0 text-white h-[90px] font-bold text-[32px]"
          >
            Pay $5
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
