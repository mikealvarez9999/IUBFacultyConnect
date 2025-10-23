import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Faculty Connect - IUB NEST",
  description: "Browse and connect with faculty members at Independent University, Bangladesh (IUB)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#F7F8FA] flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
