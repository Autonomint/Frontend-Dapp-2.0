import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

const useGetUserPoint = () => {
  const { address, chainId } = useAccount();
  // Fetch user points, referral, referral points data using the useQuery hook
  const {
    data: points,
    error,
    refetch: refetchpoints,
  } = useQuery({
    queryKey: ["points", { chainId, address }],
    queryFn: () =>
      fetch(`${BACKEND_API_URL}/points/userPoints/${chainId}/${address}`).then(
        (res) => res.json()
      ),
    staleTime: 5000,
  });

  const { data: referralPoints, refetch: refetchReferalPoints } = useQuery({
    queryKey: ["referralPoints", address],
    queryFn: () =>
      fetch(`${BACKEND_API_URL}/points/get-referral-points/${address}`, {
        method: "GET",
      }).then((res) => res.text()),
    staleTime: Infinity,
  });

  return {
    points,
    referralPoints,
  };
};

export default useGetUserPoint;
