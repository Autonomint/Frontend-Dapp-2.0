import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChartFilter } from "./interface";
import { WheelEvent } from "react";
import { parseUnits, zeroAddress } from "viem";
import { AssetDetails } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortWalletAddress = (walletAddress: string | undefined) => {
  return walletAddress
    ? walletAddress.substring(0, 5) +
    "..." +
    walletAddress.substring(walletAddress.length - 4)
    : "";
};

function displayNumberWithPrecision(number: string): string {
  const parsedNumber = parseFloat(number);
  if (isNaN(parsedNumber)) {
    return "Invalid Number";
  }
  return parsedNumber.toFixed(2);
}
export default displayNumberWithPrecision;

export function daysFromTimestamp(timestamp: number): number {
  const now = Date.now(); // Current time in milliseconds
  const timestampInMilliseconds = timestamp * 1000; // Convert seconds to milliseconds
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const differenceInMilliseconds = now - timestampInMilliseconds;

  return Math.floor(differenceInMilliseconds / millisecondsPerDay);
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate.replace(/,/g, " • "); // Replace comma with bullet point
}

type PriceData = [number, number]; // [timestamp, price]

interface MonthlyPrice {
  month: string; // Format: 'MMM-YYYY'
  averagePrice: number;
}

export function extractMonthlyPrices(data: PriceData[]): MonthlyPrice[] {
  // Helper function to format timestamp to 'MMM-YYYY'
  const formatMonth = (timestamp: number): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

  // Get the current date and the date 12 months ago
  const currentDate = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

  // Filter data to include only entries within the last 12 months
  const filteredData = data.filter(([timestamp]) => {
    const date = new Date(timestamp);
    return date >= twelveMonthsAgo && date <= currentDate;
  });

  // Group prices by month
  const monthlyPrices: Record<string, number[]> = filteredData.reduce(
    (acc, [timestamp, price]) => {
      const month = formatMonth(timestamp);
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(price);
      return acc;
    },
    {} as Record<string, number[]>
  );

  // Calculate average price for each month
  return Object.entries(monthlyPrices).map(([month, prices]) => {
    const averagePrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;
    return { month, averagePrice };
  });
}

export function calculateTimeDifference(storedTime: string): string {
  if (!storedTime) {
    return "";
  }
  const storedTimeNumber = parseInt(storedTime);
  const currentTime = new Date().getTime();
  const difference = currentTime - storedTimeNumber;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let timeDiff = "";
  if (days > 0) {
    timeDiff = `${days} day(s) ago`;
  } else if (hours > 0) {
    timeDiff = `${hours} hour(s) ago`;
  } else if (minutes > 0) {
    timeDiff = `${minutes} minute(s) ago`;
  } else {
    timeDiff = `${seconds} second(s) ago`;
  }

  return timeDiff;
}

// Define the formatNumber function
export function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "k";
  } else {
    return num.toFixed(2);
  }
}

