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
        "bg-[#05A552] text-white p-4  shadow-lg flex items-start justify-between relative w-[278px] max-h-content " +
        ` ${className}`
      }
    >
      <div className="text-left">
        <div className="text-[18px] font-medium">{title}</div>
        <div className="text-[14px] font-medium">{message}</div>
        {linkUrl && (
          <a
            href={linkUrl}
            className="text-[14px] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
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
