import { useTheme } from "next-themes";
import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {}

export const RightArrowIcon: React.FC<SvgIconProps> = (props) => {
  const { theme } = useTheme();

  const strokeColor = theme === "dark" ? "#FFFFFF" : "#111111";
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // Spread the props to make the component customizable
    >
      <path
        d="M8.33203 25H41.6653"
        stroke={strokeColor}
        strokeWidth="3.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.7486 35.4154C18.7486 35.4154 8.33207 27.7437 8.33203 24.9987C8.33201 22.2537 18.7487 14.582 18.7487 14.582"
        stroke={strokeColor}
        strokeWidth="3.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const WalletIcon: React.FC<SvgIconProps> = (props) => {
  const { theme } = useTheme();

  const strokeColor = theme === "dark" ? "#FFFFFF" : "#111111";
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.1716 21 11V13C21 15.8284 21 17.2426 20.1213 18.1213C19.2426 19 17.8284 19 15 19H9C5.22876 19 3.34315 19 2.17157 17.8284C1 16.6569 1 14.7712 1 11V9C1 5.22876 1 3.34315 2.17157 2.17157C3.34315 1 5.22876 1 9 1H13C13.93 1 14.395 1 14.7765 1.10222C15.8117 1.37962 16.6204 2.18827 16.8978 3.22354C17 3.60504 17 4.07003 17 5"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export const LeftArrowIcon: React.FC<SvgIconProps> = (props) => {
  const { theme } = useTheme();

  const strokeColor = theme === "dark" ? "#FFFFFF" : "#111111";
  return (
    <svg
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42.3477 25H9.01437"
        stroke={strokeColor}
        stroke-width="3.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M31.9311 35.4154C31.9311 35.4154 42.3476 27.7437 42.3477 24.9987C42.3477 22.2537 31.931 14.582 31.931 14.582"
        stroke={strokeColor}
        stroke-width="3.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const DotIcon: React.FC<SvgIconProps> = (props) => {
  const { theme } = useTheme();

  const strokeColor = theme === "dark" ? "#FFFFFF" : "#111111";
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.84 7.79201C3.136 7.79201 2.48533 7.63201 1.888 7.31201C1.312 6.97067 0.853333 6.51201 0.512 5.93601C0.170667 5.36001 0 4.72001 0 4.01601C0 3.29067 0.170667 2.64001 0.512 2.06401C0.853333 1.48801 1.312 1.04001 1.888 0.720008C2.464 0.378675 3.11467 0.208008 3.84 0.208008C4.56533 0.208008 5.216 0.378675 5.792 0.720008C6.38933 1.04001 6.848 1.48801 7.168 2.06401C7.50933 2.64001 7.68 3.29067 7.68 4.01601C7.68 4.74134 7.50933 5.39201 7.168 5.96801C6.82667 6.54401 6.35733 6.99201 5.76 7.31201C5.184 7.63201 4.544 7.79201 3.84 7.79201Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export const SearchIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3359 23.8359L29.3359 29.8359"
        stroke="#7A7A7A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.6641 15.168C26.6641 8.54056 21.2915 3.16797 14.6641 3.16797C8.03665 3.16797 2.66406 8.54056 2.66406 15.168C2.66406 21.7954 8.03665 27.168 14.6641 27.168C21.2915 27.168 26.6641 21.7954 26.6641 15.168Z"
        stroke="#7A7A7A"
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  );
};
