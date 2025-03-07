// app/layout.tsx
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MusicExplorer - Busca tus artistas favoritos",
  description: "Explora información sobre tus artistas y álbumes favoritos",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
