import { useEthersSigner } from "@/blockchain/WalletConfigs/EtherSigner";
import { CARD_ID_NOTIFI, DAPP_ADDRESS_NOTIFI } from "@/utils/constants";
import { arrayify } from "@ethersproject/bytes";
import {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiSubscriptionCard,
} from "@notifi-network/notifi-react-card";
import { useTheme } from "next-themes";
import { useAccount } from "wagmi";

const NotificationContainer = () => {
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
    <div className="pb-2 h-[400px] overflow-y-scroll no-scrollbar   ">
      {/* <div>
        <Typography size="lg" className="" variant="regular">
          Notification
        </Typography>
      </div> */}
      <NotifiContext
        dappAddress={DAPP_ADDRESS_NOTIFI}
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
          cardId={CARD_ID_NOTIFI}
          inputLabels={inputLabels}
          darkMode={resolvedTheme == "dark" ? true : false}
        />
      </NotifiContext>
    </div>
  );
};

export default NotificationContainer;
