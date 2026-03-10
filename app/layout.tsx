import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/theme";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Founder Diary",
  description:
    "A founder's mission control — journal, capture, and track the pulse of what you're building.",
};

// Inline script executed before first paint to prevent flash of wrong theme.
const themeScript = `
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${firaCode.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
