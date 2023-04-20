"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useVoterQuestionnaireStore } from "~/stores/questionnaire-store-voter";
import { Loading } from "./ui/loading";
import { useHasHydrated } from "~/hooks/useHasHydrated";

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
                href={`/wahlkabine/${slug}`}
                className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand outline-offset-2 dark:hover:opacity-90"
              >
                Dein Ergebnis
              </Link>

              <button
                className="hover:bg-brand-purple px-3 py-2 hover:text-white border-brand-purple text-brand-purple border active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand outline-offset-2 dark:bg-brand-purple dark:text-white dark:hover:opacity-90"
                onClick={(e) => {
                  reset();
                }}
              >
                Reset
              </button>
            </div>
          ) : (
            <Link
              href="/wahlkabine"
              className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md"
            >
              Wahlkabine starten
            </Link>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
