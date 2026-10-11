import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/providers/QueryProvider";
import { HeroUIProvider } from "@heroui/system";
import { Toaster } from "sonner";
import SessionWatcher from "@/components/auth/SessionWatcher";
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Job Track - Smart Career & Job Application Platform",
  description: "Track your job applications, interviews, and career progress with ease.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <HeroUIProvider>
              <SessionWatcher />
              {children}
              <Toaster position="top-center" richColors theme="system" />
            </HeroUIProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
