import type { PathOption } from "./types";

export const pathOptions: PathOption[] = [
  {
    id: "buy",
    title: (
      <>
        Buy options <em>at a discount</em>
      </>
    ),
    tag: { label: "Institutional", variant: "gated" },
    description:
      "For TradFi MMs, hedge funds, and brokerage-account holders. Buy NVDA / TSLA / SMR calls 20–30% below listed premium. Pay USDC. Post zero collateral.",
    meta: [
      { value: "−25%", label: "avg vs CBOE" },
      { value: "USDC", label: "settlement" },
      { value: "0", label: "collateral required" },
    ],
    ctaLabel: "Continue as institutional buyer",
  },
  {
    id: "sell",
    title: (
      <>
        Sell calls, <em>earn premium</em>
      </>
    ),
    tag: { label: "Permissionless", variant: "open" },
    description:
      "Deposit ETH, BTC, SOL, AERO, USDC, USDT or tokenized equity as collateral. Sell calls on the stocks you'd be happy to be assigned at. Earn USDC premium upfront.",
    meta: [
      { value: "8–24%", label: "apy range" },
      { value: "USDC", label: "premium paid" },
      { value: "Any", label: "crypto collateral" },
    ],
    ctaLabel: "Continue & connect wallet",
  },
];
