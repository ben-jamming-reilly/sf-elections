import { Question } from "@prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AnsweredQuestion = Question & {
  option?: number;
  weighting?: number;
  text?: string;
};

interface QuestionnaireState {
  questions: AnsweredQuestion[];
  setQuestions: (questions: AnsweredQuestion[]) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  slug?: string;
  setSlug: (slug: string) => void;
  setOption: (questionId: number, weightingId: number) => void;
  setWeighting: (questionId: number, weightingId: number) => void;
  setText: (questionId: number, text: string) => void;
  save: (candidateHash?: string) => void;
  reset: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  devtools(
    persist(
      (set, get) => ({
        questions: [],
        setQuestions: (questions: AnsweredQuestion[]) => {
          set((state) => {
            return {
              questions:
                state.questions.length > 0 ? state.questions : questions,
            };
          });
        },
        activeIndex: 0,
        setActiveIndex: (index: number) => {
          set((state) => {
            return { activeIndex: index };
          });
        },
        slug: undefined,
        setSlug: (slug: string) => {
          set((state) => {
            return { slug };
          });
        },
        setOption: (questionId: number, weightingId: number) => {
          set((state) => {
            const questions = state.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  option: weightingId,
                };
              } else {
                return question;
              }
            });
            return { questions };
          });
        },
        setWeighting: (questionId: number, weightingId: number) => {
          set((state) => {
            const questions = state.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  weighting: weightingId,
                };
              } else {
                return question;
              }
            });
            return { questions };
          });
        },
        setText: (questionId: number, text: string) => {
          set((state) => {
            const questions = state.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  text,
                };
              } else {
                return question;
              }
            });
            return { questions };
          });
        },
        save: async (candidateHash?: string) => {
          const path = candidateHash
            ? `/api/candidate-submit/${candidateHash}`
            : "/api/voter-submit";

          fetch(path, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              get().questions.map((q) => ({
                id: q.id,
                option: q.option,
                weighting: q.weighting,
                text: q?.text,
              }))
            ),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              set((state) => {
                return {
                  ...state,
                  slug: res.slug,
                };
              });
            })
            .catch((reason) => {
              console.error(reason);
            });
        },
        reset: () => {
          set((state) => {
            return {
              questions: [],
              activeIndex: 0,
              slug: undefined,
            };
          });
        },
      }),
      {
        name: "questionnaire-storage",
      }
    )
  )
);
