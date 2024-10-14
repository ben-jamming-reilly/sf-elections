import Link from "next/link";
import { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
import EasterEgg from "./easter-egg";
import clsx from "clsx";
import "./globals.css";
import "./mailerlite.css";
import { SocialBar } from "./ui/social-bar";
import { metaTagsPerElectionSlug } from "./utils.index";

export async function generateMetadata() {
  return metaTagsPerElectionSlug({
    title: `Wahl-Checker von andererseits`,
    description: `Finde heraus welche Partei zu Dir passt!`,
  });
}

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
    <html lang="en">
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
        <meta name="og:site_name" content="wahlchecker.at" />
        <meta name="twitter:image" content="/shareable-wide.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="wahlchecker.at" />
        <meta name="twitter:creator" content="@andererseits" />
        <meta
          name="keywords"
          content="Orientierungshilfe, Wahl, Meinung, Partei, Parteien, Wählen, Politik, unabhängig, barrierefrei"
        />
        <link rel="icon" href="/favicon2.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#016956" />
        <meta name="msapplication-TileColor" content="#016956" />
        <meta name="theme-color" content="#016956" />
        <Script data-domain="wahlchecker.at" src="/js/script.js"></Script>
      </head>
      <body className={clsx(interFont.variable, loraFont.variable)}>
        <a
          className="sr-only left-0 top-0 z-50 text-black outline-offset-4 outline-black focus-visible:not-sr-only focus-visible:fixed focus-visible:outline-2"
          href="#content"
        >
          Skip to content
        </a>
        <div className={`z-10 flex min-h-full w-full flex-col`}>
          <header className="top-0 z-40 w-full border-b border-black bg-white md:sticky md:h-[90px]">
            <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-x-7 gap-y-2 px-3 py-4 font-sans md:flex-row md:px-10 lg:w-[1320px]">
              <div className="flex w-fit flex-shrink-0 items-start">
                <Link
                  className="bg-white  px-2 py-1 outline-offset-4 outline-black focus-visible:outline-2"
                  href="/"
                  title="Zur Startseite"
                >
                  <h1 className="text-3xl">SF Elections</h1>
                </Link>
              </div>
              <div className="flex w-full flex-grow justify-center hyphens-manual py-3 text-center text-[1.5rem] leading-[1.75rem] text-black outline-offset-2 outline-black focus-visible:outline-2 md:justify-start md:py-0  xs:text-[1.75rem] xs:leading-[2.125rem]">
                Election checker
              </div>
              <SocialBar />
            </div>
          </header>
          <div className="flex w-full flex-grow flex-col gap-5 md:gap-10 ">
            <div className="mx-auto max-w-full lg:w-[1000px]">
              <main className="relative flex-grow px-3 py-10 xxs:px-4 xs:px-5">
                <span
                  id="content"
                  className="absolute -top-20 left-0"
                  aria-hidden="true"
                ></span>
                {children}
              </main>
            </div>
          </div>
          <footer className=" border-t border-black py-5 ">
            <div
              aria-label="Links zu Sozialen Medien andererseits.org, Impressum und Datenschutz"
              className="flex w-full flex-col items-center justify-center gap-3"
            >
              <SocialBar />
              <ul className="flex flex-col flex-wrap items-center justify-center gap-3 text-xs font-medium uppercase tracking-widest sm:flex-row">
                <li>
                  <a
                    target="blank"
                    className="underline-offset-2  outline-offset-4 outline-black focus-visible:outline-2  notouch:hover:text-black notouch:hover:underline"
                    href="https://andererseits.org/impressum/"
                    title="Zum Impressum, öffnet in neuem Fenster"
                  >
                    Legal notice
                  </a>
                </li>
                <li>
                  <Link
                    prefetch
                    className="underline-offset-2  outline-offset-4 outline-black focus-visible:outline-2  notouch:hover:text-black notouch:hover:underline"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </footer>
        </div>
        <EasterEgg />
      </body>
    </html>
  );
}
