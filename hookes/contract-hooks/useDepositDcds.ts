import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAddress } from "@/blockchain/contracts";
import { Widen } from "viem";
import { useAccount, useWriteContract } from "wagmi";

// const {
//   writeContract: ConfirmDeposit,
//   data: CdsDepositData,
//   reset,
//   isPending: isCdsDepositLoading,
// } = useWriteCdsDeposit({
//   // Handle errors during the CDS deposit process
//   mutation: {
//     onError: (error: any) => {
//       // console.log(error.message);
//       console.log("MESSAGE", error.cause);
//       console.log("MESSAGE", error.name);
//       console.log("MESSAGE", error.message);
//       // Show a custom toast notification for the error
//       // toast.custom(
//       //   (t) => (
//       //     <div>
//       //       <CustomToast
//       //         key={2}
//       //         props={{
//       //           t: toastId.current,
//       //           toastMainColor: "#B43939",
//       //           headline: `Uhh Ohh! ${error.details}`,
//       //           toastClosebuttonHoverColor: "#e66d6d",
//       //           toastClosebuttonColor: "#C25757",
//       //           type:'error'

//       //         }}
//       //       />
//       //     </div>
//       //   ),
//       //   { duration: 5000, id: toastId.current }
//       // );
//       showErrorToast(toastId, `Uhh Ohh! ${error.details}`);

//       // Dismiss the toast notification after 5 seconds
//     },
//     // Handle the successful completion of the CDS deposit process
//     onSuccess: (data) => {
//       console.log(data);
//       // Show a custom toast notification for the successful transaction
//       // toast.custom(
//       //   (t) => {
//       //     return (
//       //       <div>
//       //         <CustomToast
//       //           props={{
//       //             t: toastId.current,
//       //             toastMainColor: "#268730",
//       //             headline: "Transaction Submitted",
//       //             transactionHash: data,
//       //             linkLabel: "View Transaction",
//       //             toastClosebuttonHoverColor: "#90e398",
//       //             toastClosebuttonColor: "#57C262",
//       //             spinner: false,
//       //             type:'success'
//       //           }}
//       //         />
//       //       </div>
//       //     );
//       //   },
//       //   // Set the duration of the toast notification to be infinite
//       //   { duration: 5000 }
//       // );
//       showCustomToast(toastId, 3, "Depositing Tokens...", "success", data);
//     },
//   },
// });

// export const useWriteCdsDeposit = /*#__PURE__*/ createUseWriteContract({
//   abi: cdsAbi,
//   address: cdsAddress,
//   functionName: "deposit",
// });

const useDcdsDeposit = (mutation: Record<string, any>) => {
  const { chainId } = useAccount();
  const {
    data: dcdsDepositHash,
    isError: dcdsDepositeError,
    isPending: dcdsDepositIsPending,
    writeContract: writeDcdsDeposit,
    reset: resetDcdsDeposit,
  } = useWriteContract({
    mutation,
  });

  const handleDcdsDeposit = async (
    args: [`0x${string}`[], bigint[], Widen<boolean>, bigint, bigint],
    value: bigint
  ) => {
    writeDcdsDeposit({
      abi: cdsAbi,
      address: cdsAddress[chainId as keyof typeof cdsAddress],
      functionName: "deposit",
      args,
      value,
    });
  };

  return {
    dcdsDepositHash,
    dcdsDepositeError,
    dcdsDepositIsPending,
    handleDcdsDeposit,
  };
};
export default useDcdsDeposit;
