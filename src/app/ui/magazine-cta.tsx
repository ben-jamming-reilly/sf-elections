import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";

export const MagazineCta = () => {
  return (
    <aside
      className="mx-auto my-10 flex w-[800px] max-w-full flex-col items-start gap-8 bg-[#fef9ca] px-8 py-8 text-[#016956] md:flex-row md:items-end"
      aria-label="EU Wahl Magazin von andererseits"
    >
      <div className="max-w-[400px]">
        <h2 className="text-[1.75rem] font-semibold leading-[2.125rem]">
          Mehr über die EU Wahl kannst Du in unserem gedruckten Magazin lesen.
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
        Jetzt bestellen
      </Button>
    </aside>
  );
};
