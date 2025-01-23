import { extractMonthlyPrices } from "@/utils/helpers";
import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "wagmi/query";

// Define the expected structure of the market chart data
interface MarketChartData {
  prices: [number, number][]; // [timestamp, price]
  market_caps: [number, number][]; // [timestamp, market cap]
  total_volumes: [number, number][]; // [timestamp, total volume]
}

// Function to fetch market chart data from CoinGecko API
const fetchMarketChart = async (
  coinId: string,
  vsCurrency: string = "usd",
  days: number = 1
): Promise<MarketChartData> => {
  const url = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=365&x_cg_demo_api_key=CG-s7UBVstDXkLAerdpwBMjDrqj&interval=daily`;
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      // Include your API key here if required
      x_cg_demo_api_key: "CG-s7UBVstDXkLAerdpwBMjDrqj",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

interface MarketChartDataQuery extends MarketChartData {
  isLoading: boolean;
}

// Custom hook to fetch market chart data
const useMarketChart = (
  coinId: string,
  vsCurrency: string = "usd",
  days: number = 1
) => {
  const { data, isLoading: isGraphLoading } = useQuery({
    queryKey: ["marketChart", coinId, vsCurrency, days],
    queryFn: () => fetchMarketChart(coinId, vsCurrency, days),
    select: (data) => data.prices,
  });

  const formattedData = extractMonthlyPrices(data || []);
  return {
    formattedData,
    isGraphLoading,
  };
};

export default useMarketChart;
