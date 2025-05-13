"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

/**
 * This component is used to provide a theme provider to the app
 * @param {PropsWithChildren} children - The children of the component
 * @returns {React.ReactNode} The theme provider
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
