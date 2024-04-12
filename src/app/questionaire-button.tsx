"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useVoterQuestionnaireStore } from "~/stores/questionnaire-store-voter";
import { Loading } from "./ui/loading";
import { useHasHydrated } from "~/hooks/useHasHydrated";
import {
  ArrowPathRoundedSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

export const QuestionaireButton = () => {
  const hasHydrated = useHasHydrated();
  const [slug, reset] = useVoterQuestionnaireStore((s) => [s.slug, s.reset]);

  return (
    <>
      {hasHydrated ? (
        <>
          {slug ? (
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              <Link
                href={`/kabine/${slug}`}
                className="/90  inline-flex items-center gap-1 rounded-md bg-brand px-3 py-2 text-white outline-offset-2  transition-all focus-visible:outline-brand active:scale-95  notouch:hover:bg-brand"
              >
                <ClipboardDocumentCheckIcon className="ml-1 inline h-5 w-5 stroke-2" />
                Dein Ergebnis
              </Link>

              <button
                className="inline-flex items-center gap-1 rounded-md border border-brand px-3 py-2  text-brand outline-offset-2 transition-all  focus-visible:outline-brand active:scale-95 notouch:hover:bg-brand notouch:hover:text-white"
                onClick={(e) => {
                  reset();
                }}
              >
                <ArrowPathRoundedSquareIcon className="ml-1 inline h-5 w-5 stroke-2" />
                Neustarten
              </button>
            </div>
          ) : (
            <Link
              href="/kabine"
              className="/90  inline-flex items-center justify-center gap-1 rounded-md bg-brand px-3 py-2 text-white transition-all active:scale-95 notouch:hover:bg-brand"
            >
              <ArrowRightIcon className="ml-1 inline h-5 w-5 stroke-2" />
              Zu den Fragen
            </Link>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
