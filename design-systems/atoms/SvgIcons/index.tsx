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
  return (
    <svg
      width="16"
      height="25"
      viewBox="0 0 16 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.99988 0.5L0.629883 12.72L7.99988 17.074L15.3699 12.72L7.99988 0.5ZM7.99988 24.5L0.629883 14.117L7.99988 18.5L15.3699 14.117L7.99988 24.5Z" />
    </svg>
  );
};
export const BaseIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9.983 20.5C15.515 20.5 20 16.023 20 10.5C20 4.977 15.515 0.5 9.983 0.5C4.733 0.5 0.428 4.53 0 9.66H13.24V11.34H0C0.428 16.47 4.734 20.5 9.983 20.5Z" />
    </svg>
  );
};
export const OptimismIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 0.5C8.8174 0.5 5.76515 1.76428 3.51472 4.01472C1.26428 6.26515 0 9.3174 0 12.5C0 15.6826 1.26428 18.7348 3.51472 20.9853C5.76515 23.2357 8.8174 24.5 12 24.5C15.1826 24.5 18.2348 23.2357 20.4853 20.9853C22.7357 18.7348 24 15.6826 24 12.5C24 9.3174 22.7357 6.26515 20.4853 4.01472C18.2348 1.76428 15.1826 0.5 12 0.5ZM9.61 9.205C10.072 9.205 10.4867 9.28333 10.854 9.44C11.22 9.59 11.5077 9.81767 11.717 10.123C11.9277 10.423 12.033 10.783 12.033 11.203C12.033 11.3297 12.018 11.4893 11.988 11.682C11.9007 12.2054 11.7926 12.7252 11.664 13.24C11.454 14.0627 11.0907 14.678 10.574 15.086C10.058 15.488 9.36733 15.6893 8.502 15.69C7.78733 15.69 7.202 15.522 6.746 15.186C6.296 14.8433 6.07067 14.3567 6.07 13.726C6.07 13.5947 6.085 13.4327 6.115 13.24C6.193 12.808 6.30433 12.2887 6.449 11.682C6.857 10.0307 7.91133 9.205 9.61 9.205ZM13.779 9.295H16.176C16.8427 9.295 17.377 9.433 17.779 9.709C18.1877 9.985 18.3917 10.384 18.391 10.906C18.3903 11.056 18.372 11.2127 18.336 11.376C18.1867 12.066 17.884 12.576 17.428 12.906C16.9773 13.2367 16.3587 13.402 15.572 13.402H14.355L13.941 15.375C13.9293 15.4397 13.8936 15.4976 13.841 15.537C13.7933 15.577 13.7332 15.5992 13.671 15.6H12.447C12.3803 15.6 12.329 15.579 12.293 15.537C12.2634 15.4885 12.2538 15.4305 12.266 15.375L13.51 9.52C13.5209 9.45575 13.5555 9.39794 13.607 9.358C13.6556 9.31831 13.7162 9.29612 13.779 9.295ZM9.492 10.502C9.15667 10.502 8.869 10.601 8.629 10.799C8.395 10.9977 8.227 11.301 8.125 11.709C8.017 12.111 7.909 12.6033 7.801 13.186C7.77664 13.3109 7.76425 13.4378 7.764 13.565C7.764 14.117 8.05233 14.393 8.629 14.393C8.965 14.393 9.25 14.294 9.484 14.096C9.724 13.898 9.89533 13.5947 9.998 13.186C10.1353 12.6213 10.24 12.129 10.312 11.709C10.3373 11.5809 10.3501 11.4506 10.35 11.32C10.35 10.774 10.064 10.5013 9.492 10.502ZM14.942 10.547L14.6 12.158H15.635C15.8877 12.158 16.107 12.089 16.293 11.951C16.4886 11.8072 16.6231 11.5952 16.67 11.357C16.688 11.2557 16.697 11.1657 16.697 11.087C16.697 10.9137 16.6463 10.7817 16.545 10.691C16.443 10.595 16.2683 10.547 16.021 10.547H14.942Z" />
    </svg>
  );
};

