// components/PulsatingBadge.tsx
import React from "react";

interface PulsatingBadgeProps {
  text: string;
  color?: string; // Tailwind color e.g. 'red-500', 'green-500'
}

const PulsatingBadge: React.FC<PulsatingBadgeProps> = ({
  text,
  color = "red-500",
}) => {
  return (
    // <div className="relative inline-block">
    //   {/* Animated Ring */}
    //   <span
    //     className={`
    //     //   absolute inset-0 rounded-full border-4
    //     badge pulsate
    //     //   border-red-500 opacity-60
    //     `}
    //   ></span>

    //   {/* Badge with text */}
    //   <span
    //     className={`
    //       relative inline-block px-3 py-1 text-white text-sm font-semibold
    //       rounded-full bg-red-500
    //     `}
    //   >
    //     {text}
    //   </span>
    // </div>
    <div className="badge pulsate w-[24px] h-[24px] rounded-full text-green-700 bg-green-500 px-1 py-1">
      {5}
    </div>
  );
};

export default PulsatingBadge;
