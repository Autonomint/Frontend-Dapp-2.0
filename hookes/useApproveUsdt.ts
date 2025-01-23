import { testusdtAbiAbi } from "@/blockchain/abis/usdt";
import { testusdtAbiAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

// export const useWriteTestusdtAbiApprove = /*#__PURE__*/ createUseWriteContract({
//   abi: testusdtAbiAbi,
//   address: testusdtAbiAddress,
//   functionName: "approve",
// });
// const {
//   isPending: usdtApproveLoading,
//   data: usdtApproveData,
//   writeContract: usdtWrite,
//   isSuccess: usdtApproved,
// } = useWriteTestusdtAbiApprove({
//   mutation: {
//     onError(error: any) {
//       // toast.custom(
//       //   (t) => {
//       //     return (
//       //       <div>
//       //         <CustomToast
//       //           key={2}
//       //           props={{
//       //             t: toastId.current,
//       //             toastMainColor: "#B43939",
//       //             headline: `Uhh Ohh! ${error.details}`,
//       //             toastClosebuttonHoverColor: "#e66d6d",
//       //             toastClosebuttonColor: "#C25757",
//       //             type:'error'
//       //           }}
//       //         />
//       //       </div>
//       //     );
//       //   },
//       //   { duration: 5000, id: toastId.current  }
//       // );
//       showErrorToast(toastId, `Uhh Ohh! ${error.details}`);
//     },
//     // Handle success and show a custom toast notification
//     onSuccess: (data) => {
//       // toast.custom(
//       //   (t) => {
//       //     return (
//       //       <div>
//       //         <CustomToast
//       //           props={{
//       //             t: toastId.current,
//       //             toastMainColor: "#268730",
//       //             headline: "Transaction Initiated",
//       //             transactionHash: data,
//       //             linkLabel: "View Transaction",
//       //             toastClosebuttonHoverColor: "#90e398",
//       //             toastClosebuttonColor: "#57C262",
//       //             type:'success'
//       //           }}
//       //         />
//       //       </div>
//       //     );
//       //   },
//       //   { duration: 5000 }
//       // );

//       showCustomToast(toastId, 2, "Approving USDT...", "success", data);
//     },
//   },
// });

const useUsdtApprove = () => {
  const { chainId } = useAccount();
  const {
    data: usdtApprovedHash,
    writeContract: usdtApproveWrite,
    isPending: isPendingUsdtApprove,
    isSuccess: isSuccessUsdtApprove,
  } = useWriteContract({});

  const handleUsdtApprove = (args: [`0x${string}`, bigint]) => {
    usdtApproveWrite({
      abi: testusdtAbiAbi,
      address: testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
      functionName: "approve",
      args,
    });
  };

  return {
    usdtApproveWrite,
    isPendingUsdtApprove,
    isSuccessUsdtApprove,
    usdtApprovedHash,
    handleUsdtApprove,
  };
};

export default useUsdtApprove;
