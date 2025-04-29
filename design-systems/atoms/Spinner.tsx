import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  color = "black",
  className,
}) => {
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <div
      className={`border-2 rounded-full border-${color} dark:border-white border-r-0 border-b-0 animate-spin ${className}`}
      style={spinnerStyle}
    ></div>
  );
};

export default Spinner;
