"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { GlossarEntry } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { mergeHyphenatedWords } from "~/utils";

function simpleSegmenter(text: string) {
  // - Capture sequences of word characters and apostrophes as words.
  // - Capture punctuation marks.
  // - Capture sequences of whitespace characters.
  const regex = /([\w']+|[^\w\s]+|\s+)/g;

  // The 'match' method returns an array containing all matches, including whitespace.
  return text.match(regex);
}

const matchTermAndSynonyms = (entry: GlossarEntry, word: string) => {
  return (
    entry.term.toLowerCase() === word.toLowerCase() ||
    entry.synonyms.toLowerCase().split(",").includes(word.toLowerCase())
  );
};

export const GlossaredText = ({
  text,
  glossarEntries,
}: {
  text: string;
  glossarEntries: GlossarEntry[];
}) => {
  const id = useId();
  const [activeEntry, setActiveEntry] = useState<GlossarEntry | null>(null);

  const parts = simpleSegmenter(text) ?? [];
  const partsClean = mergeHyphenatedWords(parts);

  return (
    <>
      {partsClean.map((word, index) => {
        const glossarEntry = glossarEntries.find((entry) =>
          matchTermAndSynonyms(entry, word),
        );

        if (glossarEntry) {
          return (
            <a
              key={`glossar-${id}-${index}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveEntry(glossarEntry);
              }}
              href="#"
              className="underline-offset-4 outline-offset-2 outline-black hover:underline focus-visible:outline-4"
            >
              {word}*
            </a>
          );
        }
        return word;
      })}

      <AnimatePresence>
        {activeEntry && (
          <GlossarModal
            entry={activeEntry}
            onClose={() => setActiveEntry(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

let timeout: number;

const GlossarModal = ({
  entry,
  onClose,
}: {
  entry: GlossarEntry;
  onClose: () => void;
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab") {
        closeButtonRef.current?.focus();
        e.preventDefault();
      }
    };
    document.querySelector("html")?.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleKeyDown);

    timeout = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      document.querySelector("html")?.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Glossar: ${entry.term}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.1,
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 shadow-xl"
    >
      <motion.div
        transition={{
          duration: 0.1,
        }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="relative w-[440px] rounded-[30px] bg-white p-10"
      >
        <button
          onClick={onClose}
          ref={closeButtonRef}
          className="p- absolute right-5 top-5 transition-all focus-visible:outline-2 focus-visible:outline-brand notouch:hover:bg-brand notouch:hover:text-white notouch:hover:active:scale-95"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        <h3 className="mb-2 font-semibold">{entry.term}:</h3>
        <p>{entry.definition}</p>
      </motion.div>
    </motion.div>
  );
};
