import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useChainId } from "wagmi";
import { BACKEND_API_URL } from "@/utils/urls";

interface PointResponse {
  minAmount: string;
  pointsToBeGiven: string;
}

// API call functions for different point calculations
const fetchEthPoints = async (chainId: number): Promise<PointResponse> => {
  const { data } = await axios.post(
    `${BACKEND_API_URL}/global/get-min-eth-amount-for-points`,
    { chainId }
  );
  return data;
};

const fetchUsdaPoints = async (chainId: number): Promise<PointResponse> => {
  const { data } = await axios.post(
    `${BACKEND_API_URL}/global/get-min-usda-amount-for-points`,
    { chainId }
  );
  return data;
};

const fetchUsdtPoints = async (chainId: number): Promise<PointResponse> => {
  const { data } = await axios.post(
    `${BACKEND_API_URL}/global/get-min-usdt-amount-for-points`,
    { chainId }
  );
  return data;
};

const fetchUsdaBridgePoints = async (
  chainId: number
): Promise<PointResponse> => {
  const { data } = await axios.post(
    `${BACKEND_API_URL}/global/get-min-usda-bridge-amount-for-points`,
    { chainId }
  );
  return data;
};

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

export const usePoint = () => {
  const chainId = useChainId();

  const {
    data: ethPoints,
    error: ethPointsError,
    isLoading: isEthPointsLoading,
  } = useQuery({
    queryKey: ["ethPoints", chainId],
    queryFn: () => fetchEthPoints(chainId),
    enabled: !!chainId,
  }) as any;

  const {
    data: usdaPoints,
    error: usdaPointsError,
    isLoading: isUsdaPointsLoading,
  } = useQuery({
    queryKey: ["usdaPoints", chainId],
    queryFn: () => fetchUsdaPoints(chainId),
    enabled: !!chainId,
  });

  const {
    data: usdtPoints,
    error: usdtPointsError,
    isLoading: isUsdtPointsLoading,
  } = useQuery({
    queryKey: ["usdtPoints", chainId],
    queryFn: () => fetchUsdtPoints(chainId),
    enabled: !!chainId,
  });

  const {
    data: usdaBridgePoints,
    error: usdaBridgePointsError,
    isLoading: isUsdaBridgePointsLoading,
  } = useQuery({
    queryKey: ["usdaBridgePoints", chainId],
    queryFn: () => fetchUsdaBridgePoints(chainId),
    enabled: !!chainId,
  });

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

  return {
    ethPoints,
    usdaPoints,
    usdtPoints,
    usdaBridgePoints,
    referralPoints,
    xPostsPoints,
    isLoading:
      isEthPointsLoading ||
      isUsdaPointsLoading ||
      isUsdtPointsLoading ||
      isUsdaBridgePointsLoading ||
      isReferralPointsLoading ||
      isXPostsPointsLoading,
    error:
      ethPointsError ||
      usdaPointsError ||
      usdtPointsError ||
      usdaBridgePointsError ||
      referralPointsError ||
      xPostsPointsError,
  };
};
