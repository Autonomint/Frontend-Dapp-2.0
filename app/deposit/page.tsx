"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import MintEthListTemplate from "@/design-systems/templates/mint-eth-list";

function DepositContent() {
  const searchParams = useSearchParams();
  const action = searchParams.get("action") || "sell";
  return <MintEthListTemplate action={action} />;
}

export default function DepositPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DepositContent />
    </Suspense>
  );
}
