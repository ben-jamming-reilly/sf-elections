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
              className="inline-block rounded-md border border-brand px-3 py-2 text-brand outline-offset-2 transition-all focus-visible:outline-brand active:scale-95 notouch:hover:bg-brand  notouch:hover:text-white"
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
