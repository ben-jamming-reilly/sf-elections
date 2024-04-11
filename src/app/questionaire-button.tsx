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
                className="bg-brand text-white items-center gap-1 inline-flex px-3 py-2 hover:bg-brand/90 active:scale-95  transition-all rounded-md focus-visible:outline-brand outline-offset-2"
              >
                <ClipboardDocumentCheckIcon className="w-5 h-5 inline ml-1 stroke-2" />
                Dein Ergebnis
              </Link>

              <button
                className="hover:bg-brand-purple px-3 py-2 hover:text-white border-brand-purple text-brand-purple border active:scale-95  transition-all rounded-md focus-visible:outline-brand outline-offset-2 items-center gap-1 inline-flex"
                onClick={(e) => {
                  reset();
                }}
              >
                <ArrowPathRoundedSquareIcon className="w-5 h-5 inline ml-1 stroke-2" />
                Neustarten
              </button>
            </div>
          ) : (
            <Link
              href="/kabine"
              className="bg-brand text-white inline-flex items-center justify-center gap-1 px-3 py-2 hover:bg-brand/90 active:scale-95 transition-all rounded-md"
            >
              <ArrowRightIcon className="w-5 h-5 inline ml-1 stroke-2" />
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
