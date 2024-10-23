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

export const QuestionaireButton = ({
  electionSlug,
}: {
  electionSlug: string;
}) => {
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
                href={`${electionSlug}/questions/${slug}`}
              >
                <ClipboardDocumentCheckIcon
                  aria-hidden="true"
                  className="ml-1 inline h-5 w-5 stroke-2"
                />
                Your Result
              </Button>

              <Button
                as="button"
                variant="secondary"
                roundness="large"
                onClick={(e) => {
                  reset();
                }}
              >
                <ArrowPathRoundedSquareIcon
                  aria-hidden="true"
                  className="ml-1 inline h-5 w-5 stroke-2"
                />
                Restart
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              roundness="large"
              as="Link"
              href={`${electionSlug}/questions`}
            >
              <ArrowRightIcon
                aria-hidden="true"
                className="ml-1 inline h-5 w-5 stroke-2"
              />
              Take the Quiz
            </Button>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
