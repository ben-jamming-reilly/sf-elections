"use client";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Error() {
  return (
    <div className="text-center max-w-[800px] mx-auto">
      <h1 className="text-4xl pb-4 border-b-2 border-gray-800">
        Es ist ein Fehler aufgetreten!
      </h1>
      <p className="my-4">
        Es ist ein Fehler passiert. Bitte lade die Seite neu und versuche es
        erneut.
      </p>
      <Link
        href="/"
        className="border-brand border  px-3 py-2 hover:bg-brand hover:text-white active:scale-95 inline-flex items-center text-lg justify-center transition-all rounded-md text-brand gap-2"
      >
        <ArrowLeftCircleIcon className="w-5 h-5 stroke-2" />
        Zur Startseite
      </Link>
    </div>
  );
}
