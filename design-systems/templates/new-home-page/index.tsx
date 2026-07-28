import { MosaicCard } from "./components/MosaicCard";
import { ActionPanel } from "./components/ActionPanel";
import { mosaicCards } from "./lib/mosaic-data";
import "./styles.css";

export default function NewHomePageTemplate() {
  return (
    <div className="p-8 dark:bg-[#0a0a0a]">
      <div className="flex justify-center max-w-[1640px] mx-auto">
        {/* LEFT: Mosaic */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-[1.25fr_1fr_1.1fr] gap-3.5 lg:min-h-[86vh]">
          {mosaicCards.map((card) => (
            <MosaicCard key={card.id} card={card} />
          ))}
        </div> */}

        {/* RIGHT: Action panel */}
        <div className="w-full max-w-[860px]">
          <ActionPanel />
        </div>
      </div>
    </div>
  );
}
