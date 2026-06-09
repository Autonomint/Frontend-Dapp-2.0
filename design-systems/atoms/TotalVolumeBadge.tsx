"use client";
import useGetStockOptionsTotalVolume from "@/hookes/api-hooks/useGetStockOptionsTotalVolume";
import Spinner from "./Spinner";

const TotalVolumeBadge = () => {
  const { totalVolume, isLoading } = useGetStockOptionsTotalVolume();

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-900/40 dark:to-green-800/30 border border-emerald-200 dark:border-emerald-700 shadow-sm">
      {isLoading ? (
        <Spinner size={12} color="gray" />
      ) : (
        <>
          <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-emerald-700 dark:text-emerald-300 font-semibold">
            Volume
          </span>
          <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
            {totalVolume !== undefined
              ? `$${totalVolume.toLocaleString()}`
              : "—"}
          </span>
        </>
      )}
    </div>
  );
};

export default TotalVolumeBadge;