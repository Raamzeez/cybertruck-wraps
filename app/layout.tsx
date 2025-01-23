"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster, toast } from "sonner";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen max-w-screen h-full w-full dark:bg-gray-800">
        <Toaster richColors position="top-right" />
        <SessionProvider>
          <Navbar />
          <div className="p-2 md:p-8">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
