import { BACKEND_API_URL } from "@/utils/urls";
import { useAccount } from "wagmi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

export enum Module {
  BORROW = "BORROW",
  CDS = "CDS",
  REFERRAL = "REFERRAL",
}

export interface PointDataDetails {
  module: Module;
  minAmount?: number;
  pointsToBeGiven?: number;
  assetBooster?: number;
  assetBoosterValidity?: number;
}

export interface PointData {
  [key: string]: PointDataDetails;
}
export interface TokenRewardDetailsReq {
  chainId: number;
  assetType: string;
  address: string;
  pointsData: PointData;
}

export interface TokenRewardDetails {
  chainId: number;
  assetType: string;
  address: string;
  pointsData: PointData;
}

export interface LockingBoosterEntry {
  lockingBooster?: number | string;
  lockingBoosterValidity?: number | string;
}

export interface LockingBoostersData {
  [key: number]: LockingBoosterEntry;
}

/*
 ** This hook is used to get the token reward details
 */
export const useGetCdsLockinPoint = () => {
  const { chainId } = useAccount();
  const queryClient = useQueryClient();

  //   This hook is used to get the token reward details
  const {
    data: cdsLockinRewardDetailList,
    isLoading: cdsLockinRewardDetailLoading,
  } = useQuery({
    queryKey: ["getCdsLockinPoint", chainId],
    queryFn: async () => {
      const response = await axios.post<LockingBoostersData>(
        `${BACKEND_API_URL}/global/get-lockingBoostersData-data`,
        {
          chainId,
        }
      );
      return response.data;
    },
    placeholderData: {
      30: {
        lockingBooster: 0,
        lockingBoosterValidity: 0,
      },
      60: {
        lockingBooster: 0,
        lockingBoosterValidity: 0,
      },
      120: {
        lockingBooster: 0,
        lockingBoosterValidity: 0,
      },
      180: {
        lockingBooster: 0,
        lockingBoosterValidity: 0,
      },
    } as LockingBoostersData,
    enabled: !!chainId,
  });

  return {
    cdsLockinRewardDetailList,
    cdsLockinRewardDetailLoading,
  };
};
