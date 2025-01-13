import { X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Typography } from "../Typography";

interface PopupProps {
  children?: React.ReactNode;
  content?: React.ReactNode;
  contentClass?: string;
  title?: string;
  popUpWidth?: string;
  clickActive?: boolean;
}

const Popup = ({
  children,
  content,
  contentClass,
  title,
  popUpWidth = "550px",
  clickActive = true,
}: PopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="relative flex  flex-row items-center gap-2">
      <div className="relative">
        <div onClick={togglePopup} className="relative flex items-center gap-0">
          {content}
        </div>
        {isOpen && (
          <>
            <div
              className="fixed z-10 inset-0 bg-black/50"
              onClick={togglePopup}
            />
            <div
              style={{ width: popUpWidth }}
              className={` absolute z-20 top-[44px] right-[-12px] p-8 bg-white border-[1px] border-solid border-[#7A7A7A] rounded-md shadow-md ${contentClass}`}
            >
              <div className="flex flex-row justify-between items-center">
                <Typography size="subtitle" variant="regular">
                  {title || "Popup Title"}
                </Typography>
                <span className="cursor-pointer" onClick={togglePopup}>
                  <X />
                </span>
              </div>
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
