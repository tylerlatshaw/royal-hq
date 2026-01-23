import { Metadata } from "next";
import { TeamThemeProvider } from "./providers/team-theme-provider";
import { AppThemeProvider } from "./providers/theme-provider";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen w-screen overflow-hidden">
        <AppThemeProvider>
          <TeamThemeProvider defaultColor="#8349ff">
            {children}
          </TeamThemeProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
