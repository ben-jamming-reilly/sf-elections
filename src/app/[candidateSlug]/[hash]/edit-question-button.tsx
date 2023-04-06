"use client";

import { useRouter } from "next/navigation";
import { useQuestionnaireStore } from "~/stores/questionnaire-store";

export const EditQuestionButton = ({
  questionId,
  url,
}: {
  questionId: number;
  url: string;
}) => {
  const [setActiveIndex] = useQuestionnaireStore((s) => [s.setActiveIndex]);
  const router = useRouter();

  return (
    <button
      onClick={() => {
        setActiveIndex(questionId);
        router.push(url);
      }}
    >
      Frage bearbeiten
    </button>
  );
};
