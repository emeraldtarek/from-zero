import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Lithium — From Zero",
  description:
    "A learning workbench for Li-6 / Li-7 isotope separation, grounded in the zero/ corpus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grid grid-cols-[230px_1fr] min-h-screen items-start">
          <Sidebar />
          <main className="min-h-screen overflow-x-clip">{children}</main>
        </div>
      </body>
    </html>
  );
}
