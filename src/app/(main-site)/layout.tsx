import AppBackground from "./../../components/global-components/app-background";
import Footer from "./../../components/global-components/footer";
import Header from "./../../components/global-components/header";
import "./globals.css";
import { Metadata } from "next";
import { RegisterServiceWorker } from "@/components/global-components/register-service-worker";
import { AppThemeProvider } from "../providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://royals-hq.tylerlatshaw.com"),
  title: {
    default: "Royals HQ",
    template: "%s | Royals HQ",
  },
  description:
    "Real-time ECHL transactions, rosters, and team updates. Never miss a move.",
  applicationName: "Royals HQ",
  openGraph: {
    type: "website",
    siteName: "Royals HQ",
    title: "Royals HQ",
    description:
      "Real-time ECHL transactions, rosters, and team updates. Never miss a move.",
    url: "https://royals-hq.tylerlatshaw.com",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Royals HQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royals HQ",
    description:
      "Real-time ECHL transactions, rosters, and team updates.",
    images: ["/og-default.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppThemeProvider>
        <div className="h-screen w-screen overflow-hidden">

          <RegisterServiceWorker />

          {/* <AppBackground /> */}

          <Header />

          {/* Scroll Region: MAIN + FOOTER */}
          <div className="flex h-[calc(100vh-6rem)] flex-col overflow-y-auto">
            <main className="flex-1">
              <div className="mx-auto w-full lg:max-w-7xl px-3 lg:px-0 py-6 lg:py-8 text-center">

                {children}

              </div>
            </main>
            <Footer />
          </div>
        </div>
      </AppThemeProvider>
    </>
  );
}
