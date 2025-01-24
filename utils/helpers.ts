import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
