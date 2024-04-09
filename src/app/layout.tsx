import Link from "next/link";
import "./globals.css";
import { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
import EasterEgg from "./easter-egg";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "EU-Wahlinfos 2024 – andererseits.org",
  description: "",
  twitter: {
    card: "summary_large_image",
    title: "EU-Wahlinfos 2024 – andererseits.org",
    description: "",
    site: "andererseits.org",
    images: [
      {
        url: "andererseits.org/wahlinfos/opengraph-image",
        alt: "EU-Wahlinfos 2024",
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
        <div className={`w-full min-h-full z-10 flex flex-col`}>
          <header className="w-full md:sticky z-50 top-0 bg-brand text-white mb-5">
            <div className="mx-auto lg:w-[1000px] flex flex-col md:flex-row items-center justify-between font-brand gap-y-2 px-3 py-4">
              <Link
                href="/"
                className="text-2xl [@media(min-width:300px)]:text-3xl w-full md:w-fit py-3 md:py-0 bg-brand fixed top-0 md:static text-center leading-none font-bold focus-visible:outline-brand outline-offset-2 hyphens-manual"
              >
                EU-Wahlinfos 2024
              </Link>
              <div className="flex md:mt-1 items-end mt-12">
                <a
                  rel="norefeerer noopener"
                  className="focus-visible:outline-brand bg-white px-2 py-1 outline-offset-2"
                  href="https://andererseits.org"
                >
                  <Image
                    src="/andererseits-logo.svg"
                    height={36}
                    priority
                    width={181.83}
                    className="object-contain flex-1"
                    alt="JG Logo"
                  />
                </a>
              </div>
            </div>
          </header>
          <div className="lg:w-[1000px] w-full flex flex-col min-h-full flex-grow mx-auto gap-5 md:gap-10">
            <main className="flex-grow px-5 py-10">{children}</main>
            <footer className="w-full flex flex-col gap-3 justify-center items-center py-5 border-t-2 border-brand">
              <a
                rel="norefeerer noopener"
                className="focus-visible:outline-brand outline-offset-2 hover:text-brand hover:underline underline-offset-2"
                href="https://andererseits.org/"
              >
                <span className="font-brand font-bold">andererseits.org</span>
              </a>
              <ul className="flex flex-col gap-3 items-center justify-center sm:flex-row flex-wrap">
                <li>
                  <Link
                    prefetch
                    className="focus-visible:outline-brand outline-offset-2 hover:text-brand hover:underline underline-offset-2"
                    href="https://andererseits.org/impressum/"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch
                    className="focus-visible:outline-brand outline-offset-2 hover:text-brand hover:underline underline-offset-2"
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
