import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import { parseUnits } from "ethers";
import { useAccount } from "wagmi";

export interface CDSWithdrawSignedDataReturn {
    excessProfitCumulativeValue: bigint;
    ethPrice: bigint;
    odosAssembledData: `0x${string}`;
    expiredUSDAmount: bigint;
    deadline: bigint;
    signature: `0x${string}`;
}

export interface CDSWithdrawDto {
    address: string;
    chainId: number;
    index: number;
    collateralType?: string;
    strikePrice?: number;
    optionFees?: string;
}

/**
 * Function to fetch the CDS withdraw signed data
 */
async function signedDataForCdsWithdraw(
    address: `0x${string}` | undefined,
    chainId: number,
    index: number,
    collateralType: string,
    strikePrice: number,
    optionFees: string
): Promise<CDSWithdrawSignedDataReturn> {
    return fetch(`${BACKEND_API_URL}/stock-options/cds/signedDataForCDSWithdraw`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address: address,
            chainId: chainId,
            index: index,
            collateralType: collateralType,
            strikePrice: parseUnits((strikePrice).toString(), 2).toString(),
            optionFees: optionFees,
        }),
    }).then((response) => response.json());
}

/**
 * Custom hook to fetch signed data for CDS withdraw
 */
const useGetCDSWithdrawSignedData = (index?: number) => {
    const { address, chainId } = useAccount();

    const {
        data: cdsWithdrawSignedData,
        isPending: isPendingCDSWithdrawSignedData,
        mutateAsync: refetchCDSWithdrawSignedData,
    } = useMutation({
        mutationFn: (variables: {
            collateralType: string;
            strikePrice: number;
            optionFees: string;
        }) =>
            signedDataForCdsWithdraw(
                address ? address : undefined,
                chainId as number,
                index || 0,
                variables.collateralType,
                variables.strikePrice,
                variables.optionFees,
            ),
    });

    return {
        cdsWithdrawSignedData,
        isPendingCDSWithdrawSignedData,
        refetchCDSWithdrawSignedData,
    };
};

export default useGetCDSWithdrawSignedData;
