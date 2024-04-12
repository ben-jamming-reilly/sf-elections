import fs from "fs";
import { parse } from "csv-parse/sync";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const PARTIES = ["FPÖ", "NEOS", "KPÖ", "Volt", "SPÖ", "ÖVP", "Grüne"] as const;

type Parties = (typeof PARTIES)[number];

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ä/g, "ae")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\-]/g, "");

const matchWeighing = (option: string) => {
  switch (option) {
    case "sehr wichtig":
      return 3;
    case "wichtig":
      return 2;
    case "nicht wichtig":
      return 1;
    case "neutral":
      return 0;
    default:
      return 0;
  }
};

const matchOption = (option: string) => {
  switch (option) {
    case "Ja":
      return 3;
    case "Nein":
      return -3;
    case "Weiß ich nicht":
      return 0;
    default:
      return 0;
  }
};

(async () => {
  try {
    const csvFile = "./src/scripts/data/wahlkabine-parties.csv";

    const partiesData = parse(fs.readFileSync(csvFile, "utf8"), {
      columns: true,
      skip_empty_lines: true,
    });

    const partiesDataParsed = z
      .array(
        z.object({
          Frage: z.string(),
          "Antwort FPÖ": z.string(),
          "Wertung FPÖ": z.string(),
          "Erklärung FPÖ": z.string(),
          "Antwort NEOS": z.string(),
          "Wertung NEOS": z.string(),
          "Erklärung NEOS": z.string(),
          "Antwort KPÖ": z.string(),
          "Wertung KPÖ": z.string(),
          "Erklärung KPÖ": z.string(),
          "Antwort Volt": z.string(),
          "Wertung Volt": z.string(),
          "Erklärung Volt": z.string(),
          "Antwort SPÖ": z.string(),
          "Wertung SPÖ": z.string(),
          "Erklärung SPÖ": z.string(),
          "Antwort ÖVP": z.string(),
          "Wertung ÖVP": z.string(),
          "Erklärung ÖVP": z.string(),
          "Antwort Grüne": z.string(),
          "Wertung Grüne": z.string(),
          "Erklärung Grüne": z.string(),
        }),
      )
      .parse(partiesData);

    const parties = partiesDataParsed.reduce(
      (acc, partyData) => {
        for (const party of PARTIES) {
          if (acc[party] === undefined) {
            acc[party] = {
              name: party,
              answers: [],
            };
          }

          if (partyData[`Antwort ${party}`] === "") {
            continue;
          }

          acc[party].answers.push({
            question: partyData[`Frage`].trim(),
            answer: partyData[`Antwort ${party}`].trim(),
            weighting: partyData[`Wertung ${party}`].trim(),
            explanation: partyData[`Erklärung ${party}`].trim(),
          });
        }

        return acc;
      },
      {} as Record<
        Parties,
        {
          name: string;
          answers: {
            question: string;
            answer: string;
            weighting: string;
            explanation: string;
          }[];
        }
      >,
    );

    const questions = await prisma.question.findMany();
    const matchedQuestions = questions.filter((question) => {
      return partiesDataParsed.some((partyData) => {
        for (const party of PARTIES) {
          if (partyData[`Frage`].trim() === question.title) {
            return true;
          }
        }

        return false;
      });
    });

    const notMatchedQuestions = questions.filter((question) => {
      return !matchedQuestions.some(
        (matchedQuestion) => matchedQuestion.id === question.id,
      );
    });

    console.log(
      `Matched questions: ${matchedQuestions.length}/${questions.length}`,
    );

    console.log(
      `Not matched questions: ${notMatchedQuestions.length}/${questions.length}`,
    );

    console.log(notMatchedQuestions.map((question) => question.title));

    await prisma.candidateQuestionAnswer.deleteMany();
    await prisma.candidate.deleteMany();
    for (const party of Object.values(parties)) {
      const candidate = await prisma.candidate.create({
        data: {
          name: party.name,
          description: "",
          hasFinished: true,
          profileImg: slugify(party.name) + ".svg",
          slug: slugify(party.name),
          answers: {
            createMany: {
              data: party.answers.map((answer) => ({
                questionId: matchedQuestions.find(
                  (question) => question.title === answer.question,
                )!.id,
                option: matchOption(answer.answer),
                weighting: matchWeighing(answer.weighting),
                text: answer.explanation,
              })),
            },
          },
        },
      });

      console.log(candidate);
    }
  } catch (error) {
    console.error(error);
  }
})();
