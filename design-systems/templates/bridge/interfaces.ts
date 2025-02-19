export interface TransactionParams {
  dstEid: number; // Assuming Eid is a string, adjust the type if it's different
  to: `0x${string}`; // Account address padded to 32 characters
  amountLD: bigint; // Amount in Ether, parsed from a string
  minAmountLD: bigint; // Minimum amount in Ether, parsed from a string
  extraOptions: any; // Assuming options is of a generic type, adjust as necessary
  composeMsg: `0x${string}`; // A hexadecimal string
  oftCmd: `0x${string}`; // Another hexadecimal string
}