export const DownArrowIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 1.00005C13 1.00005 8.5811 7 7 7C5.4188 7 1 1 1 1"
        // stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FormYourLuckIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="28"
      height="27"
      viewBox="0 0 28 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.7296 17.6026C8.53332 17.5946 6.88598 17.302 5.59343 16.0095C3.29144 13.7075 4.16108 10.2801 4.16108 10.2801C4.16108 10.2801 5.95576 9.82483 7.82017 10.4454C7.80655 10.3433 7.79513 10.2399 7.78616 10.1351C7.77023 9.94889 7.76175 9.75857 7.76181 9.56385C7.76175 5.5577 11.3228 3.33203 11.3228 3.33203C11.3228 3.33203 13.548 4.72287 14.4805 7.28451C17.5829 5.11396 21.3492 5.98305 21.3492 5.98305C21.3492 5.98305 22.2183 9.74937 20.0478 12.8518C22.6095 13.7843 24.0002 16.0095 24.0002 16.0095C24.0002 16.0095 21.7746 19.5706 17.7684 19.5705C17.4643 19.5705 17.1703 19.55 16.8869 19.5121C17.5074 21.3765 17.0522 23.1712 17.0522 23.1712C17.0522 23.1712 13.6248 24.0408 11.3228 21.7388"
        strokeWidth="1.66669"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 23.332L15.1112 12.2207"
        strokeWidth="1.66669"
        strokeLinecap="round"
      />
    </svg>
  );
};
export const CheckIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 5L3.5 7.5L9 1.5"
        stroke="#111111"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LinkIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.39917 2C4.96653 2.00438 3.69265 2.06411 2.87855 2.87835C2 3.75704 2 5.17128 2 7.99972C2 10.8282 2 12.2425 2.87855 13.1211C3.7571 13.9999 5.17111 13.9999 7.99917 13.9999C10.8271 13.9999 12.2412 13.9999 13.1197 13.1211C13.9338 12.3069 13.9935 11.0328 13.9979 8.59979"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7027 2.33034L7.3645 8.70533M13.7027 2.33034C13.3734 2.0006 11.1549 2.03133 10.6859 2.03801M13.7027 2.33034C14.032 2.66009 14.0013 4.88141 13.9946 5.35102"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const RingLoadingIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="246"
      height="246"
      style={{
        width: props.width || 46,
        height: props.height || 46,
        shapeRendering: "auto",
        display: "block",
        background: "transparent",
      }}
      {...props}
    >
      <g>
        <g transform="rotate(0 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.9166666666666666s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(30 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.8333333333333334s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(60 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.75s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(90 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.6666666666666666s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(120 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.5833333333333334s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(150 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.5s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(180 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.4166666666666667s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(210 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.3333333333333333s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(240 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.25s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(270 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.16666666666666666s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(300 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="-0.08333333333333333s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(330 50 50)">
          <rect height="12" width="3" ry="0" rx="0" y="24" x="49.5">
            <animate
              repeatCount="indefinite"
              begin="0s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g></g>
      </g>
    </svg>
  );
};

