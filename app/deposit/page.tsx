"use client";
import { useSearchParams } from "next/navigation";
import MintEthListTemplate from "@/design-systems/templates/mint-eth-list";

export default function DepositPage() {
  const searchParams = useSearchParams();
  const action = searchParams.get("action") || "sell";
  return <MintEthListTemplate action={action} />;
}
