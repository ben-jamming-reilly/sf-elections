import { prisma } from "~/lib/prisma";
import { Questionnaire } from "./questionnaire";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function Wahlkabine() {
  const questions = await prisma.question.findMany();

  return <Questionnaire questions={questions} />;
}
