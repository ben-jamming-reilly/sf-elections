import { prisma } from "~/lib/prisma";
import { BackButton } from "../ui/back-button";

export async function generateMetadata() {
  return {
    title: `Wahl-Info Glossar – andererseits.org`,
    description: `Begriffe und Erklärungen zur EU-Wahl 2024.`,
    twitter: {
      card: "summary_large_image",
      site: "andererseits.org",
      title: `Wahl-Info Glossar – andererseits.org`,
      description: `Begriffe und Erklärungen zur EU-Wahl 2024.`,
    },
  };
}

export const revalidate = 18000; // 5 hours

const aToZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function Glossar() {
  const glossarEntries = await prisma.glossarEntry.findMany();

  const aToZFiltered = aToZ.filter((letter) =>
    glossarEntries.some((entry) =>
      entry.term.toLowerCase().startsWith(letter.toLowerCase()),
    ),
  );

  return (
    <div className="w-[820px] max-w-full">
      <div className="mb-14 flex justify-center">
        <BackButton href={`/`}>Zur Startseite</BackButton>
      </div>

      <h1 className="my-5 text-center text-[36px] leading-[44px]">Glossar</h1>

      <header className="sticky top-0 z-20 bg-white py-3 md:top-[90px]">
        <ul className="flex w-full snap-x snap-proximity scroll-mx-4 justify-center overflow-x-auto rounded-[30px] border border-black">
          {aToZFiltered.map((letter) => (
            <li
              key={letter}
              className="snap-center px-[8.5px] text-[18px] leading-[40px]  notouch:hover:text-black"
            >
              <a
                className="outline-offset-4 outline-black focus-visible:outline-2"
                href={`#sektion-${letter}`}
              >
                {letter}
              </a>
            </li>
          ))}
        </ul>
      </header>
      <section className="mx-auto flex w-[720px] max-w-full flex-col gap-16 px-3 py-10">
        {aToZFiltered.map((letter) => (
          <div key={letter} className="relative z-10 ">
            <span
              id={`sektion-${letter}`}
              className="absolute -top-[120px] z-10"
            ></span>
            <h2 className="text-[28px] font-light leading-[34px]">{letter}</h2>
            <div>
              {glossarEntries
                .filter((entry) =>
                  entry.term.toLowerCase().startsWith(letter.toLowerCase()),
                )
                .map((entry) => (
                  <article key={entry.id} className="mt-5">
                    <h3 className="text-[18px] font-medium leading-[24px]">
                      {entry.term}
                    </h3>
                    <p className="mt-2 text-[18px] leading-[24px]">
                      {entry.definition}
                    </p>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
