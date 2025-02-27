import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// Define the type for the request payload
interface BorrowGameRequest {
  address?: `0x${string}`;
  chainId?: number;
  txHash?: string;
}

// Define the type for the response data (if you know the structure)
interface BorrowGameResponse {
  success: boolean;
  message?: string;
  // Add other fields based on your API response
}

// Define the mutation function
const verifiedPaymentHash = async ({
  address,
  chainId,
  txHash,
}: BorrowGameRequest): Promise<BorrowGameResponse> => {
  const response = await axios.post<BorrowGameResponse>(
    `${BACKEND_API_URL}/borrows/checkPayment`, // Adjusted to match the API endpoint
    {
      address,
      chainId,
      txHash,
    }, // Pass the payload as JSON in the request body
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Create the useMutation hook with TypeScript
const useVerifyGamePay = () => {
  const { data, isError, mutateAsync } = useMutation({
    mutationKey: ["borrowGamePaymentHash"],
    mutationFn: verifiedPaymentHash,
  });

  return {
    data,
    isError,
    mutateAsync,
  };
};

export default useVerifyGamePay;
