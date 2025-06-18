"use client";
import { useInviteCodePopup } from "@/contexts/InviteCodePopup";
import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import { CheckIcon } from "@/design-systems/atoms/SvgIcons";
import Terms_Privacy from "@/design-systems/organisms/navbar/Terms_Privacy";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface TermAndConditionProps {}

const BetaConfirmation = ({}: TermAndConditionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { isInviteCodePopupOpen } = useInviteCodePopup();
  const { isConnected } = useAccount();

  // useEffect(() => {
  //   const confirmation = localStorage.getItem("beta-confirmation");
  //   if (!Boolean(confirmation) && isConnected && !isInviteCodePopupOpen) {
  //     setIsOpen(true);
  //   }
  // }, [isConnected, isInviteCodePopupOpen]);

  // const handleConfirmation = () => {
  //   setIsOpen(false);
  //   localStorage.setItem("beta-confirmation", "true");
  // };

  return (
    <Dialog open={isOpen} >
      <DialogContent className=" beta-confirmation dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0">
        <div className="text-center text-3xl font-bold mb-8">Beta Version</div>
        <div className=" mb-8 text-center">
        App is currently updating and will be live in few minutes
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default BetaConfirmation;
