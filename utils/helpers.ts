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
