import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function RebalancePopup() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[700px] bg-white font-plex-grotesk">
        <div className="text-[30px] font-medium text-textBlack">
          Withdraw Fund
        </div>
        <div className="flex justify-between mt-8 mb-6 text-textBlack">
          <span className="text-[30px] font-medium ">USDa Deposited</span>
          <span className="text-[30px] font-medium">$1,290</span>
        </div>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}
