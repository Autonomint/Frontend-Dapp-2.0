import type { MosaicCardData } from "./types";

export const mosaicCards: MosaicCardData[] = [
  {
    id: "card-1",
    kicker: "Onchain · Real Yield",
    headline: (
      <>
        The premium <em>was always</em> on the other side.
      </>
    ),
    body: "For years, TradFi options writers earned the spread while crypto holders watched. Nondollar flips it — your ETH, BTC, SOL, or tokenized equity becomes collateral for selling calls on the stocks moving markets right now.",
    bgImage:
      "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=1400&q=80",
    statBand: { value: "", label: "Annualized premium" },
    gridArea: "card-1",
    delay: 1,
  },
  {
    id: "card-2",
    kicker: "$2T+ daily",
    headline: (
      <>
        Where the <em>real</em> options volume lives.
      </>
    ),
    body: "61M contracts a day. Six straight record years. We mirror listed strikes and expiries on NVDA, TSLA, SMR — and price 20–30% under CBOE.",
    bgImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    gridArea: "card-2",
    delay: 2,
  },
  {
    id: "card-3",
    kicker: "Delta-neutral arb",
    headline: (
      <>
        Buy here. <em>Sell</em> there. Pocket the spread.
      </>
    ),
    body: "Pay in USDC. Post no collateral. Never touch onchain. Hedge in your broker the same minute. The arb has been sitting there.",
    bgImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    gridArea: "card-3",
    delay: 3,
  },
  {
    id: "card-4",
    kicker: "No bridges · No USDA+ · No middle layer",
    headline: (
      <>
        Two sides. <em>One</em> book. No bridge in between.
      </>
    ),
    body: "Pyth and Chainlink price the strikes. dCDS architecture handles settlement. ITM at expiry? Spot minus strike comes from collateral. OTM? Seller keeps every cent of premium. That's it. That's the protocol.",
    bgImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
    bgPosition: "center 40%",
    gridArea: "card-4",
    delay: 4,
  },
];
