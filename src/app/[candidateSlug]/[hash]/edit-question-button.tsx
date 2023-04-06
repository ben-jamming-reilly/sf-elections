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
      className="block border-brand border px-2 py-2 text-brand rounded-md text-sm"
      onClick={() => {
        setActiveIndex(questionId - 1);
        router.push(url);
      }}
    >
      Frage bearbeiten
    </button>
  );
};
