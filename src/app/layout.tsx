import Link from "next/link";
import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Image from "next/image";

export const metadata: Metadata = {
  title: "SPÖ Vorsitzbefragungs-Kabine | Junge Generation Wien",
  description:
    "Finde heraus welche*r Kandidat*in für die SPÖ Vorsitzbefragung 2023 am Besten zu dir passt.",
  twitter: {
    card: "summary_large_image",
  },
};

const interFont = Inter({
  weight: ["400", "500", "600", "700"],
  display: "block",
  variable: "--font-inter",
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
        <meta name="theme-color" content="#e62937" />
        <meta name="msapplication-navbutton-color" content="#e62937" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#e62937" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          data-domain="spoe-wahlkabine.vercel.app"
          src="/js/script.js"
        ></Script>
      </head>
      <body className={interFont.variable}>
        <div className={`w-full min-h-full z-10 flex flex-col`}>
          <header className="w-full md:sticky z-50 top-0 bg-brand text-white mb-5">
            <div className="mx-auto lg:w-[1000px] flex flex-col md:flex-row items-center md:items-end justify-between font-brand gap-y-2 p-3">
              <Link
                href="/"
                className="text-2xl [@media(min-width:300px)]:text-3xl w-full md:w-fit py-3 md:py-0 bg-brand fixed top-0 md:static text-center leading-none font-bold focus-visible:outline-brand outline-offset-2"
              >
                SPÖ Vorsitzbefragungs-Kabine
              </Link>
              <div className="flex md:mt-1 items-end mt-12">
                <span className="mr-2 md:mx-2 [@media(min-width:300px)]:block hidden">
                  powered by
                </span>
                <a
                  target="_blank"
                  rel="norefeerer noopener"
                  className="focus-visible:outline-brand outline-offset-2"
                  href="https://junge-generation.at/"
                >
                  <Image
                    src="/icon-block-white.png"
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
            <main className="flex-grow px-5">{children}</main>
            <footer className="w-full flex justify-center items-center py-5 border-t-2 border-brand">
              <ul className="flex flex-col gap-3 items-center justify-center sm:flex-row flex-wrap">
                <li>
                  <a
                    target="_blank"
                    rel="norefeerer noopener"
                    className="focus-visible:outline-brand outline-offset-2 hover:text-brand hover:underline underline-offset-2"
                    href="https://www.spoe.at"
                  >
                    SPÖ
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="norefeerer noopener"
                    className="focus-visible:outline-brand outline-offset-2 hover:text-brand hover:underline underline-offset-2"
                    href="https://junge-generation.at/"
                  >
                    Junge Generation Wien
                  </a>
                </li>
                <li>
                  <Link
                    className="focus-visible:outline-brand outline-offset-2 hover:text-brand hover:underline underline-offset-2"
                    href="/impressum"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    className="focus-visible:outline-brand outline-offset-2 hover:text-brand hover:underline underline-offset-2"
                    href="/datenschutz"
                  >
                    Datenschutz
                  </Link>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
