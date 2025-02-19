import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import Terms_Privacy from "@/design-systems/organisms/navbar/Terms_Privacy";
import { useState } from "react";

interface TermAndConditionProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

const TermAndCondition = ({
  isDialogOpen,
  handleCloseDialog,
}: TermAndConditionProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent
        title="Terms & Privacy Policy"
        className=" dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0"
      >
        <Terms_Privacy />
      </DialogContent>
    </Dialog>
  );
};

export default TermAndCondition;
