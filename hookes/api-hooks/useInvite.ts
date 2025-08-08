import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

// Define the type for the request payload
interface InviteCodeReq {
  inviteCode: string;
}

interface AssignInviteCodeReq {
  inviteCode: string;
  address: `0x${string}`;
}

// Define the type for the response data (if you know the structure)
interface InviteCodeApiRes {
  id: string;
  inviteCode: string;
  address: `0x${string}`;
}

type assignInviteCodeApiRes = any;

// Define the mutation function
const getInviteCode = async ({
  inviteCode,
}: InviteCodeReq): Promise<InviteCodeApiRes> => {
  const response = await axios.post<InviteCodeApiRes>(
    `${BACKEND_API_URL}/points/invite` // Adjusted to match the API endpoint
  );
  return response.data;
};

// Define the mutation function
const validateInviteCode = async ({
  inviteCode,
  address,
}: AssignInviteCodeReq): Promise<assignInviteCodeApiRes> => {
  const response = await axios.post<assignInviteCodeApiRes>(
    `${BACKEND_API_URL}/points/assignInviteCode`, // Adjusted to match the API endpoint
    {
      inviteCode,
      address,
    }
  );
  return response.data;
};

// Create the useMutation hook with TypeScript
export const useInviteCodeMutation = (onError: (error: AxiosError) => void) => {
  const {
    data: getInviteCodeResponse,
    error: getInviteCodeError,
    mutateAsync: getInviteCodeAsync,
  } = useMutation({
    mutationKey: ["borrowGame"],
    mutationFn: getInviteCode,
    onSuccess: (data: InviteCodeApiRes) => {
      // Handle success, e.g., show a success message or update the cache

    },
    onError: (error: AxiosError) => {
      onError(error);
    },
  });

  const {
    data: assignInviteCodeResponse,
    error: assignInviteCodeError,
    mutateAsync: assignInviteCodeAsync,
  } = useMutation({
    mutationKey: ["borrowGame"],
    mutationFn: validateInviteCode,
    onSuccess: (data) => {
      // Handle success, e.g., show a success message or update the cache

    },
    onError: (error: AxiosError) => {
      // Handle error, e.g., show an error message
      // console.error("Error borrowing game:", error.message);
    },
  });

  return {
    getInviteCodeResponse,
    getInviteCodeError,
    getInviteCodeAsync,
    assignInviteCodeResponse,
    assignInviteCodeError,
    assignInviteCodeAsync,
  };
};
