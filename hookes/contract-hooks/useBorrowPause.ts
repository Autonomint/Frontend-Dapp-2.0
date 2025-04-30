import { multiSignABI } from "@/blockchain/abis/multiSign";
import { multiSignAddress } from "@/blockchain/contracts";
import { Functions } from "@/utils/constants";
import { useAccount, useReadContract } from "wagmi";

/**
 * Custom hook to check the pause state of borrow functions
 * @returns {Object} Object containing:
 *   - isFunctionPausedBorrow_Deposit: boolean indicating if the borrow deposit function is paused
 *   - isFunctionPausedBorrow_Liq: boolean indicating if the borrow liquidation function is paused
 *   - isFunctionPausedBorrow_Redeem: boolean indicating if the borrow redeem function is paused
 *   - isFunctionPausedBorrow_Renew: boolean indicating if the borrow renew function is paused
 *   - isFunctionPausedBorrow_Withdraw: boolean indicating if the borrow withdraw function is paused
 *   - isFunctionPaused: boolean indicating if all borrow functions are paused
 *   - refetchCurrentData: function to refetch the current data
 */
const useBorrowPause = () => {
  // getting function state
  const { chainId, address } = useAccount();
  const {
    data: isFunctionPausedBorrow_Deposit,
    refetch: refetchCurrentDataBorrow_Deposit,
  } = useReadContract({
    abi: multiSignABI,
    address: multiSignAddress[chainId as keyof typeof multiSignAddress],
    functionName: "functionState",
    args: [Functions.Borrow_Deposit],
  }) as { data: boolean; refetch: () => void };

  const {
    data: isFunctionPausedBorrow_Liq,
    refetch: refetchCurrentDataBorrow_Liq,
  } = useReadContract({
    abi: multiSignABI,
    address: multiSignAddress[chainId as keyof typeof multiSignAddress],
    functionName: "functionState",
    args: [Functions.Borrow_Liq],
  }) as { data: boolean; refetch: () => void };

  const {
    data: isFunctionPausedBorrow_Redeem,
    refetch: refetchCurrentDataBorrow_Redeem,
  } = useReadContract({
    abi: multiSignABI,
    address: multiSignAddress[chainId as keyof typeof multiSignAddress],
    functionName: "functionState",
    args: [Functions.Borrow_Redeem],
  }) as { data: boolean; refetch: () => void };

  const {
    data: isFunctionPausedBorrow_Renew,
    refetch: refetchCurrentDataBorrow_Renew,
  } = useReadContract({
    abi: multiSignABI,
    address: multiSignAddress[chainId as keyof typeof multiSignAddress],
    functionName: "functionState",
    args: [Functions.Borrow_Renew],
  }) as { data: boolean; refetch: () => void };

  const {
    data: isFunctionPausedBorrow_Withdraw,
    refetch: refetchCurrentDataBorrow_Withdraw,
  } = useReadContract({
    abi: multiSignABI,
    address: multiSignAddress[chainId as keyof typeof multiSignAddress],
    functionName: "functionState",
    args: [Functions.Borrow_Withdraw],
  }) as { data: boolean; refetch: () => void };

  const isFunctionPaused =
    isFunctionPausedBorrow_Deposit &&
    isFunctionPausedBorrow_Liq &&
    isFunctionPausedBorrow_Redeem &&
    isFunctionPausedBorrow_Renew &&
    isFunctionPausedBorrow_Withdraw;

  const refetchCurrentData = () => {
    refetchCurrentDataBorrow_Deposit();
    refetchCurrentDataBorrow_Liq();
    refetchCurrentDataBorrow_Redeem();
    refetchCurrentDataBorrow_Renew();
    refetchCurrentDataBorrow_Withdraw();
  };

  return {
    isFunctionPausedBorrow_Deposit,
    isFunctionPausedBorrow_Liq,
    isFunctionPausedBorrow_Redeem,
    isFunctionPausedBorrow_Renew,
    isFunctionPausedBorrow_Withdraw,
    isFunctionPaused,
    refetchCurrentData,
  };
};
export default useBorrowPause;
