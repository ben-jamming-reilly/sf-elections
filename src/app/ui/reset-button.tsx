"use client";

import { ReactNode } from "react";
import { useHasHydrated } from "~/hooks/useHasHydrated";
import { useVoterQuestionnaireStore } from "~/stores/questionnaire-store-voter";
import { Loading } from "./loading";
import { usePathname } from "next/navigation";
import { QuestionaireButton } from "../questionaire-button";

export const ResetButton = () => {
  const hasHydrated = useHasHydrated();
  const [reset, slug] = useVoterQuestionnaireStore((s) => [s.reset, s.slug]);
  const path = usePathname();

  return (
    <>
      {hasHydrated ? (
        <>
          {slug && path?.includes(slug) ? (
            <button
              className="notouch:hover:bg-brand px-3 py-2 notouch:hover:text-white border-brand text-brand border active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand  outline-offset-2"
              onClick={(e) => {
                reset();
              }}
            >
              Reset
            </button>
          ) : (
            <QuestionaireButton />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
