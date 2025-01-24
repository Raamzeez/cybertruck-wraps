import ClientLayout from "./layouts/ClientLayout";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata = {
  title: "Cybertruck Wraps",
  description: "A website that hosts digital cybertruck wraps",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-800">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
