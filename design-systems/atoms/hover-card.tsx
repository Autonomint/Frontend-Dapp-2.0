import { useState } from "react";

export interface HoverCardProps {
  title: React.ReactElement;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  title,
  children,
  className,
  disabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={` relative ${className}`}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className=" inset-0 flex items-center justify-center"
      >
        {title}
      </div>
      <div
        className={`absolute overflow-hidden dark:bg-[#171B21] rounded-[12px] top-8 w-[350px] shadow-md left-[-10px] bg-white  border-[1px] border-grayLight  transition duration-500 ease-in-out opacity-0 ${
          isHovered && !disabled ? "opacity-100 visible" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
