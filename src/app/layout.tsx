import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IUB Faculty Connect - Faculty Directory",
  description: "Browse and search faculty members at Independent University, Bangladesh (IUB)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
