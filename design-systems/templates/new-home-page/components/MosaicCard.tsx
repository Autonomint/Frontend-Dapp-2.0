import type { MosaicCardData } from '../lib/types';

const gridAreaClasses: Record<string, string> = {
  'card-1': 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 md:col-span-2 md:row-start-1 md:row-end-2',
  'card-2': 'lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3',
  'card-3': 'lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3',
  'card-4': 'lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4 md:col-span-2 md:row-start-3 md:row-end-4',
};

const delayClasses = {
  1: 'delay-1',
  2: 'delay-2',
  3: 'delay-3',
  4: 'delay-4',
} as const;

export function MosaicCard({ card }: { card: MosaicCardData }) {
  return (
    <div
      className={`card relative rounded-card overflow-hidden text-white isolate animate-rise ${delayClasses[card.delay]} ${gridAreaClasses[card.gridArea]}`}
      style={{
        boxShadow:
          '0 1px 0 rgba(0,0,0,0.04), 0 30px 60px -30px rgba(0,0,0,0.25)',
      }}
    >
      {/* Background image */}
      <div
        className="card-bg-zoom absolute inset-0 bg-cover"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(20,15,10,0.2), rgba(0,0,0,0.5)), url("${card.bgImage}")`,
          backgroundPosition: card.bgPosition || 'center',
        }}
      />

      {/* Cinematic overlay */}
      <div className="card-overlay absolute inset-0" />

      {/* Kicker badge top-left */}
      <div className="absolute top-6 left-[30px] z-[2] font-mono text-[10.5px] tracking-[0.18em] uppercase text-white/[0.78] flex gap-2.5 items-center">
        <span className="w-1 h-1 rounded-full bg-gold" />
        {card.kicker}
      </div>

      {/* Optional stat band (only on card-1 in our data) */}
      {card.statBand && (
        <div className="absolute bottom-7 right-[30px] z-[3] flex flex-col items-end gap-0.5 font-mono text-white/95">
          <div className="font-serif text-[44px] leading-none tracking-tight font-normal">
            {card.statBand.value}
          </div>
          <div className="text-[10.5px] tracking-[0.16em] uppercase text-white/70">
            {card.statBand.label}
          </div>
        </div>
      )}

      {/* Body content */}
      <div className="relative z-[2] py-7 px-[30px] h-full flex flex-col justify-end">
        <h2 className="font-serif font-medium text-[clamp(28px,2.4vw,40px)] leading-[1.02] tracking-[-0.025em] mb-3 max-w-[26ch] [&_em]:italic [&_em]:font-normal [&_em]:text-gold">
          {card.headline}
        </h2>
        <p className="text-[14.5px] leading-[1.55] text-white/[0.86] max-w-[48ch] font-normal">
          {card.body}
        </p>
      </div>
    </div>
  );
}
