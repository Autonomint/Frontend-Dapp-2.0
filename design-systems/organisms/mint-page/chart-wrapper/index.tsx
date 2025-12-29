import cryptoEth from "@/app/assets/eth.png";
import WeETH from "@/app/assets/weETH-icoon.webp";
import WsuperOETHIcon from "@/app/assets/Wrapped_Super_OETH.webp";
import cbBTC from "@/app/assets/cbbtc.webp";
import WrsETH from "@/app/assets/WrsETH-icon.png";
import Spinner from "@/design-systems/atoms/Spinner";
import { Typography } from "@/design-systems/atoms/Typography";
import { useGetTokenReward } from "@/hookes/api-hooks/useGetTokenReward";
import { assetNameForRewardDataBorrow } from "@/utils/constants";
import { getIconMapping, useTokenConfig } from "@/utils/token-config";
import { CircleFadingPlus } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useWalletClient } from "wagmi";
function TradingViewWidget({ currency }: { currency: string }) {
  const container = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Function to get the token symbol for the chart
  // The symbol is copied from trading view widget config website page
  const getTokenSymbol = () => {
    switch (currency) {
      case "ETH":
        return ["BINANCE:ETHUSD|1D"];
      case "wrsETH":
        return ["CRYPTO:RSETHUSD|1D"];
      case "weETH":
        return ["CRYPTO:WEETHUSD|1D"];
      case "wsuperOETHb":
        return ["CRYPTO:WSUPEROETHUSD|1D"];
      case "cbBTC":
        return ["CRYPTO:CBBTCCUSD|1D"];
      case "KRWQ":
        return ["UPBIT:USDTKRW|1D"];
      default:
        return ["BINANCE:ETHUSD|1D"];
    }
  };
  console.log(getTokenSymbol(), "getTokenSymbol");
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;

    // Define the widget configuration
    const widgetConfig = {
      symbols: [getTokenSymbol()],
      chartOnly: true,
      width: "100%",
      height: "100%",
      locale: "en",
      colorTheme:
        theme === "dark"
          ? "dark"
          : theme === "light"
          ? "light"
          : prefersDarkMode
          ? "dark"
          : "light",
      autosize: true,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scaleMode: "Normal",
      borderWidth: 0,
      scalePosition: "left",
      backgroundColor:
        theme === "dark"
          ? "black"
          : theme === "light"
          ? "white"
          : prefersDarkMode
          ? "black"
          : "white",

      fontFamily:
        "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      fontSize: "10",
      noTimeScale: false,
      valuesTracking: "1",
      changeMode: "price-and-percent",
      chartType: "area",
      maLineColor: "#2962FF",
      maLineWidth: 1,
      maLength: 9,
      headerFontSize: "medium",
      gridLineColor: "rgb(255 255 255 / 0%)",
      borderColor: "red",
      lineWidth: 2,
      lineType: 0,
      dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      lineColor:
        theme === "dark"
          ? "rgba(0, 120, 185, 1 )"
          : theme === "light"
          ? "rgba(0, 103, 159, 1)"
          : prefersDarkMode
          ? "rgba(0, 120, 185, 1 )"
          : "rgba(0, 103, 159, 1)",
      topColor:
        theme === "dark"
          ? "rgba(0, 42, 78, 1)"
          : theme === "light"
          ? "rgba(229, 243, 255, 1)"
          : prefersDarkMode
          ? "rgba(0, 42, 78, 1)"
          : "rgba(229, 243, 255, 1)",
      bottomColor:
        theme === "dark"
          ? "rgba(0, 42, 78, 0)"
          : theme === "light"
          ? "rgba(255, 253, 228, 1)"
          : prefersDarkMode
          ? "rgba(0, 42, 78, 0)"
          : "rgba(255, 253, 228, 1)",
    };

    // Pass the widget configuration as JSON
    script.innerHTML = JSON.stringify(widgetConfig);
    // Append script to container
    if (container?.current && container !== undefined) {
      const element = container?.current?.querySelector(
        ".tv-widget-chart--with-border"
      );
      if (element) {
        (element as HTMLElement).style.border = "none";
      }
      while (container?.current?.firstChild) {
        container.current.removeChild(container?.current?.firstChild);
      }
    }
    container.current?.appendChild(script);
  }, [theme]); // Re-run effect when `theme` changes

  return <div className="tradingview-widget-container " ref={container}></div>;
}

function ChartComponent({ currency }: { currency: string }) {
  // Loading state for adding token to wallet
  const [isAddingToken, setIsAddingToken] = useState<boolean>(false);

  const getTokenSymbolIcon = () => {
    switch (currency) {
      case "ETH":
        return cryptoEth;
      case "wrsETH":
        return WrsETH;
      case "weETH":
        return WeETH;
      case "wsuperOETHb":
        return WsuperOETHIcon;
      case "cbBTC":
        return cbBTC;
      case "KRWQ":
        return getIconMapping("dark", "KRWQ");
      default:
        return cryptoEth;
    }
  };

  // Wallet client for adding token to wallet
  const { data: walletClient } = useWalletClient();

  // Token config for adding token to wallet based on the selected token
  const tokenConfig = useTokenConfig(currency);

  // Function to add token to wallet
  const handleAddToken = async () => {
    if (!walletClient) return console.error("Wallet client not available");
    setIsAddingToken(true);
    try {
      const wasAdded = await walletClient.request({
        method: "wallet_watchAsset",
        params: tokenConfig,
      });

      if (wasAdded) {
        toast.success("✅ Token added successfully");
      } else {
        toast.error("❌ Token was not added");
      }
      setIsAddingToken(false);
    } catch (error) {
      setIsAddingToken(false);
      console.error("Error adding token:", error);
    }
  };

  return (
    <div className="lg:p-6 p-2 h-full">
      <div className="hidden  md:flex justify-start gap-2 mb-2 items-center">
        <Image src={getTokenSymbolIcon()} width={40} height={40} alt="eth" />
        <Typography className="text-[32px] dark:text-white font-medium text-black ">
          {currency}
        </Typography>

        {currency !== "ETH" && (
          <div className="flex gap-2 items-center">
            <div onClick={handleAddToken} className="cursor-pointer">
              {isAddingToken ? (
                <Spinner />
              ) : (
                <CircleFadingPlus className="stroke-black dark:stroke-white " />
              )}
            </div>
            <div className="text-md text-grayLight">Add token to wallet</div>
          </div>
        )}

        {/* {!!tokenRewardDetail?.defaultBooster &&
          calculateRemainingTimeDate(
            new Date(tokenRewardDetail.boosterValidity * 1000).toISOString()
          ).minutes > 0 && (
            <div className="badge mt-1 pulsate w-fit  text-[14px] flex justify-center items-center rounded-full border-[2px] border-green-500 font-bold text-green-600 dark:text-green-400 bg-[#22c55e96] px-1 py-[2px]">
              {tokenRewardDetail.defaultBooster}x Points
            </div>
          )} */}
      </div>

      <div className="w-full h-[262px] md:h-[310px] lg:h-[560px] flex items-center justify-center">
        {currency.toLocaleLowerCase() == "wsuperoethb" ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-grayLight text-lg">Chart Not Available</p>
          </div>
        ) : (
          <TradingViewWidget currency={currency} />
        )}
      </div>
    </div>
  );
}

export default ChartComponent;
