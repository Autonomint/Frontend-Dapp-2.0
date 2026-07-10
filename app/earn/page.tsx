"use client";

import { Suspense } from "react";
import CoveredCallTemplate from "@/design-systems/templates/eth-covered-call";

export default function EarnPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Suspense fallback={<div>Loading...</div>}>
        <CoveredCallTemplate />
      </Suspense>
    </div>
  );
}
