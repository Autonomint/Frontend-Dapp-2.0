import { Typography } from "@/design-systems/atoms/Typography";
import useMarketChart from "@/hookes/api-hooks/useGetChartData";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import cryptoEth from "@/app/assets/eth.png";
import WeETH from "@/app/assets/weETH-icoon.webp";
import WrsETH from "@/app/assets/WrsETH-icon.png";
function TradingViewWidget({ currency }: { currency: string }) {
  const container = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const getTokenSymbol = () => {
    switch (currency) {
      case "ETH":
        return ["BINANCE:ETHUSD|1D"];
      case "wrsETH":
        return ["UNISWAP:RSETHWETH_94B78E.USD|1D"];
      case "weETH":
        return ["CRYPTO:WEETHUSD|1D"];

      default:
        return ["BINANCE:ETHUSD|1D"];
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    console.log(getTokenSymbol(), "getTokenSymbol()");

    // Define the widget configuration
    const widgetConfig = {
      symbols: [getTokenSymbol()],
      chartOnly: true,
      width: "100%",
      height: "100%",
      locale: "en",
      colorTheme: theme === "dark" ? "dark" : "light", // Adjust theme here
      autosize: true,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scaleMode: "Normal",
      borderWidth: 0,
      scalePosition: "left",
      backgroundColor: theme === "dark" ? "black" : "white",
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
        theme === "dark" ? "rgba(0, 120, 185, 1 )" : "rgba(0, 103, 159, 1)",
      topColor:
        theme === "dark" ? "rgba(0, 42, 78, 1)" : "rgba(229, 243, 255, 1)",
      bottomColor:
        theme === "dark" ? "rgba(0, 42, 78, 0)" : "rgba(255, 253, 228, 1)",
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
  const getTokenSymbolIcon = () => {
    switch (currency) {
      case "ETH":
        return cryptoEth;
      case "wrsETH":
        return WrsETH;
      case "weETH":
        return WeETH;

      default:
        return cryptoEth;
    }
  };
  return (
    <div className="lg:p-6 p-2 h-full">
      <div className="hidden  md:flex justify-start gap-2 mb-2 items-center">
        <Image src={getTokenSymbolIcon()} width={40} height={40} alt="eth" />
        <Typography className="text-[32px] dark:text-white font-medium text-black ">
          {currency}
        </Typography>
      </div>
      <div className="w-full h-[262px] md:h-[310px] lg:h-[560px] flex items-center justify-center">
        <TradingViewWidget currency={currency} />
      </div>
    </div>
  );
}

export default ChartComponent;
