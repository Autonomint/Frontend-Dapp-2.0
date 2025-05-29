import { BACKEND_API_URL } from "@/utils/urls";
import { useAccount } from "wagmi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export enum Module {
  BORROW = "BORROW",
  CDS = "CDS",
  REFERRAL = "REFERRAL",
}

export interface PointDataDetails {
  module: Module;
  minAmount: number;
  pointsToBeGiven: number;
  defaultBooster: number;
  boosterValidity: number;
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
/*
 ** This hook is used to get the token reward details
 */
export const useGetTokenReward = () => {
  const { chainId } = useAccount();

  //   This hook is used to get the token reward details
  const { data: tokenRewardDetailList, isLoading: tokenRewardDetailLoading } =
    useQuery({
      queryKey: ["getTokenReward"],
      queryFn: async () => {
        const response = await axios.post<PointData>(
          `${BACKEND_API_URL}/global/get-points-data`,
          {
            chainId,
          }
        );
        return response.data;
      },
      select: (data) => {
        return data || {};
      },
      placeholderData: {},
      enabled: !!chainId,
    });

  return {
    tokenRewardDetailList,
    tokenRewardDetailLoading,
  };
};
