export type PathId = 'buy' | 'sell';

export interface PathOption {
  id: PathId;
  title: React.ReactNode;
  tag: { label: string; variant: 'gated' | 'open' };
  description: string;
  meta: { value: string; label: string }[];
  ctaLabel: string;
}

export interface MosaicCardData {
  id: string;
  kicker: string;
  headline: React.ReactNode;
  body: string;
  bgImage: string;
  bgPosition?: string;
  statBand?: { value: string; label: string };
  gridArea: string;
  delay: 1 | 2 | 3 | 4;
}
