import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useChainId } from "wagmi";
import { BACKEND_API_URL } from "@/utils/urls";

interface PointResponse {
  minAmount: string;
  pointsToBeGiven: string;
}

// API call functions for different point calculations

const fetchReferralPoints = async (chainId: number): Promise<PointResponse> => {
  const { data } = await axios.post(
    `${BACKEND_API_URL}/global/get-referral-points`,
    { chainId }
  );
  return data;
};

const fetchXPostsPoints = async (chainId: number): Promise<PointResponse> => {
  const { data } = await axios.post(
    `${BACKEND_API_URL}/global/get-x-posts-points`,
    { chainId }
  );
  return data;
};

const fetchNativePoints = async (chainId: number): Promise<PointResponse> => {
  const { data } = await axios.post(
    `${BACKEND_API_URL}/global/get-min-native-amount-for-points`,
    { chainId }
  );
  return data;
};

export const usePoint = () => {
  const chainId = useChainId();

  const {
    data: referralPoints,
    error: referralPointsError,
    isLoading: isReferralPointsLoading,
  } = useQuery({
    queryKey: ["referralPoints", chainId],
    queryFn: () => fetchReferralPoints(chainId),
    enabled: !!chainId,
  });

  const {
    data: xPostsPoints,
    error: xPostsPointsError,
    isLoading: isXPostsPointsLoading,
  } = useQuery({
    queryKey: ["xPostsPoints", chainId],
    queryFn: () => fetchXPostsPoints(chainId),
    enabled: !!chainId,
  });

  const {
    data: nativePoints,
    error: nativePointsError,
    isLoading: isNativePointsLoading,
  } = useQuery({
    queryKey: ["nativePoints", chainId],
    queryFn: () => fetchNativePoints(chainId),
    enabled: !!chainId,
  });

  return {
    referralPoints,
    xPostsPoints,
    nativePoints,
    isLoading:
      isReferralPointsLoading || isXPostsPointsLoading || isNativePointsLoading,
    error: referralPointsError || xPostsPointsError || nativePointsError,
  };
};
