import MintUSDa from "@/design-systems/templates/mint-usda";

export default async function MintUSDaPage({
  params,
}: {
  params: Promise<{ currency: string }>;
}) {
  const currency = (await params).currency;

  return <MintUSDa currency={currency} />;
}
