// Define the expected data structure from the API response (adjust accordingly)
export interface OptionFeesResponse {
  fee: number; // Example property, adjust this based on the actual response
  // Add other properties based on your API response
}

export interface OptionFeesRequest {
  chainId: number;
  collateralAmount: number;
  ethPrice: number;
  strikePercent: number;
}

export interface ReferralResponse {
  code: string;
  referralLink: string;
  generateReferral: () => Promise<void>;
  postReferredCodeFromUrl: (data: postReferredCodeFromUrlData) => Promise<any>;
  getReferralCodeFromUrl: () => string | null;
  isLoading: boolean;
  isError: boolean;
}

export interface postReferredCodeFromUrlData {
  address: string;
  referral: string;
}
