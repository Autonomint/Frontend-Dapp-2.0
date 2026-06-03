import { BACKEND_API_URL } from "@/utils/urls";
import { useQueries } from "@tanstack/react-query";

/**
 * Fetches spot prices for multiple symbols at once.
 * Returns a map of symbol -> price and loading state per symbol.
 */
const useGetSpotPrices = (symbols: string[]) => {
  const results = useQueries({
    queries: (symbols || []).map((symbol) => ({
      queryKey: ["spotPrice", symbol],
      queryFn: async (): Promise<number> => {
        const response = await fetch(
          `${BACKEND_API_URL}/stock-options/spot-price?symbol=${symbol}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch ${symbol} price`);
        }
        return response.json();
      },
      enabled: Boolean(symbol),
      refetchInterval: 30000, // Refetch every 30 seconds
    })),
  });

  const priceMap: Record<string, number> = {};
  const loadingMap: Record<string, boolean> = {};

  symbols?.forEach((symbol, index) => {
    priceMap[symbol] = results[index]?.data || 0;
    loadingMap[symbol] = results[index]?.isLoading ?? true;
  });

  return { priceMap, loadingMap };
};

export default useGetSpotPrices;