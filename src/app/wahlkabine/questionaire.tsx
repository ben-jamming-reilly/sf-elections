"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useReducer, useState } from "react";
import { usePrevious } from "~/hooks/usePrevious";

type reducerAction =
  | {
      type: "set-option";
      payload: {
        questionId: number;
        optionId: number;
      };
    }
  | {
      type: "set-weighting";
      payload: {
        questionId: number;
        weightingId: number;
      };
    };

function questionaireReducer(
  questions: typeof initialData,
  action: reducerAction
) {
  const { questionId } = action.payload;
  switch (action.type) {
    case "set-option":
      return questions.map((q) => {
        if (q.id === questionId)
          return {
            ...q,
            option: action.payload.optionId,
          };
        return q;
      });
    case "set-weighting":
      return questions.map((q) => {
        if (q.id === questionId)
          return {
            ...q,
            weighting: action.payload.weightingId,
          };
        return q;
      });
    default:
      throw Error("Unknown action: " + action);
  }
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    };
  },
};

export const Questionaire = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndex = usePrevious(activeIndex);
  const [questions, dispatch] = useReducer(questionaireReducer, initialData);

  // Derived state
  const activeQuestion = questions[activeIndex];

  const questionAnswered =
    typeof activeQuestion.option !== "undefined" &&
    typeof activeQuestion.weighting !== "undefined";

  const direction = prevIndex < activeIndex ? 1 : -1;

  const prevDisabled = activeIndex === 0;
  const nextDisabled =
    activeIndex === questions.length - 1 || !questionAnswered;

  console.log({
    activeQuestion,
    questionAnswered,
    direction,
    prevDisabled,
    nextDisabled,
  });
  // Handlers
  const handlePrev = () => {
    if (prevDisabled) return;
    setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (nextDisabled) return;
    setActiveIndex(activeIndex + 1);
  };

  const PrevAndNext = (
    <div className="flex flex-row justify-between items-center w-full">
      <button
        onClick={handlePrev}
        disabled={prevDisabled}
        className="hover:bg-brand px-6 py-2 hover:text-white  active:scale-95 bg-neutral-200 text-gray-800 disabled:bg-neutral-100 disabled:text-gray-800/20 disabled:cursor-not-allowed disabled:active:scale-100 text-lg rounded-md"
      >
        Zurück
      </button>
      <span className="text-lg">
        {activeIndex + 1} / {questions.length}
      </span>
      <button
        onClick={handleNext}
        disabled={nextDisabled}
        className="hover:bg-brand px-6 py-2 hover:text-white active:scale-95 bg-neutral-200 text-gray-800 disabled:bg-neutral-100 disabled:text-gray-800/20 disabled:cursor-not-allowed disabled:active:scale-100 text-lg rounded-md"
      >
        Weiter
      </button>
    </div>
  );

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.article
        className="flex flex-col gap-10 items-center"
        key={`question-${activeQuestion.id}`}
      >
        <motion.header
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full"
        >
          <div className="text-2xl mb-3 h-[5em]">
            <span className="text-lg font-semibold">
              Frage {activeIndex + 1}:
            </span>
            <h1 className="">{activeQuestion.text}</h1>
          </div>
        </motion.header>

        {PrevAndNext}

        <section className="flex flex-col gap-10 my-6 w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl underline underline-offset-4">
              Ich stimme:
            </h2>
            <ul className="grid w-full border border-brand md:grid-cols-5 md:grid-rows-1 grid-cols-1 grid-rows-5">
              {options.map((option) => (
                <li
                  className="relative border-b md:border-b-0 md:border-r border-brand last:border-0 bg-red-50/50"
                  key={`option-${option.value}`}
                >
                  {option.value === activeQuestion.option && (
                    <motion.span
                      layoutId="active-option"
                      // exit={{ opacity:  0 }}
                      className="absolute inset-0 bg-brand z-10"
                    />
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      dispatch({
                        type: "set-option",
                        payload: {
                          questionId: activeQuestion.id,
                          optionId: option.value,
                        },
                      });
                    }}
                    className={clsx(
                      "z-20 relative text-lg w-full text-center py-4",
                      option.value === activeQuestion.option && " text-white",
                      typeof activeQuestion.option !== "undefined" &&
                        "transition-all"
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl underline underline-offset-4">
              Das ist mir:
            </h2>
            <ul className="grid w-full border border-brand md:grid-cols-4 md:grid-rows-1 grid-cols-1 grid-rows-4">
              {weightings.map((weighting) => (
                <li
                  className="relative border-b md:border-b-0 md:border-r border-brand last:border-0 bg-red-50/50"
                  key={`weighting-${weighting.value}`}
                >
                  {weighting.value === activeQuestion.weighting && (
                    <motion.span
                      layoutId="active-weighting"
                      // exit={{ opacity:  0 }}
                      className="absolute inset-0 bg-brand z-10"
                    />
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      dispatch({
                        type: "set-weighting",
                        payload: {
                          questionId: activeQuestion.id,
                          weightingId: weighting.value,
                        },
                      });
                    }}
                    className={clsx(
                      "z-20 relative text-lg w-full text-center py-4",
                      weighting.value === activeQuestion.weighting &&
                        " text-white",
                      typeof activeQuestion.weighting !== "undefined" &&
                        "transition-all"
                    )}
                  >
                    {weighting.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {PrevAndNext}
      </motion.article>
    </AnimatePresence>
  );
};

const options = [
  {
    label: "garnicht zu",
    value: -2,
  },
  {
    label: "eher nicht zu",
    value: -1,
  },
  {
    label: "Neutral",
    value: 0,
  },
  {
    label: "eher zu",
    value: 1,
  },
  {
    label: "voll zu",
    value: 2,
  },
];

const weightings = [
  {
    label: "garnicht wichtig",
    value: 0,
  },
  {
    label: "eher nicht wichtig",
    value: 1,
  },
  {
    label: "eher wichtig",
    value: 2,
  },
  {
    label: "sehr wichtig",
    value: 3,
  },
];

const initialData: {
  option?: number;
  weighting?: number;
  id: number;
  text: string;
}[] = [
  {
    id: 0,
    text: "Wie wichtig ist dir die Zusammenarbeit mit anderen linken Parteien für die SPÖ?",
  },
  {
    id: 1,
    text: "Wie bewertest du die bisherige Arbeit des aktuellen Vorstands der SPÖ?",
  },
  {
    id: 2,
    text: "Welche Themen sollten deiner Meinung nach in den Fokus der SPÖ rücken?",
  },
  {
    id: 3,
    text: "Wie wichtig ist dir das Thema Umweltschutz bei der Wahl des SPÖ-Vorstands?",
  },
  {
    id: 4,
    text: "Wie wichtig ist dir das Thema Bildung bei der Wahl des SPÖ-Vorstands?",
  },
  {
    id: 5,
    text: "Wie wichtig ist dir das Thema Arbeitsmarkt bei der Wahl des SPÖ-Vorstands?",
  },
  {
    id: 6,
    text: "Wie wichtig ist dir das Thema Integration bei der Wahl des SPÖ-Vorstands?",
  },
  {
    id: 7,
    text: "Wie wichtig ist dir das Thema Gleichstellung bei der Wahl des SPÖ-Vorstands?",
  },
  {
    id: 8,
    text: "Welche konkreten Maßnahmen würdest du von einem neuen SPÖ-Vorstand erwarten?",
  },
  {
    id: 9,
    text: "In welchen Bereichen sollte die SPÖ deiner Meinung nach stärker mit anderen Parteien zusammenarbeiten?",
  },
  {
    id: 10,
    text: "Welche Erfahrungen und Fähigkeiten sollte der neue SPÖ-Vorstand deiner Meinung nach haben?",
  },
  {
    id: 11,
    text: "Wie wichtig ist dir die Erfahrung des neuen SPÖ-Vorstands im politischen Bereich?",
  },
  {
    id: 12,
    text: "Wie wichtig ist dir die Geschlechterbalance im neuen SPÖ-Vorstand?",
  },
  {
    id: 13,
    text: "Welche Rolle sollten junge Parteimitglieder im neuen SPÖ-Vorstand spielen?",
  },
  {
    id: 14,
    text: "Wie wichtig ist dir die regionale Verteilung im neuen SPÖ-Vorstand?",
  },
  {
    id: 15,
    text: "Welche Erwartungen hast du an den neuen SPÖ-Vorstand hinsichtlich der Kommunikation mit den Wählern?",
  },
  {
    id: 16,
    text: "Wie wichtig ist dir die Transparenz in der Arbeit des neuen SPÖ-Vorstands?",
  },
  {
    id: 17,
    text: "Wie wichtig ist dir die Zusammenarbeit mit den Gewerkschaften für die SPÖ?",
  },
  {
    id: 18,
    text: "Wie wichtig ist dir die Zusammenarbeit mit anderen europäischen sozialdemokratischen Parteien für die SPÖ?",
  },
  {
    id: 19,
    text: "Wie wichtig ist dir die internationale Solidarität der SPÖ?",
  },
];
