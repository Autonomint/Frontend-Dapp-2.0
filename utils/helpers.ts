import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChartFilter } from "./interface";
import { WheelEvent } from "react";

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
