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
        strokeWidth="1.5"
        strokeLinecap="round"
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
      {...props}
    >
      <path
        d="M42.3477 25H9.01437"
        stroke={strokeColor}
        strokeWidth="3.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.9311 35.4154C31.9311 35.4154 42.3476 27.7437 42.3477 24.9987C42.3477 22.2537 31.931 14.582 31.931 14.582"
        stroke={strokeColor}
        strokeWidth="3.125"
        strokeLinecap="round"
        strokeLinejoin="round"
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
      {...props}
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
      {...props}
    >
      <path
        d="M23.3359 23.8359L29.3359 29.8359"
        stroke="#7A7A7A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.6641 15.168C26.6641 8.54056 21.2915 3.16797 14.6641 3.16797C8.03665 3.16797 2.66406 8.54056 2.66406 15.168C2.66406 21.7954 8.03665 27.168 14.6641 27.168C21.2915 27.168 26.6641 21.7954 26.6641 15.168Z"
        stroke="#7A7A7A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EthereumIcon: React.FC<SvgIconProps> = (props) => {
  const { theme } = useTheme();

  const strokeColor = theme === "dark" ? "#FFFFFF" : "#111111";
  return (
    <svg
      width="16"
      height="25"
      viewBox="0 0 16 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.99988 0.5L0.629883 12.72L7.99988 17.074L15.3699 12.72L7.99988 0.5ZM7.99988 24.5L0.629883 14.117L7.99988 18.5L15.3699 14.117L7.99988 24.5Z"
        fill={strokeColor}
      />
    </svg>
  );
};
export const BaseIcon: React.FC<SvgIconProps> = (props) => {
  const { theme } = useTheme();

  const strokeColor = theme === "dark" ? "#FFFFFF" : "#111111";
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.983 20.5C15.515 20.5 20 16.023 20 10.5C20 4.977 15.515 0.5 9.983 0.5C4.733 0.5 0.428 4.53 0 9.66H13.24V11.34H0C0.428 16.47 4.734 20.5 9.983 20.5Z"
        fill={strokeColor}
      />
    </svg>
  );
};
export const OptimismIcon: React.FC<SvgIconProps> = (props) => {
  const { theme } = useTheme();

  const strokeColor = theme === "dark" ? "#FFFFFF" : "#111111";
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 0.5C8.8174 0.5 5.76515 1.76428 3.51472 4.01472C1.26428 6.26515 0 9.3174 0 12.5C0 15.6826 1.26428 18.7348 3.51472 20.9853C5.76515 23.2357 8.8174 24.5 12 24.5C15.1826 24.5 18.2348 23.2357 20.4853 20.9853C22.7357 18.7348 24 15.6826 24 12.5C24 9.3174 22.7357 6.26515 20.4853 4.01472C18.2348 1.76428 15.1826 0.5 12 0.5ZM9.61 9.205C10.072 9.205 10.4867 9.28333 10.854 9.44C11.22 9.59 11.5077 9.81767 11.717 10.123C11.9277 10.423 12.033 10.783 12.033 11.203C12.033 11.3297 12.018 11.4893 11.988 11.682C11.9007 12.2054 11.7926 12.7252 11.664 13.24C11.454 14.0627 11.0907 14.678 10.574 15.086C10.058 15.488 9.36733 15.6893 8.502 15.69C7.78733 15.69 7.202 15.522 6.746 15.186C6.296 14.8433 6.07067 14.3567 6.07 13.726C6.07 13.5947 6.085 13.4327 6.115 13.24C6.193 12.808 6.30433 12.2887 6.449 11.682C6.857 10.0307 7.91133 9.205 9.61 9.205ZM13.779 9.295H16.176C16.8427 9.295 17.377 9.433 17.779 9.709C18.1877 9.985 18.3917 10.384 18.391 10.906C18.3903 11.056 18.372 11.2127 18.336 11.376C18.1867 12.066 17.884 12.576 17.428 12.906C16.9773 13.2367 16.3587 13.402 15.572 13.402H14.355L13.941 15.375C13.9293 15.4397 13.8936 15.4976 13.841 15.537C13.7933 15.577 13.7332 15.5992 13.671 15.6H12.447C12.3803 15.6 12.329 15.579 12.293 15.537C12.2634 15.4885 12.2538 15.4305 12.266 15.375L13.51 9.52C13.5209 9.45575 13.5555 9.39794 13.607 9.358C13.6556 9.31831 13.7162 9.29612 13.779 9.295ZM9.492 10.502C9.15667 10.502 8.869 10.601 8.629 10.799C8.395 10.9977 8.227 11.301 8.125 11.709C8.017 12.111 7.909 12.6033 7.801 13.186C7.77664 13.3109 7.76425 13.4378 7.764 13.565C7.764 14.117 8.05233 14.393 8.629 14.393C8.965 14.393 9.25 14.294 9.484 14.096C9.724 13.898 9.89533 13.5947 9.998 13.186C10.1353 12.6213 10.24 12.129 10.312 11.709C10.3373 11.5809 10.3501 11.4506 10.35 11.32C10.35 10.774 10.064 10.5013 9.492 10.502ZM14.942 10.547L14.6 12.158H15.635C15.8877 12.158 16.107 12.089 16.293 11.951C16.4886 11.8072 16.6231 11.5952 16.67 11.357C16.688 11.2557 16.697 11.1657 16.697 11.087C16.697 10.9137 16.6463 10.7817 16.545 10.691C16.443 10.595 16.2683 10.547 16.021 10.547H14.942Z"
        fill={strokeColor}
      />
    </svg>
  );
};
