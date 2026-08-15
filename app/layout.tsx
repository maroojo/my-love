import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Romantic App",
  description: "Created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased min-h-screen w-full bg-slate-900 text-slate-100 flex flex-col items-center justify-center overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}