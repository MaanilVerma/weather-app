import { ToggleThemeProvider } from "@/context/ToggleThemeContext";
import { UserInputProvider } from "@/context/UserInputContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Fetch Weather Data for Your Location.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ToggleThemeProvider>
      <UserInputProvider>
        <html lang="en">
          <body className={inter.className}>
            <>{children}</>
          </body>
        </html>
      </UserInputProvider>
    </ToggleThemeProvider>
  );
}
