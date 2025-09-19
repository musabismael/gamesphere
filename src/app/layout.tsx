import type { Metadata } from "next";
import { 
  Inter, 
  Noto_Sans_Arabic, 
  Cairo, 
  Poppins, 
  Roboto, 
  Open_Sans,
  Lato,
  Montserrat,
  Source_Sans_3,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_Thai,
  Noto_Sans_Devanagari,
  Noto_Sans_Hebrew,
  Noto_Sans_Georgian,
  Noto_Sans_Armenian
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ErrorBoundary } from "@/components/error-boundary";

// Primary fonts for English
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["Inter", "system-ui", "arial"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  fallback: ["Inter", "system-ui", "arial"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  fallback: ["Inter", "system-ui", "arial"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
  fallback: ["Inter", "system-ui", "arial"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["Inter", "system-ui", "arial"],
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  fallback: ["Inter", "system-ui", "arial"],
});

// Arabic fonts
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

// Asian language fonts
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-kr",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sc",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-tc",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-thai",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-hebrew",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-georgian",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-armenian",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "GameSphere - Global Gaming Platform",
  description: "A next-generation global gaming platform where developers can upload their games and players can enjoy them from anywhere. Features AI recommendations, community interaction, and advanced monetization tools.",
  keywords: "games, gaming platform, HTML5 games, WebGL, Unity, Godot, game development, online games",
  authors: [{ name: "GameSphere Team" }],
  creator: "GameSphere",
  publisher: "GameSphere",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    title: "GameSphere - Global Gaming Platform",
    description: "A next-generation global gaming platform for developers and players",
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    siteName: "GameSphere",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GameSphere - Global Gaming Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameSphere - Global Gaming Platform",
    description: "A next-generation global gaming platform for developers and players",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GameSphere',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`
      ${inter.variable} 
      ${poppins.variable} 
      ${roboto.variable} 
      ${openSans.variable} 
      ${lato.variable} 
      ${montserrat.variable} 
      ${sourceSans3.variable}
      ${notoSansArabic.variable} 
      ${cairo.variable}
      ${notoSansJP.variable}
      ${notoSansKR.variable}
      ${notoSansSC.variable}
      ${notoSansTC.variable}
      ${notoSansThai.variable}
      ${notoSansDevanagari.variable}
      ${notoSansHebrew.variable}
      ${notoSansGeorgian.variable}
      ${notoSansArmenian.variable}
    `} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white antialiased font-sans">
        <Providers>
          <ErrorBoundary>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
