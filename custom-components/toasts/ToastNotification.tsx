import { LinkIcon } from "@/components/ui/SvgIcons";

const ToastNotification = ({
  title,
  message,
  linkText,
  linkUrl,
  className,
  onClose,
}: {
  title: string;
  message: string;
  linkText?: string;
  linkUrl?: string;
  className?: string;
  onClose: () => void;
}) => {
  return (
    <div
      className={
        "bg-[#05A552] dark:bg-[#05A552] text-white p-4 pr-6 shadow-lg flex items-start justify-between relative w-[320px] max-h-content " +
        ` ${className}`
      }
    >
      <div className="text-left">
        <div className="text-[18px] font-medium">{title}</div>
        <div className="text-[14px]  gap-2 font-medium">{message}</div>
        {linkUrl && (
          <div className="flex items-center mt-2 gap-2 text-[14px]">
            <a
              href={linkUrl}
              className="text-[14px] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText}
            </a>
            <LinkIcon style={{ width: "18px", height: "18px" }} />
          </div>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-white absolute text-[16px] font-bold leading-none hover:text-gray-300 top-1/2 right-2 transform -translate-y-1/2"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastNotification;
