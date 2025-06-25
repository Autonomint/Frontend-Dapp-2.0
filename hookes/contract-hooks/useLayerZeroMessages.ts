import { useQuery } from "@tanstack/react-query";
import { LayerZeroUrl } from "../../utils/urls";
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

export const useLayerZeroMessages = () => {
  const { chainId } = useAccount();

  const otherChainId =
    chainId === NetworkId.Optimism ? NetworkId.BaseSepolia : NetworkId.Optimism;

  const otherChainContractAddress =
    globalAddress[otherChainId as keyof typeof globalAddress];

  const eid = eIdWithChainId[otherChainId];

  const fetchMessages = async (): Promise<LayerZeroMessagesResponse> => {
    if (!otherChainContractAddress || !eid) return { data: [] };

    const response = await fetch(
      `${LayerZeroUrl}/messages/oapp/${eid}/${otherChainContractAddress}?limit=1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery<LayerZeroMessagesResponse>({
    queryKey: [
      "layerZeroMessages",
      chainId,
      { otherChainContractAddress, eid },
    ],
    queryFn: fetchMessages,
    retry: 1,
    refetchOnWindowFocus: true,
    enabled: !!otherChainContractAddress && !!eid,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5000,
  });

  const readyForNewTx = useMemo(() => {
    if (!data?.data?.length) return false;
    return data.data.every((msg) => msg.status.name === "DELIVERED");
  }, [data, chainId]);

  console.log(readyForNewTx, "readyForNewTx");

  return { layerZeroTxData: data, readyForNewTx, isLoading, error };
};
