import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";


/**
 * Fetches the current KRWQ price from the backend API
 */
const fetchKrwqPrice = async (): Promise<number> => {
    const response = await fetch(`${BACKEND_API_URL}/borrows/krwqPrice`);
    if (!response.ok) {
        throw new Error('Failed to fetch KRWQ price');
    }
    return response.json();
};

/**
 * Custom hook to fetch the KRWQ price from the backend API
 * @returns {Object} An object containing:
 * - krwqPrice: The current KRWQ price
 * - lastUpdated: Timestamp of when the price was last updated
 * - isLoading: Boolean indicating if the query is in progress
 * - error: Any error that occurred during the query
 * - isError: Boolean indicating if an error occurred
 * - refetch: Function to manually refetch the data
 */
const useGetKrwqPrice = (enabled: boolean) => {
    const {
        data,
        isLoading,
        error,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["krwqPrice"],
        queryFn: fetchKrwqPrice,
        enabled: Boolean(enabled)
    });



    return {
        krwqPrice: data,
        isLoading,
        error,
        isError,
        refetch,
    };
};

export default useGetKrwqPrice;
