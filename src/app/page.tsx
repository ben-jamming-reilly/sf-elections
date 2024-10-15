/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { prisma } from "~/lib/prisma";
import { redirect } from "next/navigation";
import { metaTagsPerElectionSlug } from "./utils.index";

export const revalidate = false;

export default async function Home() {
  const elections = await prisma.election.findMany();

  if (!elections || elections.length === 0) {
    return <div>No elections found</div>;
  }

  const activeElections = elections.filter((e) => e.isActive).sort((e) => e.id);

  if (activeElections.length === 1) {
    redirect(`/${activeElections[0].slug}`);
  }

  return (
    <div className="flex h-full flex-col gap-10">
      <section
        aria-label="Erklärtext zum Wahl-Checker"
        className="mx-auto w-[900px] max-w-full text-[1.125rem] leading-[1.6875rem]"
      >
        <h1 className="my-5 font-sans text-[2.25rem] leading-[2.75rem]">
          Election Checker
        </h1>

        <div className="space-y-4 text-[1.125rem] leading-[1.5rem]">
          {activeElections.map((election) => (
            <Link
              key={election.id}
              href={`/${election.slug}`}
              className="mx-auto w-[900px] max-w-full text-[1.125rem] leading-[1.6875rem]"
            >
              <h2 className="my-5 font-sans text-[2.25rem] leading-[2.75rem]">
                {election.name}:
                <br /> What do the candidates say?
              </h2>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata() {
  return metaTagsPerElectionSlug({
    title: `Simple Explanations – Election Checker`,
    description: `Terms and Explanations.`,
  });
}
