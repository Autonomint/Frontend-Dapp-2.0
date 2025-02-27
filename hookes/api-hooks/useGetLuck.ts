import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
// Define the type for the request payload
interface BorrowGameRequest {
  address: `0x${string}`;
  chainId: number;
  userChosenBoxIndex: number;
  numberOfBoxes: number;
  txHash?: string;
}

// Define the type for the response data (if you know the structure)
type BorrowGameResponse = 0 | 1 | 2 | 3;

export enum CreateGame {
  NOT_A_WINNER,
  FIXED_50_DOLLARS,
  MULTIPLY_5X,
  MULTIPLY_10X,
}

// Define the mutation function
const borrowGame = async ({
  address,
  chainId,
  userChosenBoxIndex,
  numberOfBoxes,
  txHash,
}: BorrowGameRequest): Promise<BorrowGameResponse> => {
  const response = await axios.post<BorrowGameResponse>(
    `${BACKEND_API_URL}/borrows/play`, // Adjusted to match the API endpoint
    {
      address,
      chainId,
      userChosenBoxIndex,
      numberOfBoxes,
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
export const useBorrowGame = (): UseMutationResult<
  BorrowGameResponse,
  AxiosError,
  BorrowGameRequest
> => {
  return useMutation<BorrowGameResponse, AxiosError, BorrowGameRequest>({
    mutationKey: ["borrowGame"],
    mutationFn: borrowGame,
    onSuccess: (data: BorrowGameResponse) => {
      // Handle success, e.g., show a success message or update the cache
      console.log("Game borrowed successfully:", data);
    },
    onError: (error: AxiosError) => {
      // Handle error, e.g., show an error message
      console.error("Error borrowing game:", error.message);
    },
  });
};
