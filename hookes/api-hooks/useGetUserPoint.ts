import { NetworkId } from "@/utils/constants";
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

const useGetUserPoint = () => {
  const { address, chainId } = useAccount();
  // Fetch user points, referral, referral points data using the useQuery hook
  const {
    data: modePoints,
    error: modeError,
    refetch: modeRefetchPoints,
  } = useQuery({
    queryKey: ["mode-points", { chainId, address }],
    queryFn: () =>
      fetch(
        `${BACKEND_API_URL}/points/userPoints/${NetworkId.BaseSepolia}/${address}`
      ).then((res) => res.json()),
    staleTime: 5000,
    enabled: false,
    retry: 1,
  });

  const {
    data: opPoints,
    error: opError,
    refetch: opRefetchpoints,
  } = useQuery({
    queryKey: ["op-points", { chainId, address }],
    queryFn: () =>
      fetch(
        `${BACKEND_API_URL}/points/userPoints/${NetworkId.Optimism}/${address}`
      ).then((res) => res.json()),
    staleTime: 5000,
    enabled: false,
    retry: 1,
  });

  const { data: referralPoints, refetch: refetchReferalPoints } = useQuery({
    queryKey: ["referralPoints", address],
    queryFn: () =>
      fetch(`${BACKEND_API_URL}/points/get-referral-points/${address}`, {
        method: "GET",
      }).then((res) => res.text()),
    staleTime: Infinity,
    enabled: false,
    retry: 1,
  });

  return {
    points: Number(opPoints?.[0] || 0) + Number(modePoints?.[0] || 0),
    referralPoints,
    totalPoints: Number(opPoints?.[1] || 0),
    hasLiquidityLandPoints: opPoints?.[2] || false,
  };
};

export default useGetUserPoint;
