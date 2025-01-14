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
