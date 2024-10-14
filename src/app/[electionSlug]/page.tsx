/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { QuestionaireButton } from "../questionaire-button";
import { Button } from "../ui/button";
import { GlossaredTextServer } from "../ui/glossared-text.server";
import { MagazineCta } from "../ui/magazine-cta";
import { notFound } from "next/navigation";
import { getElectionWithCandidates } from "./get-election-with-candidates";
import { NewsletterCta } from "../ui/newsletter-cta";
import { Metadata } from "next";
import { metaTagsPerElectionSlug } from "../utils.index";
import { getElections } from "../get-elections";

export const revalidate = false;

type ElectionWithCandidates = NonNullable<
  Awaited<ReturnType<typeof getElectionWithCandidates>>
>;

export default async function ElectionHome({
  params,
}: {
  params: { electionSlug: string };
}) {
  const election = await getElectionWithCandidates({
    electionSlug: params.electionSlug,
  });

  if (!election) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col gap-10">
      <section
        aria-label="Erklärtext zum Wahl-Checker"
        className="mx-auto w-full max-w-[800px] text-[1.125rem] leading-[1.6875rem]"
      >
        {/* <EU2024Election election={election} /> */}

        <NR2024Election election={election} />
      </section>
    </div>
  );
}

const EU2024Election = ({ election }: { election: ElectionWithCandidates }) => {
  return (
    <div>
      <h1 className="my-5 font-sans text-[2.25rem] leading-[2.75rem]">
        EU Election Checker 2024:
        <br /> What do the parties say?
      </h1>

      <div className="space-y-4 text-[1.125rem] leading-[1.5rem]">
        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="From June 6 to 9, 2024, the European Elections will take place." />
        </p>

        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="Around 450 million people in Europe can decide who should represent them in the EU Parliament." />
          <br />
          {/* @ts-expect-error */}
          <GlossaredTextServer text="EU stands for: European Union. In the EU, 27 countries from Europe collaborate." />
          <br />
          {/* @ts-expect-error */}
          <GlossaredTextServer text="The EU Parliament helps create rules that the EU makes for all member countries." />
        </p>

        <h2 className="pt-5 text-[1.75rem] leading-[2.125rem]">
          What is the Election Checker?
        </h2>
        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="The Election Checker is a guidance tool. It is similar to the" />{" "}
          "
          <a
            href="https://wahlkabine.at"
            target="_blank"
            title="To wahlkabine.at, opens in a new window"
            className="font-semibold underline"
          >
            Voting Booth
          </a>
          ", {/* @ts-expect-error */}
          <GlossaredTextServer text="which does not exist for the EU Elections 2024." />{" "}
          {/* @ts-expect-error */}
          <GlossaredTextServer text="The Election Checker contains 15 questions on important topics that the EU deals with. For example, climate protection, refugees, work, and inclusion. You can express your opinion on each question: “Yes” or “No” or “I don’t know”. You can also indicate how important each topic is to you." />
        </p>

        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="After that, you can compare your opinions with the opinions of the 7 parties that can be elected in the European Elections in Austria." />
        </p>

        <p>
          {/* @ts-expect-error */}
          <GlossaredTextServer text="We have also written explanations for important words. The words are marked in yellow. If you click on a yellow-marked word, you can read the explanation. You can also find all explanations on the 'Word Explanations' page." />{" "}
        </p>

        <nav
          aria-label="To the questions or word explanations"
          className="mx-auto flex w-fit flex-col gap-5 py-10 text-2xl md:flex-row"
        >
          <Button
            roundness="large"
            className=""
            as="a"
            variant="secondary"
            href="/glossar"
          >
            Word Explanations
          </Button>
          {election.isQuestionnaire && (
            <QuestionaireButton electionSlug={election.slug} />
          )}
          {!election.isQuestionnaire && (
            <Button
              roundness="large"
              variant="secondary"
              as="a"
              href={`/${election.slug}/vergleich/${election.candidates.map((c) => c.slug).join("/")}`}
            >
              Compare Answers
            </Button>
          )}
        </nav>

        <h2 className=" text-[1.75rem] leading-[2.125rem]">
          What is <span className="italic">andererseits</span>?
        </h2>
        <p>
          The Election Checker is published by andererseits GmbH and was
          developed in cooperation with the association andererseits - for
          inclusion in journalism and the Hil Foundation.
        </p>
        <p>
          <span className="italic">andererseits</span> is a magazine for
          disability and society. In{" "}
          <span className="italic">andererseits</span>, people with and without
          disabilities do journalism. The team works equally, critically, and is
          fairly paid. <br />
          Here you can learn more about{" "}
          <span className="italic">andererseits</span>:{" "}
          <a
            target="_blank"
            href="https://andererseits.org"
            className="font-semibold underline"
          >
            andererseits.org
          </a>
        </p>

        <h2 className="pt-5 text-[1.75rem] leading-[2.125rem]">
          Data Protection
        </h2>
        <p>
          The Election Checker is anonymous. That means: We don’t know who you
          are and how you voted. More information on data protection can be
          found here:{" "}
          <Link href="/datenschutz" className="font-semibold underline">
            wahlchecker.at/datenschutz
          </Link>
        </p>
      </div>
    </div>
  );
};

