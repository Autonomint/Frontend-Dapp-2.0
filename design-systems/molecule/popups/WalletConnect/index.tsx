"use client";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import { Typography } from "@/design-systems/atoms/Typography";
import Terms_Privacy from "@/design-systems/organisms/navbar/Terms_Privacy";
import { useState } from "react";
import WalletConnectButton from "../../WalletConnectButton";

interface WalletConnectPopupProps {}

const WalletConnectPopup = ({}: WalletConnectPopupProps) => {
  return (
    <Dialog open={true}>
      <DialogContent
        title="Terms & Privacy Policy"
        className=" dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0"
      >
        <Typography size="h4" className="">
          Wallet Connect
        </Typography>
        <div className="flex justify-center py-24 w-[60%] rounded-lg overflow-hidden mx-auto mt-8">
          <WalletConnectButton className="rounded-lg" />
          {/* @ts-expect-error msg */}
          <appkit-wallet-button />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectPopup;