export const MenuIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 5H20"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12H20"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 19H20"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CloseIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 1L1 15M1 1L15 15"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BrandLogoSmall = ({ className }: { className?: string }) => {
  const { theme } = useTheme();

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 116 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <path
        d="M0.810303 104.719C38.9786 104.719 76.8445 104.719 115.024 104.719L65.9478 0.617287H50.0351L0.810303 104.719Z"
        fill={theme === "dark" ? "#A1FFCE" : "black"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.5213 120.938L21.8298 103.89L56.9204 48.5617L91.5122 103.99L56.5213 120.938Z"
        fill="black"
      />
      <path
        d="M56.0358 121.933L20.2322 104.338L56.9281 46.4804L93.1056 104.451C80.9089 110.354 68.7107 116.254 56.5209 122.172L56.0358 121.933ZM23.4276 103.444L56.523 119.708L89.9189 103.532L56.9148 50.646L23.4276 103.444Z"
        fill={theme === "dark" ? "#A1FFCE" : "black"}
      />
      <path
        d="M55.51 120.938V49.0525H57.7312V120.938H55.51Z"
        fill={theme === "dark" ? "#A1FFCE" : "black"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.9812 114.322L56.6198 156L90.36 116.025L56.6198 131.533L22.9812 114.322Z"
        fill={theme === "dark" ? "#A1FFCE" : "black"}
      />
      <path
        d="M21.3621 102.901L56.1528 86.5451L57.0902 88.55L22.2992 104.906L21.3621 102.901Z"
        fill={theme === "dark" ? "#A1FFCE" : "black"}
      />
      <path
        d="M90.9431 104.906L56.1516 88.55L57.089 86.5451L91.8806 102.901L90.9431 104.906Z"
        fill={theme === "dark" ? "#A1FFCE" : "black"}
      />
    </svg>
  );
};

export const DecorativeBackground: React.FC = () => {
  return (
    <svg
      viewBox="0 0 238 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g clipPath="url(#clip0_2009_3430)">
        <rect width="100%" height="100%" fill="#0C0C0C" />
        <g filter="url(#filter0_f_2009_3430)">
          <circle
            cx="191.5"
            cy="-7"
            r="39"
            fill="url(#paint0_linear_2009_3430)"
          />
        </g>
        <g filter="url(#filter1_f_2009_3430)">
          <circle
            cx="13.5"
            cy="87"
            r="52"
            fill="url(#paint1_linear_2009_3430)"
          />
        </g>
        <g filter="url(#filter2_f_2009_3430)">
          <ellipse
            cx="242"
            cy="-3.5"
            rx="40.5"
            ry="32.5"
            fill="url(#paint2_linear_2009_3430)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_2009_3430"
          x="112.5"
          y="-86"
          width="158"
          height="158"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="20"
            result="effect1_foregroundBlur_2009_3430"
          />
        </filter>
        <filter
          id="filter1_f_2009_3430"
          x="-88.5"
          y="-15"
          width="204"
          height="204"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="25"
            result="effect1_foregroundBlur_2009_3430"
          />
        </filter>
        <filter
          id="filter2_f_2009_3430"
          x="171.5"
          y="-66"
          width="141"
          height="125"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="15"
            result="effect1_foregroundBlur_2009_3430"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2009_3430"
          x1="152.5"
          y1="-7"
          x2="230.5"
          y2="-7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A1C4FD" />
          <stop offset="1" stopColor="#C2E9FB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2009_3430"
          x1="-21.8017"
          y1="106.412"
          x2="57.1752"
          y2="154.364"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7F20FA" />
          <stop offset="0.575" stopColor="#F22384" />
          <stop offset="0.985" stopColor="#5D00F3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2009_3430"
          x1="214.505"
          y1="8.6325"
          x2="268.043"
          y2="49.1404"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7F20FA" />
          <stop offset="0.575" stopColor="#F22384" />
          <stop offset="0.985" stopColor="#5D00F3" />
        </linearGradient>
        <clipPath id="clip0_2009_3430">
          <rect width="100%" height="100%" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const LiquidityLandIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="35"
      height="23"
      viewBox="0 0 35 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.82">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M34.3962 11.5C34.3962 17.5186 31.3586 22.3976 27.6115 22.3976C25.8489 22.3976 24.2433 21.3179 23.037 19.5479C21.3808 17.1178 20.5686 13.3633 17.6277 13.3633C14.7305 13.3633 14.0097 17.0934 12.3933 19.4977C11.1833 21.2976 9.56393 22.3978 7.78462 22.3978C4.03758 22.3978 1 17.5188 1 11.5002C1 5.48166 4.03758 0.602654 7.78462 0.602655C9.54856 0.602655 11.1553 1.6839 12.3619 3.45627C13.9339 5.76534 14.8343 9.14493 17.6277 9.14493C20.4023 9.14493 21.4075 5.95389 22.92 3.62773C24.1385 1.75374 25.7913 0.602417 27.6115 0.602417C31.3586 0.602417 34.3962 5.48143 34.3962 11.5Z"
          fill="url(#paint0_linear_2003_2780)"
        ></path>
        <path
          d="M7.78462 0.602655V0.564705V0.602655ZM22.92 3.62773L22.8882 3.60705L22.92 3.62773ZM27.6115 22.4355C29.5029 22.4355 31.2095 21.2042 32.4412 19.2258C33.6733 17.2468 34.4341 14.5152 34.4341 11.5H34.3582C34.3582 14.5033 33.6002 17.2205 32.3768 19.1857C31.153 21.1514 29.4672 22.3596 27.6115 22.3596V22.4355ZM23.0056 19.5693C24.2162 21.3456 25.8321 22.4355 27.6115 22.4355V22.3596C25.8657 22.3596 24.2704 21.2903 23.0683 19.5266L23.0056 19.5693ZM7.78462 22.4358C9.58087 22.4358 11.2105 21.3251 12.4248 19.5189L12.3618 19.4765C11.156 21.2701 9.54698 22.3599 7.78462 22.3599V22.4358ZM0.96205 11.5002C0.96205 14.5155 1.72287 17.247 2.95495 19.226C4.18669 21.2045 5.89322 22.4358 7.78462 22.4358V22.3599C5.92897 22.3599 4.2432 21.1516 3.01938 19.1859C1.79592 17.2208 1.03795 14.5036 1.03795 11.5002H0.96205ZM7.78462 0.564705C5.89322 0.564705 4.18669 1.79598 2.95495 3.77442C1.72287 5.75342 0.96205 8.485 0.96205 11.5002H1.03795C1.03795 8.49689 1.79592 5.77969 3.01939 3.81454C4.2432 1.84883 5.92898 0.640605 7.78462 0.640605V0.564705ZM12.3933 3.43492C11.1824 1.65624 9.56536 0.564705 7.78462 0.564705V0.640605C9.53177 0.640605 11.1282 1.71156 12.3305 3.47763L12.3933 3.43492ZM27.6115 0.564467C25.774 0.564467 24.1109 1.72671 22.8882 3.60705L22.9519 3.64842C24.1662 1.78077 25.8087 0.640367 27.6115 0.640367V0.564467ZM34.4341 11.5C34.4341 8.48476 33.6733 5.75318 32.4412 3.77419C31.2095 1.79575 29.5029 0.564467 27.6115 0.564467V0.640367C29.4672 0.640367 31.153 1.84859 32.3768 3.8143C33.6002 5.77945 34.3582 8.49666 34.3582 11.5H34.4341ZM17.6277 9.18289C19.0328 9.18289 19.9877 8.37361 20.7779 7.28088C21.1729 6.73463 21.5281 6.1159 21.8783 5.48967C22.229 4.86278 22.5746 4.22862 22.9519 3.64842L22.8882 3.60705C22.5092 4.18993 22.162 4.82695 21.8121 5.45262C21.4618 6.07894 21.1086 6.69413 20.7164 7.2364C19.9322 8.32074 18.9972 9.10698 17.6277 9.10698V9.18289ZM12.3305 3.47763C12.7223 4.05306 13.0724 4.69554 13.4217 5.3374C13.7706 5.97858 14.1187 6.61924 14.5054 7.18784C15.2787 8.3251 16.2121 9.18289 17.6277 9.18289V9.10698C16.2499 9.10698 15.3364 8.27497 14.5681 7.14516C14.184 6.58024 13.8377 5.94304 13.4884 5.30112C13.1394 4.65989 12.7875 4.01402 12.3933 3.43492L12.3305 3.47763ZM17.6277 13.3254C16.1585 13.3254 15.2441 14.273 14.4977 15.5093C14.1245 16.1275 13.7915 16.821 13.4517 17.5081C13.1115 18.196 12.7644 18.8778 12.3618 19.4765L12.4248 19.5189C12.8305 18.9155 13.1796 18.2294 13.5197 17.5417C13.8602 16.8532 14.1915 16.1633 14.5627 15.5485C15.3051 14.3187 16.1997 13.4013 17.6277 13.4013V13.3254ZM23.0683 19.5266C22.6558 18.9212 22.2955 18.2329 21.9404 17.5391C21.5857 16.846 21.2362 16.1471 20.8462 15.5242C20.0665 14.2785 19.1183 13.3254 17.6277 13.3254V13.4013C19.0779 13.4013 20.0063 14.3254 20.7819 15.5645C21.1697 16.1839 21.5175 16.8793 21.8728 17.5736C22.2278 18.2672 22.5901 18.9595 23.0056 19.5693L23.0683 19.5266Z"
          fill="white"
        ></path>
        <path
          d="M32.5301 11.5714C32.5301 13.8951 31.9374 15.9971 30.9812 17.5169C30.0247 19.0372 28.708 19.9702 27.2599 19.9702C25.8118 19.9702 24.4951 19.0372 23.5386 17.5169C22.5823 15.9971 21.9897 13.8951 21.9897 11.5714C21.9897 9.24761 22.5823 7.14565 23.5386 5.62582C24.4951 4.1055 25.8118 3.17247 27.2599 3.17247C28.708 3.17247 30.0247 4.1055 30.9812 5.62582C31.9374 7.14565 32.5301 9.24761 32.5301 11.5714Z"
          fill="url(#paint1_linear_2003_2780)"
          stroke="white"
          stroke-width="0.0759003"
        ></path>
        <path
          d="M2.86606 11.4306C2.86606 9.10686 3.45874 7.00489 4.41496 5.48507C5.3715 3.96474 6.68816 3.03172 8.13629 3.03172C9.58441 3.03172 10.9011 3.96474 11.8576 5.48507C12.8138 7.00489 13.4065 9.10686 13.4065 11.4306C13.4065 13.7543 12.8138 15.8563 11.8576 17.3761C10.9011 18.8965 9.58441 19.8295 8.13629 19.8295C6.68816 19.8295 5.3715 18.8965 4.41496 17.3761C3.45874 15.8563 2.86606 13.7543 2.86606 11.4306Z"
          fill="url(#paint2_linear_2003_2780)"
          stroke="white"
          stroke-width="0.0759003"
        ></path>
        <path
          d="M30.0693 11.6067C30.0693 13.2413 29.6575 14.7194 28.9939 15.7876C28.3299 16.8563 27.4174 17.5097 26.4161 17.5097C25.4147 17.5097 24.5023 16.8563 23.8383 15.7876C23.1746 14.7194 22.7629 13.2413 22.7629 11.6067C22.7629 9.9721 23.1746 8.49404 23.8383 7.42586C24.5023 6.35711 25.4147 5.70372 26.4161 5.70372C27.4174 5.70372 28.3299 6.35711 28.9939 7.42586C29.6575 8.49404 30.0693 9.9721 30.0693 11.6067Z"
          fill="url(#paint3_linear_2003_2780)"
          stroke="white"
          stroke-width="0.0759003"
        ></path>
        <path
          d="M5.32711 11.396C5.32711 9.76137 5.73884 8.28331 6.4025 7.21513C7.06651 6.14639 7.97892 5.49299 8.98027 5.49299C9.98163 5.493 10.894 6.14639 11.5581 7.21513C12.2217 8.28331 12.6334 9.76137 12.6334 11.396C12.6334 13.0306 12.2217 14.5086 11.558 15.5768C10.894 16.6456 9.98163 17.299 8.98027 17.299C7.97892 17.299 7.06651 16.6456 6.4025 15.5768C5.73883 14.5086 5.32711 13.0306 5.32711 11.396Z"
          fill="url(#paint4_linear_2003_2780)"
          stroke="white"
          stroke-width="0.0759003"
        ></path>
        <path
          d="M27.6789 11.6065C27.6789 12.6004 27.4285 13.4985 27.0256 14.1468C26.6224 14.7957 26.0703 15.1894 25.467 15.1894C24.8636 15.1894 24.3115 14.7957 23.9084 14.1468C23.5055 13.4985 23.2551 12.6004 23.2551 11.6065C23.2551 10.6126 23.5055 9.71458 23.9084 9.06626C24.3115 8.41737 24.8636 8.02367 25.467 8.02367C26.0703 8.02367 26.6224 8.41737 27.0256 9.06626C27.4285 9.71458 27.6789 10.6126 27.6789 11.6065Z"
          fill="url(#paint5_linear_2003_2780)"
          stroke="white"
          stroke-width="0.0759003"
        ></path>
        <path
          d="M7.71751 11.3953C7.71751 10.4014 7.96791 9.50336 8.37075 8.85504C8.77394 8.20615 9.32602 7.81245 9.92938 7.81245C10.5327 7.81245 11.0848 8.20615 11.488 8.85504C11.8908 9.50336 12.1412 10.4014 12.1412 11.3953C12.1412 12.3892 11.8908 13.2873 11.488 13.9356C11.0848 14.5845 10.5327 14.9782 9.92938 14.9782C9.32602 14.9782 8.77394 14.5845 8.37075 13.9356C7.96791 13.2873 7.71751 12.3892 7.71751 11.3953Z"
          fill="url(#paint6_linear_2003_2780)"
          stroke="white"
          stroke-width="0.0759003"
        ></path>
        <path
          d="M19.6958 12.1289C19.4803 12.1263 19.2712 12.128 19.0691 12.1337C19.1023 12.1368 19.1354 12.14 19.1684 12.1434C19.353 12.1568 19.5906 12.1858 19.8536 12.241C21.1156 12.4746 22.0953 12.9736 22.7669 13.6825C22.0493 12.9852 21.1126 12.5042 19.9679 12.2663C19.7114 12.213 19.4444 12.1719 19.1671 12.1433C19.1346 12.1399 19.1019 12.1367 19.0691 12.1337C19.2706 12.1203 19.4799 12.1188 19.6958 12.1289Z"
          fill="url(#paint7_linear_2003_2780)"
        ></path>
        <path
          d="M24.7288 1.658C25.3616 3.94298 25.2139 9.61675 21.2486 10.5167M21.2486 10.5167C25.2139 9.61675 28.1387 4.39997 28.1387 0.673706M21.2486 10.5167C25.2139 9.61675 29.5097 7.21225 31.4783 2.60715M21.2486 10.5167C24.9397 10.2706 29.0878 9.95422 33.7281 6.79041M21.2486 11.3252C24.9397 11.0791 28.4199 11.4307 34.3608 12.3095M19.0691 12.1337C22.7953 12.0283 28.9121 13.2938 33.2711 17.4068M19.0691 12.1337C22.7602 11.8877 29.0527 15.6491 30.6346 21.2033M19.0691 12.1337C23.3226 12.3095 27.4356 16.7037 27.4356 22.3634M19.0691 12.1337C23.3226 12.5241 25.1925 15.8143 24.2434 20.9503M19.0691 12.1337C23.3226 12.5241 24.9152 15.5681 23.0848 19.6107M18.9285 12.1337C19.7852 12.1337 23.9631 12.6353 21.8539 17.2755"
          stroke="white"
          stroke-width="0.0759003"
        ></path>
        <path
          d="M15.7009 10.8728C15.9164 10.8755 16.1254 10.8739 16.3272 10.8682C16.2993 10.8657 16.2715 10.863 16.2437 10.8602C16.0254 10.846 15.729 10.8105 15.4032 10.7349C14.1299 10.478 13.1593 9.94966 12.5166 9.20511C13.2068 9.92448 14.1171 10.4292 15.2377 10.6936C15.5564 10.7688 15.8922 10.8245 16.2447 10.8603C16.2721 10.863 16.2996 10.8657 16.3272 10.8682C16.1258 10.8816 15.9167 10.883 15.7009 10.8728Z"
          fill="url(#paint8_linear_2003_2780)"
        ></path>
        <path
          d="M10.6675 21.3088C10.0348 19.0238 10.1824 13.3852 14.1477 12.4853M14.1477 12.4853C10.1824 13.3852 7.25763 18.602 7.25763 22.3282M14.1477 12.4853C10.1824 13.3852 5.88664 15.7897 3.91805 20.3948M14.1477 12.4853C10.4566 12.7313 6.30848 13.0477 1.66823 16.2115M14.1477 11.6767C10.4566 11.9228 6.9764 11.5713 1.03546 10.6924M16.3272 10.8682C12.601 10.9737 6.4491 9.673 2.09007 5.56004M16.3272 10.8682C12.6361 11.1143 6.32915 7.31625 4.74724 1.762M16.3272 10.8682C12.0737 10.6924 7.95135 6.26317 7.95135 0.603459M16.3272 10.8682C12.0737 10.4779 10.2244 7.20579 11.1736 2.06974M16.3272 10.8682C12.0737 10.4779 10.5199 7.50627 12.3502 3.46362M16.4678 10.8682C15.6111 10.8682 11.4357 10.4029 13.545 5.76261"
          stroke="white"
          stroke-width="0.0759003"
        ></path>
        <g filter="url(#filter0_f_2003_2780)">
          <ellipse
            cx="18.155"
            cy="11.3601"
            rx="10.8273"
            ry="2.17951"
            fill="white"
          ></ellipse>
        </g>
        <g filter="url(#filter1_f_2003_2780)">
          <ellipse
            cx="17.8037"
            cy="11.1218"
            rx="7.24161"
            ry="1.89829"
            fill="white"
          ></ellipse>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_2003_2780"
          x="3.53275"
          y="5.38553"
          width="29.2446"
          height="11.949"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="1.89751"
            result="effect1_foregroundBlur_2003_2780"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter1_f_2003_2780"
          x="9.42357"
          y="8.08501"
          width="16.7602"
          height="6.07364"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="0.569252"
            result="effect1_foregroundBlur_2003_2780"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_2003_2780"
          x1="17.6981"
          y1="0.602417"
          x2="17.6981"
          y2="22.3976"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3D249A"></stop>
          <stop offset="0.225069" stop-color="#5A2DE7"></stop>
          <stop offset="0.540069" stop-color="#9FB0F5"></stop>
          <stop offset="0.790069" stop-color="#5A2DE7"></stop>
          <stop offset="0.985069" stop-color="#3D249A"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_2003_2780"
          x1="27.2599"
          y1="3.13452"
          x2="27.2599"
          y2="20.0082"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3D249A"></stop>
          <stop offset="0.225069" stop-color="#5A2DE7"></stop>
          <stop offset="0.540069" stop-color="#9FB0F5"></stop>
          <stop offset="0.790069" stop-color="#5A2DE7"></stop>
          <stop offset="0.985069" stop-color="#3D249A"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_2003_2780"
          x1="8.13629"
          y1="19.8674"
          x2="8.13629"
          y2="2.99377"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3D249A"></stop>
          <stop offset="0.225069" stop-color="#5A2DE7"></stop>
          <stop offset="0.540069" stop-color="#9FB0F5"></stop>
          <stop offset="0.790069" stop-color="#5A2DE7"></stop>
          <stop offset="0.985069" stop-color="#3D249A"></stop>
        </linearGradient>
        <linearGradient
          id="paint3_linear_2003_2780"
          x1="26.4161"
          y1="5.66577"
          x2="26.4161"
          y2="17.5476"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3D249A"></stop>
          <stop offset="0.225069" stop-color="#5A2DE7"></stop>
          <stop offset="0.540069" stop-color="#9FB0F5"></stop>
          <stop offset="0.790069" stop-color="#5A2DE7"></stop>
          <stop offset="0.985069" stop-color="#3D249A"></stop>
        </linearGradient>
        <linearGradient
          id="paint4_linear_2003_2780"
          x1="8.98027"
          y1="17.3369"
          x2="8.98027"
          y2="5.45504"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3D249A"></stop>
          <stop offset="0.225069" stop-color="#5A2DE7"></stop>
          <stop offset="0.540069" stop-color="#9FB0F5"></stop>
          <stop offset="0.790069" stop-color="#5A2DE7"></stop>
          <stop offset="0.985069" stop-color="#3D249A"></stop>
        </linearGradient>
        <linearGradient
          id="paint5_linear_2003_2780"
          x1="25.467"
          y1="7.98572"
          x2="25.467"
          y2="15.2273"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3D249A"></stop>
          <stop offset="0.225069" stop-color="#5A2DE7"></stop>
          <stop offset="0.540069" stop-color="#9FB0F5"></stop>
          <stop offset="0.790069" stop-color="#5A2DE7"></stop>
          <stop offset="0.985069" stop-color="#3D249A"></stop>
        </linearGradient>
        <linearGradient
          id="paint6_linear_2003_2780"
          x1="9.92938"
          y1="15.0161"
          x2="9.92938"
          y2="7.7745"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3D249A"></stop>
          <stop offset="0.225069" stop-color="#5A2DE7"></stop>
          <stop offset="0.540069" stop-color="#9FB0F5"></stop>
          <stop offset="0.790069" stop-color="#5A2DE7"></stop>
          <stop offset="0.985069" stop-color="#3D249A"></stop>
        </linearGradient>
        <linearGradient
          id="paint7_linear_2003_2780"
          x1="26.6447"
          y1="0.603399"
          x2="26.6447"
          y2="22.3634"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3D249A"></stop>
          <stop offset="0.225069" stop-color="#5A2DE7"></stop>
          <stop offset="0.540069" stop-color="#9FB0F5"></stop>
          <stop offset="0.790069" stop-color="#5A2DE7"></stop>
          <stop offset="0.985069" stop-color="#3D249A"></stop>
        </linearGradient>
        <linearGradient
          id="paint8_linear_2003_2780"
          x1="8.75165"
          y1="22.3986"
          x2="8.75165"
          y2="0.638559"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3D249A"></stop>
          <stop offset="0.225069" stop-color="#5A2DE7"></stop>
          <stop offset="0.540069" stop-color="#9FB0F5"></stop>
          <stop offset="0.790069" stop-color="#5A2DE7"></stop>
          <stop offset="0.985069" stop-color="#3D249A"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
