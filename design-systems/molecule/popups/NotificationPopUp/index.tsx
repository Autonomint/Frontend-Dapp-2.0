import { useEthersSigner } from "@/blockchain/WalletConfigs/EtherSigner";
import { Button } from "@/design-systems/atoms/button";
import Popup from "@/design-systems/atoms/PopUp";
import {
  CARD_ID_NOTIFI_VALUE,
  DAPP_ADDRESS_NOTIFI_VALUE,
} from "@/utils/constants";
import { arrayify } from "@ethersproject/bytes";
import {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiSubscriptionCard,
} from "@notifi-network/notifi-react-card";
import "@notifi-network/notifi-react-card/dist/index.css";
import { Bell } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { useAccount } from "wagmi";
interface NotificationPopupProps {
  //   twitter: string; // Path to the twitter icon image
  wrapperClassName?: string;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  wrapperClassName,
}) => {
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
    <div className={wrapperClassName}>
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
            dappAddress={DAPP_ADDRESS_NOTIFI_VALUE}
            env="Development"
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
              cardId={CARD_ID_NOTIFI_VALUE}
              inputLabels={inputLabels}
              darkMode={resolvedTheme == "dark" ? true : false}
            />
          </NotifiContext>
        </div>
      </Popup>
    </div>
  );
};

export default NotificationPopup;
