import AEROIcon from "@/app/assets/aero-icon.png";
import OPIcon from "@/app/assets/optimism.png";
import USDaIcon from "@/app/assets/logo.svg";
import USDaIconGreen from "@/app/assets/brand-logo-small-green.svg";
import UsdtIcon from "@/app/assets/cryptocurrency-color_usdt.svg";
import {
  nativeTokenAddress,
  rsETHAddress,
  testusdtAbiAddress,
  usDaAddress,
  weETHAddress,
  wrsETHAddress,
  wsuperOETHAddress,
} from "@/blockchain/contracts";
import { useMemo } from "react";
import { useAccount } from "wagmi";

export interface TokenConfig {
  type: "ERC20";
  options: {
    address: string;
    symbol: string;
    decimals: number;
    // image: string;
  };
}
/**
 * React hook to retrieve and manage token configuration for a given token name.
 *
 * @param tokenName - The name of the token to retrieve configuration for.
 * @returns Object containing the token configuration.
 */
export const useTokenConfig = (tokenName: string): TokenConfig => {
  const { chainId } = useAccount();
  const tokenNameLowerCase = tokenName.toLocaleLowerCase();
  const tokenConfig: TokenConfig = useMemo(() => {
    switch (tokenNameLowerCase) {
      case "weth":
        return {
          type: "ERC20",
          options: {
            address: weETHAddress[chainId as keyof typeof weETHAddress],
            symbol: "WETH",
            decimals: 18,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
      case "wrseth":
        return {
          type: "ERC20",
          options: {
            address: wrsETHAddress[chainId as keyof typeof wrsETHAddress],
            symbol: "WrsETH",
            decimals: 18,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
      case "eseth":
        return {
          type: "ERC20",
          options: {
            address: rsETHAddress[chainId as keyof typeof rsETHAddress],
            symbol: "rsETH",
            decimals: 18,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
      case "usda+":
        return {
          type: "ERC20",
          options: {
            address: usDaAddress[chainId as keyof typeof usDaAddress],
            symbol: "USDa",
            decimals: 6,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
      case "usdt":
        return {
          type: "ERC20",
          options: {
            address:
              testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
            symbol: "USDT",
            decimals: 6,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
      case "aero":
        return {
          type: "ERC20",
          options: {
            address:
              nativeTokenAddress[chainId as keyof typeof nativeTokenAddress],
            symbol: "AERO",
            decimals: 18,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
      case "op":
        return {
          type: "ERC20",
          options: {
            address:
              nativeTokenAddress[chainId as keyof typeof nativeTokenAddress],
            symbol: "OP",
            decimals: 18,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
      case "wsuperoethb":
        return {
          type: "ERC20",
          options: {
            address:
              wsuperOETHAddress[chainId as keyof typeof wsuperOETHAddress],
            symbol: "wsuperOETH",
            decimals: 18,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
      default:
        return {
          type: "ERC20",
          options: {
            address: weETHAddress[chainId as keyof typeof weETHAddress],
            symbol: "WeETH",
            decimals: 18,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
    }
  }, []);

  return tokenConfig;
};

export const getIconMapping = (theme: string, token: string) => {
  const mapping = {
    usda: theme === "dark"  ? USDaIconGreen : USDaIcon,
    usdt: UsdtIcon,
    aero: AEROIcon,
    op: OPIcon,
  };
  return mapping[token as keyof typeof mapping];
};
