"use client";

import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/design-systems/atoms/dialog";
import { X, Coins, PieChart, AlertTriangle, Lock, ExternalLink } from "lucide-react";

interface HowItWorksPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isPutOption: boolean;
  lockDays: number;
  lockEndDate: string;
  selectedTicker: string;
}

const HowItWorksPopup: React.FC<HowItWorksPopupProps> = ({
  isOpen,
  onOpenChange,
  isPutOption,
  lockDays,
  lockEndDate,
  selectedTicker,
}) => {
  const popupTicker = selectedTicker === "LAB" ? "Token" : selectedTicker;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[640px] max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border-[0.5px] border-[#262626] rounded-[16px] sm:rounded-[16px] p-0 gap-0 text-white dark:text-white no-scrollbar [&>.popup-close-icon]:hidden">
        <DialogClose className="absolute top-4 right-4 w-8 h-8 rounded-[8px] border-[0.5px] border-[#262626] inline-flex items-center justify-center text-[#888888] hover:text-white hover:border-[#444444] cursor-pointer bg-transparent transition-all duration-150 z-10">
          <X className="w-4 h-4" />
        </DialogClose>

        <div className="p-8">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-1 h-4 bg-[#7fecbe] rounded-[2px]" />
            <span className="text-[11px] tracking-[0.15em] text-[#7fecbe] font-mono uppercase">
              HOW IT WORKS
            </span>
          </div>
          <div className="text-[22px] font-medium text-white mb-1 font-plex-grotesk text-left">
            Selling {isPutOption ? "puts" : "calls"} through the pool
          </div>
          <div className="text-[14px] text-[#888888] mb-8 font-plex-sans text-left">
            The dCDS pool model, in plain English
          </div>

          {/* Section 1 */}
          <div className="mb-6 text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <Coins className="w-5 h-5 text-[#7fecbe]" />
              <span className="text-[15px] font-medium text-white font-plex-grotesk">The gist</span>
            </div>
            <div className="text-[13px] text-[#b0b0b0] leading-[1.7] pl-[30px] font-plex-sans">
              You deposit USDC into a shared pool. When someone buys a {popupTicker} {isPutOption ? "put" : "call"}, their premium flows into this pool. You earn a slice of that premium based on how much you deposited and how long you were in.
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-6 text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <PieChart className="w-5 h-5 text-[#7fecbe]" />
              <span className="text-[15px] font-medium text-white font-plex-grotesk">How premiums are split</span>
            </div>
            <div className="text-[13px] text-[#b0b0b0] leading-[1.7] pl-[30px] font-plex-sans">
              Your share is proportional to <strong className="text-white font-medium">your deposit ÷ total pool</strong>, weighted by time. Bigger deposit, bigger slice. Earlier deposit, bigger slice. The more {isPutOption ? "puts" : "calls"} bought during your window, the higher the payout for everyone in the pool.
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-6 text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <AlertTriangle className="w-5 h-5 text-[#ffb84d]" />
              <span className="text-[15px] font-medium text-white font-plex-grotesk">How losses work</span>
            </div>
            <div className="text-[13px] text-[#b0b0b0] leading-[1.7] pl-[30px] font-plex-sans">
              If {isPutOption ? "puts" : "calls"} expire in-the-money ({isPutOption ? `${popupTicker} below strike at expiry` : `${popupTicker} above strike at expiry`}), the pool pays out to {isPutOption ? "put" : "call"} buyers. Those losses are split by the same share rule. <strong className="text-white font-medium">You can lose part of your deposit</strong> — the pool takes the hit before it returns funds to depositors.
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-6 text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <Lock className="w-5 h-5 text-[#7fecbe]" />
              <span className="text-[15px] font-medium text-white font-plex-grotesk">Why the {lockDays}-day lock</span>
            </div>
            <div className="text-[13px] text-[#b0b0b0] leading-[1.7] pl-[30px] font-plex-sans">
              The lock ensures every seller in the pool shares the risk of every {isPutOption ? "put" : "call"} sold during that window. Fair to buyers, fair to sellers. After the lock ends ({lockEndDate}), you can withdraw your share plus any accrued premium, minus any losses.
            </div>
          </div>

          {/* Example Section */}
          <div className="mt-8 mb-6 text-left">
            <div className="text-[11px] tracking-[0.15em] text-[#7fecbe] font-mono mb-4">CONCRETE EXAMPLE</div>
            <div className="bg-[#141414] border-[0.5px] border-[#262626] rounded-[12px] p-5">
              <div className="text-[13px] text-[#b0b0b0] leading-[1.7] mb-4 font-plex-sans">
                <strong className="text-white font-medium">Alice</strong> deposits <span className="font-mono text-white">$1,000 USDC</span>.<br />
                <strong className="text-white font-medium">Bob</strong> deposits <span className="font-mono text-white">$2,000 USDC</span>.<br />
                Over the {lockDays}-day window, the pool collects <span className="font-mono text-white">$600</span> in premium from {popupTicker} {isPutOption ? "put" : "call"} buyers.
              </div>

              <div className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-4 mb-3">
                <div className="text-[11px] tracking-[0.05em] font-mono mb-2.5 text-[#7fecbe]">
                  BEST CASE — {isPutOption ? `${popupTicker} stays above strike` : `${popupTicker} stays below strike`}
                </div>
                <div className="font-mono text-xs leading-[1.9] w-full">
                  <div className="flex justify-between text-[#888888]"><span>Alice earns (33% share)</span><span className="text-[#7fecbe]">+$200</span></div>
                  <div className="flex justify-between text-[#888888]"><span>Bob earns (67% share)</span><span className="text-[#7fecbe]">+$400</span></div>
                  <div className="flex justify-between text-[#888888] border-t-[0.5px] border-[#1f1f1f] pt-2 mt-2"><span>Return in {lockDays} days</span><span className="text-[#7fecbe]">~20% for both</span></div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-4 mb-0">
                <div className="text-[11px] tracking-[0.05em] font-mono mb-2.5 text-[#ffb84d]">
                  DOWNSIDE — {isPutOption ? `${popupTicker} drops below strike, pool owes $300 to put buyers` : `${popupTicker} rises above strike, pool owes $300 to call buyers`}
                </div>
                <div className="font-mono text-xs leading-[1.9] w-full">
                  <div className="flex justify-between text-[#888888]"><span>Alice: +$200 premium − $100 loss</span><span className="text-white">+$100</span></div>
                  <div className="flex justify-between text-[#888888]"><span>Bob: +$400 premium − $200 loss</span><span className="text-white">+$200</span></div>
                  <div className="flex justify-between text-[#888888] border-t-[0.5px] border-[#1f1f1f] pt-2 mt-2"><span>Return in {lockDays} days</span><span className="text-white">~10% for both</span></div>
                </div>
              </div>

              <div className="text-[11px] text-[#666666] mt-3 italic leading-[1.6] font-plex-sans">
                Simplified. Real returns depend on deposit timing, pool size at each moment, and how many {isPutOption ? "puts" : "calls"} are actually bought during your lock window.
              </div>
            </div>
          </div>

          <a
            href="https://docs.nondollar.life/autonomint/general-docs-autonomint-mechanism/dcds.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-[#141414] border-[0.5px] border-[#262626] rounded-[12px] p-[16px_20px] hover:bg-[#1a1a1a] hover:border-[#333333] transition-all text-left"
          >
            <div>
              <div className="text-sm text-white mb-0.5 font-plex-sans">Full mechanics in the docs</div>
              <div className="text-[11px] text-[#666666] font-plex-sans">Formulas, edge cases, and audit references</div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#666666]" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksPopup;
