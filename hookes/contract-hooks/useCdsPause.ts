import { multiSignABI } from "@/blockchain/abis/multiSign";
import { multiSignAddress } from "@/blockchain/contracts";
import { Functions } from "@/utils/constants";
import { useAccount, useReadContract } from "wagmi";

const useCdsPause = () => {
  const { chainId, address } = useAccount();

  // getting function state
  const {
    data: isFunctionPausedCDS_Deposit,
    refetch: refetchCurrentDataCDS_Deposit,
  } = useReadContract({
    abi: multiSignABI,
    address: multiSignAddress[chainId as keyof typeof multiSignAddress],
    functionName: "functionState",
    args: [Functions.CDS_Deposit],
  }) as { data: boolean; refetch: () => void };

  const { data: isFunctionPausedCDS_Liq, refetch: refetchCurrentDataCDS_Liq } =
    useReadContract({
      abi: multiSignABI,
      address: multiSignAddress[chainId as keyof typeof multiSignAddress],
      functionName: "functionState",
      args: [Functions.CDS_Liq],
    }) as { data: boolean; refetch: () => void };

  const {
    data: isFunctionPausedCDS_Redeem,
    refetch: refetchCurrentDataCDS_Redeem,
  } = useReadContract({
    abi: multiSignABI,
    address: multiSignAddress[chainId as keyof typeof multiSignAddress],
    functionName: "functionState",
    args: [Functions.CDS_Redeem],
  }) as { data: boolean; refetch: () => void };

  const {
    data: isFunctionPausedCDS_Withdraw,
    refetch: refetchCurrentDataCDS_Withdraw,
  } = useReadContract({
    abi: multiSignABI,
    address: multiSignAddress[chainId as keyof typeof multiSignAddress],
    functionName: "functionState",
    args: [Functions.CDS_Withdraw],
  }) as { data: boolean; refetch: () => void };

  const {
    data: isFunctionPausedCDS_WithdrawGains,
    refetch: refetchCurrentDataCDS_WithdrawGains,
  } = useReadContract({
    abi: multiSignABI,
    address: multiSignAddress[chainId as keyof typeof multiSignAddress],
    functionName: "functionState",
    args: [Functions.CDS_WithdrawGains],
  }) as { data: boolean; refetch: () => void };

  const isFunctionPaused =
    isFunctionPausedCDS_Deposit &&
    isFunctionPausedCDS_Liq &&
    isFunctionPausedCDS_Redeem &&
    isFunctionPausedCDS_Withdraw &&
    isFunctionPausedCDS_WithdrawGains;

  const refetchCurrentData = () => {
    refetchCurrentDataCDS_Deposit();
    refetchCurrentDataCDS_Liq();
    refetchCurrentDataCDS_Redeem();
    refetchCurrentDataCDS_Withdraw();
    refetchCurrentDataCDS_WithdrawGains();
  };

  return {
    isFunctionPausedCDS_Deposit,
    isFunctionPausedCDS_Liq,
    isFunctionPausedCDS_Redeem,
    isFunctionPausedCDS_Withdraw,
    isFunctionPausedCDS_WithdrawGains,
    isFunctionPaused,
    refetchCurrentData,
  };
};
export default useCdsPause;
