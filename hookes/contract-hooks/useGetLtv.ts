import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const useGetLtv = () => {
  const { address } = useAccount();
  const { isPending: isTvlPending, data: tvlValue } = useReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress[11155111],
    functionName: "getLTV",
    query: { enabled: !!address },
  });

  return {
    isTvlPending,
    tvlValue,
  };
};

export default useGetLtv;
