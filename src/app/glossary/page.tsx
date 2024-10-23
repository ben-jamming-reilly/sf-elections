import { BackButton } from "../ui/back-button";
import Link from "next/link";
import { getGlossarEntries } from "./get-glossar-entries";
import { metaTagsPerElectionSlug } from "../utils.index";

export async function generateMetadata() {
  return metaTagsPerElectionSlug({
    title: `Word explanations – Voting Quiz`,
    description: `Terms and explanations`,
  });
}

export const revalidate = 0;
// export const revalidate = 18000; // 5 hours

const aToZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function Glossar() {
  const glossarEntries = await getGlossarEntries();

  const aToZFiltered = aToZ.filter((letter) =>
    glossarEntries.some((entry) =>
      entry.term.toLowerCase().startsWith(letter.toLowerCase()),
    ),
  );

  const toolbar = (
    <section aria-label="Back to Home" className="mb-14 flex justify-center">
      <BackButton href={`/`}>Back to Home</BackButton>
    </section>
  );

  return (
    <div className="w-[820px] max-w-full">
      {toolbar}

      <h1 className="my-5 text-center text-[2.25rem] leading-[2.75rem]">
        Glossary
      </h1>

      <header className="sticky top-0 z-20 bg-white py-3 md:top-[90px]">
        <nav
          aria-label="Navigation to Alphabet Letters"
          className="flex w-full flex-wrap justify-center gap-y-3 rounded-[30px] border border-black px-3 py-2"
        >
          {aToZFiltered.map((letter) => (
            <Link
              key={`glossary-nav-${letter}`}
              className="px-[8.5px] text-[1.125rem] leading-[1.125rem] outline-offset-4 outline-black focus-visible:outline-2 notouch:hover:text-black"
              href={`#${letter}`}
              title={`Go to letter ${letter}`}
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
            aria-label={`Terms starting with ${letter}`}
            key={`glossary-section-${letter}`}
            className="relative z-10 "
          >
            <span
              id={`${letter}`}
              className="absolute -top-[120px] z-10"
            ></span>
            <h2 className="text-[1.75rem] font-light leading-[2.125rem]">
              {letter}
            </h2>
            <div className="flex flex-col gap-6">
              {glossarEntries
                .filter((entry) =>
                  entry.term.toLowerCase().startsWith(letter.toLowerCase()),
                )
                .map((entry) => (
                  <dl
                    aria-labelledby={`glossary-entry-${entry.id}-title`}
                    key={`glossary-entry-${entry.id}`}
                    className="mt-5"
                  >
                    <dt
                      id={`glossary-entry-${entry.id}-title`}
                      className="text-[1.125rem] font-medium leading-[1.5rem]"
                    >
                      {entry.term}
                    </dt>
                    <dd className="mt-2 text-[1.125rem] leading-[1.5rem]">
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
