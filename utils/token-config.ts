import AEROIcon from "@/app/assets/aero-icon.png";
import OPIcon from "@/app/assets/optimism.png";
import USDaIcon from "@/app/assets/logo.svg";
import USDaIconGreen from "@/app/assets/brand-logo-small-green.svg";
import UsdtIcon from "@/app/assets/cryptocurrency-color_usdt.svg";
import cryptoEth from "@/app/assets/eth.png";
import UsdcIcon from "@/app/assets/usdc.svg";
import cbBTC from "@/app/assets/cbbtc.webp";
import WeETH from "@/app/assets/weETH-icoon.webp";
import boldIcon from "@/app/assets/bold-logo.svg";
import wBLT from "@/app/assets/wBLT.svg";
import KRWQ from "@/app/assets/krwq-logo.svg";
import EURC from "@/app/assets/euro-coin-2.png";
import LITIcon from "@/app/assets/lit.png";
import {
  boldTokenAddress,
  nativeTokenAddress,
  rsETHAddress,
  testusdtAbiAddress,
  usDaAddress,
  usdcAddress,
  weETHAddress,
  wrsETHAddress,
  wsuperOETHAddress,
} from "@/blockchain/contracts";
import { useMemo } from "react";
import { StaticImageData } from "next/image";
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

export interface CoveredCallAsset {
  ticker: string;
  name: string;
  type: "covered call";
  maxApr: number;
  minApr: number;
  multipliers: string[];
  logo?: string | StaticImageData;
  spotPrice?: string;
  priceChange?: string;
  openInterestValue?: string;
  openInterestContracts?: string;
  chipLabel?: string;
  hasCall?: boolean; // Declares if call options are supported for this asset
  hasPut?: boolean;  // Declares if put options are supported for this asset
}

export const coveredCallAssets: CoveredCallAsset[] = [
  {
    ticker: "LAB",
    name: "Token unlock catalyst",
    type: "covered call",
    maxApr: 150,
    minApr: 10,
    multipliers: ["+1x Pyth", "+1x Base"],
    logo: "https://s3.coinmarketcap.com/static-gravity/image/92fb96b0f0ac4efc85d76156053e7096.png",
    spotPrice: "10.00",
    priceChange: "+0.00%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    chipLabel: "Crypto",
    hasCall: false,
    hasPut: true,
  },
  {
    ticker: "ETH",
    name: "Ethereum",
    type: "covered call",
    maxApr: 92.4,
    minApr: 5.1,
    multipliers: ["+1x Pyth", "+1x Base"],
    logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    spotPrice: "3,120.00",
    priceChange: "+1.15%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    chipLabel: "Crypto",
    hasCall: true,
    hasPut: true,
  },
  {
    ticker: "BTC",
    name: "Bitcoin",
    type: "covered call",
    maxApr: 82.1,
    minApr: 4.5,
    multipliers: ["+1x Pyth", "+1x Base"],
    logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    spotPrice: "64,250.00",
    priceChange: "+0.85%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    chipLabel: "Crypto",
    hasCall: true,
    hasPut: true,
  },
  {
    ticker: "LIT",
    name: "Lighter",
    type: "covered call",
    maxApr: 115.6,
    minApr: 7.8,
    multipliers: ["+1x Pyth"],
    logo: LITIcon,
    spotPrice: "1.25",
    priceChange: "+4.12%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    chipLabel: "Crypto",
    hasCall: true,
    hasPut: false,
  },
  {
    ticker: "NVDAc",
    name: "Nvidia AI",
    type: "covered call",
    maxApr: 142.6,
    minApr: 8.4,
    multipliers: ["+2x Pyth", "+1x Base"],
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v11/icons/nvidia.svg", // Real NVIDIA logo
    spotPrice: "904.12",
    priceChange: "+2.45%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    hasCall: true,
    hasPut: false,
  },
  {
    ticker: "TSLA",
    name: "Tesla EV",
    type: "covered call",
    maxApr: 128.1,
    minApr: 6.9,
    multipliers: ["+1x Pyth"],
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v11/icons/tesla.svg", // Real Tesla logo
    spotPrice: "174.60",
    priceChange: "-1.12%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    hasCall: true,
    hasPut: false,
  },
  {
    ticker: "SMR",
    name: "NuScale nuclear",
    type: "covered call",
    maxApr: 186.3,
    minApr: 11.2,
    multipliers: ["+3x Energy", "+1x Pyth"],
    logo: "https://s3-symbol-logo.tradingview.com/nuscale-power--600.png", // Official NuScale Power logo
    spotPrice: "5.42",
    priceChange: "+5.67%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    hasCall: true,
    hasPut: false,
  },
  {
    ticker: "PLTR",
    name: "Palantir data",
    type: "covered call",
    maxApr: 104.8,
    minApr: 5.7,
    multipliers: ["+1x Pyth"],
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v11/icons/palantir.svg", // Real Palantir logo
    spotPrice: "23.15",
    priceChange: "+0.85%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    hasCall: true,
    hasPut: false,
  },
  {
    ticker: "COIN",
    name: "Coinbase exchange",
    type: "covered call",
    maxApr: 156.8,
    minApr: 9.3,
    multipliers: ["+2x Crypto", "+1x Pyth"],
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v11/icons/coinbase.svg", // Real Coinbase logo
    spotPrice: "245.30",
    priceChange: "+1.78%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    hasCall: true,
    hasPut: false,
  },
  {
    ticker: "MSTR",
    name: "MicroStrategy BTC proxy",
    type: "covered call",
    maxApr: 211.4,
    minApr: 14.1,
    multipliers: ["+2x Vol", "+1x Pyth"],
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v11/icons/microstrategy.svg", // Real MicroStrategy logo
    spotPrice: "1,520.10",
    priceChange: "+3.21%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    hasCall: true,
    hasPut: false,
  },
  {
    ticker: "AAPL",
    name: "Apple consumer tech",
    type: "covered call",
    maxApr: 42.7,
    minApr: 2.8,
    multipliers: ["+1x Pyth"],
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v11/icons/apple.svg", // Real Apple logo
    spotPrice: "183.05",
    priceChange: "-0.45%",
    openInterestValue: "< $100k",
    openInterestContracts: "< 100 contracts",
    hasCall: true,
    hasPut: false,
  },
];
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
      case "bold":
        return {
          type: "ERC20",
          options: {
            address: boldTokenAddress[chainId as keyof typeof boldTokenAddress],
            symbol: "bold",
            decimals: 18,
            // image: "https://yourdomain.com/token-image.png",
          },
        };
      case "usdc":
        return {
          type: "ERC20",
          options: {
            address: usdcAddress[chainId as keyof typeof usdcAddress],
            symbol: "USDC",
            decimals: 6,
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
  }, [chainId, tokenNameLowerCase]);

  return tokenConfig;
};

export const getIconMapping = (theme: string, token: string) => {
  const mapping = {
    "usda+": theme === "dark" ? USDaIconGreen : USDaIcon,
    "usda": theme === "dark" ? USDaIconGreen : USDaIcon,
    usdt: UsdtIcon,
    aero: AEROIcon,
    op: OPIcon,
    bold: boldIcon,
    boldToken: boldIcon,
    usdc: UsdcIcon,
    wmUSD: undefined,
    cbBTC: cbBTC,
    wBLT: wBLT,
    WBLT: wBLT,
    wblt: wBLT,
    KRWQ: KRWQ,
    krwq: KRWQ,
    EURC: EURC,
    eurc: EURC,
  };
  return mapping[token as keyof typeof mapping];
};
