import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";

export const MagazineCta = ({ electionSlug }: { electionSlug: string }) => {
  return (
    <aside
      className="mx-auto my-10 flex w-[900px] max-w-full flex-col items-start justify-between gap-8 bg-[#fef9ca] px-8 py-8 text-[#016956] md:flex-row md:items-end"
      aria-label="EU Wahl Magazin von andererseits"
    >
      <div className="max-w-[400px]">
        <h2 className="text-[1.75rem] font-semibold leading-[2.125rem]">
          {electionSlug === "eu-2024" &&
            "Mehr über die EU-Wahl kannst Du in unserem gedruckten Magazin lesen."}
          {electionSlug === "nr-2024" && (
            <span>
              andererseits arbeitet unabhängig.
              <br />
              Du möchtest mehr verständliche Informationen?
            </span>
          )}
        </h2>
      </div>

      <Button
        as="a"
        href="https://andererseits.org/abo"
        variant="primary"
        roundness="large"
      >
        <BookOpenIcon
          aria-hidden="true"
          className="ml-1 inline h-5 w-5 stroke-2"
        />
        {electionSlug === "nr-2024" && "Jetzt unterstützen"}
        {electionSlug === "eu-2024" && "Jetzt bestellen"}
      </Button>
    </aside>
  );
};