const NR2024Election = ({ election }: { election: ElectionWithCandidates }) => {
  return (
    <div>
      <h1 className="my-5 font-sans text-[2.25rem] leading-[2.75rem]">
        {election.name}
        <br /> What do the candidates say?
      </h1>

      <div className="space-y-4 text-[1.125rem] leading-[1.5rem]">
        <p>
          On November, 5th there is an election for the {election.name}
          <br />
          You can vote for {election.candidates.length} candidates.
          <br />
          Candidates who appear to have similar goals and opinions.
        </p>

        <p>
          Everyone has the right to independent information.
          <br />
          So I've combed the internet.
          <br />
          And wrote down their answers in simple language.
          <br />
          So you can understand what each candidate stands for.
        </p>

        <nav
          aria-label="To the questions or word explanations"
          className="mx-auto flex w-fit flex-col gap-5 py-10 text-2xl sm:mx-0 md:flex-row"
        >
          {election.isQuestionnaire && (
            <QuestionaireButton electionSlug={election.slug} />
          )}
          {!election.isQuestionnaire && (
            <Button
              roundness="large"
              variant="primary"
              as="a"
              href={`/${election.slug}/compare/${election.candidates.map((c) => c.slug).join("/")}`}
            >
              Compare Answers
            </Button>
          )}
          <Button
            roundness="large"
            className=""
            as="a"
            variant="secondary"
            href="/glossary"
          >
            Word Explanations
          </Button>
        </nav>

        <h2 className="pt-5 text-[1.75rem] leading-[2.125rem]">
          Transparency: This not is Journalism?
        </h2>

        <p>
          Journalism means: contextualizing and checking all answers.
          <br />
          You can only read what the candidates' opinions are.
          <br />
          And not what they have actually done.
          <br />
          So take it with a grain of salt, okay?
        </p>

        <p>
          Few candidates provide information in simple language.
          <br />
          This tool is to help better understand the positions of the
          candidates.
        </p>

        <h2 className="pt-5 text-[1.75rem] leading-[2.125rem]">
          Data Protection
        </h2>
        <p>
          The Election Checker is anonymous. That means: We do not know who you
          are and how you voted.
          <br /> More information about data protection can be found here:{" "}
          <Link href="/privacy" className="font-semibold underline">
            privacy policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export async function generateMetadata({
  params,
}: {
  params: { electionSlug: string };
}): Promise<Metadata> {
  const election = await getElectionWithCandidates({
    electionSlug: params.electionSlug,
  });

  if (!election) {
    notFound();
  }

  return metaTagsPerElectionSlug({
    electionSlug: election.slug,
    title: `${election.name} – Wahl-Checker von andererseits`,
    description: "Finde heraus welche Partei zu Dir passt!",
  });
}

export const generateStaticParams = async () => {
  const elections = await getElections();

  return elections.map((election) => ({
    electionSlug: election.slug,
  }));
};
