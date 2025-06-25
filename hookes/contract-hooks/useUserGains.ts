import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";

interface UserGains {
  priceChangePL: number;
  amountAccured: number;
  liqGains: number;
}

const useUserGains = () => {
  const { address } = useAccount();
  const {
    data: userGains,
    error: userGainsError,
    isLoading: userGainsLoading,
    isPending: userGainsPending,
    isFetching: userGainsFetching,
  } = useQuery({
    queryKey: ["getUserGains", address],
    queryFn: () =>
      axios
        .get(`${BACKEND_API_URL}/cds/getUserGains/${address}`)
        .then((res) => res.data as UserGains),
    enabled: !!address,
    placeholderData: {
      priceChangePL: 0,
      amountAccured: 0,
      liqGains: 0,
    },
  });

  return {
    userGains,
    userGainsError,
    userGainsLoading,
    userGainsFetching,
    userGainsPending,
  };
};

export default useUserGains;
