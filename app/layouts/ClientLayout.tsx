"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import Navbar from "../components/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Toaster richColors position="top-right" />
      <Navbar />
      <div className="pt-24 p-2 md:pt-24 md:p-8">{children}</div>
    </SessionProvider>
  );
}
