import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[800px] text-center">
      <h1 className="border-b-2 border-black pb-4 text-4xl">
        Diese Seite gibt es nicht!
      </h1>
      <p className="my-4">
        Die Seite, die du aufgerufen hast, konnte nicht gefunden werden. Bitte
        überprüfe die URL und versuchen es erneut.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 rounded-md border border-brand px-3 py-2 text-lg text-brand transition-all active:scale-95 notouch:hover:bg-brand  notouch:hover:text-white"
      >
        <ArrowLeftCircleIcon className="h-5 w-5 stroke-2" />
        Zur Startseite
      </Link>
    </div>
  );
}
