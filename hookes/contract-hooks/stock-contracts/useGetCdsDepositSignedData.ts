import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import { parseUnits } from "ethers";
import { useAccount } from "wagmi";

export interface CdsDepositSignedDataReturn {
    excessProfitCumulativeValue: bigint;
    ethPrice: bigint;
    odosAssembledData: `0x${string}`;
    expiredUSDAmount: bigint;
    deadline: bigint;
    signature: `0x${string}`;
}

export interface CdsDepositDto {
    address: string;
    chainId: number;
    index: number;
    collateralType?: string;
    strikePrice?: number;
    optionFees?: string;
}

/**
 * Function to fetch the CDS deposit signed data
 */
async function signedDataForCdsDeposit(
    address: `0x${string}` | undefined,
    chainId: number,
    index: number,
    collateralType: string,
    strikePrice: number,
    optionFees: string
): Promise<CdsDepositSignedDataReturn> {
    return fetch(`${BACKEND_API_URL}/stock-options/cds/signedDataForCDSDeposit`, {
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
 * Custom hook to fetch signed data for CDS deposit
 */
const useGetCdsDepositSignedData = (index?: number) => {
    const { address, chainId } = useAccount();

    const {
        data: cdsDepositSignedData,
        isPending: isPendingCdsDepositSignedData,
        mutateAsync: refetchCdsDepositSignedData,
    } = useMutation({
        mutationFn: (variables: {
            collateralType: string;
            strikePrice: number;
            optionFees: string;
        }) =>
            signedDataForCdsDeposit(
                address ? address : undefined,
                chainId as number,
                index || 0,
                variables.collateralType,
                variables.strikePrice,
                variables.optionFees,
            ),
    });

    return {
        cdsDepositSignedData,
        isPendingCdsDepositSignedData,
        refetchCdsDepositSignedData,
    };
};

export default useGetCdsDepositSignedData;