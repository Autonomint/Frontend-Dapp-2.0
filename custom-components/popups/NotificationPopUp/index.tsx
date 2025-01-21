import { Button } from "@/components/ui/button";
import Popup from "@/components/ui/PopUp";
import { Bell } from "lucide-react";
import React from "react";

interface NotificationPopupProps {
  //   twitter: string; // Path to the twitter icon image
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({}) => {
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
      <div></div>
    </Popup>
  );
};

export default NotificationPopup;
