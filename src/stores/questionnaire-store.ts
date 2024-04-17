import { Question } from "@prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type AnsweredQuestion = Question & {
  option?: number;
  weighting?: number;
  text?: string;
};

export interface QuestionnaireState {
  questions: AnsweredQuestion[];
  isSaving: boolean;
  synced: boolean;
  activeIndex: number;
  slug?: string;
  setQuestions: (questions: AnsweredQuestion[]) => void;
  setActiveIndex: (index: number) => void;
  setSlug: (slug: string) => void;
  setOption: (questionId: number, weightingId: number) => void;
  setWeighting: (questionId: number, weightingId: number) => void;
  setText: (questionId: number, text: string) => void;
  save: (candidateHash?: string) => void;
  reset: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  // persist(
  (set, get) => ({
    questions: [],
    isSaving: false,
    synced: true,
    dataForStats: {
      acceptedTos: false,
      age: null,
      state: null,
      gender: null,
    },
    setQuestions: (questions: AnsweredQuestion[]) => {
      set((state) => {
        return {
          questions: state.questions.length > 0 ? state.questions : questions,
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
        return { questions, synced: false };
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
        return { questions, synced: false };
      });
    },
    setText: (questionId: number, text: string) => {
      set((state) => {
        if (text.length > 500) return state;
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
        return { questions, synced: false };
      });
    },
    save: async (candidateHash?: string) => {
      const path = candidateHash
        ? `/api/candidate-submit/${candidateHash}`
        : "/api/voter-submit";

      if (get().synced) return;

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
        body: JSON.stringify(
          get().questions.map((q) => ({
            id: q.id,
            option: q.option,
            weighting: q.weighting,
            text: q?.text,
          })),
        ),
      })
        .then((res) => res.json())
        .then((res) => {
          set((state) => {
            return {
              ...state,
              isSaving: false,
              synced: true,
              slug: res.slug,
            };
          });
        })
        .catch((reason) => {
          console.error(reason);

          set((state) => {
            return {
              isSaving: false,
              synced: false,
            };
          });
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
  //   {
  //     name: "questionnaire-storage",
  //   }
  // )
);
