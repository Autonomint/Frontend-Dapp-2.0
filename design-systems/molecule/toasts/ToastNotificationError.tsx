const ToastNotificationError = ({
  title,
  message,
  linkText,
  linkUrl,
  className,
  onClose,
  width,
}: {
  title: string;
  message?: string;
  linkText?: string;
  linkUrl?: string;
  className?: string;
  onClose: () => void;
  width?: string;
}) => {
  return (
    <div
      className={
        "bg-[#AA0001] dark:bg-[#FB3748] text-white p-4 pr-6 shadow-lg flex items-start justify-between relative w-[320px] max-h-content " +
        ` ${className} ${width}`
      }
    >
      <div className="text-left">
        <div className="text-[18px] font-medium">{title}</div>
      </div>
      <button
        onClick={onClose}
        className="text-white absolute text-[16px] font-bold leading-none hover:text-gray-300 top-1/2 right-5 transform -translate-y-1/2"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastNotificationError;
