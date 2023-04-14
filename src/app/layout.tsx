import Link from "next/link";
import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

export const metadata = {
  title: "SPÖ Vorsitz Wahlkabine | Junge Generation Wien",
  description: "SPÖ Wahlkabine",
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
        <div
          className={`w-full min-h-full z-10 flex flex-col px-5 bg-white border-brand border-[10px] md:border-[30px]`}
        >
          <div className="lg:w-[800px] w-full md:min- flex flex-col min-h-full flex-grow mx-auto gap-5 md:gap-10">
            <header className="mt-10">
              <Link
                href="/"
                className="text-2xl inline-flex text-white bg-brand p-3 focus-visible:outline-brand outline-offset-2"
              >
                SPÖ Vorsitzwahl-Kabine
              </Link>
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="w-full flex justify-center items-center py-5 border-t border-brand">
              <ul className="flex flex-row gap-3 justify-center flex-wrap">
                <li>
                  <a
                    target="_blank"
                    rel="norefeerer noopener"
                    className="focus-visible:outline-brand outline-offset-2"
                    href="https://www.spoe.at"
                  >
                    SPÖ
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="norefeerer noopener"
                    className="focus-visible:outline-brand outline-offset-2"
                    href="https://www.spoe.at/junge-generation"
                  >
                    Junge Generation
                  </a>
                </li>
                <li>
                  <Link
                    className="focus-visible:outline-brand outline-offset-2"
                    href="/impressum"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    className="focus-visible:outline-brand outline-offset-2"
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
