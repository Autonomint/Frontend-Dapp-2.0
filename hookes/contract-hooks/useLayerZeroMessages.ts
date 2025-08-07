// Import required dependencies
import { useQuery } from "@tanstack/react-query";
import { BACKEND_API_URL } from "../../utils/urls";
import { useAccount } from "wagmi";
import { eId, eIdWithChainId, NetworkId } from "@/utils/constants";
import { globalAddress } from "@/blockchain/contracts";
import { useMemo } from "react";

interface AddressInfo {
  address: string;
  chain: string;
}

interface Pathway {
  srcEid: number;
  dstEid: number;
  sender: AddressInfo;
  receiver: AddressInfo;
  id: string;
  nonce: number;
}

interface Transaction {
  txHash: string;
  blockHash: string;
  blockNumber: string;
  blockTimestamp: number;
  from: string;
  payload: string;
  readinessTimestamp: number;
  options: {
    lzReceive: {
      gas: string;
      value: string;
    };
    ordered: boolean;
  };
}

interface VerificationDVN {
  txHash: string;
  blockHash: string;
  blockNumber: number;
  blockTimestamp: number;
  proof: {
    packetHeader: string;
    payloadHash: string;
  };
  optional: boolean;
  status: string;
}

interface Verification {
  dvn: {
    dvns: {
      [key: string]: VerificationDVN;
    };
    status: string;
  };
  sealer: {
    tx: Transaction;
    status: string;
  };
}

// Interface representing a LayerZero message with all its properties and configurations
interface LayerZeroMessage {
  pathway: Pathway;
  source: {
    status: string;
    tx: Transaction;
  };
  destination: {
    nativeDrop: {
      status: string;
    };
    lzCompose: {
      status: string;
    };
    tx: Transaction;
    status: string;
  };
  verification: Verification;
  guid: string;
  config: {
    error: boolean;
    receiveLibrary: string;
    sendLibrary: string;
    inboundConfig: {
      confirmations: number;
      requiredDVNCount: number;
      optionalDVNCount: number;
      optionalDVNThreshold: number;
      requiredDVNs: string[];
      requiredDVNNames: string[];
      optionalDVNs: string[];
      optionalDVNNames: string[];
    };
    outboundConfig: {
      confirmations: number;
      requiredDVNCount: number;
      optionalDVNCount: number;
      optionalDVNThreshold: number;
      requiredDVNs: string[];
      requiredDVNNames: string[];
      optionalDVNs: string[];
      optionalDVNNames: string[];
      executor: string;
    };
    ulnSendVersion: string;
    ulnReceiveVersion: string;
  };
  status: {
    name: string;
    message: string;
  };
  created: string;
  updated: string;
}

interface LayerZeroMessagesResponse {
  data: LayerZeroMessage[];
}

// Custom hook to manage LayerZero cross-chain messages
export const useLayerZeroMessages = () => {
  // Memoize chain ID and related values to prevent unnecessary recalculations
  const { chainId } = useAccount();

  // Function to fetch LayerZero messages from the API
  const fetchMessages = async (): Promise<boolean> => {
    // Fetch messages from LayerZero API with specified EID and contract address
    const response = await fetch(
      `${BACKEND_API_URL}/global/is-all-lz-message-delivered/${chainId}`
    );

    // Handle API errors
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    return response.json();
  };

  // Use React Query to manage the data fetching
  const { data, isLoading, error, isError } = useQuery<boolean>({
    // Query key includes chain ID and relevant addresses
    queryKey: ["layerZeroMessages", chainId],
    queryFn: fetchMessages,
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: true, // Refetch when window gains focus
    enabled: false,
    // enabled: false, // Query is disabled (currently commented out)
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  // Memoized function to check if system is ready for new transactions
  const readyForNewTx = useMemo(() => {
    // Return false if no messages exist
    if (!data) return true;
    // Check if all messages have been delivered
    return data;
  }, [data]);

  // Log ready status for debugging
  console.log(readyForNewTx, "readyForNewTx");

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(
    () => ({
      layerZeroTxData: data, // LayerZero message data
      readyForNewTx: readyForNewTx || isError, // Always return true (TODO: fix this)
      isLoading: isLoading && isError === false, // Loading state
      error, // Any error that occurred
    }),
    [data, isError, isLoading, error, readyForNewTx]
  );
};
