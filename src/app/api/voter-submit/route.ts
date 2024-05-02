import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ZodError, z } from "zod";
import { getCandidatesWithQuestions } from "~/app/fragen/[slug]/get-candidates-with-questions";
import { rateCandidate } from "~/app/fragen/[slug]/rate-candidates";
import { prisma } from "~/lib/prisma";

const questionWithAnswersSchema = z.array(
  z.discriminatedUnion("skipped", [
    z.object({
      id: z.number(),
      option: z.null(),
      weighting: z.null(),
      skipped: z.literal(true),
    }),
    z.object({
      id: z.number(),
      option: z.number(),
      weighting: z.number().min(0).max(3),
      skipped: z.literal(false),
    }),
  ]),
);

const dataForStatsSchema = z.object({
  age: z.number().min(0).max(120).nullable().optional(),
  gender: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  const data = await request.json();
  const hash = uuidv4().slice(0, 8);

  // if (!data.hasAcceptedTos) {
  //   return NextResponse.json(
  //     {
  //       error: "Bitte akzeptiere die Nutzungsbedingungen!",
  //     },
  //     { status: 400 },
  //   );
  // }

  try {
    const validatedQuestionsWithAnswers = questionWithAnswersSchema.parse(
      data.questionsWithAnswers,
    );

    const voter = await prisma.voter.create({
      data: {
        hash: hash,
        hasAcceptedTos: true,
        answers: {
          createMany: {
            data: validatedQuestionsWithAnswers.map((answer) => ({
              questionId: answer.id,
              option: answer.option,
              weighting: answer.weighting,
              skipped: answer.skipped,
            })),
          },
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    return NextResponse.json({ slug: voter.hash });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues });
    }

    return NextResponse.json(
      {
        error: "Es ist ein Fehler passiert. Bitte probiere es nochmal!",
      },
      { status: 400 },
    );
  }
}
