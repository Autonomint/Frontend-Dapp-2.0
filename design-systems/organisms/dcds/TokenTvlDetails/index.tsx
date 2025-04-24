import { useTheme } from "next-themes";
import Image from "next/image";

function TokenTvlDetails({
  tokenName,
  tvl,
  icon,
}: {
  icon: any;
  tokenName: string;
  tvl: string;
}) {
  const { theme } = useTheme();

  return (
    <div className="bg-gradient-to-b from-[#E5F3FF] to-[#E5F3FF] p-8 flex justify-between border border-solid border-grayLight border-b-0 dark:bg-none">
      <div className="flex flex-row lg:flex-col gap-8">
        {tokenName === "USDA+" && theme === "dark" ? (
          <svg
            width="40"
            height="40"
            viewBox="0 0 116 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.810303 148.719C38.9786 148.719 76.8445 148.719 115.024 148.719L65.9478 44.6173H50.0351L0.810303 148.719Z"
              fill="#A1FFCE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M56.5213 164.938L21.8298 147.89L56.9204 92.5617L91.5122 147.99L56.5213 164.938Z"
              fill="black"
            />
            <path
              d="M56.0358 165.933L20.2322 148.338L56.9281 90.4804L93.1056 148.451C80.9089 154.354 68.7107 160.254 56.5209 166.172L56.0358 165.933ZM23.4276 147.444L56.523 163.708L89.9189 147.532L56.9148 94.646L23.4276 147.444Z"
              fill="#A1FFCE"
            />
            <path
              d="M55.51 164.938V93.0525H57.7312V164.938H55.51Z"
              fill="#A1FFCE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.9812 158.322L56.6198 200L90.36 160.025L56.6198 175.533L22.9812 158.322Z"
              fill="#A1FFCE"
            />
            <path
              d="M21.3621 146.901L56.1528 130.545L57.0902 132.55L22.2992 148.906L21.3621 146.901Z"
              fill="#A1FFCE"
            />
            <path
              d="M90.9431 148.906L56.1516 132.55L57.089 130.545L91.8806 146.901L90.9431 148.906Z"
              fill="#A1FFCE"
            />
          </svg>
        ) : (
          <Image src={icon} alt="token" width={32} height={32} />
        )}
        <span className="text-[24px] text-textBlack dark:text-white">
          {tokenName}
        </span>
      </div>
      <div className="flex flex-row-reverse items-center lg:flex-col gap-8">
        <span className="text-[18px] font-normal text-right text-grayLight dark:text-white">
          TVL
        </span>
        <span className="text-[24px] font-medium text-textBlack dark:text-white">
          {tvl}
        </span>
      </div>
    </div>
  );
}

export default TokenTvlDetails;
