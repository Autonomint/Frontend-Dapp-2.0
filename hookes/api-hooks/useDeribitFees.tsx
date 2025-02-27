import { useQuery } from "@tanstack/react-query";

interface TickSizeStep {
  above_price: number;
  tick_size: number;
}

interface OptionFees {
  tick_size: number;
  tick_size_steps?: TickSizeStep[];
  taker_commission: number;
  strike: number;
  settlement_period: string;
  settlement_currency: string;
  rfq: boolean;
  quote_currency: string;
  price_index: string;
  option_type: string;
  min_trade_amount: number;
  maker_commission: number;
  kind: string;
  is_active: boolean;
  instrument_name: string;
  instrument_id: number;
  expiration_timestamp: number;
  creation_timestamp: number;
  counter_currency: string;
  contract_size: number;
  block_trade_tick_size: number;
  block_trade_min_trade_amount: number;
  block_trade_commission: number;
  base_currency: string;
}

const fetchEthOptionFees = async (
  instrumentName: string
): Promise<OptionFees> => {
  const response = await fetch(
    `https://www.deribit.com/api/v2/public/get_instrument?instrument_name=${instrumentName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch ETH option fees");
  }

  const data = await response.json();
  return data.result as OptionFees; // Type assertion to OptionFees
};

const useEthOptionFees = (instrumentName: string) => {
  const { data, isPending, isError } = useQuery<OptionFees, Error>({
    queryKey: ["ethOptionFees", instrumentName],
    queryFn: () => fetchEthOptionFees(instrumentName),
    enabled: !!instrumentName,
    retry: 1,
  });


  return { data };
};

export default useEthOptionFees;

import { useState, useEffect } from "react";

interface Expiration {
  expiration_timestamp: number;
}

export function useDeribitExpirations(
  currency: string = "any",
  kind: string = "any"
): Expiration[] | null {
  const [expirations, setExpirations] = useState<Expiration[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExpirations = async () => {
      setIsLoading(true);
      setError(null); // Clear any previous errors

      try {
        const response = await fetch(
          `https://www.deribit.com/api/v2/public/get_expirations?currency=${currency}&kind=${kind}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json(); // Try to parse error details
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        setExpirations(data.result);
      } catch (err: any) {
        // Catch and type the error
        console.error("Error fetching expirations:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpirations();
  }, [currency, kind]); // Re-fetch if currency or kind changes

  return expirations;
}
