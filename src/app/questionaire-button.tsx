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
            <div className="flex flex-row gap-2 items-center justify-center">
              <Link
                href={`/kabine/${slug}`}
                className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand outline-offset-2 dark:hover:opacity-90"
              >
                Dein Ergebnis
                <ClipboardDocumentCheckIcon className="w-5 h-5 inline ml-1 stroke-2" />
              </Link>

              <button
                className="hover:bg-brand-purple px-3 py-2 hover:text-white border-brand-purple text-brand-purple border active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand outline-offset-2 dark:bg-brand-purple dark:text-white dark:hover:opacity-90"
                onClick={(e) => {
                  reset();
                }}
              >
                Reset
                <ArrowPathRoundedSquareIcon className="w-5 h-5 inline ml-1 stroke-2" />
              </button>
            </div>
          ) : (
            <Link
              href="/kabine"
              className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md"
            >
              Kabine starten
              <ArrowRightIcon className="w-5 h-5 inline ml-1 stroke-2" />
            </Link>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
