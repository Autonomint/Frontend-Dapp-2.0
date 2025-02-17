import MintUSDa from "@/design-systems/templates/mint-usda";
import { useRouter } from "next/navigation";

export default async function MintUSDaPage({
  params,
}: {
  params: Promise<{ currency: string }>;
}) {
  const currency = (await params).currency;

  return <MintUSDa currency={currency} />;
}
