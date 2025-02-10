import MintUSDa from "@/design-systems/templates/mint-usda";

function MintUSDaPage({ params }: { params: Promise<{ currency: string }> }) {
  return <MintUSDa />;
}

export default MintUSDaPage;
