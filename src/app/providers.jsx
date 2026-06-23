"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/providers/AuthProvider";

export function Providers({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  );
}
