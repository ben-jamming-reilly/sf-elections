import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <div className={`w-full h-full z-10 bg-brand p-3`}>
          <div className="bg-white flex flex-col min-h-full rounded-lg  px-5">
            <div className="lg:w-[800px] max-w-full md:min- flex flex-col min-h-full flex-grow mx-auto gap-10">
              <header className="mt-10">
                <Link href="/" className="text-2xl text-white bg-brand p-3">
                  SPÖ Vorstandswahl-Kabine
                </Link>
              </header>
              <main className="flex-grow">{children}</main>
              <footer className="w-full flex justify-center items-center py-5 border-t border-brand">
                <ul className="flex flex-row gap-3">
                  <li>
                    <a
                      target="_blank"
                      rel="norefeerer noopener"
                      href="https://www.spoe.at"
                    >
                      SPÖ
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="norefeerer noopener"
                      href="https://www.spoe.at/junge-generation"
                    >
                      Junge Generation
                    </a>
                  </li>
                  <li>
                    <Link href="/impressum">Impressum</Link>
                  </li>
                  <li>
                    <Link href="/datenschutz">Datenschutz</Link>
                  </li>
                </ul>
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
