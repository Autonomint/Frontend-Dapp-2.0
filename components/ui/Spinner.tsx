import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, color = "black" }) => {
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <div
      className={`border-2 rounded-full border-${color} border-r-0 border-b-0 animate-spin`}
      style={spinnerStyle}
    ></div>
  );
};

export default Spinner;
