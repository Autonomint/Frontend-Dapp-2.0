import {
  borrowCoreAddress,
  borrowDepositCoreAddress,
  borrowingContractAddress,
} from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useWriteContract } from "wagmi";
import { AssetName } from "@/utils/constants";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";
import { Address } from "viem";
import { toast } from "sonner";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
interface EIP712VerifyParams {
  volatility: bigint;
  ethPrice: bigint;
  expiredETHAmount: bigint;
  plFromExpired: bigint;
  premiumCv: bigint;
  hedgeCv: bigint;
  optionFees: bigint;
  odosAssembledData: `0x${string}`;
  deadline: bigint;
  signature: `0x${string}`;
}

interface BorrowStakeInputs {
  depositingAmount: bigint; // uint256 can be represented by bigint
  value: bigint | undefined; // uint256 can be represented by bigint
  assetName: AssetName;
  hedgeDuration: bigint;
  ethPrice: bigint | undefined;
  verifyParams: Record<any, any>;
}

interface StakeInputs {
  user: Address;
  index: number;
  stakingAmount: bigint;
  verifyParams: EIP712VerifyParams;
  assetName: AssetName;
}

interface UnstakeInputs {
  user: Address;
  index: number;
  verifyParams: EIP712VerifyParams;
  assetName: AssetName;
}

const useDepositStakeTokens = (mutation: any, resetterFn?: any) => {
  const { chainId, address } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const {
    isPending: isDepositsStakeLoading,
    data: depositStakeDatahash, // Data received from the `useBorrowingContractDepositTokens` hook
    writeContract, // Function to initiate a write operation
    reset: resetStake, // Function to reset the state of the hook
    isError: depositStakeError, // Error state
    error: depositStakeErrorData,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        resetterFn?.();
        toast.custom((t) => (
          <ToastNotification
            title="Mint & Stake successful"
            message=""
            onClose={() => toast.dismiss(t)}
          />
        ));
      },

      onError: () => {
        toast.custom((t) => (
          <ToastNotificationError
            title="Transaction failed, Please try again"
            onClose={() => toast.dismiss(t)}
          />
        ));
        resetterFn?.();
      },
    },
  });
  const {
    isPending: isWithdrawStakeLoading,
    data: withdrawStakeDataHash, // Data received from the `useBorrowingContractDepositTokens` hook
    writeContract: withdrawStakeWriteContract, // Function to initiate a write operation
    reset: resetWithdrawStake, // Function to reset the state of the hook
    isError: withdrawStakeError, // Error state
    error: withdrawStakeErrorData,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.custom((t) => (
          <ToastNotification
            title="Stake successful"
            message=""
            onClose={() => toast.dismiss(t)}
          />
        ));
        resetterFn?.();
      },

      onError: () => {
        resetterFn?.();
        toast.custom((t) => (
          <ToastNotificationError
            title="Transaction failed, Please try again"
            onClose={() => toast.dismiss(t)}
          />
        ));
      },
    },
  });
  const {
    isPending: isWithdrawUnStakeLoading,
    data: withdrawUnStakeDatahash, // Data received from the `useBorrowingContractDepositTokens` hook
    writeContract: withdrawUnStakeWriteContract, // Function to initiate a write operation
    reset: resetWithdrawUnStake, // Function to reset the state of the hook
    isError: withdrawUnStakeError, // Error state
    error: withdrawUnStakeErrorData,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.custom((t) => (
          <ToastNotification
            title="Unstake successful"
            message=""
            onClose={() => toast.dismiss(t)}
          />
        ));
        resetterFn?.();
      },

      onError: () => {
        toast.custom((t) => (
          <ToastNotificationError
            title="Transaction failed, Please try again"
            onClose={() => toast.dismiss(t)}
          />
        ));
        resetterFn?.();
      },
      ...mutation,
    },
  });

  const mintStakeUSDa = async ({
    depositingAmount,
    value,
    assetName,
    hedgeDuration,
    ethPrice,
    verifyParams,
  }: BorrowStakeInputs) => {
    const contractAddress =
      assetName === 12 || assetName === 13 || assetName === 14
        ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress]
        : borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ];
    const abi =
      assetName === 12 || assetName === 13 || assetName === 14
        ? borowCoreABI
        : borrowingContractAbi;
    writeContract?.({
      abi: abi,
      address: contractAddress as `0x${string}`,
      functionName: "depositAndStake",
      args: [
        {
          user: address as `0x${string}`,
          assetName,
          depositingAmount,
          hedgeValidity: hedgeDuration,
          verifyParams,
        },
      ],
      value,
    });
  };

  const stakeTokens = async ({
    user,
    index,
    stakingAmount,
    verifyParams,
    assetName,
  }: StakeInputs) => {
    const contractAddress =
      assetName === 12 || assetName === 13
        ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress]
        : borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ];

    const abi =
      assetName === 12 || assetName === 13
        ? borowCoreABI
        : borrowingContractAbi;

    return withdrawStakeWriteContract({
      abi,
      address: contractAddress as `0x${string}`,
      functionName: "stake",
      args: [index, stakingAmount, verifyParams],
    });
  };

  const unstakeTokens = async ({
    user,
    index,
    verifyParams,
    assetName,
  }: UnstakeInputs) => {
    const contractAddress =
      assetName === 12 || assetName === 13
        ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress]
        : borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ];

    const abi =
      assetName === 12 || assetName === 13
        ? borowCoreABI
        : borrowingContractAbi;

    return withdrawUnStakeWriteContract({
      abi,
      address: contractAddress as `0x${string}`,
      functionName: "unstake",
      args: [index, verifyParams],
    });
  };

  return {
    isDepositsStakeLoading,
    depositStakeDatahash,
    mintStakeUSDa,
    stakeTokens,
    unstakeTokens,
    resetStake,
    depositStakeError,
    isWithdrawStakeLoading,
    withdrawStakeDataHash,
    withdrawStakeError,
    isWithdrawUnStakeLoading,
    withdrawUnStakeDatahash,
    withdrawUnStakeError,
  };
};

export default useDepositStakeTokens;