export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} minute(s) ${remainingSeconds} second(s)`;
}

export function calculateAverages(
  dailyValues: string[],
  filter: "allTime" | "365" | "183" | "30" | "10"
): { labels: string[]; averages: number[] } {
  const currentDate = new Date();
  let chunkSize: number;
  let labels: string[] = [];

  switch (filter) {
    case "allTime":
      // Group by years for "allTime"
      chunkSize = 365; // Approximate chunk size for one year
      labels = Array.from({ length: 12 }, (_, i) => {
        const year = new Date(currentDate);
        year.setFullYear(currentDate.getFullYear() - i);
        return year.getFullYear().toString();
      }).reverse(); // Latest year first
      break;

    case "365":
      // Divide by months for a total of 12 entries for 365 days
      chunkSize = Math.ceil(365 / 12); // Approximate days per month (~30.42 days)
      labels = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);
        return date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      }).reverse();
      break;

    case "183":
      // Divide by months for 6 months
      chunkSize = Math.ceil(183 / 6); // Approximate days per month
      labels = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);
        return date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      }).reverse();
      break;

    case "30":
      // Get the last 30 days from dailyValues
      dailyValues = dailyValues.slice(-30); // Take the last 30 values
      chunkSize = 1; // 1 day per entry
      labels = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }).reverse();
      break;

    case "10":
      // Divide by day names for 10-day filter
      dailyValues = dailyValues.slice(-10); // Take the last 10 values
      chunkSize = 1; // 1 day per entry
      labels = Array.from({ length: 10 }, (_, i) => {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        return date.toLocaleString("default", { weekday: "long" });
      }).reverse();
      break;

    default:
      throw new Error(
        "Invalid filter option. Use 'allTime', '365', '183', '30', or '10'."
      );
  }

  const averages: number[] = [];

  // Calculate averages for each chunk
  for (let i = 0; i < dailyValues.length; i += chunkSize) {
    const chunk = dailyValues.slice(i, i + chunkSize);
    const sum = chunk.reduce((acc, val) => acc + parseFloat(val), 0);
    const average = sum / chunk.length;
    averages.push(average);
  }

  // Add 0 for remaining entries in averages
  const totalChunks = labels.length;
  const dataChunks = averages.length;

  if (totalChunks > dataChunks) {
    const missingEntries = totalChunks - dataChunks;
    const zeros = Array(missingEntries).fill(0);
    averages.unshift(...zeros); // Add zeros at the beginning
  }

  return { labels, averages };
}

export const handleWheel = (
  event: React.WheelEvent<HTMLInputElement>
): void => {
  event.currentTarget.blur(); // Prevents changing the number value on scroll
};

export function generateEthOptionName(
  strikePrice: number,
  isCall: boolean
): string {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");

  const month = currentDate
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase(); // Correct way

  const year = currentDate.getFullYear().toString().slice(-2);
  const expiryDate = `${day}${month}${year}`;
  const optionType = isCall ? "C" : "P";

  return `ETH-${expiryDate}-${strikePrice}-${optionType}`;
}
// get strikePercent flag for smart contract

export function calculateEthAmount(
  currentEthPrice: number,
  usdAmount: number
): number {
  // Calculate the ETH amount based on the current price
  const ethAmount = usdAmount / currentEthPrice;
  return ethAmount;
}

export function calculateRemainingDays(timestamp: number): number {
  // Get the current timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Calculate the difference in seconds
  const timeDifferenceInSeconds = timestamp - currentTimestamp;

  // Convert the difference to days
  const remainingDays = Math.floor(timeDifferenceInSeconds / (24 * 60 * 60));

  return remainingDays > 0 ? remainingDays : 0; // Return 0 if the date has already passed
}

export function isRenewActiveDaysCompleted(
  timestamp: number,
  days?: number
): boolean {
  // Get the current timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Calculate the difference in seconds
  const timeDifferenceInSeconds = timestamp - currentTimestamp;

  // Convert days to seconds (15 days * 24 hours * 60 minutes * 60 seconds)
  const secondsIn15Days = (days || 15) * 24 * 60 * 60;

  // Check if days have passed
  return timeDifferenceInSeconds <= secondsIn15Days;
}

export function getDownsideProtectionTillNow(
  depositEthPrice: number,
  depositedAmount: number,
  currentEthPrice: number
): string {
  // Calculate the first part
  const result = (
    (depositEthPrice / 100) * depositedAmount -
    currentEthPrice
  ).toFixed(2);

  // Calculate the percentage
  const percentage = (
    ((depositEthPrice * depositedAmount - currentEthPrice) / currentEthPrice) *
    100
  ).toFixed(2);

  // Return the formatted string
  return `$${result} (${percentage}%)`;
}

export function calculateRemainingTimeDate(dateString: string) {
  // Convert the ISO date string to a timestamp in seconds
  const timestamp = Math.floor(new Date(dateString).getTime() / 1000);

  // Get the current timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Calculate the difference in seconds
  const timeDifferenceInSeconds = timestamp - currentTimestamp;

  // Calculate remaining days, hours, minutes, and seconds
  const days = Math.floor(timeDifferenceInSeconds / (24 * 60 * 60));
  const hours = Math.floor(
    (timeDifferenceInSeconds % (24 * 60 * 60)) / (60 * 60)
  );
  const minutes = Math.floor((timeDifferenceInSeconds % (60 * 60)) / 60);
  const seconds = timeDifferenceInSeconds % 60;

  // Build the formatted time string
  let formattedTime = "Valid till ";
  if (days > 0) formattedTime += `${days} day${days > 1 ? "s" : ""} `;
  if (hours > 0) formattedTime += `${hours} hour${hours > 1 ? "s" : ""} `;
  if (minutes > 0) formattedTime += `${minutes} min${minutes > 1 ? "s" : ""} `;
  if (seconds > 0 && days === 0)
    formattedTime += `${seconds} sec${seconds > 1 ? "s" : ""}`;

  // Return 0 for all values if the date has already passed
  return timeDifferenceInSeconds > 0
    ? { days, hours, minutes, seconds, formattedTime: formattedTime.trim() }
    : { days: 0, hours: 0, minutes: 0, seconds: 0, formattedTime: "0 days" };
}

export function getTotalDepositingAmount(
  getPrices: any,
  tokenAddress: any,
  tokenAmounts: any,
  assetDetails: any
) {
  let totalDepositingAmount = 0n;
  const prices = getPrices;
  for (let i = 0; i < tokenAmounts.length; i++) {
    if (tokenAddress[i] != zeroAddress) {
      totalDepositingAmount +=
        (BigInt(tokenAmounts[i]) *
          BigInt(prices[i + 1]) *
          BigInt(parseUnits(String(assetDetails[i].LTV), 6))) /
        (BigInt(assetDetails[i].tokenDecimals) *
          BigInt(assetDetails[i].priceDecimals) *
          BigInt(100));
    }
  }

  return Math.floor(Number(totalDepositingAmount));
}

export function hasFiveMinutesPassed(timestamp: number): boolean {
  const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
  const timestampInMs = timestamp * 1000; // Convert from seconds to milliseconds
  const now = Date.now(); // Current time in milliseconds
  return now - timestampInMs >= FIVE_MINUTES_IN_MS;
}

export function getMinutesPassed(timestamp: number): number {
  const timestampInMs = timestamp * 1000; // Convert from seconds to milliseconds
  const now = Date.now(); // Current time in milliseconds
  const diffInMs = now - timestampInMs;
  return Math.floor(diffInMs / (60 * 1000)); // Convert milliseconds to full minutes
}

// convert timestamp to local ISO string
export function toLocalISOString(date: any) {
  const pad = (n: any) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}.${String(date.getMilliseconds()).padStart(3, "0")}`;
}


