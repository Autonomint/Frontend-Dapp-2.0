import { Button } from "@/design-systems/atoms/button";
import { useAppKit } from "@reown/appkit/react";

const WalletConnectButton = ({
  variant = "default",
  className,
}: {
  variant?: any;
  className?: string;
}) => {
  const { open: openWalletPopup, close: closeWalletPopup } = useAppKit();

  return (
    <Button
      variant={variant}
      type="button"
      className={`bg-black text-white text-[24px] h-full w-full dark:bg-custom-gradient-to-bottom cursor-pointer ${className}}`}
      onClick={() => openWalletPopup()}
    >
      Connect Wallet
    </Button>
  );
};

export default WalletConnectButton;
