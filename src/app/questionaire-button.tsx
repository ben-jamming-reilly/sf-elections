"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useVoterQuestionnaireStore } from "~/stores/questionnaire-store-voter";
import { Loading } from "./ui/loading";
import { useHasHydrated } from "~/hooks/useHasHydrated";

export const QuestionaireButton = () => {
  const hasHydrated = useHasHydrated();
  const [slug] = useVoterQuestionnaireStore((s) => [s.slug, s.reset]);

  return (
    <>
      {hasHydrated ? (
        <>
          {slug ? (
            <Link
              href={`/wahlkabine/${slug}`}
              className="bg-brand text-white px-3 py-2 hover:bg-brand/90 active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand outline-offset-2"
            >
              Dein Ergebnis
            </Link>
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
