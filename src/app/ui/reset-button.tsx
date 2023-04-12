"use client";

import { ReactNode } from "react";
import { useVoterQuestionnaireStore } from "~/stores/questionnaire-store-voter";

export const ResetButton = ({ children }: { children: ReactNode }) => {
  const [reset] = useVoterQuestionnaireStore((s) => [s.reset]);

  return (
    <button
      className="hover:bg-brand-purple px-3 py-2 hover:text-white border-brand-purple text-brand-purple border active:scale-95 inline-block transition-all rounded-md focus-visible:outline-brand outline-offset-2"
      onClick={(e) => {
        reset();
      }}
    >
      {children}
    </button>
  );
};
