import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sortWalletAddress = (walletAddress: string | undefined) => {
  return walletAddress ? walletAddress.substring(0, 5) + '...' + walletAddress.substring(walletAddress.length - 4) : ''
}