import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const useGetLtv = () => {
  const { address, chainId } = useAccount();
  const { isPending: isTvlPending, data: tvlValue } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getLTV",
    query: { enabled: !!address },
  });

  return {
    isTvlPending,
    tvlValue,
  };
};

export default useGetLtv;
