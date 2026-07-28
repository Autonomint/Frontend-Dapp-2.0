"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { pathOptions } from "../lib/path-data";
import type { PathId } from "../lib/types";

const tagClasses = {
  gated: "bg-ink-2 dark:bg-[#2a2a2a] text-[#d4c094]",
  open: "bg-[#ecf2ee] dark:bg-[#1a3a2a] text-green-deep dark:text-[#4ade80]",
} as const;

export function ActionPanel() {
  const router = useRouter();
  const [selected, setSelected] = useState<PathId | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = () => {
    if (!selected) return;
    setSubmitting(true);

    if (selected === "sell") {
      router.push("/deposit?action=sell");
    } else if (selected === "buy") {
      router.push("/deposit?action=buy");
    } else {
      console.log(`Continue with path: ${selected}`);
      setSubmitting(false);
    }
  };

  const ctaText = (() => {
    if (submitting && selected === "buy") return "Loading buyer flow…";
    if (submitting && selected === "sell") return "Loading seller flow…";
    if (selected) return pathOptions.find((p) => p.id === selected)!.ctaLabel;
    return "Select a path to continue";
  })();

  return (
    <div
      className="panel relative bg-white dark:bg-[#1a1a1a] rounded-card p-9 pb-[30px] flex flex-col border border-line dark:border-gray-700 animate-rise delay-panel"
      style={{
        boxShadow:
          "0 1px 0 rgba(0,0,0,0.02), 0 30px 60px -40px rgba(0,0,0,0.18)",
      }}
    >


      <h1 className="font-serif font-normal text-[38px] leading-[1.02] tracking-[-0.03em] mb-2 mr-[30px] text-ink dark:text-white [&_em]:italic [&_em]:font-normal">
        Pick your <em>side</em> of the trade.
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-[14.5px] leading-[1.5] mb-7 max-w-[38ch]">
        Two paths. One protocol. Choose how you want to enter the largest
        derivatives market in the world.
      </p>

      {/* Section label */}
      <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-gray-600 dark:text-gray-400 mb-3.5 flex items-center gap-2.5 before:content-[''] before:w-[14px] before:h-px before:bg-ink dark:before:bg-gray-600 before:opacity-40">
        Choose path
      </div>

      {/* Path options */}
      <div className="flex flex-col gap-3 mb-[22px]">
        {pathOptions.map((path) => {
          const isActive = selected === path.id;
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => setSelected(path.id)}
              className={`text-left w-full block font-sans text-ink dark:text-white rounded-[14px] p-5 px-[22px] transition-all duration-200 ${
                isActive
                  ? "border border-ink dark:border-gray-500 bg-[#fafafa] dark:bg-[#2a2a2a] cursor-pointer"
                  : "border border-line dark:border-gray-700 bg-white dark:bg-[#1a1a1a] cursor-pointer hover:border-ink dark:hover:border-gray-500 hover:-translate-y-px hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.18)]"
              }`}
            >
              <div className="flex justify-between items-start mb-1.5 gap-3">
                <div className="font-serif text-[19px] font-medium tracking-tight leading-[1.2] [&_em]:italic [&_em]:font-normal">
                  {path.title}
                </div>
                <div
                  className={`font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-1 rounded-md whitespace-nowrap shrink-0 ${tagClasses[path.tag.variant]}`}
                >
                  {path.tag.label}
                </div>
              </div>

              <div className="text-[13.5px] leading-[1.5] text-gray-600 dark:text-gray-400 mb-3.5">
                {path.description}
              </div>

              <div className="flex gap-4 font-mono text-[11px] text-gray-600 dark:text-gray-400 pt-3 border-t border-dashed border-line dark:border-gray-700">
                {path.meta.map((m) => (
                  <div key={m.label} className="flex flex-col gap-0.5">
                    <span className="font-serif text-base font-medium tracking-tight text-ink dark:text-white">
                      {m.value}
                    </span>
                    <span className="text-[9.5px] tracking-[0.14em] uppercase text-gray-600 dark:text-gray-400">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        onClick={handleContinue}
        disabled={!selected || submitting}
        className={`w-full p-4 rounded-xl font-sans text-[15px] font-medium tracking-tight cursor-pointer transition-all duration-200 flex items-center justify-center gap-2.5 mb-3.5 group ${
          selected && !submitting
            ? "bg-ink dark:bg-[#1d8a4a] text-white hover:bg-[#2a2a2a] dark:hover:bg-[#166633] hover:-translate-y-px"
            : submitting
              ? "bg-[#1d8a4a] text-white cursor-not-allowed"
              : "bg-[#cccccc] dark:bg-gray-700 text-white cursor-not-allowed"
        }`}
      >
        <span>{ctaText}</span>
        <span className="transition-transform duration-[250ms] group-hover:translate-x-[3px]">
          →
        </span>
      </button>

      {/* Footer */}
      <div className="mt-auto pt-[22px] border-t border-line dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4 mb-3.5">
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-[22px] font-medium tracking-tight text-ink dark:text-white">
              61M
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-gray-600 dark:text-gray-400">
              US options ADV (2025)
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-[22px] font-medium tracking-tight text-ink dark:text-white">
              $2T+
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-gray-600 dark:text-gray-400">
              Daily notional
            </span>
          </div>
        </div>
        <p className="text-[11.5px] text-gray-600 dark:text-gray-400 leading-[1.5]">
          Options carry risk of total loss of premium or collateral. Not
          available in all jurisdictions.
        </p>
      </div>
    </div>
  );
}
