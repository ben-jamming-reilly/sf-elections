import Link from "next/link";
import "./globals.css";
import { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
import EasterEgg from "./easter-egg";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "EU-Wahl-Infos 2024 – andererseits.org",
  description: "",
  twitter: {
    card: "summary_large_image",
    title: "EU-Wahl-Infos 2024 – andererseits.org",
    description: "",
    site: "andererseits.org",
    images: [
      {
        url: "andererseits.org/Wahl-Infos/opengraph-image",
        alt: "EU-Wahl-Infos 2024",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const interFont = Inter({
  weight: ["400", "500", "600", "700"],
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
        <Script data-domain="mitentscheiden.at" src="/js/script.js"></Script>
      </head>
      <body className={clsx(interFont.variable, loraFont.variable)}>
        <div className={`z-10 flex min-h-full w-full flex-col`}>
          <header className="top-0 z-50 mb-5 w-full border-b border-black bg-white md:sticky">
            <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-y-2 px-3 py-4 font-sans md:flex-row lg:w-[1320px]">
              <div className="flex items-end">
                <a
                  rel="norefeerer noopener"
                  className="bg-white  px-2 py-1 outline-offset-2 focus-visible:outline-brand"
                  href="https://andererseits.org"
                >
                  <Image
                    src="/andererseits-logo.svg"
                    height={36}
                    priority
                    width={181.83}
                    className="flex-1 object-contain"
                    alt="andererseits Logo"
                  />
                </a>
              </div>
              <Link
                href="/"
                className="w-full hyphens-manual py-3 text-center text-[28px] leading-[34px] text-black outline-offset-2 focus-visible:outline-brand  md:w-fit md:py-0"
              >
                Wahl-Infos 2024
              </Link>
            </div>
          </header>
          <div className="mx-auto flex min-h-full w-full flex-grow flex-col gap-5 md:gap-10 lg:w-[1000px]">
            <main className="flex-grow px-5 py-10">{children}</main>
            <footer className="flex w-full flex-col items-center justify-center gap-3 border-t-2 border-brand py-5 ">
              <a
                rel="norefeerer noopener"
                className="underline-offset-2  outline-offset-2 focus-visible:outline-brand  notouch:hover:text-brand notouch:hover:underline"
                href="https://andererseits.org/"
              >
                <span className="font-sans font-bold">andererseits.org</span>
              </a>
              <ul className="flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
                <li>
                  <Link
                    prefetch
                    className="underline-offset-2  outline-offset-2 focus-visible:outline-brand  notouch:hover:text-brand notouch:hover:underline"
                    href="https://andererseits.org/impressum/"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch
                    className="underline-offset-2  outline-offset-2 focus-visible:outline-brand  notouch:hover:text-brand notouch:hover:underline"
                    href="https://andererseits.org/datenschutz/"
                  >
                    Datenschutz
                  </Link>
                </li>
              </ul>
            </footer>
          </div>
        </div>
        <EasterEgg />
      </body>
    </html>
  );
}
