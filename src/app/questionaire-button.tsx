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
import { Button } from "./ui/button";

export const QuestionaireButton = () => {
  const hasHydrated = useHasHydrated();
  const [slug, reset] = useVoterQuestionnaireStore((s) => [s.slug, s.reset]);

  return (
    <>
      {hasHydrated ? (
        <>
          {slug ? (
            <div className="flex flex-col justify-center gap-3 md:flex-row">
              <Button
                variant="primary"
                roundness="large"
                as="a"
                href={`/fragen/${slug}`}
              >
                <ClipboardDocumentCheckIcon className="ml-1 inline h-5 w-5 stroke-2" />
                Dein Ergebnis
              </Button>

              <Button
                as="button"
                variant="secondary"
                roundness="large"
                onClick={(e) => {
                  reset();
                }}
              >
                <ArrowPathRoundedSquareIcon className="ml-1 inline h-5 w-5 stroke-2" />
                Neustarten
              </Button>
            </div>
          ) : (
            <Button variant="primary" roundness="large" as="a" href="/fragen">
              <ArrowRightIcon className="ml-1 inline h-5 w-5 stroke-2" />
              Zu den Fragen
            </Button>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
