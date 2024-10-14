import { notFound } from "next/navigation";
import { getVoterViaHash } from "../get-voter-via-hash";
import { ShareButton } from "~/app/ui/share-button";
import { BackButton } from "~/app/ui/back-button";
import { DownloadImageLink } from "~/app/ui/download-image-link";
import { PartyLogo } from "~/app/ui/party-logo";
import { Button } from "~/app/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { MagazineCta } from "~/app/ui/magazine-cta";
import { metaTagsPerElectionSlug } from "~/app/utils.index";

export type WahlkabineResultProps = {
  params: {
    slug: string;
    electionSlug: string;
  };
};

export const revalidate = 18000; // 5 hours

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

const MAX_POINTS = 15 * 27;

export default async function WahlkabineResult({
  params,
}: WahlkabineResultProps) {
  const voterWithAnswers = await getVoterViaHash(params.slug);

  console.log(voterWithAnswers);

  if (!voterWithAnswers) {
    notFound();
  }

  const toolbar = (
    <aside
      aria-label="Back & Share"
      className="flex flex-row flex-wrap justify-center gap-5"
    >
      <BackButton href={`/${params.electionSlug}`}>To Homepage</BackButton>
      <ShareButton
        electionSlug={params.electionSlug}
        title={`Election Checker ${voterWithAnswers.election.name}`}
      >
        Share
      </ShareButton>
      <DownloadImageLink
        title="electionchecker-andererseits.jpg"
        href={`/shareable-wide-${params.electionSlug}.png`}
      >
        Download Image
      </DownloadImageLink>
    </aside>
  );

  return (
    <div className="flex flex-col gap-5">
      {toolbar}

      <section
        aria-label="Results Overview"
        className="my-10 flex w-[900px] max-w-full flex-col items-center gap-10"
      >
        <div className="w-full">
          <h1 className="mb-3 text-4xl">Your Result</h1>
          <div className="space-y-3">
            <p>
              You answered {voterWithAnswers.answers.length} questions about the{" "}
              {voterWithAnswers.election.name}. Here you can see which
              candidates have similar views as you do.
            </p>
            <p>
              We compared the candidates answers to your answers. And we
              compared how important the individual questions are for you and
              the candidates.
            </p>
            <p>
              The larger the green bar, the more similar opinions you share with
              a party.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col">
          {voterWithAnswers.candidateMatches
            .sort((a, b) => b.score - a.score)
            .map((match) => (
              <article
                aria-label={`Candidate: ${match.candidate.name} - Match: ${match.score}/${MAX_POINTS} Points`}
                key={`candidate-match-overview-${match.candidate.id}`}
                className="relative -mt-[2px] flex h-[60px] w-full flex-row items-center justify-center overflow-clip  rounded-[200px] border-2 border-black px-3 [--radius-offset:60px] sm:px-7 md:[--radius-offset:90px] xs:[--radius-offset:75px]"
              >
                <PartyLogo
                  src={`${match.candidate.profileImg}`}
                  alt=""
                  title={`Compare Your Answers with ${match.candidate.name}`}
                  href={`/${params.electionSlug}/questions/${params.slug}/compare/${match.candidate.slug}`}
                  className="z-20 -mt-[2px] h-[calc(100%+4px)] w-[120px] border-2 sm:w-[180px] xs:w-[150px]"
                />
                <div
                  aria-hidden="true"
                  className={clsx(
                    "absolute bottom-0 top-0 z-10 w-[var(--radius-offset)]",
                    match.score > 0 && "left-1/2 bg-[#98EB8B]",
                    match.score < 0 && "right-1/2 bg-[#FFA06E]",
                  )}
                />
                <div
                  aria-hidden="true"
                  className={clsx(
                    "absolute bottom-0 top-0 z-10 w-[calc(50%-var(--radius-offset))]",
                    match.score > 0 && "left-[calc(50%+var(--radius-offset))]",
                    match.score < 0 && "right-[calc(50%+var(--radius-offset))]",
                  )}
                >
                  <div
                    style={{
                      width: `${(Math.abs(match.score) / MAX_POINTS) * 100}%`,
                    }}
                    className={clsx(
                      "absolute bottom-0 top-0 z-10",
                      match.score > 0 && "left-0 bg-[#98EB8B]",
                      match.score < 0 && "right-0 bg-[#FFA06E]",
                    )}
                  />
                </div>
              </article>
            ))}
        </div>

        <div className="w-full space-y-3">
          <p>
            <strong className="font-semibold">Important:</strong>
            <br /> The result is not a voting recommendation. It does not mean
            you should vote for the candidate with the highest similarity in the
            Election Checker. The result only shows which parties gave similar
            answers to the {voterWithAnswers.answers.length} questions as you
            did.
          </p>
          <p>
            On the next page, you can look at the answers from all candidates
            and compare them with your answers.
          </p>
        </div>

        <Button
          as="Link"
          href={`/${params.electionSlug}/questions/${params.slug}/details`}
          variant="primary"
          roundness="large"
        >
          <ArrowRightIcon
            aria-hidden="true"
            className="ml-1 inline h-5 w-5 stroke-2"
          />
          To the Answers
        </Button>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: WahlkabineResultProps) {
  const voterWithAnswers = await getVoterViaHash(params.slug);

  if (!voterWithAnswers) {
    notFound();
  }

  return metaTagsPerElectionSlug({
    electionSlug: voterWithAnswers.election.slug,
    title: `My result for ${voterWithAnswers.election.name} – Election Checker`,
    description: `Look at how similar I was to the candidates.`,
  });
}
