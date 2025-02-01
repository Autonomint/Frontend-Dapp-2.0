import { Button } from "@/components/ui/button";
import Popup from "@/components/ui/PopUp";
import { Bell } from "lucide-react";
import React from "react";
import {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiInputSeparators,
  NotifiSubscriptionCard,
} from "@notifi-network/notifi-react-card";
import "@notifi-network/notifi-react-card/dist/index.css";
import { useAccount } from "wagmi";
import { useTheme } from "next-themes";
import { useEthersSigner } from "@/blockchain/WalletConfigs/EtherSigner";
import { arrayify } from "@ethersproject/bytes";
interface NotificationPopupProps {
  //   twitter: string; // Path to the twitter icon image
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({}) => {
  const { address } = useAccount();
  const { resolvedTheme } = useTheme();
  const signer = useEthersSigner();
  if (address === undefined || signer === undefined) {
    // account is required
    return null;
  }
  const inputLabels: NotifiInputFieldsText = {
    label: {
      email: "Email",
      sms: "Text Message",
      telegram: "Telegram",
    },
    placeholderText: {
      email: "Email",
    },
  };

  return (
    <Popup
      title="Notification"
      content={
        <Button
          variant={"shadowOutline"}
          className="border-[#041A50] h-fit p-[10px] dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
        >
          <Bell style={{ width: "24px", height: "24px" }} />
        </Button>
      }
      contentClass="!left-[unset] right-[0px] top-[50px] dark:bg-[#0D0D0D]"
    >
      <div className="pb-2">
        <NotifiContext
          dappAddress="9xu0e0btkv6g71ypagwo"
          env="Production"
          signMessage={async (message: Uint8Array) => {
            const result = await signer.signMessage(message);
            return arrayify(result);
          }}
          walletPublicKey={address}
          walletBlockchain="ETHEREUM"
        >
          <NotifiSubscriptionCard
            classNames={{
              container: "!bg-transparent",
            }}
            cardId="fb7bcc660ddb4d6e99703595e6eed049"
            inputLabels={inputLabels}
            darkMode={resolvedTheme == "dark" ? true : false}
          />
        </NotifiContext>
      </div>
    </Popup>
  );
};

export default NotificationPopup;
