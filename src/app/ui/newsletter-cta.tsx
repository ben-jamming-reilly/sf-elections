import { Button } from "./button";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

export const NewsletterCta = ({ electionSlug }: { electionSlug: string }) => {
  return (
    <aside
      className="mx-auto my-10 flex w-[900px] max-w-full flex-col items-start justify-between gap-8 bg-[#fef9ca] px-8 py-8 text-[#016956] md:flex-row md:items-end"
      aria-label="EU Wahl Magazin von andererseits"
    >
      <div className="max-w-[400px]">
        <h2 className="text-[1.75rem] font-semibold leading-[2.125rem]">
          <span>Willst du mehr Verständnis?</span>
        </h2>
      </div>

      <Button
        as="Link"
        href={`/${electionSlug}/newsletter`}
        variant="primary"
        roundness="large"
      >
        <EnvelopeIcon
          aria-hidden="true"
          className="ml-1 inline h-5 w-5 stroke-2"
        />
        Newsletter abonnieren
      </Button>
    </aside>
  );
};
