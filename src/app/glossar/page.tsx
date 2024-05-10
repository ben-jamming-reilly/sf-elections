import { prisma } from "~/lib/prisma";
import { BackButton } from "../ui/back-button";
import Link from "next/link";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export async function generateMetadata() {
  return {
    title: `Wort-Erklärungen | Wahl-Checker EU 2024 von andereseits`,
    description: `Begriffe und Erklärungen zur EU-Wahl 2024.`,
    twitter: {
      card: "summary_large_image",
      site: "wahlchecker.at",
      title: `Wort-Erklärungen | Wahl-Checker EU 2024 von andereseits`,
      description: `Begriffe und Erklärungen zur EU-Wahl 2024.`,
    },
  };
}

export const getGlossarEntries = unstable_cache(
  async () => {
    return prisma.glossarEntry.findMany();
  },
  ["glossarEntries"],
  {
    revalidate: 18000,
  },
);

export const revalidate = 18000; // 5 hours

const aToZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function Glossar() {
  const glossarEntries = await getGlossarEntries();

  const aToZFiltered = aToZ.filter((letter) =>
    glossarEntries.some((entry) =>
      entry.term.toLowerCase().startsWith(letter.toLowerCase()),
    ),
  );

  const toolbar = (
    <section
      aria-label="Zurück zur Startseite"
      className="mb-14 flex justify-center"
    >
      <BackButton href={`/`}>Zur Startseite</BackButton>
    </section>
  );

  return (
    <div className="w-[820px] max-w-full">
      {toolbar}

      <h1 className="my-5 text-center text-[36px] leading-[44px]">
        Wort-Erklärungen
      </h1>

      <header className="sticky top-0 z-20 bg-white py-3 md:top-[90px]">
        <nav
          aria-label="Navigation zu den Anfangsbuchstaben"
          className="flex w-full snap-x snap-proximity scroll-mx-4 justify-center overflow-x-auto rounded-[30px] border border-black"
        >
          {aToZFiltered.map((letter) => (
            <Link
              key={`glossar-nav-${letter}`}
              className="snap-center px-[8.5px] text-[18px] leading-[40px] outline-offset-4 outline-black focus-visible:outline-2  notouch:hover:text-black"
              href={`#${letter}`}
              title={`Zum Anfangsbuchstaben ${letter}`}
            >
              {letter}
            </Link>
          ))}
        </nav>
      </header>
      <section
        aria-label=""
        className="mx-auto flex w-[720px] max-w-full flex-col gap-20 px-3 py-10"
      >
        {aToZFiltered.map((letter) => (
          <div
            aria-label={`Begriffe mit ${letter}`}
            key={`glossar-section-${letter}`}
            className="relative z-10 "
          >
            <span
              id={`${letter}`}
              className="absolute -top-[120px] z-10"
            ></span>
            <h2 className="text-[28px] font-light leading-[34px]">{letter}</h2>
            <div className="flex flex-col gap-6">
              {glossarEntries
                .filter((entry) =>
                  entry.term.toLowerCase().startsWith(letter.toLowerCase()),
                )
                .map((entry) => (
                  <dl
                    aria-labelledby={`glossar-entry-${entry.id}-title`}
                    key={`glossar-entry-${entry.id}`}
                    className="mt-5"
                  >
                    <dt
                      id={`glossar-entry-${entry.id}-title`}
                      className="text-[18px] font-medium leading-[24px]"
                    >
                      {entry.term}
                    </dt>
                    <dd className="mt-2 text-[18px] leading-[24px]">
                      {entry.definition}
                    </dd>
                  </dl>
                ))}
            </div>
          </div>
        ))}
      </section>

      {toolbar}
    </div>
  );
}
