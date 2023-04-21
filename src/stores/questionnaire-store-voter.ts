import { Question } from "@prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type VoterAnsweredQuestion = Question & {
  option: number | null;
  weighting: number | null;
  skipped: boolean;
};

export interface QuestionnaireState {
  questions: VoterAnsweredQuestion[];
  isSaving: boolean;
  activeIndex: number;
  slug?: string;
  dataForStats: {
    age?: number | null;
    gender?: string | null;
    state?: string | null;
    isPartyMember?: boolean | null;
  };
  dataForStatsAnswered: () => boolean;
  hasAcceptedTos: boolean;
  acceptTos: () => void;
  setQuestions: (questions: VoterAnsweredQuestion[]) => void;
  updateQuestion: (
    questionId: number,
    data:
      | { option: number | null }
      | { weighting: number | null }
      | { skipped: boolean }
  ) => void;
  setActiveIndex: (index: number) => void;
  setSlug: (slug: string) => void;
  setOption: (questionId: number, option: number | null) => void;
  setWeighting: (questionId: number, weighting: number | null) => void;
  skip: (questionId: number) => void;
  save: () => void;
  reset: () => void;
  setDataForStats: (data: Partial<QuestionnaireState["dataForStats"]>) => void;
}

export const useVoterQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set, get) => ({
      questions: [],
      isSaving: false,
      setQuestions: (questions: VoterAnsweredQuestion[]) => {
        set((state) => {
          return {
            questions:
              state.questions.length < questions.length
                ? questions
                : state.questions,
          };
        });
      },
      activeIndex: 0,
      setActiveIndex: (index: number) => {
        set((state) => {
          return {
            activeIndex: index,
          };
        });
      },
      hasAcceptedTos: false,
      acceptTos: () => {
        set((state) => {
          return {
            hasAcceptedTos: true,
          };
        });
      },
      dataForStats: {
        age: undefined,
        state: undefined,
        gender: undefined,
        isPartyMember: undefined,
      },
      dataForStatsAnswered: () => {
        return (
          Object.values(get().dataForStats).every(
            (v) => typeof v !== "undefined"
          ) && Object.keys(get().dataForStats).length > 0
        );
      },
      setDataForStats: (data: Partial<QuestionnaireState["dataForStats"]>) => {
        set((state) => {
          return {
            dataForStats: {
              ...state.dataForStats,
              ...data,
            },
          };
        });
      },
      slug: undefined,
      setSlug: (slug: string) => {
        set((state) => {
          return { slug };
        });
      },
      updateQuestion: (questionId, data) => {
        set((state) => {
          const hasOption = data.hasOwnProperty("option");
          const hasWeighting = data.hasOwnProperty("weighting");
          const hasSkipped = data.hasOwnProperty("skipped");

          // console.log({ hasOption, hasWeighting, hasSkipped, data }})

          if ((hasOption && hasSkipped) || (hasWeighting && hasSkipped)) {
            return { questions: state.questions };
          }

          const questions = state.questions.map((question) => {
            if (question.id === questionId) {
              if (hasSkipped) {
                return {
                  ...question,
                  ...data,
                  option: null,
                  weighting: null,
                };
              } else {
                return {
                  ...question,
                  ...data,
                  skipped: false,
                };
              }
            } else {
              return question;
            }
          });
          return { questions };
        });
      },
      setOption: (questionId, option) => {
        get().updateQuestion(questionId, { option });
      },
      setWeighting: (questionId, weighting) => {
        get().updateQuestion(questionId, { weighting });
      },
      skip: (questionId) => {
        get().updateQuestion(questionId, { skipped: true });
      },
      save: async () => {
        const path = "/api/voter-submit";

        set((state) => {
          return {
            isSaving: true,
          };
        });

        fetch(path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionsWithAnswers: get().questions.map((q) => ({
              id: q.id,
              option: q.option,
              weighting: q.weighting,
              skipped: q.skipped,
            })),
            dataForStats: get().dataForStats,
            hasAcceptedTos: get().hasAcceptedTos,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            set((state) => {
              return {
                isSaving: false,
                slug: res.slug,
              };
            });
          })
          .catch((reason) => {
            alert(reason);
            console.error(reason);

            set((state) => {
              return {
                isSaving: false,
              };
            });
          });
      },
      reset: () => {
        set((state) => {
          return {
            dataForStats: {
              age: undefined,
              state: undefined,
              gender: undefined,
              isPartyMember: undefined,
            },
            hasAcceptedTos: false,
            questions: [],
            activeIndex: 0,
            slug: undefined,
          };
        });
      },
    }),
    {
      name: "voter-questionnaire-storage-20-04-2023-v3",
    }
  )
);
