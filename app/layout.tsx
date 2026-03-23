import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aaquib Ali",
  description: "building, learning, and exploring at the ai × automation intersection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
