
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

/**
 * Fetches the list of OG addresses from the backend
 * @returns {Promise<OgAddressesResponse>} A promise that resolves to the OG addresses response
 */
async function fetchOgAddresses(): Promise<string[]> {
    console.log("Fetching OG addresses...");
    const response = await axios.get<string[]>(
        `${BACKEND_API_URL}/global/get-ogAddresses`
    );
    console.log("OG addresses fetched successfully.");
    return response.data;
}

/**
 * Custom hook to fetch OG addresses from the backend
 * @returns {Object} An object containing the OG addresses data, loading state, and error state
 */
const useGetOgAddresses = () => {

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<string[], Error>({
        queryKey: ['ogAddresses'],
        queryFn: () => fetchOgAddresses(),
    });

    useEffect(() => {
        refetch();
    }, []);

    return {
        ogAddresses: data || [],
        isLoading,
        isError,
        error,
        refetch,
    };
};

export default useGetOgAddresses;
