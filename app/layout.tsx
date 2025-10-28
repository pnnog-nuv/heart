import type { Metadata } from "next";
import "./globals.css";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Heart - Blue Saúde",
  description: "Heart: Dashboard de Automação Inteligente para Blue Saúde - Powered by NUV Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="gradient-bg min-h-screen antialiased">
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