// Check given days passed or not
export function hasDaysPassed(
  timestamp: number,
  daysInSeconds: number
): boolean {
  const timestampInMs = timestamp * 1000; // Convert input timestamp from seconds to milliseconds
  const durationInMs =
    String(daysInSeconds).length > 8 ? daysInSeconds : daysInSeconds * 1000; // Convert days (in seconds) to milliseconds
  const now = Date.now(); // Current time in milliseconds
  return now - timestampInMs >= durationInMs;
}

export function toPositiveDecimalString(value: string): string {
  const parsed = parseFloat(value);
  const decimals = value.split(".")[1]?.length || 0;

  // Handle zero or -0
  if (Object.is(parsed, 0) || Object.is(parsed, -0)) {
    return Math.abs(parsed).toFixed(decimals);
  }

  // If it's truly negative (e.g., -0.01), return original string
  if (parsed < 0) {
    return value;
  }

  // Positive values, return with original decimals
  return parsed.toFixed(decimals);
}

// truncate decimals
export function truncateDecimals(
  value: number | string,
  decimals: number
): string {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "0"; // handle invalid input

  const factor = Math.pow(10, decimals);
  const truncated = Math.trunc(num * factor) / factor;

  return truncated.toString();
}

// get strikePercent flag for smart contract
export function getStrikePercent(strikePrice: number): number {
  switch (strikePrice) {
    case 5:
      return 5;
    case 10:
      return 10;
    case 15:
      return 15;
    case 20:
      return 20;
    default:
      return 5;
  }
}