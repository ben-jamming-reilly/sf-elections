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
        <div className={`w-full min-h-full z-10 bg-brand p-5`}>
          <div className="bg-white shadow-md flex flex-col min-h-full rounded-lg px-5">
            <div className="lg:w-[800px] w-full md:min- flex flex-col min-h-full flex-grow mx-auto gap-10">
              <header className="mt-10">
                <Link
                  href="/"
                  className="text-2xl text-white bg-brand p-3 focus-visible:outline-brand outline-offset-2"
                >
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
        </div>
      </body>
    </html>
  );
}
