import { prisma } from "~/lib/prisma";
import { Questionnaire } from "./questionnaire";
import { notFound } from "next/navigation";

export const metadata = {
  title: "SPÖ Wahlkabine",
  description: "SPÖ Wahlkabine",
};

export default async function Wahlkabine() {
  const questions = await prisma.question.findMany();

  notFound();

  return <Questionnaire questions={questions} />;
}
