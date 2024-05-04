import Link from "next/link";
import "./globals.css";
import { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
import EasterEgg from "./easter-egg";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Wahlchecker EU 2024 – andererseits.org",
  description: "",
  twitter: {
    card: "summary_large_image",
    title: "Wahlchecker EU 2024 – andererseits.org",
    description: "",
    site: "andererseits.org",
    images: [
      {
        url: "andererseits.org/Wahl-Infos/opengraph-image",
        alt: "Wahlchecker EU 2024",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const interFont = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  variable: "--font-inter",
  subsets: ["latin"],
});

const loraFont = Lora({
  weight: ["400", "500", "600", "700"],
  display: "block",
  variable: "--font-lora",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#016956" />
        <meta name="msapplication-TileColor" content="#016956" />
        <meta name="theme-color" content="#016956" />
        <Script
          data-domain="andererseits-wahlkabine.vercel.app"
          src="/js/script.js"
        ></Script>
      </head>
      <body className={clsx(interFont.variable, loraFont.variable)}>
        <a
          className="sr-only left-0 top-0 z-50 text-black outline-offset-4 outline-black focus-visible:not-sr-only focus-visible:fixed focus-visible:outline-2"
          href="#content"
        >
          Zum Inhalt springen
        </a>
        <div className={`z-10 flex min-h-full w-full flex-col`}>
          <header className="top-0 z-40 w-full border-b border-black bg-white md:sticky md:h-[90px]">
            <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-y-2 px-10 py-4 font-sans md:flex-row lg:w-[1320px]">
              <div className="flex items-end">
                <Link
                  className="bg-white  px-2 py-1 outline-offset-4 outline-black focus-visible:outline-2"
                  href="/"
                  title="Zur Startseite"
                >
                  <Image
                    src="/andererseits-logo.svg"
                    height={36}
                    priority
                    width={182}
                    className="flex-1 object-contain"
                    alt="andererseits Logo"
                  />
                </Link>
              </div>
              <div className="w-full hyphens-manual py-3 text-center text-[28px] leading-[34px] text-black outline-offset-2 outline-black focus-visible:outline-2  md:w-fit md:py-0">
                Wahlchecker EU 2024
              </div>
            </div>
          </header>
          <div className="flex min-h-full w-full flex-grow flex-col gap-5 md:gap-10 ">
            <div className="mx-auto max-w-full lg:w-[1000px]">
              <main className="relative flex-grow px-3 py-10 xxs:px-4 xs:px-5">
                <span
                  id="content"
                  className="absolute -top-20 left-0"
                  aria-hidden
                ></span>
                {children}
              </main>
            </div>
            <footer className=" border-t border-black py-5 ">
              <nav
                aria-label="Links zu andererseits.org, Impressum und Datenschutz"
                className="flex w-full flex-col items-center justify-center gap-3"
              >
                <a
                  rel="norefeerer noopener"
                  className="underline-offset-2 outline-offset-4 outline-black focus-visible:outline-2  notouch:hover:text-black notouch:hover:underline"
                  href="https://andererseits.org/"
                >
                  <span className="font-sans font-medium">
                    andererseits.org
                  </span>
                </a>
                <div className="flex flex-col flex-wrap items-center justify-center gap-3 text-xs font-medium uppercase tracking-widest sm:flex-row">
                  <Link
                    prefetch
                    className="underline-offset-2  outline-offset-4 outline-black focus-visible:outline-2  notouch:hover:text-black notouch:hover:underline"
                    href="https://andererseits.org/impressum/"
                  >
                    Impressum
                  </Link>
                  <Link
                    prefetch
                    className="underline-offset-2  outline-offset-4 outline-black focus-visible:outline-2  notouch:hover:text-black notouch:hover:underline"
                    href="https://andererseits.org/datenschutz/"
                  >
                    Datenschutz
                  </Link>
                </div>
              </nav>
            </footer>
          </div>
        </div>
        <EasterEgg />
      </body>
    </html>
  );
}
